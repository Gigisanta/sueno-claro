.PHONY: validate-docs status install lint test build e2e verify

validate-docs:
	python3 scripts/validate_docs.py

install:
	npm install

lint:
	npm run lint

test:
	npm run test

build:
	npm run build

e2e:
	npm run e2e

verify: validate-docs lint test build e2e

status:
	git status --short
