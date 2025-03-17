---
title: "Multi-camera system for high jump"
date: "2025-03-13"
tags: ["High Jump", "computer vision", "raspberry pi", "data science"]
shortDescription: "High fps ip camera system"
---

Video analysis is extremely important for optimizing the technique in High Jump. Hearing the coach saying certainly cue could be useful, but translating the words from someone's mouth to the body movement is not always easy. Seeing my own mistakes give me way more information than hearing it from someone else.

I have recorded many videos about my own jump since I restarted high jumping in 2021. However, footage from a single point of view can only catch a limited amount of information, say the take-off angle or the rhythm of the run-up, but usually not both. **Being able to see the jump from multiple angles** would be a game-changer for me.

To achieve this, I have been setting up **a multi-camera system** that I can deploy in the field to fully capture my jumps. Based on the specific requirement from high jump, here is a list of features that I want to have in the system:

1. **High fps**: The system should be able to capture at least close to 60fps to capture the fast movement of the jump.
2. **Easy to set up**: The system should be easy to set up and deploy in the field.
3. **Relatively inexpensive**: The system should be relatively inexpensive so that I can afford it.
4. **Controllable and programmable**: The system should be controllable and programmable so that I can customize it to my needs.

The solution I found online may satisfy some of this requirement, but not all. For example, ip security cameras usually do not offer high enough fps since that is not needed for home security. 15 fps is plenty for detecting a burglar, and high end ip cameras are just to expensive. There are solution like Vicon or Optitrack, but first they are way too expensive, and second they are not easy to set up and deploy in the field.

Ultimately, I decided to go with **Raspberry Pi** and **Raspberry Pi Camera Module**. They are inexpensive, programmable, and can in principle reach 120 fps. They also offers wireless capability, meaning I don't need to pull wires, which is a huge plus considering I am not only the technician but also the athletes, so the shorter the set up time the better it is. On top of Raspberry Pis, I have an old laptop which I can use as a server to control the Raspberry Pis, so I can control all the cameras from one place as well as checking my jumps.

After a couple iteration, here is the part list of one unit of the system:
1. A raspberry pi 5 2GB ($50 USD)
2. A raspberry pi camera module 3 ($25 USD)
3. A 64GB micro SD card ($5 USD)
4. Anker NANO power bank ($29 USD)
5. A 3D printed case
6. A mount (~$20USD)

Here is how a unit looks like:
<div style="display: flex; justify-content: center;">
<img src="https://i.postimg.cc/90DRGyG0/20250310-141425.jpg" alt="A unit of the multi-camera system" />
</div>

The total cost of one unit is around $130 USD. I have 3 of these units now, and here is a frame I extracted from a jump I did during the beta testing *Note that actual videos are 1080p.

<div style="display: flex; justify-content: center;">
<img src="https://i.postimg.cc/K4XDYtjX/image.png" alt="A frame from a jump" />
</div>

Dealing with dynamic condition such as backlighting is certainly something to work on, but so far it is operational. The frontend for the laptop is available at [here](https://github.com/SendKazetoOlympics/camerasystem_control_station) and the flask server for the Raspberry Pi is available at [here](https://github.com/SendKazetoOlympics/camerasystem_endpoint)
