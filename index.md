---
layout: home
title: Lab
---

<div class="home-intro">
  <p>
    Welcome to <strong>lab.knoxanalytics.com</strong> — a small workspace for ideas,
    writing, and projects in progress.
  </p>
  <p>
    Start with <a href="/now/">Now</a> for what I'm focused on,
    browse <a href="/essays/">Essays</a> for longer writing,
    or explore <a href="/experiments/">Experiments</a> for active projects.
  </p>
</div>

## Latest

<ul class="post-list">
{% for post in site.posts limit:5 %}
  <li>
    <a href="{{ post.url }}" class="post-link">{{ post.title }}</a>
    <div class="post-meta">{{ post.date | date: "%B %d, %Y" }}</div>
  </li>
{% endfor %}
</ul>
