---
id: 233
title: A drone following my hand
date: 2016-08-02T08:10:43+00:00
author: Fabio D'Elia
layout: post
permalink: /a-drone-following-my-hand/
categories:
  - Projects
---
### An overview

Some time ago I bought a parrot AR drone 2.0 and thought I would be nice to make it more autonomous. The idea came from this guys who made a drone following a trail ([paper](http://ieeexplore.ieee.org/xpl/articleDetails.jsp?arnumber=7358076), [youtube](https://www.youtube.com/watch?v=umRdt3zGgpU)) and from having a dog. Since the drone doesn’t have much sensors, I’d have to do the most out of it’s front camera.

[<img class="alignnone wp-image-263 size-large" src="/wp-content/uploads/2016/07/IMG_4264-copy-1024x768.jpg" alt="IMG_4264 copy" width="640" height="480" srcset="/wp-content/uploads/2016/07/IMG_4264-copy-1024x768.jpg 1024w, /wp-content/uploads/2016/07/IMG_4264-copy-300x225.jpg 300w, /wp-content/uploads/2016/07/IMG_4264-copy-768x576.jpg 768w, /wp-content/uploads/2016/07/IMG_4264-copy-285x214.jpg 285w" sizes="(max-width: 640px) 100vw, 640px" />](/wp-content/uploads/2016/07/IMG_4264-copy.jpg)

I thought: How about making the drone follow my hand? Hand recognition is something established, isn’t it?

I started to research about hand recognition. But most ways of doing it, didn’t come up to my expectations. The camera should recognise the hand independent from the background, under bad light conditions, not recognise the face or hands not facing the camera. This should all be very fluent and on top of that not use too much computational power.

Things that I had to lay aside:

  * Background subtraction: The background changes.
  * Looking for skin color tones or something like that: Under bad light conditions the hand becomes gray or darker. Especially if the cam is held against light. It’s a cheap cam.
  * Cascading classifiers: I think it would work, at least what I could achieve with the OpenCV2 haar classifier so far. It’s just that the training takes too long (at least several hours, sadly I don’t have a NVIDIA GPU and OpenCL is slower than the CPU), what makes it hard to correct the image data set. Actually it does good work with distinguishing the face from the hand, but often didn’t recognise anything at all (early stage training). Maybe I was too impatient.

It came down to convolutional neural networks. I was aware that localisation of an object in an image is still being researched, but the sliding window technique seemed promising. Basically it&#8217;s a trick to break the localisation problem down to a classification problem.

I produced several thousands of images from video and classified them by hand using a helping tool I built. Some images had a hand on them, others not. It was important the have images of the hand in a lot of situations, especially different light conditions (during the day, evening, with artificial lightning) or against a light source. For every image I saved where the hand is (middle of the palm as x/y coords) or that there is no hand.

Example pictures from the image database (with a hand):

[<img class="alignnone size-full wp-image-265" src="/wp-content/uploads/2016/07/img_14.4.11.121.png" alt="img_14.4.11.121" width="128" height="72" />](/wp-content/uploads/2016/07/img_14.4.11.121.png)[<img class="alignnone size-full wp-image-266" src="/wp-content/uploads/2016/07/img_14.4.14.134.png" alt="img_14.4.14.134" width="128" height="72" />](/wp-content/uploads/2016/07/img_14.4.14.134.png)[<img class="alignnone size-full wp-image-267" src="/wp-content/uploads/2016/07/img_14.4.33.255.png" alt="img_14.4.33.255" width="128" height="72" />](/wp-content/uploads/2016/07/img_14.4.33.255.png)

Labeling tool (you just click on the hand or press space if there is none; it&#8217;s possible to label about 2 images / sec with it):

[<img class="alignnone wp-image-268 size-large" src="/wp-content/uploads/2016/07/crop-1024x758.png" alt="crop" width="640" height="474" srcset="/wp-content/uploads/2016/07/crop-1024x758.png 1024w, /wp-content/uploads/2016/07/crop-300x222.png 300w, /wp-content/uploads/2016/07/crop-768x569.png 768w" sizes="(max-width: 640px) 100vw, 640px" />](/wp-content/uploads/2016/07/crop.png)

I resized the pictures to 128 x 72 pixels. From these images I cropped 40 x 40 parts with a hand or no hand in it for training. I started with the [FANN library](http://leenissen.dk/fann/wp/), but always run into an overfitting problem. It also seemed that library was not really up to date. So I switched to [tensorflow](https://www.tensorflow.org/) which comes from the Google&#8217;s Machine Intelligence research organization. The start was a bit rough, but in the end it worked: It has an algorithm which changes the learning rate accordingly to the validation error and so prevents overfitting. It worked pretty well.

<iframe width="560" height="315" src="https://www.youtube.com/embed/iG5Qvjiwyy8" frameborder="0" allowfullscreen></iframe>

Now I still need to make more pictures for gestures and write the flight controller. I already started the work on recognising gestures; it works halfway-ok by now. I need much more pictures with different gestures. And then I need some hours in a place where I can test my drone since it tends to crash badly in my flat.

I don&#8217;t know yet when I&#8217;ll have time to get back to this, but I hope to finish and make a video about it.

[Here](https://github.com/fdelia/drone-follows-me) is the Github repository with my messy code (but none of the images).

* * *

An example on how accurately the algorithm is (you can see on what kind of hand gesture it was trained):

<iframe width="560" height="315" src="https://www.youtube.com/embed/jl3nj9sHRac" frameborder="0" allowfullscreen></iframe>

