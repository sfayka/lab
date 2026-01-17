---
layout: page
title: Essays
permalink: /essays/
---

Longer writing and notes.

{% assign essays = site.posts | where_exp: "p", "p.categories contains 'essays'" %}

{% if essays.size == 0 %}
_No essays yet._
{% else %}
{% for post in essays %}
- [{{ post.title }}]({{ post.url }}) — {{ post.date | date: "%Y-%m-%d" }}
{% endfor %}
{% endif %}
