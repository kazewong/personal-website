---
title: "flowMC"
date: "03-12-2023"
tags: ["flowMC", "bayesian", "inference", "MCMC"]
shortDescription: "Basic working principle behind flowMC"
---

# flowMC is my baby

I often do not like my own creation too much, especially when it comes to papers. 

# Basic of MCMC

Before we go into Markov Chain Monte Carlo (MCMC), we can first understand the problem better with just Monte Carlo. The classical example is to compute $$\pi$$ with a dart board: say I give you a dart board in a square shape inscribing a circle and infinite amount of darts, how would you compute $\pi$ using only the dart board and darts? The canonical way to answer the question is you **randomly** throw darts onto the dartboards, count the number of darts that hit the circle, divide by the total number of dart thrown (excluding the ones that miss the board) and multiply by 4, then you should have an estimate of $\pi$, i.e. $\tilde{\pi} \sim 4 \frac{N_{cicrle}}{N_{total}}$. This should be reasonably intuitive, since your are randomly throwing the darts, the ratio of the propbability of landing in the circle to landing on the board is propotional to the ratio of the area of the circle to the area of the board. The darts "sample" the area for us, and we use those samples to compute $\pi$

Now throwing an infinite amount of darts is quite exhausting, so usually we don't do that. While it might possible to do that in a 2-dimensional problem, it gets harder and harder as we increase the dimensionality of the problem. If "curse of dimensionality" popped up in your head, you are on the right track, but to make sure you understand what does that means, take a second to think about why "curse of dimensionality" makes this harder in high dimension before you scroll down. "Curse of dimensionality" could makes things difficult in different ways, sometime it introduces geometrically many new parameters, sometimes it introduces complicated structures into the probelms.

The reason here is the volume of a n-ball is exponentially smaller in a high dimension, that is to say you are more likely to hit the dartboard but not the circle. This is a problem since we only gain information about $\pi$ when a dart lands on the circle part, having no darts landing in the circle won't give you an accurate measure of $\pi$.

So how do we deal with this? The issue was you were randomly throwing darts, what if we don't throw darts randomly? What if we throw darts targeting the circle, shouldn't that be great? Not quite either, since now our normalization is off. In fact, we should be able to see it takes some "wasted" darts to compute $\pi$ correctly, but hopefully neither too many or too few wasted darts. So far we have explored how Monte Carlo works, and now we are going into MCMC territory.

Instead of randomly

There are many great references on 

# Adaptive proposal with normalizing flow

Now we have seen the proposal kernal plays an essential role in MCMC, the question is can we learn the kernal on-the-fly? And that's the spirit of `flowMC`. The current version of  `flowMC` has two major components to it, a local sampler and a global sampler. The local sampler can be something like a MALA sampler or an HMC sampler. Once the local sampler gerenates certain amount of sample, `flowMC` will train a propsal based on those samples. What this does is using the information gained during the local sampler to build a more efficient sampling proposal. Imagine the target distribution is two Gaussians that are separated, understanding the relatively portion of posterior within each Gaussian requires the chain to jump from one mode to the other. A local kernel will suffer huge ineffiency for this problem, since jumping over the gap between the two modes requires the chain to move into low probability region, which is unlikely. This is compounded by the fact that the variance of the relative portion is proportional to the number of round trips between the two modes, which means not only one needs jump into low probability region, but one has to do it over and over again to have a good estimate of the target. On the other hand, once the chain jump over once, we can start building a proposal that resembles two gaussians. It will not be correctly normalized in the first place, but now there is an express way to go from one mode to another, which can facilitate the reduction of variance.

Another major perk of `flowMC` is the use of accelerators. Because `flowMC` can benefit from more samples during training, running more chains not only helps providing more samples but also help with the burn-in. This means the more chains you run, in principle the faster the convergence. This may not be necessarily true for other sampler such as Hamiltonian Monte Carlo, which the burn-in could be as long as the sampling phase. 

# Pitfalls

`flowMC` is designed to handle problems that have bad geometries, such as multi-modality and local correlation (e.g. a donut), and these problems can be brutally hard. Non-convex global optimization is known to be NP-complete, and if I tell to you there is a general solution, that means I have proven P=NP, which is a much bigger deal then `flowMC`. 

I know (and hope) one day `flowMC` will be replaced something nicer, more performant and flashier. So instead of trying to be the state-of-the-art, I rather position flowMC as a simple baseline.