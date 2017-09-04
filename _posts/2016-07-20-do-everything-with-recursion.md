---
id: 311
title: Loops with recursion
date: 2016-07-20T15:51:05+00:00
author: Fabio D'Elia
layout: post
permalink: /do-everything-with-recursion/
image: https://fabiodelia.com/wp-content/uploads/2016/08/8_scale_fractal-250x250.png
categories:
  - Software stuff
---
This post is about theoretical stuff.

When I was young (15y), my first attempt to program something bigger was a compiler. It should compile my own language into C++ and was itself written in C++. I was fascinated by the possibility to design an own language.

However, I was determined to fail. Basically because I lacked some knowledge in C++. I still got pretty far: I developed an <a href="https://en.wikipedia.org/wiki/Abstract_syntax_tree" target="_blank">abstract syntax tree</a> (AST) and wrote a working parser (my language -> AST), but failed to build a working interpreter (AST -> C++).

The language I developed was simple: It had no loops, but it had &#8220;arrays&#8221;, if/else, the usual binary operators and lambda functions (guess where I failed; there were no lambda functions before C++11 and that was 2002).

The fun thing is: My simple language would have conformed the <a href="https://en.wikipedia.org/wiki/Lambda_calculus" target="_blank">lambda calculus</a> and thus one could theoretically solve every computational problem with it.

But wait&#8230; my language has no loops?? That&#8217;s not a problem, believe me. You can do everything with recursion. Recursion is cool (ok, sometimes slow, but anyway). Let&#8217;s start&#8230; (I&#8217;ll use Javascript/ES5 here since most people know it. If you know ES2016, you can use arrow functions to make the code prettier). First, let&#8217;s build lists and functions to use them:

```javascript
cons = function(a, b){
    return function(f){
        return f(a, b);
    }
}

// we need this as a "null" for car/cdr, it mimics a cell
NIL = function(f){
    return f(null, null);
}

var l = cons(1, 2);
var m = cons(1, cons(2, cons(3, cons(4, cons(5, NIL)))));
```

I&#8217;m using the names of the precursor functions from lisp (origin: &#8220;**con**struction of memory cells&#8221;). We can read the list with:

```javascript
car = function(cell){
	return cell(function(a, b){return a;});
}
cdr = function(cell){
	return cell(function(a, b){return b;});
}

console.log(car(l)); // 1
console.log(cdr(l)); // 2

console.log(car(m)); // 1
console.log(car(cdr(m))); // 2
console.log(car(cdr(cdr(m)))); // 3
// etc.
```

(&#8220;car&#8221; is short for **C**ontents of the **A**ddress part of **R**egister number, &#8220;cdr&#8221; for **C**ontents of the **D**ecrement part of **R**egister number; see <a href="https://en.wikipedia.org/wiki/CAR_and_CDR" target="_blank">wiki</a> for more)

Now let&#8217;s use this &#8220;list&#8221; to work with loops:

```javascript
foreach = function(list, f){
	if (list !== NIL) {
		f(car(list));
		foreach(cdr(list), f);
	}
}

foreach(m, console.log); // 1, 2, 3, 4, 5

range = function(a, b){
	if (a &lt;= b) return cons(a, range(a + 1, b));
	else return NIL;
}

foreach(range(1, 9), console.log); // 1, ..., 9
```

The list is immutable: Once created, you can&#8217;t alter it. Can we change this? We need to redefine our functions:

```javascript
cons = function(a, b){
	return function(act, i, val){
		if (act === 'get'){
			if (i === 0) return a;
			else return b;
		}
		else {
			if (i === 0) a = val;
			else b = val;
		}
	}
}

car = function(cell){ return cell('get', 0); }
cdr = function(cell){ return cell('get', 1); }
rplaca = function(cell, val){ cell('set', 0, val); }
rplacb = function(cell, val){ cell('set', 1, val); }
NIL = cons(0, 0);

n = cons(1, cons(2, cons(3, NIL)));
console.log(car(cdr(cdr(n)))); // 3

rplaca(n, -1);
rplacb(n, cons(-2, NIL)); // replace and shorten

foreach(n, console.log); // -1, -2 instead of 1, 2, 3
```

Now you see, that lists can be implemented as syntactic sugar. It&#8217;s also possible for objects. However compilers implement those things directly into the AST because it runs faster. If you implement this code in languages with tail call optimization (like Scheme or Scala), it may run much faster.

* * *

A good part of this post was inspired by <a href="http://lisperator.net/pltut/eval1/play" target="_blank">Mihai Bazon&#8217;s page</a>. If you want to know more about compilers; take a look at his page.