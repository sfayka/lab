---
layout: page
title: Experiments
permalink: /experiments/
---

Things I'm building or testing. Each entry links to a repo and answers: "why does this exist?"

{% for exp in site.data.experiments %}
  {% include experiment-card.html experiment=exp %}
{% endfor %}
