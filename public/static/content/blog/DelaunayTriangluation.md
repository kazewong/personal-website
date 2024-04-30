---
title: "Delanuay Triangulation"
date: "07-02-2024"
tags: ["julia", "parallel", "computational geometry", "triangulation"]
shortDescription: "Drawing many triangles fast in julia"
---

## Why am I interested in Delaunay Triangulation?

It is not uncommon to see Kaze working on some random stuff outside his usual bread and butter such as gravitational wave data analysis, but why Delaunay Triangulation?
The backstory is I was prompted about some bottleneck in finding void in a cosmological survey, i.e. a point cloud. A popular algorithm used for finding void is [ZOBOV](https://arxiv.org/abs/0712.3049), which uses Voronoi tessellation to estimate the density field. There are more components to the algorithm such as using [Watershed](https://en.wikipedia.org/wiki/Watershed_(image_processing)) to group different Voronoi cells into voids, but the main computational cost seems to be in the Voronoi tessellation part. Delaunay Triangulation is the dual graph of Voronoi diagram, which means one you have a Delaunay triangulation, you can easily construct the corresponding Voronoi diagram. Due to some technical reasons, Voronoi diagram is usually constructed by first constructing the Delaunay Triangulation.

The backbone of Voronoi tessellation used in ZOBOV is [Qhull](http://www.qhull.org/html/), which is a library to construct convex hulls, Delaunay triangulation, and Voronoi diagrams. While `Qhull` is a well optimized library, it is a single thread library. I benchmarked its performance using the [scipy wrapper](https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.Voronoi.html), and it took about 40 seconds to process 10^6 points. In the future, there will be cosmological survey delivering 10^9 points, and it is not feasible to use `Qhull` as it is for such a large dataset.

There are some effort to parallelize the Voronoi tessellation, such as breaking the problem into many small sub problems and [stitch them together](https://arxiv.org/pdf/1406.1191.pdf). They manage to build the Voronoi diagram for 10^9 in 10 hours on 16 cores, which is impressive. However, the problem is, the solution is not exact, as in it is not actually a Voronoi diagram. This may create some unwanted artifacts in the density field. While it may not necessarily cause massive problems, but it is not ideal.

When I first learned about this issue, I thought to myself, "It's 2024 and you are telling me that we can't process 10^9 points in a reasonable time?". If you are not aware, let me bring your attention to this [Unreal Engine 5 demo](https://youtu.be/qC5KtatMcUw?si=UfkbPzi8aw9wIJOJ&t=86) from **2020**. The can render 10^9 triangles in real time, and I cannot believe we do not have the technology to make a Voronoi diagram for 10^9 points within a couple of minutes in 2024. Besides, I wanted to learn how to make parallelized code in Julia for a while, so I figured this could be an opportunity and embarked to this journey of drawing many triangles and tetrahedra.

## Background and plan of attack

In brief, the task of Delaunay Triangulation can be described as follows: **given a set of points in a plane, connect them with triangles such that no point is inside the circumcircle of any triangle**. Since Wikipedia has a pretty good explanation of [Delaunay Triangulation](https://en.wikipedia.org/wiki/Delaunay_triangulation), so I won't go into detail of what it is here. Instead, I will describe the idea of the specific algorithm I choose to construct the Delaunay Triangulation, and layout the plan of implementing it.

The specific algorithm I choose to use is the rip-and-tent algorithm, and the idea is: **You add one point at a time, remove the triangles that are in conflict with the new point, and connect the new points with the relevant points.** You might be wondering, how does this sound parallelizable? The idea is as the number of points grow, **the triangles that needed to be removed are only the ones that are in immediate vacinity of the new point, meaning one can also insert another point in parallel as long as it is far enough and does not interact with any of the triangles**. The best part of this algorithm is it works for general dimension. So far we describe the algorithm and the problem in 2D with triangles and circles. In higher dimension, one can just replace the triangles with simplex (tetrahedron in 3D) and hypersphere, and the rest of the algorithm remains unchanged.

## Serial version

The core algorithm can be broken down into following steps:
1. Construct initial bounding triangle
2. Given a point, locates which triangles in the graph are in conflict with the new points.
3. Insert the point, make the new triangles.
4. Repeat step 2 and 3 until all points are inserted.

To start with, we have to crate a bounding triangle that is large enough to encapsulate all the points that we are going to insert into our Voronoi diagram. This step is rather simple and it does not have to be the smallest bounding triangle, so creating a triangle much bigger than the smallest necessary triangle is also okay. I used to create the triangle first by finding the smallest bounding sphere, then create the bounding triangle from there.

Step 2 is actually what the bulk of the computation goes into, and as far as I have researched into, literature tends not to be specific about this. It is not hard to implement an algorithm to locate all the triangles that are involved in a particular insertion, but implementing an efficient version that parallelize well is tricky. Before going further down and go through how I implemented it, it is a fun puzzle to think about how would you do it, so take a minute to sketch a version of this part. The task can be described as the following: given a new point in a n-dimension space, a list of points and triangles that are in the current Delaunay tree, find all the triangles that are in conflict with the newly inserted point, i.e. the newly inserted point is inside the circumsphere of the triangle.

To approach this task, we need to make a function that can check whether a point is within the circumsphere of a triangle. You can find the [2D]() and [3D]() implementation online. One tricky part about 3D is you might need to worry about the sign of the area depending on the convention of "ordering" of points. But say you are given this function and it is optimized, we still need to iterate through some list of triangles to find all the triangles that are involved. I iterated through following list of methods to locate the triangles:

1. The simplest way to go about this is obviously just iterate through all the triangles in the graph, and this is obvously inefficient as well. Testing all triangles meaning the algorithm scales as $O(N^2)$, which is horrible.
2. Since there is pretty strong locality of this task, we can replace the $O(N^2)$ brutal force search with a tree. In [this paper](), they created a tree structure based on parent-and-children relationship, i.e. a parent triangle can have children triangles that are within it, once a children traingle is made, the parent will be marked as dead and no longer be relevant in the final graph, but still useful in finding which children triangles are relevant for the newest insertion. This is better than $O(N^2)$, since this scales as $O(N\log(N))$ because the tree strucutre helps us narrow down the list of triangles that are relevant. The problem here is the depth of the tree grows quite rapidly, and even the algorithm scales better, it still takes a while to tranverse through it since we have to start from the top. In a general N-dimensional space, each simplex can hold N+1 children, meaning roughly speaking the depth of the tree grows as $\sim M\log_{D+1}(N)$, where $N$ is the number of points and $M$ is the maximum number of simplex a point can be shared. This wastes a lot of computation in checking the dead parents that are not relevant to the actual insertion.
3. Instead of using this top-down tree structure to transverse through the tree, my current solution is to keep a K-D tree holding all the inserted points. When testing a point, then I would find the point in the graph that is closest to the new point, then find all the triangles that shares this point as a vertex point. Starting from there, I go through all neighbors of these triangles and test whether they enclose the new point, if yes, then test their neighbors as well, until none of the triangles enclose the point. This is beneficial compared to the top-down tree, since ultimately we only have to test $N$ trinagles that are indeed in conflict with the new point and their immediate neighbor.

The most difficult part of implementing the serial algorithm is locating the relevant points. Once that is sorted out, the rest of the algorithm is relatively trivial.

## Parallel version

Implementing the parallel version is not conceptually difficuly, and we can in principle reuse many of the infrastructure built in the serial version. The new extra function we need is to given a list of points, find out the order of insertion so we do not insert a pair of new points that are going to modify the same part of data structure. Once that is sorted out, the remaining engineering challenge is more on handling the parallel computing aspect of it.

### Determining which points can be inserted at the same time

Now we are given a bunch of points, we need to figure out what is the order of insertion. If two points are going to modify a common object within the tree, that means they are in-conflitc with each other, so one have to be inserted after another. I iterated through a couple of versions on this again, so in case you want to play the same game of trying to think about how would you find out the ordering, take a minute to make a sketch before you scroll down.

And here are the different iterations I had:
1. Locate which sites each point are in conflict with. Check if there is any intersection between the sites ripped by this point and any other point. If yes, discard the later point in this batch. This is horrible, since this scales O(n^2) with the number of point in a batch, and it wastes computation because we do not insert some points.
2. Create an "occupancy" dictionary of list. For each point, push the id of the point into the entry with key equal to the sites the point is in conflict with. After populating the occupancy dictionary, we will have a dictionary with keys being a particular site id, and the value being all the point in conflict with that site. This is way better, since the construction of the occupancy dictionary is basically O(n). When checking whether a point can be inserted, we just have to check whether the sites and their neighbors contains other point. If not, the point can be safely inserted.
3. While method 2 is better in figuring out which point can be inserted currently, it still waste computation checking for point that cannot be inserted right away. The next come to jesus moment I had was realizing the order of points in the occupancy dictionary can be used to figure out the order insertion. When two points are both in conflict with the same site, it just means we have to insert one after another. So we should be able to figure out independent lines of insertion and run them in parallel. This means we only have to construct the occupancy dictionary once, and figure out the order of insertion (also once), then we just let the insertion runs until finish.

### Multithreading in Julia

Because of my HPC background, the first thing that comes to my mind was how can I distribute the computation across multiple cores. But some more careful thought, this is actually not the best way to parallelize the algorithm. Unlike a typical distributed workload that nodes only communicate at some interface (e.g. if we are simulating a 3D turbulence simulation, the nearby block only talk to each other through their interface.), every newly inserted point essentially need to query the entire graph to figure out where the insertion should be and how to make the new neighbor. Communication cost is usually the biggest overhead in distributed workload, and one can guess distributing a big graph will be an absolute nightmare. So instead of thinking along the line of distributing and communicating, I went the route of staying in one node and multi-threading within a unifed memory environment.

Julia has pretty good out-of-the-box threading support, 

```
Threads.@threads for i in 1:length(vertex)
    updates[i] = make_update(...)
    end
```

## Another way out

A combination of the race condition and the garbage collector makes it quite hard to push for maximum performance in Julia.
For example, the most expensive part of the algorithm is computing the circumsphere of a simplex, which ideally I would want to parallel that part as much as possible.


The problem is not all vertices can be inserted at once because of insertion conflicts. The next best thing I can do is to divide them in batches, with each batch contains only points that are not in conflict with each other, then I can at least parallelize inside each batch. The processing speed of each batch is limited by the slowest update within each batch, since we have to wait until the last update finishes before starting the next batch to avoid conflicts.
Now if every updates within a batch takes about the same time to process, this would not be a big problem. However, the garbage collector seems to like to kick in once in a while and slow down that one particular updates a lot, meaning the runtime is actually domainated by the garbage collector.
This is basically the nail in the coffin that makes me rage switch to rust.

As of writing this paragraph, I actually made the rust version scales amazingly. I am so happy that I switched to rust, and I have become a rust zealot. I will make another blog post going through my experience in refactoring my julia code into rust, and how amazing that experience was.