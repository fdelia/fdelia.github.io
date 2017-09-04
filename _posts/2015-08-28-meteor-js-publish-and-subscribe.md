---
id: 212
title: Meteor.Js publish and subscribe
date: 2015-08-28T15:04:42+00:00
author: Fabio D'Elia
layout: post
permalink: /meteor-js-publish-and-subscribe/
image: /wp-content/uploads/2015/08/og-image-logo.png
categories:
  - Software stuff
---
TLDR: Read the f\*** manual.
  
<span style="color: #880000;">I didn&#8217;t read the meteor docs carefully enough: Not all published rows are sent to the client, only the needed ones. See *<a style="color: #ff0000;" href="http://www.meteorpedia.com/read/Understanding_Meteor_Publish_and_Subscribe">here</a>* for further explanations.<br /> This answers my questions from this post.</span>

I spent some hours working with MeteorJs and AngularJs. One of the big advantages of MeteorJs should be the publish/subscribe-schema. But I have my problems with it.

I had this case and thought long about how to solve it:
  
Social app where an user can write posts on a public stream. Other (or the same) user can comment and like the post and like comments. The stream view is limited to 10 posts and loads more when the user scrolls down.

### What is going to be published?

(only concerning posts, comments and likes)

**Public stream**

  * last 10 posts
  * all comments from this last 10 posts
  * all likes from this last 10 posts and from the comments

So I already implement relational logic on the server (to publish the right things) and again on the view. _I don&#8217;t want to publish all data_ since after some time it will be too much (or am I missing something?).

**Look at a post**

  * Same as above but for one post only

Same problem as above but now we have an post-id as argument instead of limit/skip.

You can think of more views&#8230; and it&#8217;ll get more complicated.

Now why don&#8217;t use a classical api where you &#8220;get post with id x&#8221; or &#8220;get last x posts&#8221;. One api-route usually corresponds to a view and you get all the data from it (or you can implement it differently). Still the MeteorJs solution with publish/subscribe is more complicated and more messy in my opinion. I must have missed the point for the publish/sub model unless one wants to build small applications&#8230;