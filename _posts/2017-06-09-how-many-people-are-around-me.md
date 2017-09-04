---
id: 452
title: How many people are around me?
date: 2017-06-09T19:04:27+00:00
author: fdel
layout: post
permalink: /how-many-people-are-around-me/
categories:
  - Software stuff
---
In my city there is one library where I like to study. But during exam times it’s overcrowded and the good study places are gone fast. So I wondered: When are there how many people?
  
How could that be easier in those days where everyone not only has a smartphone but most have tablets and laptops too.

I built a small script, which determines the amount of unique mac addresses every x minutes. The idea is that once i have some free time, I might analyze the data.

<span style="color: #ff0000;">Disclaimer: Tracking mac addresses may be illegal in your country. Please check your laws first.</span> I didn&#8217;t found applicable jurisdiction for Switzerland, but tracing a person falls under data protection (especially under Art. 12 ff. DSG, last checked: 9. June 2017).
  
I hash all mac addresses with a daily changing random salt, so that every day the mac addresses are converted into an other hash and are not traceable. At the end of every day I count the addresses and delete them, so that only total numbers are left. I will not share that script though, because I’m paranoid that someone will reverse-engineer stuff.

So how did I count the people around me?

First: One needs a wireless network interface controller (wlan card) which supports monitor mode. All MacBook Pro&#8217;s have it. Some android phones too.

The core part of my work is  [<span class="lang:default decode:true  crayon-inline " >tshark</span>](https://www.wireshark.org/docs/man-pages/tshark.html). With that command one can protocol and dump network traffic.

I also use the small tool  [<span class="lang:default decode:true  crayon-inline " >whereami</span> from Rob Mathers](https://github.com/robmathers/WhereAmI). This is to determine if my computer is in the library, since I run the script below as cron job and I only want to monitor in the library. You can leave that part away if you want.

Let&#8217;s take a look at the cron script, i&#8217;ll make some more comments below:

```bash
#!/bin/bash

# this is to prevent to macbook from crashing, when the script executes and the airport has no power - can raise kernel panic

# find out if display is dimmed aka. macbook is sleeping - this worked better on the computer of a friend of mine
# returns 4 if display is on, 0 if out, numbers in between for dimmed
#str=$(ioreg -n IODisplayWrangler | grep -i IOPowerManagement | perl -pe 's/^.*DevicePowerState\"=([0-9]+).*$/\1/')
#if (( str ))

# first check if the laptop lid is closed and don't run the script if it is - this worked better for me
str=$(/usr/sbin/ioreg -r -k AppleClamshellState -d 4 | grep AppleClamshellState  | head -1)
if [[ $str =~ .*No.* ]]
        then

        # find out if in library
        # library coordinates, set to your coordinates
        lat_zb=47.564431
        long_zb=8.385578
        dist=0.003

        where=$(/Users/fabiodelia/dev/whereami) &gt;&gt;/dev/null 2&gt;/dev/null
        lat=$(echo $where|cut -d' ' -f2|bc -l)
        long=$(echo $where|cut -d' ' -f4|bc -l)

        # check if current position is less than "dist" away from the coordinates given above
        if (( $(echo "$lat_zb &gt; ($lat-$dist)" |bc -l) )) && (( $(echo "$lat_zb &lt; $lat+$dist" |bc -l) )) && (( $(echo "$long_zb &gt; $long - 0.003" |bc -l) )) && (( $(echo "$long_zb &lt; $long + 0.003" |bc -l) ))
                then
                
                # the actual monitoring part
                /usr/local/bin/tshark -a duration:32 -I -i en0 -Tfields -e wlan.sa -e wlan.bssid -e wlan_mgt.ssid -e radiotap.dbm_antsignal 2&gt;/dev/null | sort -u | python /path/to/your/script.py
        fi
fi
```

Some comments:

  * I monitor for 32 seconds every 5 minutes. This because monitoring disables internet and I need internet. To understand how representative the numbers are I always enable my wifi on my phone and register if the mac address of my phone has been found. So I can see how often phones are communicating with wifi (I think I&#8217;m an average phone user). I know there is a better and more sophisticated method to find out the activity of the phone in a network, but I hope this works too. Duration can be adjusted.
  * The first couple of lines are about energy management: Just don&#8217;t run the script if the computer is sleeping. It caused some kernel panics. **It is Apple specific!** One can probably drop it for other computers.

The analysis part will be in a next post. It&#8217;s gonna be interesting since there is a lot of missing data (the time I&#8217;m not in the library or computer is sleeping).