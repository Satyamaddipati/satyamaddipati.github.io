---
layout: page
title: Agentic Visual Reasoning with LLaVA
description: A multi-step reasoning agent built on top of LLaVA for grounded visual question answering.
img: assets/img/projects/llava-agent.jpg
importance: 1
category: featured
giscus_comments: false
---

A group project for **CS 639 (Foundation Models)** at UW–Madison exploring how LLaVA can be turned into a reasoning agent that decomposes complex visual questions into sub-tasks, calls tools (zoom, region-crop, OCR), and produces grounded answers.

## What I'm working on

- Designing a planner-executor loop on top of frozen LLaVA-1.5
- Benchmarking against single-shot LLaVA on multi-hop visual QA
- Studying where the model fails — and whether tool use closes the gap

## Stack

`PyTorch` · `LLaVA-1.5` · `HuggingFace Transformers` · `Colab` · `Python`

> 🚧 In progress — proposal submitted, results coming end of semester.
