---
id: 241
title: 'Build a 3x3 LED matrix and spot the ISS'
date: 2016-07-21T23:27:23+00:00
author: Fabio D'Elia
layout: post
guid: http://fabiodelia.com/?p=241
permalink: /build-a-3x3-led-matrix-and-spot-the-iss/
ampforwp_custom_content_editor:
  - ""
ampforwp_custom_content_editor_checkbox:
  - null
ampforwp-amp-on-off:
  - default
categories:
  - Projects
---
When I was young I used to have a telescope. With that and viewing tables I used to look at planets and stars. Somehow I missed to ever look at a satellite or the ISS. I wanted to catch up for that.

My idea: I wanted a physical device which should display the position of the ISS over long periods without lag. I thought about buying a LCD or professional LED matrix, but me poor student and so I planned to build a simple LED matrix myself (which is much cheaper, even if it doesn&#8217;t look that good). I bought LEDs and stuff to use it with my Raspberry Pi.

The circuit is basic stuff: I used a MCP23008 expander to get more pins. Connected the LEDs to the power, using 300 Ohm resistors on the plus side.

The script is basic too: I used an [API](http://open-notify.org/) which was built for the one purpose to get the position of the ISS every x seconds.

<iframe width="560" height="315" src="https://www.youtube.com/embed/fZMbQcLMX4w" frameborder="0" allowfullscreen></iframe>

The LEDs act like a compass: One shows to north. After calculating the bearing between the ISS and my position the LED showing into that direction blinks. As the ISS approaches the LED blinks faster and if the ISS is pretty near (< 500 km away) the LED in the middle starts blinking too. I built five &#8220;distance levels&#8221; into it (with blinking faster and steady etc.).

When I was testing the LED matrix I made an interesting mistake: When you look at a map, north is on the top. Now let&#8217;s say you have a map like this one:

[<img class="alignnone wp-image-275 size-large" src="/wp-content/uploads/2016/07/Untitled2-1024x621.png" alt="Untitled2" width="640" height="388" srcset="/wp-content/uploads/2016/07/Untitled2-1024x621.png 1024w, /wp-content/uploads/2016/07/Untitled2-300x182.png 300w, /wp-content/uploads/2016/07/Untitled2-768x466.png 768w, /wp-content/uploads/2016/07/Untitled2.png 1502w" sizes="(max-width: 640px) 100vw, 640px" />](/wp-content/uploads/2016/07/Untitled2.png)

Where is north for north america on this map? Where is north for africa or asia? You have to consider that the earth is round. When a map is drawed, the topography of the 3D-earth has to put down to a 2D-surface. This means that the surface of the world gets distorted. The effect is maximal in the north and south and minimal on the equator. That&#8217;s why the shapes of the countries are &#8220;wrong&#8221; on most world maps: For example Canada and Russia look bigger than they are. And that&#8217;s why long-haul aircrafts don&#8217;t fly straight lines on a 2D-map (a straight line on 2D-map is not the shortest path on a 3D-globe, and planes consider weather dynamics). Just google &#8220;<a href="https://www.google.com/search?q=world+map+distortion" target="_blank">world map distortion</a>&#8221; and click through the links or images.

In the image above for every point on the map north is at the top **center**. It took me about an hour to understand this. It&#8217;s important to consider it whenever you work with 2D/3D transitions. 

Till now, whenever the ISS was crossing our location in the dark and I accidentally saw it on my matrix, it was cloudy. That&#8217;s Switzerland.

The [python script](https://github.com/fdelia/raspberry-backup/blob/master/ISSwhere.py) is on Github.