---
id: 161
title: Web scraping with Node.js
date: 2015-04-30T12:06:46+00:00
author: Fabio D'Elia
layout: post
permalink: /web-scraping-with-nodejs/
image: /wp-content/uploads/2015/04/Typical-orb-web-photo-e1471334919598.jpg
categories:
  - Software stuff
---
The last days I was building a web scraper-app, who get and stores data from sites and from where I can download the data in CSV. I used node.js, express, mongoDB and other packages.
  
Things that surprised me:

  * I used monk as database layer to mongoDB and encountered various problems using queries which I got from their website. I had to mess around a lot only for get-queries. &#8211; But maybe I did something wrong.
  * mongoDB not only being a bit buggy, but also using x*100mb of space for nearly no data &#8211; and no way to fix this
  * Callbacks: They force the programmer to use the result of the higher-order function in the callback. Provides some learning about the scopes of variables, especially if you&#8217;re coming from a getter/setter background. The pro is the asynchronous processing (you can avoid it if necessary, e.g. with npm-async).
  * Goes into the same: Can&#8217;t use my OOP-patterns known from Scala/Java. This may even be good, but the code gets a bit messy.
  * Why, when nearly every thing I do with request, fs etc. is asynchronous, is node.js not build to control processes? It didn&#8217;t bug me till now, but what about bigger computations?
  * Debugging and error messages are not soo helpful, but this too may come from my missing experience.
  * I encountered two major bugs in the first 5/6 hours: This really shouldn&#8217;t happen. There is a workaround for both, but still it took me some googling to find this. (When something doesn&#8217;t work I except that&#8217;s my mistake.)
  * Had to download a npm package to encode an url in windows-1250. Seriously?
  * I didn&#8217;t get the feeling of functional programming like in Scala and Python. The freedom to build things your way is not the same with node.js

Pros

  * I liked express/jade, as far as I used it
  * No need to use semicolon every time. With some exceptions else you encounter errors/flaws. I know it&#8217;s bad style, but I still find it painful to type the semicolon after every statement.
  * I like the npm-cheerio, which provides jQuery for the scraped html. However you can&#8217;t use .prop(), it&#8217;s reported.

What surprised me most: Since when are there in Javascript methods like Array.map(), Array.filter(), iterators etc.? There are even trying to introduce abstract function with &#8220;=>&#8221; and destructuring assignment (both still experimental). Javascript is becoming a real language. No more need to alter the DOM for short and readable code.

To summarise: There are two kind of things, the ones that work and the others that don&#8217;t. The things that work, are fast and easy to use, the others need workarounds and a lot of googling&#8230; I don&#8217;t know. It doesn&#8217;t really feel grown-up? I&#8217;m missing consistency and the implementation is still not as intuitive as it should feel (at least to me). But this may get better.

Don&#8217;t forget that I wouldn&#8217;t call me an expert in these things.