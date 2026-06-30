.PHONY: validate-docs status

validate-docs:
	python3 scripts/validate_docs.py

status:
	git status --short
