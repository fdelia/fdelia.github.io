---
id: 18
title: Automated trading
date: 2015-04-17T21:40:02+00:00
author: Fabio D'Elia
layout: post
guid: http://fdelia.com/?p=18
permalink: /automated-trading/
image: /wp-content/uploads/2015/04/ewma-72-1000-0-e1429346210870-700x510.png
categories:
  - Projects
---
Three years ago I built an automated trader for bitcoin (BTC/USD), which I uploaded to a free hosting and let it work (it was build in Python because I wanted to learn Python). First I did test runs only, simulating a portfolio (the order book was visible, so I could estimate if a trader would&#8217;ve been made). I used very simple algorithms like weighted moving average, bollinger bands and donchian channel, tried around a bit with the lengths/parameters and that did it. After some time I went live and made a bit of money: about 10-20 CHF / day (1 CHF ~ 1.05 USD) with a capital of ~500-800 CHF, fees included, but I started with 100 CHF.
  
(Information: Bitcoin was traded in small amounts back then. My capital was above the amount that could be used in the market. The upper limit for capital depends on the trader/market, liquidity, &#8220;big volume&#8221; days, etc.)

However there were some aggravating problems:

  * the trading site had a latency of about 10-15 minutes for trades
  * the API of the trading site changing or breaking all 2-3 weeks
  * the number of other bots increasing

I didn&#8217;t have time to look after it&#8230; so somewhen I stopped the project and forgot about it.

In march this year, I heard from an acquaintance that he built a poker bot with the intention to fleece drunk americans. He let him run only during night time (in U.S.). The simplicity of the used algorithms surprised me; he had quite some success (I don&#8217;t have any numbers, but I think it was more than 50 CHF / day with small capital).

I built a new trading-bot for myself including a comfortable test- and messaging-system, so that I could track how the algorithms were doing (this time in PHP since I couldn&#8217;t find a free hosting with cron tab support with something other than PHP and Python). Furthermore I switched to a [new trading website](https://cex.io/) with smaller latency, more avaible data(!!!) and better stability. I mainly started to track data from the trading website to find out, what the bots where doing.

I couldn&#8217;t overlook how they were acting in correlation to the popular indicators (I&#8217;ll add a simple example at the end of the post). Searching the web for common strategies, plotting and studying the data, I tried to predict to amount of bitcoin which would be traded in consequence of these indicators moving (I&#8217;m going to include plots and further explanations, once I have the time and if I don&#8217;t forget about it).

Well then, I set my &#8220;algorithms&#8221; to react to other bots, so that I could be sure to get my trades. I made a much higher profit: nearly 5% of my capital every day. Still, I stopped soon at a capital of ~300 CHF since it was only an experiment for me (and because of an other reason I&#8217;ll write about somewhen &#8211; probably the reason I&#8217;m not super rich already).

I got some questions answered, but new ones arose:

  * What if&#8217;d use more sophisticated algorithms considering statistics (e.g. predicting with bayesian since I&#8217;d have the data to train some classifier)?
  * How about stocks and indices? They have a higher liquidity, higher trading volume and some are more volatile (but fees are usually higher too).

### Summary

It seems possible to bet against the mass, increasing the revenue. Still, one main problem of automated trading remains: The changing hidden &#8220;patterns&#8221; of the market, which lets the algorithms dramatic losses. I haven&#8217;t yet found a way around that.
  
The next step will be an implementation of ANNs or the Monte-Carlo-method.

* * *

### Examples of (very) simple trading strategies

Probably the indicator people learn first: the (exponentially weighted) moving average (usually labeled MA, EMA, EWMA or similar, [wiki](http://en.wikipedia.org/wiki/Moving_average)). MA-5 stands for moving average going 5 days back. The strategy: buy when MA-5 > MA-50, sell when MA-5 < MA-50 + Δp. Δp is there to avoid losses through fees. Here a plot of the MA&#8217;s over a time span of 168 hours.

[<img class="alignnone size-large wp-image-73" src="/wp-content/uploads/2015/04/ewma-168-1000-1.png?w=660" alt="ewma-168-1000-1" width="660" height="495" srcset="/wp-content/uploads/2015/04/ewma-168-1000-1.png 1600w, /wp-content/uploads/2015/04/ewma-168-1000-1-300x225.png 300w, /wp-content/uploads/2015/04/ewma-168-1000-1-1024x768.png 1024w" sizes="(max-width: 660px) 100vw, 660px" />](/wp-content/uploads/2015/04/ewma-168-1000-1.png)

<p style="text-align: left;">
  An other very popular strategy: the bollinger bands (BB or BBO, <a href="http://en.wikipedia.org/wiki/Bollinger_Bands">wiki</a>). The bands are made of: MA ± σ * multiplier. In my case here MA-200, multiplier=1, σ is standard deviation. Buy when some MA (here 10) over the upper band, sell when the same MA under the lower band.
</p>

[<img class="alignnone size-large wp-image-74" src="/wp-content/uploads/2015/04/bb-168-1000-1.png?w=660" alt="BB-168-1000-1" width="660" height="495" srcset="/wp-content/uploads/2015/04/bb-168-1000-1.png 1600w, /wp-content/uploads/2015/04/bb-168-1000-1-300x225.png 300w, /wp-content/uploads/2015/04/bb-168-1000-1-1024x768.png 1024w" sizes="(max-width: 660px) 100vw, 660px" />](/wp-content/uploads/2015/04/bb-168-1000-1.png)

### Links for the interested

Please be aware that a lot of information isn&#8217;t elaborated enough, outdated or even wrong. These links are for &#8220;starters&#8221;:

  * [Automated trading system-blog](http://www.automated-trading-system.com/)
  * [Investopedia dictionary](http://www.investopedia.com/dictionary/)
  * [Trading Blox](http://www.tradingblox.com/forum/)

Papers: