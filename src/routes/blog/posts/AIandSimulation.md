---
title: 'Why should we train AI on simulations?'
date: '2025-05-27'
tags: ['Machine learning', 'Simulation']
shortDescription: 'Some thoughts on emulator'
---

**Disclaimer: this is not rigourous argument by any mean. I wrote this toward the end of a 15 hours flight from Hong Kong to New York City without internet, so I was tire and can't look things up to validate my claims. This is more I finally to decide to start writing down some of my thoughts on AI for simulations, mostly out of boredom**

A decent number of my friends in physics are interested in using AI and machine learning techniques, and I dabbled with applying machine learning techniques to making physical simulations better during the later part of my PhD study and early part of my postdoc at the Flatiron Insitute. Unfortunately, none of my ideas work (until a proof of concept finally came around in 2024), so I have developed a potentially unfairly biased view of applying ML to physical simulations. Still, the more I talked to people who share a similar journey (and many of them actually make productive progress in the field.), the more I find some of the following thoughts are quite common. Here are some problems on AI/ML for simulations in my opinion, and what could be productive directions of research in this domain. In particular, I am mostly refering to emulator kind of studies.

## Problem 1 - What do we stand to gain?

A very common setting for applying ML to simulations is to build an emulator. Given an expensive code for simulation, generate a bank of simulations covering some parameter space, then train a neural network to "emulate" the simulation without paying the hefty cost. Coming from a ML perspective, the papers on this topics are doing a great jobs in presenting their results: quote some numbers about how close the emulator can get to "unseen" simulation and claiming their work have improved the run time by 1000 folds at least.

My issue with these kind of studies is it is never clear to me how exactly they want to use the simulations. A vast majority of these works do not generalize to domain where a solution could be vastly different from the training set. If this is the case, what do we learn from the generated simulations?

## Problem 2 - Accuracy and convergence

Another problem with machine learning methods are the lack of accuracy and convergence gauruntees. In a simulation, at least the hope is if I just put infinite amount of computational resource into a simulation it should give me a close approximation of the ground truth, such as scaling in resolution. I haven't seen such scaling in ML methods, without a convergence measure, there is really no reason why I should trust a solution generated with ML methods.

One may argue "ML methods scale with data". While this claim is not necessarily wrong, it is quite an non-argument. The data used to train the ML methods are generated using the simulations, so first, one needs to find a simulation code that can generate the new data, which brings us back to problem 1. Secondly, this data scaling is only on training time, but the convergence measure in traditional simulations are often test time measures. In order to generalize and learn new insights from simulation, such test time scaling is irreplaceble.

## Problem 3 - Holes in the solution space

This is probably my favorite argument against black box emulator these days: forget about generalization and going outside the training parameter space, there is actually no gauruntee a trained emulator is even safe without the parameter space, at least not without some knowledge on the smoothness of the solutions space. Resonance system are clear examples, there could be peaks or even singularity in the parameter space. How do we ever be sure our emulator can correctly pick up these holes and peaks, which are often quite interesting from a physics point of views?

# So, is ML useless?

I do think ML can be useful in simulations, and there has been great working examples in the wild. The biggest issue is these results are usually more realistic, so instead of claiming their work have sped up a simulations by 1000 times, perhaps they may speed up by 50%, which is a huge achievment! But obviously these more realistic results get overshadowed by dreamy studies. Here are some directions I think are worthy looking into.

## Design problems

When I wrote the "What can emulator do?" section, I do have some answers in mind. In particular, I think a major benefit of having an emulator is the possibility of differentiating through the simulation. While it is possible to write a first principle simulation that is differentiable these days thanks for libraries like PyTorch and Jax, it is often demands a lot of human resource and development time. An emulator that is close enough can be very handy if one wants to design something with some constraints.

## Hybrid simulation

A problem that is near and dear to my heart is compact binary simulations in numerical relativity (NR). NR simulations are increadbly complicated and expansive to simulation, and various groups spend hundreds of millions of CPU hours to get several thousands of these simulations. In a typical simulation, there could be $$\sim10^9$$ grid points used in one simulate. But in the end, the system are quite simple, it is two balls with some waves! Clearly we don't need $$10^9$$ numbers to describe the system. The fact that there are human-produced reduced representation of the system such as effective one body approach suggests these is at least some reduced representation of the system that can be learned. The question is, can we build such a system that can learn a reduced representation from this seemingly complicate set of equations? If yes, we can probably speed up the simulation by a lot without sacraficing accuracy.
