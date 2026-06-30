#!/usr/bin/env python3
"""Lightweight repository documentation validator."""
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
REQUIRED = [
    'README.md',
    'AGENTS.md',
    'docs/00-source-map.md',
    'docs/02-prd.md',
    'docs/03-architecture.md',
    'docs/10-implementation-plan.md',
    'docs/11-autonomous-hermes-runbook.md',
    'docs/12-backlog.md',
]

def main() -> int:
    errors = []
    for rel in REQUIRED:
        path = ROOT / rel
        if not path.exists():
            errors.append(f'missing required file: {rel}')
        elif not path.read_text(encoding='utf-8').strip().startswith('#'):
            errors.append(f'missing top-level heading: {rel}')

    ignored_dirs = {'node_modules', '.next', 'out', '.git', 'playwright-report', 'test-results'}
    md_files = sorted(
        path for path in ROOT.rglob('*.md')
        if not any(part in ignored_dirs for part in path.relative_to(ROOT).parts)
    )
    for path in md_files:
        text = path.read_text(encoding='utf-8')
        if '	' in text:
            errors.append(f'tab character found: {path.relative_to(ROOT)}')
        if 'TODO' in text and 'docs/12-backlog.md' not in str(path.relative_to(ROOT)):
            errors.append(f'unresolved TODO outside backlog: {path.relative_to(ROOT)}')

    if errors:
        print('DOC VALIDATION FAILED')
        for err in errors:
            print('-', err)
        return 1
    print(f'DOC VALIDATION PASSED: {len(md_files)} markdown files')
    return 0

if __name__ == '__main__':
    sys.exit(main())
