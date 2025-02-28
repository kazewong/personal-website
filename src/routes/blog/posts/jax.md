---
title: 'Anti patterns in JAX'
date: '2023-12-03'
tags: ['jax', 'python']
shortDescription: 'Common antipatterns in JAX'
---

Coding in Jax is fairly straight forward, as advertised on their [github repo](https://github.com/google/jax).

However, thinking in Jax takes quite a bit of suffering to get used to. Here are some common antipatterns I have come across while coding in Jax.

## For-loops

Let say I have some function I want to loop over

```python
def many_f(x):
    for i in range(100):
        x = f(x)
    return x
```

## In-place replacement

##
