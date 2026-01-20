.PHONY: lint-md

lint-md:
	npx markdownlint-cli2 "**/*.md"
