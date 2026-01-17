---
layout: page
title: Essays
permalink: /essays/
---

Longer writing and notes.

{% assign essays = site.posts | where_exp: "p", "p.categories contains 'essays'" %}
{% include post-list.html posts=essays %}
