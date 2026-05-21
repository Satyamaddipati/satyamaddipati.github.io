---
layout: page
title: Buffer Manager (DBMS Internals)
description: A page-level buffer manager with the clock replacement algorithm, in C++.
img: assets/img/projects/buffer-manager.jpg
importance: 2
category: course-projects
---

Built from scratch as part of **CS 564 (Database Management Systems)** at UW–Madison.

## What it does

Implements the buffer pool layer that sits between disk and the rest of a DBMS:

- Page allocation, pinning, and unpinning
- **Clock replacement algorithm** for victim selection
- Dirty page write-back on eviction
- Hash-based frame lookup for O(1) page-to-frame mapping

## Why it's interesting

The buffer manager is the unsung hero of every database — it's the difference between a system that opens a 1TB table and one that thrashes itself to death. Building it from scratch made me appreciate just how much performance work hides inside `SELECT *`.

## Stack

`C++` · `STL` · custom test harness
