---
title: 'Setting up a development environment with `Devpod` in `K8s`'
date: '2025-06-30'
tags: ['Kubernetes', 'Devpod', 'DevOps', 'Containerization']
shortDescription: 'Remote containerized development environment with Devpod in Kubernetes'
---

I recently spent a week learning and setting up a `Kubernetes` cluster at home. It was certiainly a pretty difficult project since I feel the `Kubernetes` documentation is more a reference instead of a tutorial.
This means once you have read through everything once, then everything starts to make sense and you will have a good grasp of what are the trade-offs in different setting. However, it was pretty grusome to get there, and I definitely benefitted a lot from gen AI these days.
I am probably going to tear it down and rebuild it once I have finalized the configurations I want, and once I have done that I am definitely writing a blog post about it.

One of the main reasons I wanted to set up a `Kubernetes` cluster is to provide a remote development environment that can spin up containers to serve people around me,
like my students and friends. While it is possible to just stand up a normal server with SSH access, I think it will get out of hands fairly quickly as I include more people from different backgrounds.
People may want different softwares, and I am not a patient enough person who is going to handle their dependencies for them. So I figured it might be a good idea to set up a remote development environment that is containerized so people can just use it like a sandbox environment.

I looked a number of different options, including `Gitpod`, `Code server`, `Coder`, and `Devpod`. Out of all these options, I think `Devpod` matches my taste the most considering it is pretty lightweight, open source, and unopinionated. They also have native integration with `Kubernetes`, which is a plus. The team behind `Devpod`, `Loft`, has a number of products all catered towards `Kubernetes`, so I think they are a good fit for my use case.

In short, `Devpod` is a program you install on your client, say my laptop, and one can choose different providers that is going to either start a development container on the local machine or on a remote server. Once the container is started, `Devpod` will automatically connect to the container through an IDE. Oh also, `Devpod` supports `Zed`, which is an IDE that I am using more and more, so that's another reason I chose `Devpod` over others.

My setting involves two main components mainly: the client which `Devpod` is installed, and the `Kubernetes` cluster providers. While setting within `Devpod` is fairly straight forwad, the `Devpod` documentation left out the important part about how to connect the client to the `Kubernetes` cluster. They had one section mentioning "Oh by the way in real life you may want to do things this way" without further elaboration. To be fair, it is more I don't know enough about `Kubernetes`, but I think at least pointing to a guide on how to remotely access a `Kubernetes` cluster would have saved me a lot of headache. Anyway, here are the steps I took to set up `Devpod` in `Kubernetes`:

1. Install `kubectl` on the client, then make a `kubeconfig` file that points to the `Kubernetes` cluster. This is usually located at `~/.kube/config`. One may needs a couple of ingredients in that file, mainly the ip address and port (or domain name if you have configured that), and the certificate files for HTTPS. You can test if the connection works by running `kubectl get nodes` and see if it returns the nodes in the cluster.
2. Install `Devpod` on the client. I am a big `Fedora Silverblue` user, which sometimes it can be a foot-gun to install things. `Devpod` is one example, the `Flatpak` version is not working very well for me, so instead of using `Flatpak`, I booted in `arch linux` with `distrobox` and installed `Devpod` there. Once that is setup, I can run everything within the `distrobox`.
3. Once I had both `Devpod` and `kubectl` working, the last step is to choose `Kubernetes` as the provider in `Devpod`. Then I was able to launch a workspace that spins up a pod on my `Kubernetes` cluster and see an IDE window popping up on my client.

I scratched my head quite a lot during the process, but once I got it going, the steps it took to get `Devpod` going is actually quite simple. `Devpod` handles the namespace creation and image pulling for me, which was pretty nice so I really don't have to configure anything on the `Kubernetes` side. The next thing I want to try is `Loft`'s another tool, `vclustter`, which basically create virtual clusters on top of the physical cluster so multiple teams can leverage the same physical cluster without stepping on each other's toes. If you don't have a `Kubernetes` cluster set up at home, you can still use `Devpod` with `docker` which will spin up containers locally. Despite being relatively new, I think `Devpod` is pretty good overall and I will definitely recommend it, especially when there are more documentations and YouTube videos about it.
