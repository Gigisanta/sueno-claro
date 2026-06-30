# ADR-003: No sleep tracking, microphone, or wearable dependency in v1

## Status
Accepted

## Date
2026-06-30

## Context

Full sleep trackers already exist and compete on sensor data. Sueño Claro's differentiation is simple private planning.

## Decision

Do not request microphone, wearable, or health-data permissions in v1. Do not record audio. Do not diagnose sleep.

## Consequences

- Strong privacy positioning.
- Less app complexity and review risk.
- Cannot provide sleep-stage analytics; product remains a planner/calculator.
