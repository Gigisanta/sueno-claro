# Autonomous Hermes runbook

## Objective

Allow Hermes to execute the project end-to-end without re-asking for basic decisions.

## Required starting command pattern

Before coding:

1. Load `coding-preflight`.
2. Load `repo-edit`.
3. Load `frontend-design-inspiration` for UI work.
4. Load `source-driven-development` for framework-specific code.
5. Inspect repo files and current git status.
6. Fetch official docs for exact framework/library versions.

## Recommended autonomous loop

```text
Read docs → choose next backlog slice → implement smallest vertical slice → test → visual QA → commit → proceed to next slice
```

Only one slice in progress at a time unless using read-only subagents.

## Delegation map

| Workstream | Safe to delegate? | Notes |
|---|---|---|
| SEO keyword/content research | yes | read-only |
| Competitor review mining | yes | read-only |
| Sleep science/legal copy | yes | read-only; parent verifies sources |
| UI implementation | yes, narrow | do not edit same files concurrently |
| Core calculator implementation | maybe | parent must verify tests |
| RevenueCat integration | yes, narrow | parent verifies sandbox output |

## Parent verification requirements

- Verify every external claim with source URLs.
- Verify generated files exist with `git status` and file reads.
- Run real test/build commands.
- Capture browser screenshots for UI work.
- Commit only intended files.

## Commit convention

Use English commit messages:

- `docs: add product planning for sleep calculator`
- `feat: implement sleep calculator core`
- `feat: add bilingual SEO pages`
- `feat: add revenuecat premium entitlement`

## Suggested prompts for implementation agents

See `plans/prompts/`.

## Done definition

A phase is done only when:

- acceptance criteria in `docs/12-backlog.md` pass;
- verification output is captured;
- the repo is committed;
- no unrelated runtime files are staged.
