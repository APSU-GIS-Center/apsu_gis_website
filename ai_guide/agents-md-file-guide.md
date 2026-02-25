---
title: AGENTS.md: The File That Saves You From Dumb AI Code
source: https://medium.com/coding-nexus/agents-md-the-file-that-saves-you-from-dumb-ai-code-a9df1a3997bc
published: 2025-09-17
created: 2025-12-10
updated: 2025-12-10T10:36:00Z
author:
  - Civil Learning
tags:
  - clippings
description: "AGENTS.md: The File That Saves You From Dumb AI Code If you've ever thought, \"This AI code is smart but also dumb,\" you'll get this. AI tools can be excellent. They’re fast, they’re confident …"
summary: ""
---
[Sitemap](https://medium.com/sitemap/sitemap.xml)## [Coding Nexus](https://medium.com/coding-nexus?source=post_page---publication_nav-16e3527896e0-a9df1a3997bc---------------------------------------)



Coding Nexus is a community of developers, tech enthusiasts, and aspiring coders. Whether you’re exploring the depths of Python, diving into data science, mastering web development, or staying updated on the latest trends in AI, Coding Nexus has something for you.

==If you've ever thought, "This AI code is smart but also dumb," you'll get this.==

AI tools can be excellent.

They’re fast, they’re confident, and sometimes they get 80% of the way there.

But they don’t know *your* repo.

They don’t know which version of MUI you’re on, which state library you use, or where you hide your design tokens.

So they guess. And when they guess, they mess up.

That’s why I started using a tiny file called **AGENTS.md**.

It’s just a markdown file at the root of your repo.

Nothing fancy.

But it tells the AI: here’s how we do things, here’s what not to touch, and here’s what matters.

Think of it as a README, but for bots.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/1*KsrzTO8xcrab3zX-5s2Caw.png)

Image by — AGENTS.md

## What the heck is AGENTS.md?

Think of it as a note to the AI that says:  
“Here’s how things work around here. Don’t guess. Avoid creating duplicates. Follow these rules.”

You’ve probably seen tool-specific files like `.cursorrules` or `.builderrules`.

The problem is, those clutter your repo fast.

Every tool wants its config.

`AGENTS.md` is meant to be a single standard, so one file works across multiple agents.

And the best part: you don’t have to keep repeating yourself in every single prompt. The defaults are already there.

## Why You Actually Need It

Let me give you a quick real-world fail.

I was using Builder.io’s agent to turn a Figma design into an app-wide tab. It sounds simple enough.

But since I had no `AGENTS.md` in place, here’s what happened:

- It guessed the wrong MUI version: a couple of styles didn’t apply.
- It grabbed `useState`: we use MobX.
- It generated an ApexCharts tooltip by spitting out a massive HTML string: ApexCharts literally has this built-in.
- It mostly used design tokens but forgot about dark mode.

The UI looked fine at first glance. But it wasn’t consistent, and fixing those issues took me more time than the agent saved.

Lesson learned: if you don’t give your AI a map, it will wander around your repo, make assumptions, and burn both time and credits.

## Building a Solid AGENTS.md

Here’s how to put one together without overthinking it.

## 1\. Start With dos and don’ts.

Be nitpicky. AI agents love specifics.

```c
### Do
- use MUI v3 (not v4!)
- use emotion \`css={{}}\` prop format
- use mobx with \`useLocalStore\`
- always pull design tokens from \`DynamicStyles.tsx\`
- use ApexCharts (no custom HTML hacks)
- keep components small
- keep diffs small and focused

### Don't
- don't hardcode colors
- don't use \`<div>\` if a component already exists
- don't bring in new heavy dependencies without approval
```

Why it helps:

- Agents won’t “upgrade” you to MUI v4 by mistake.
- They won’t decide `useState` is good enough when you’ve standardized on MobX.
- Reviewers won’t drown in giant diffs.

## 2\. Teach It File-Scoped Commands

By default, agents love to run full builds. On big repos, that can take minutes. It is completely unnecessary when you just edited a single file.

Instead, give it shortcuts:

```c
### Commands

# Type check one file
npm run tsc --noEmit path/to/file.tsx
# Format one file
npm run prettier --write path/to/file.tsx
# Lint one file
npm run eslint --fix path/to/file.tsx
# Run one test
npm run vitest run path/to/file.test.tsx
# Full build (only when asked)
yarn build:app
```

Now the AI has no excuse to waste cycles.

## 3\. Set Safety Rules

