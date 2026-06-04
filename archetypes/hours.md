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

<div style="text-align: center;">
  <img src="/img/{{ $hours }}-hours.png" alt="{{ $hours }} hours in Dreaming Spanish" width="350">
  <p><em>Proof</em></p>
</div>

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

## Notable Moments

-

---

## Takeaway

-
