---
layout: page
title: Experiments
permalink: /experiments/
---

Things I’m building or testing. Each entry links to a repo and answers: “why does this exist?”

{% for exp in site.data.experiments %}
### [{{ exp.name }}]({{ exp.url }})

{{ exp.why }}

{% if exp.status %}
**Status:** {{ exp.status }}
{% endif %}

{% if exp.tags %}
**Tags:** {{ exp.tags | join: ", " }}
{% endif %}

---
{% endfor %}
