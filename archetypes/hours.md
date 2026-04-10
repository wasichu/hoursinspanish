{{- $hours := replace .File.ContentBaseName "-hours" "" -}}
+++
title = "{{ replace .File.ContentBaseName "-" " " | title }}"
date = "{{ .Date }}"
draft = true

tags = ["hours"]
series = ["hours-log"]

summary = ""

hours = {{ $hours }}
+++

At around {{ $hours }} hours of input, I wanted to record a quick update on progress.

I’ll keep these posts simple. The goal is to answer two questions:

- What’s getting better?
- What’s still difficult?

---

## Snapshot

- Hours: {{ $hours }}
- Main input: Dreaming Spanish
- Daily input: ~90 minutes

---

## What’s Improved

-

---

## What’s Still Hard

-

---

## What I’m Doing Now

-

---

## Notable Moments (optional)

-

---

## Takeaway

-
