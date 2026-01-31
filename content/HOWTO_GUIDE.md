# HowTo Schema Guide

Add this to your article frontmatter to get step-by-step rich results in Google.

## When to Use

- Tutorial articles with clear sequential steps
- Setup guides
- "How to" content

## Frontmatter Template

```yaml
---
title: "Your Article Title"
description: "Article description"
date: "2024-01-15"
category: homelab
tags:
  - tag1
  - tag2
howto:
  totalTime: PT30M  # ISO 8601 duration (see below)
  tool:             # Optional: tools/software needed
    - Docker
    - Node.js
  supply:           # Optional: materials/accounts needed
    - GitHub account
  steps:
    - name: Step title
      text: Detailed description of what to do in this step.
    - name: Another step
      text: More details here.
---
```

## Time Format (ISO 8601)

| Duration | Format |
|----------|--------|
| 5 minutes | `PT5M` |
| 30 minutes | `PT30M` |
| 1 hour | `PT1H` |
| 1 hour 30 min | `PT1H30M` |
| 2 hours | `PT2H` |

## Tips

- Keep step names short (3-6 words)
- Step text should be 1-2 sentences
- 4-10 steps is ideal
- Match steps to your article's actual structure
