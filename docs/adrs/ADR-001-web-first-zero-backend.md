# ADR-001: Web-first, zero-backend MVP

## Status
Accepted

## Date
2026-06-30

## Context

The product is a deterministic sleep timing calculator. The user values zero-cost MVPs and production simplicity. A backend would add cost, privacy surface, and operational burden before validating demand.

## Decision

Build a web/PWA MVP with no backend. All core calculations and settings run locally. Add iOS/RevenueCat only after web traction or explicit execution decision.

## Consequences

- Lower cost and faster launch.
- Stronger privacy promise.
- Limited cross-device sync in v1.
- Premium web billing is deferred.
