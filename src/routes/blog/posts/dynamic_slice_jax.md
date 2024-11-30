---
title: "Dynamic slice in JAX"
date: "2024-11-30"
tags: ["Jax", "python", "snippet","tutorial"]
shortDescription: "Indexing and updating a traced array in jax"
---

# Basic slicing in Jax

If you have a jax array you want update the value, instead of using the normal numpy way of

`array[index] = new_value`

You have to use the `at` method in jax

`array = array.at[index].set_value(new_value)`

However, if you are trying to update a slice of the array with the normal `at` method, say the following, 

`array = array.at[index: index+1].set_value(new_value)`

you may run into the following error:

`IndexError: Array slice indices must have static start/stop/step to be used with NumPy indexing syntax. Found slice(Traced<ShapedArray(int32[], weak_type=True)>with<DynamicJaxprTrace(level=1/0)>, Traced<ShapedArray(int32[], weak_type=True)>with<DynamicJaxprTrace(level=1/0)>, None). To index a statically sized array at a dynamic position, try lax.dynamic_slice/dynamic_update_slice (JAX does not support dynamically sized arrays within JIT compiled functions).`

# Dynamic slicing in Jax

To update a slice of the array, you have to use the `lax.dynamic_update_slice` method in jax. Here is an example of how you can update a slice of the array:

```python
array = jnp.zeros(10)

@jax.jit
def update_slice(array, index, new_value):
    return jax.lax.dynamic_update_slice(array, new_value, (index,))

array = update_slice(array, 3, jnp.array([1.]))
```

There is also a convenient method `lax.dynamic_update_slice_in_dim` if you want to update a slice in a specific dimension. Here is an example of how you can update a slice in the first dimension of the array:

```python

array = jnp.zeros((10,2))

@jax.jit
def update_slice(array, index, new_value):
    return jax.lax.dynamic_update_slice_in_dim(array, new_value, index, 0)

array = update_slice(array, 3, jnp.array([[1.,2.]]))
```

This is useful when you modify some values in an array which you do not where it is in ahead of time.

# Use cases and Caveats

I encountered this issue when I was trying to write an optimizer in jax, which requires me to swap some numbers in and out of an array. This may also be useful down the road for my research in building an adaptive mesh refinement solver for PDEs in Jax. While Jax doesn't support dynamic allocation, as long as the slice of the array does not change its size, this should be a way to mutate the values of an array. There is also a sister operation in Jax called `jax.lax.dynamic_index_in_dim` which is useful if you want to index instead of slice.

The caveat here is one may wants to do the following to get the slice of the array:

`jax.lax.dynamic_slice(array, start_index, slice_size)`

where `slice_size` is also a run time value. I think Jax won't like this very much, since now the shape of the object is runtime determined. In this case, the best bet you have is probably make the `slice_size` a static value, which means you will recompile the function every time you want to change the size of the slice. This is not ideal, but it is what it is.