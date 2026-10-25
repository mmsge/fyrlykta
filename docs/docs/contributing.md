---
sidebar_position: 3
---

# Contributing

Fyrlykta is at the planning stage. The most useful contributions right now are thoughts on the [open questions in the mission brief](./mission-brief.md#open-questions), and improvements to this documentation.

## Discussing the project

Open an issue on [GitHub](https://github.com/mmsge/fyrlykta/issues) to raise a question, propose an answer to one of the open questions, or suggest a change in direction. Keep each issue to one topic.

## Working on the docs

The docs site is built with [Docusaurus](https://docusaurus.io/) and lives in the `docs/` folder. You need Node.js 20 or newer.

```bash
cd docs
npm ci
npm start
```

`npm start` serves the site locally with live reload. Run `npm run build` before opening a pull request; CI runs the same build and fails on broken links.

## Pull requests

1. Create a branch from `main`. Never commit directly to `main`.
2. Make small, focused commits with clear messages in English.
3. Open a draft pull request early, and mark it ready for review when CI passes and the work is done.
4. Pull requests are squash merged, so the pull request title and description become the commit on `main`.

## Code

There is no source code yet. Tooling for source code, tests and linters will be added once a stack is chosen, and this guide will be updated then.

## Versioning

Releases follow [semantic versioning](https://semver.org/): `X.Y.Z`, where Z is a fix, Y is a backwards compatible feature, and X is a breaking change.
