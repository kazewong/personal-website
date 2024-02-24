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

When I first learned about this issue, I thought to myself, "It's 2024 and you are telling me that we can't process 10^9 points in a reasonable time?". If you are not aware, let me bring your attention to this [Unreal Engine 5 demo](https://youtu.be/qC5KtatMcUw?si=UfkbPzi8aw9wIJOJ&t=86) from **2020**. The can render 10^9 triangles in real time, and I cannot believe we do not have the technology to make a Voronoi diagram for 10^9 points within a couple of minutes in 2024. Beside, I wanted to learn how to make parallized code in Julia for a while, so I figured this could be an opportunity and embarked to this journey of drawing many triangles and tetrahedra.

## Plan of attack 

## Serial version

## Parallel version

## Current state