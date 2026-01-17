---
layout: page
title: Now
permalink: /now/
---

What I’m focused on right now, and why.

## Current focus

- _Add your current project here._
- _What outcome you’re aiming for._
- _Why it matters._

## Essays connected to this

{% assign essays = site.posts | where_exp: "p", "p.categories contains 'essays'" %}

{% if essays.size == 0 %}
_No essays yet._
{% else %}
{% for post in essays limit:5 %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}
{% endif %}
