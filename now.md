---
layout: page
title: Now
permalink: /now/
---

<div class="now-page-content">

What I'm focused on right now, and why.

## Current focus

- _Add your current project here._
- _What outcome you're aiming for._
- _Why it matters._

## Essays connected to this

{% assign essays = site.posts | where_exp: "p", "p.categories contains 'essays'" %}
{% include post-list.html posts=essays limit=5 %}

</div>