Sometimes agents get “creative” and run stuff you really don’t want. Be explicit:

```c
### Safety and permissions

Allowed without asking:
- read/list files
- run tsc/prettier/eslint on single files
- run vitest on single tests
Ask first:
- install new packages
- git push
- delete files or chmod
- full builds or E2E test suites
```

This keeps you from waking up to “Oh, cool, the bot just did an npm install I didn’t want.”

## 4\. Give It a Map of Your Repo

Agents can search, but don’t make them rediscover the same paths over and over. Leave some pointers:

```c
### Project structure
- routes → App.tsx
- sidebar → AppSideBar.tsx
- components → app/components
- theme tokens → app/lib/theme/tokens.ts
```

Saves time. It keeps results more accurate.

## 5\. Show Good and Bad Examples

AI copies patterns. If your repository contains legacy files, please identify them.

```c
### Good and bad examples
- avoid class-based components like \`Admin.tsx\`
- prefer functional hooks like \`Projects.tsx\`
- Forms → copy \`app/components/DashForm.tsx\`
- Charts → copy \`app/components/Charts/Bar.tsx\`
- Data → always use \`app/api/client.ts\` (never fetch in components)
```

This stops the agent from copying your 2016-era code just because it compiles.

## APIs

Instead of letting the bot guess, show it the endpoints.

```c
Docs → ./api/docs/*.md  
GET /api/projects → client.ts  
PATCH /api/projects/:id → client.projects.update
```

This saves back-and-forth later on.

## 7\. Define a PR Checklist

Tell the bot what “done” means.

```c
### PR checklist
- format and type check pass
- unit tests green
- diff small with a short summary
- no leftover logs or comments
```

That way, every PR is at least baseline consistent.

## 8\. Tell It What To Do When Stuck

This is underrated. AI often plows ahead when it’s unsure. Instead:

```c
### When stuck
- ask a question
- propose a short plan
- or open a draft PR with notes
```

Better to pause than push a 500-line “guess.”

## 9\. Optional: Test-First Mode

For tricky features:

```c
### Test first mode
- write/update tests before coding
- prefer component tests for UI
- for bugs: add a failing test, then fix
```

Locks in behavior before the code drifts.

## 10\. Index Your Design System

If you’ve got a separate design system, teach the AI how to use it:

```c
### Design system
- use @acme/ui (docs in ./design-system-index/*.md)
- tokens from @acme/ui/tokens
- examples in ./design-system-index/examples
```

This stops it from rebuilding your button from scratch every time.

## A Final Example

Here’s how a finished one `AGENTS.md` might look:

```c
# AGENTS.md

### Do
- use MUI v3
- use emotion css={{}} format
- use mobx with useLocalStore
- use tokens from DynamicStyles.tsx
- use ApexCharts
- keep components/diffs small
### Don't
- don't hardcode colors
- don't raw divs if we have a component
- don't add heavy deps without approval
### Commands
npm run tsc --noEmit path/to/file.tsx
npm run prettier --write path/to/file.tsx
npm run eslint --fix path/to/file.tsx
npm run vitest run path/to/file.test.tsx
npm run build:app
### Safety and permissions
Allowed: read/list files, lint/test single files
Ask first: installs, git push, deletes, full builds
### Project structure
- routes: App.tsx
- sidebar: AppSideBar.tsx
- components: app/components
- tokens: app/lib/theme/tokens.ts
### Good and bad examples
- avoid Admin.tsx (class)
- prefer Projects.tsx (hooks)
- forms: DashForm.tsx
- charts: Charts/Bar.tsx
- data: app/api/client.ts
### API docs
- ./api/docs/*.md
- GET /api/projects → client.ts
- PATCH /api/projects/:id → client.projects.update
### PR checklist
- lint/type/tests green
- diff small + summarized
- no extra logs
### When stuck
- ask, plan, or draft PR
### Test first mode
- tests before code on new features
### Design system
- use @acme/ui + tokens
- see ./design-system-index for examples
```

Your first `AGENTS.md` doesn’t need to be fancy.

Start small.

Write a list of dos and don’ts.

Add more rules the second time an agent makes the same mistake.

Keep it short. Keep it concrete. Give file paths and examples.

The goal isn’t to write the world’s longest rulebook; it’s to make your AI tools act less like a clueless intern and more like a teammate who actually understands your project.

And once you’ve seen the difference with good one, `AGENTS.md`, you’ll never want to run an agent without it.