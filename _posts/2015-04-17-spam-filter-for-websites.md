---
id: 24
title: Spam-filter for websites
date: 2015-04-17T22:06:26+00:00
author: Fabio D'Elia
layout: post
permalink: /spam-filter-for-websites/
image: /wp-content/uploads/2015/04/screen-shot-2015-04-18-at-09-52-58-e1429438422131.png
categories:
  - Projects
---
Since I felt a bit ill tonight, I stayed at home and fiddled around with naive Bayes classifiers for spam filters ([wiki](http://en.wikipedia.org/wiki/Naive_Bayes_spam_filtering)). I had the idea that it should be possible to build a greasemonkey/tampermonkey script which removes (or greys out) all the unwanted and attention seeking stuff in the internet besides ads. Things like &#8220;related&#8221;-stuff, &#8220;you also like&#8221;, news which are not really news and all that unrelated content, maybe it could be expanded to trolls in forums. I thought about a filter based on the text and html-classes which classifies the content as spam or not.

As a first try I built a filter for a community where some users are known to spam with sexist or rude content. This is the formula of the classifier (it&#8217;s actually [this one](http://en.wikipedia.org/wiki/Naive_Bayes_spam_filtering#Combining_individual_probabilities) from the wiki article):

[<img class="alignnone wp-image-57" src="/wp-content/uploads/2015/04/untitled.png" alt="Untitled" width="550" srcset="/wp-content/uploads/2015/04/untitled.png 1010w, /wp-content/uploads/2015/04/untitled-300x236.png 300w" sizes="(max-width: 1010px) 100vw, 1010px" />](/wp-content/uploads/2015/04/untitled.png)[
  
](https://fabiodelia.files.wordpress.com/2015/04/screen-shot-2015-04-17-at-23-56-39.png) <a style="color: #000000;" href="https://fabiodelia.files.wordpress.com/2015/04/screen-shot-2015-04-17-at-23-56-39.png">(</a>As a picture, since I found it to be more clearly arranged than pasted code.
  
wordsSPAM[word] is the occurrence of the word in the spam-bucket; wordsNOT is the non-spam-bucket.)

Here are some screenshots of the result: All you can see is the rating of the posts (where the time is displayed), higher % means it&#8217;s rather spam, and if a post is in the spam- or nonspam-bucket. After setting about 10 posts as spam/nonspam, the classifier already starts to do interesting stuff, however there are still false negatives and positives.
  
The handling is as known from e-mail: alt-click on a post sets it as nonspam, alt-shift-click as spam. The setting of a post overrides any classification. I&#8217;m looking forward to fill the buckets and see what&#8217;s going to happen. (The community is [www.spocal.net](http://www.spocal.net), &#8211; I only made the opacity of the posts and the text in brackets, the rest is their work.)

[
  
](/wp-content/uploads/2015/04/screen-shot-2015-04-17-at-23-42-12.png) 

[<img class="alignnone size-large wp-image-68" src="/wp-content/uploads/2015/04/screen-shot-2015-04-18-at-16-06-43.png?w=660" alt="Screen Shot 2015-04-18 at 16.06.43" width="660" height="787" srcset="/wp-content/uploads/2015/04/screen-shot-2015-04-18-at-16-06-43.png 1904w, /wp-content/uploads/2015/04/screen-shot-2015-04-18-at-16-06-43-252x300.png 252w, /wp-content/uploads/2015/04/screen-shot-2015-04-18-at-16-06-43-859x1024.png 859w" sizes="(max-width: 660px) 100vw, 660px" />](/wp-content/uploads/2015/04/screen-shot-2015-04-18-at-16-06-43.png)

[<img class="alignnone size-large wp-image-69" src="/wp-content/uploads/2015/04/screen-shot-2015-04-18-at-16-06-54.png?w=660" alt="Screen Shot 2015-04-18 at 16.06.54" width="660" height="787" srcset="/wp-content/uploads/2015/04/screen-shot-2015-04-18-at-16-06-54.png 1904w, /wp-content/uploads/2015/04/screen-shot-2015-04-18-at-16-06-54-252x300.png 252w, /wp-content/uploads/2015/04/screen-shot-2015-04-18-at-16-06-54-859x1024.png 859w" sizes="(max-width: 660px) 100vw, 660px" />](/wp-content/uploads/2015/04/screen-shot-2015-04-18-at-16-06-54.png)[<img class="alignnone size-large wp-image-70" src="/wp-content/uploads/2015/04/screen-shot-2015-04-18-at-16-07-01.png?w=660" alt="Screen Shot 2015-04-18 at 16.07.01" width="660" height="787" srcset="/wp-content/uploads/2015/04/screen-shot-2015-04-18-at-16-07-01.png 1904w, /wp-content/uploads/2015/04/screen-shot-2015-04-18-at-16-07-01-252x300.png 252w, /wp-content/uploads/2015/04/screen-shot-2015-04-18-at-16-07-01-859x1024.png 859w" sizes="(max-width: 660px) 100vw, 660px" />](/wp-content/uploads/2015/04/screen-shot-2015-04-18-at-16-07-01.png)

However, there are some problems&#8230; I&#8217;ll write about them later. (Gary Dusbabek uses a slightly better approach [here](http://www.dusbabek.org/~garyd/bayes/), avoiding one of the problems &#8211; it&#8217;s the same theory though.)