---
layout: page
title: Blog
permalink: /blog/
weight: 1
---


<p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | relative_url }}">via RSS</a></p>
  
<ul class="post-list">
{% for post in site.posts %}
  <li>
    {% assign date_format = site.minima.date_format | default: "%-d. %b %Y" %}
    <span class="post-meta">{{ post.date | date: date_format }}</span>

    <h5>
      <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
    </h5>
  </li>
{% endfor %}
</ul>

