---
layout: page
title: Distributed Stock Trading API
description: Production-grade REST API backed by a 3-node Cassandra cluster, with tunable consistency and a MySQL counterpart for direct comparison.
img: assets/img/projects/cassandra-stocks.jpg
importance: 1
category: course-projects
---

Built for **CS 544 (Big Data Systems)** at UW–Madison.

A REST API for stock trading data, designed from the ground up around the realities of distributed databases — tunable consistency, replication, and node failures. To make the trade-offs concrete, I built the same API twice: once on **Cassandra**, once on **MySQL**.

## What it does

- Six REST endpoints covering inserts, lookups, date-range queries, and monthly aggregations
- Runs on a **3-node Cassandra cluster** in Docker Compose with replication factor 3
- Tunable consistency per-request: **ONE**, **QUORUM**, or **ALL**
- Survives node failures — directly mirrors real distributed database deployments
- A side-by-side **MySQL + Flask** implementation of the same API for comparison

## Design decisions worth calling out

- **Schema with `STATIC` columns** to cleanly separate per-partition data from per-row data — avoids the "denormalize everything" trap that breaks most first-time NoSQL migrations.
- **Monthly aggregations computed in Python** because Cassandra's `GROUP BY` only works within a single partition. Pushing the aggregation to the client kept the data model honest instead of forcing a workaround in the schema.
- **10 pytest cases** covering all six endpoints, upsert behavior, empty-partition edge cases, date ranges, and the aggregation logic.

## Why it's interesting

The relational vs. NoSQL conversation usually happens at a hand-wavy level. Building both versions of the same API surfaced exactly where each paradigm earns its keep — and where each one will quietly hurt you if you're not paying attention.

## Stack

`Python` · `Flask` · `Cassandra (cassandra-driver)` · `MySQL` · `Docker` · `Docker Compose` · `pytest`
