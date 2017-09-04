---
id: 8
title: Cron for Node.js on Openshift
date: 2015-04-14T22:06:54+00:00
author: Fabio D'Elia
layout: post
permalink: /cron-for-node-js-on-openshift/
image: /wp-content/uploads/2015/04/nodejs-logo.png
categories:
  - Software stuff
---
If you want to install a cron job for Node.js on Openshift. I&#8217;m assuming that Node.js is already installed.

First you have to (please google if you don&#8217;t know how):

  * install the toolbelt rhc
  * set up an node.js application
  * in the openshift console/web: install the cron cartridge
  * install ssh keys with rhc
  * connect to the server with rhc ssh OR set up a git configuration

In your application folder go to .openshift/cron/{minutely,hourly,&#8230;}
  
Create a file with any name. Paste this into it:

```bash
#! /bin/bash
nohup /usr/bin/node $OPENSHIFT_REPO_DIR/job.js &gt;&gt; $OPENSHIFT_REPO_DIR/cron.log
```

A cron.log with your output is created in the application folder.
  
The log file from the system is in ~/app-root/logs/cron_{&#8230;}.log, you can access this dir by `rhc ssh "nameOfYourApp"`.

Back in the application folder, create job.js with something like:

```bash
// OpenShift sample Node application
var express = require('express');
var fs = require('fs');
var SampleApp = function(){
 var self = this;
 self. initialize = function(){};
 self. start = function(){
  console.log('%s: test from console', Date(Date.now() ));
 }
}
/**
 * main(): Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();
```

End.