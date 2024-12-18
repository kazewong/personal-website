---
title: "Trying Grain, a data loader for Jax"
date: "2024-12-18"
tags: ["Jax", "python", "snippet", "tutorial", "grain"]
shortDescription: "Data loader for Jax"
---

Even though I use `jax` for training my neural networks, I have been using `pytorch` for loading my data, as it was recommended on the `jax` documentation. Recently, I learned about `grain`, a data loader built for data loading for `jax`. Despite it is still at its early day, I decided to give it a try.

The documentation is still pretty primitive (As of version 0.2.2), especially on their getting started page, they only favour Google's infrastructure for data loading such as `ArrayRecord` and `TFDS`. `ArrayRecord` doesn't seem to have any documentation, and the last release is about a year ago at this point (Oct 30, 2024), so it doesn't sound like a good option to me. And I hate anything related to `tensorflow` with a passion, so not that either. After some digging, they do have way to define a custom data loader, here is what I cooked up for loading CIFAR10 dataset:

```python
import tarfile
import requests
import pickle
import grain.python as grain
from jaxtyping import Int, Array
import jax.numpy as jnp

class CIFAR10DataSource(grain.RandomAccessDataSource):

    def read_cifar(self, path: str) -> tuple[Int[Array, "50000 3 32 32"], Int[Array, "50000 10"]]:
        inputs = []
        labels = []
        for i in range(1, 6):
            with open(path+'data_batch_'+str(i), 'rb') as f:
                data = pickle.load(f, encoding='bytes')
                inputs.append(jnp.array(data[b'data']))
                labels.append(jnp.array(data[b'labels']))
        
        return jnp.concatenate(inputs).reshape(-1, 3, 32, 32), jnp.concatenate(labels)

    def __init__(self, data_dir: str = 'data/'):
        super().__init__()
        try:
            self.data = self.read_cifar(data_dir + 'cifar-10-batches-py/')
        except FileNotFoundError:
            print('Downloading CIFAR-10 dataset...')
            url = 'https://www.cs.toronto.edu/~kriz/cifar-10-python.tar.gz'
            r = requests.get(url)
            with open(data_dir+'cifar-10-python.tar.gz', 'wb') as f:
                f.write(r.content)
            with tarfile.open(data_dir+'cifar-10-python.tar.gz') as tar:
                tar.extractall(data_dir)
            self.data = self.read_cifar(data_dir + 'cifar-10-batches-py/')

    def __getitem__(self, idx):
        return self.data[idx]
    
    def __len__(self):
        return len(self.data)
```

This is pretty similar to `PyTorch`, but unlike `PyTorch`, you can/have to define your own shuffling and sampler. Taking an example from the documentation

```python
index_sampler = grain.IndexSampler(
    num_records=5,
    num_epochs=2,
    shard_options=grain.ShardOptions(
        shard_index=0, shard_count=1, drop_remainder=True),
    shuffle=True,
    seed=0)

data_loader = grain.DataLoader(
    data_source=source,
    operations=transformations,
    sampler=index_sampler,
    worker_count=0)
```

I kind of like to have fine-grain control over my code, so I like more explicit approach like this. Haven't benchmark this yet, so I will probably write that into the next blog
