---
layout: default
---

<div class="hero container">
  <p class="hero-label">Knox Analytics Lab</p>
  <h1>Where we break things, build things, and write about it.</h1>
  <p>Technical experiments and honest analysis. No fluff, no gated content.</p>
</div>

<div class="posts-section container">
  <div class="posts-list">
    {% for post in site.posts %}
      <article class="post-item">
        <div class="post-meta">
          <span class="post-tag">{{ post.category | default: 'Essay' }}</span>
          <span class="post-date">{{ post.date | date: "%-d %b, %Y" }}</span>
          <span class="post-date">·</span>
          <span class="post-date">{% assign words = post.content | split: " " %}{{ words | size | divided_by: 200 | plus: 1 }} min read</span>
        </div>
        <h3 class="post-title">
          <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>
        <p class="post-excerpt">{{ post.excerpt | strip_html }}</p>
      </article>
    {% endfor %}
  </div>
</div>
