# Experiments Page Guide

How to add and manage projects on your Experiments page.

## Quick Start

Experiments are managed in `_data/experiments.yml`. Just edit this file to add, update, or remove projects.

## File Location

```
_data/experiments.yml
```

## Basic Template

```yaml
- name: Project Name
  url: https://github.com/yourusername/project-name
  why: >-
    A brief explanation of why this project exists and what problem it solves.
  status: active
  tags:
    - tag1
    - tag2
```

## Required Fields

- **`name`**: The project name (will be a clickable link)
- **`url`**: Link to the project (usually GitHub repo)
- **`why`**: Explanation of why the project exists (use `>-` for multi-line text)

## Optional Fields

- **`status`**: Current status (e.g., "active", "archived", "on-hold", "completed")
- **`tags`**: List of tags for categorization

## Complete Example

```yaml
- name: AI Model Trainer
  url: https://github.com/knoxanalytics/ai-trainer
  why: >-
    A streamlined tool for training machine learning models. Built to reduce
    the time consultants spend on repetitive model training tasks. Includes
    automated hyperparameter tuning and experiment tracking.
  status: active
  tags:
    - machine-learning
    - tooling
    - consulting

- name: Data Pipeline Framework
  url: https://github.com/knoxanalytics/data-pipeline
  why: >-
    A reusable framework for building ETL pipelines. Standardizes our approach
    to data processing across client projects.
  status: active
  tags:
    - data-engineering
    - framework
    - python
```

## YAML Syntax Tips

1. **Indentation matters!** Use 2 spaces (not tabs)
2. **The `>-` after `why:`** allows multi-line text - just write normally
3. **Lists use `-`** for each item
4. **Quotes optional** unless you have special characters

## Adding a New Experiment

1. Open `_data/experiments.yml`
2. Add a new entry following the template
3. Save the file
4. Jekyll will auto-rebuild - refresh your browser to see it!

## Editing an Existing Experiment

1. Find the entry in `_data/experiments.yml`
2. Update any fields
3. Save - changes appear automatically

## Removing an Experiment

1. Delete the entire entry (from `- name:` to the end of that entry)
2. Save the file

## Status Options

Common status values:
- `active` - Currently being worked on
- `archived` - No longer active
- `on-hold` - Paused temporarily
- `completed` - Finished project
- `experimental` - Early stage/testing

Use whatever makes sense for your workflow!

## Tags

Tags help categorize your projects. Some ideas:
- `machine-learning`, `ai`, `ml`
- `tooling`, `framework`, `library`
- `consulting`, `client-work`
- `python`, `javascript`, `rust`
- `data-engineering`, `analytics`

Use consistent tags to make it easier to find related projects later.

## Multi-line Text

The `>-` syntax allows you to write longer descriptions across multiple lines:

```yaml
why: >-
  This is a longer description that spans
  multiple lines. It will all be combined
  into a single paragraph when displayed.
```

Just write normally - YAML handles the formatting.

## Common Mistakes

❌ **Wrong indentation:**
```yaml
- name: Project
url: https://...  # Missing spaces!
```

✅ **Correct:**
```yaml
- name: Project
  url: https://...  # 2 spaces before url
```

❌ **Missing `>-` for multi-line:**
```yaml
why: This is a long description
     that spans lines  # Won't work!
```

✅ **Correct:**
```yaml
why: >-
  This is a long description
  that spans lines  # Works!
```

## Full Template File

Here's a complete `experiments.yml` template you can copy:

```yaml
- name: Project Name
  url: https://github.com/yourusername/project
  why: >-
    Describe what this project does and why it exists. What problem does it solve?
    Who is it for? What makes it unique?
  status: active
  tags:
    - category
    - technology

- name: Another Project
  url: https://github.com/yourusername/another-project
  why: >-
    Another project description here.
  status: active
  tags:
    - different-tag
```

## Where It Appears

Experiments automatically appear on:
- **Experiments page** (`/experiments/`) - All experiments listed
- Each experiment shows as a card with:
  - Project name (clickable link)
  - Description (the "why")
  - Status indicator (if provided)
  - Tags (if provided)

## Pro Tips

1. **Keep descriptions concise** - 2-3 sentences is usually enough
2. **Use consistent tags** - Makes it easier to find related projects
3. **Update status regularly** - Keep it current so visitors know what's active
4. **Link to live demos** - If you have a demo, link to it in the description

That's it! Just edit the YAML file and your experiments page updates automatically. 🚀
