---
title: "Making GPU accelerated web apps with Rust, wgpu and yew"
date: "12-02-2024"
tags: ["rust", "wasm", "wgpu", "yew"]
shortDescription: "My new year project - drawing a triangle with Rust, wgpu and yew"
---

# Background story
In December 2022, I heard about rust for the first time, and I did my advent-of-code challenge that year in rust. After the challenge, I never encountered situation I would want to write rust, until December 24 2023. After I heard about webassembly (WASM) and the wonder it can do, I abandoned my AOC challenge in Julia on December 25 and dived head first into rust and WASM.

WASM basically allows one to ship a compiled binary to the web, and run it on the client's browser. No server needed. This is great since **I don't need to worry about server going down as an end user, and I don't need to worry about dependencies or installation issues as a developer.** As long as the user has a brower, they can run the program with almost native performance. This is great for many scientific applications, remember how many time you need to factorize a large number to see whether it is prime in a party? This gets you covered.

WGPU is a library in rust that allows devs to write close-to-metal GPU accelerated code in rust. Now with this trinity forces, I can actually write some pretty intense computation that runs on the client's browser. **Written in rust, compiled to WASM, runs on the client's browser and uses GPU if available**. This is the new definition of awesomeness for me.

The goal of this post is to document my jouney to making [this template repo](https://github.com/kazewong/wgpu_yew_template), which combines rust, wgpu and yew to make a simple web app that draws a triangle on the screen. This is a very simple example, but it provides the scaffolding on building a web app with this tech stack. As Einstein once said, "If you can draw a triangle, you can do an N-body simulation on a GPU".

# Setting up a Yew project

# Adding wgpu

# Linking with Yew

# Drawing a triangle

# Useful pages
- [wgpu](https://docs.rs/wgpu/latest/wgpu/)
- [wgpu tutorial](https://sotrh.github.io/learn-wgpu/#what-is-wgpu)
- [nbodysim](https://github.com/simbleau/nbody-wasm-sim)
- [winit](https://github.com/rust-windowing/winit)
- [wasm-bindgen](https://rustwasm.github.io/docs/wasm-bindgen/)
- [yew](https://yew.rs/)

The API of these packages change quite rapidly, so it is better to take the spiritual essence of the tutorial and reimplement it with the latest versions of the packages, instead of trying to follow the tutorial step by step.

One can find many holy wars on the internet about "Why rust?", "Why webassembly?", "Why Yew?" and die in the glorious battles. I am not religious about these things, I pick them simply because they sound cool, arefun to learn, and they suits my way of thinking. In particular, once I try Yew for a bit, it is so much better a developer experience than javascript, since I get to write rust, and that somehow allow me to think more like how I would solve a scientific problem, instead of just finding solution on the internet and copy-pasting them.
