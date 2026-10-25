# Fyrlykta

[![CI](https://github.com/mmsge/fyrlykta/actions/workflows/ci.yml/badge.svg)](https://github.com/mmsge/fyrlykta/actions/workflows/ci.yml)

Fyrlykta is an open source, public discovery engine for the independent web: Mastodon accounts, blogs and news sites, in any language. It maps how these sites and accounts link to each other, and uses that graph to surface places people would not find inside their own bubble.

Read the [mission brief](docs/docs/mission-brief.md) for the mission, principles, scope and open questions.

## Planned outputs

- A browsable map of the graph and its communities
- Suggestions, including ones outside a site's own cluster
- A directory grouped by the communities the graph finds
- Search across whole sites and the pages within them
- An open dataset of the graph

## Status

The project is at the planning stage. No stack has been chosen, so there is no source code, test suite or linter yet. The repository holds the documentation site.

## Documentation

The docs site is built with [Docusaurus](https://docusaurus.io/) and lives in [`docs/`](docs). You need Node.js 20 or newer.

```bash
cd docs
npm ci
npm start
```

## Contributing

See the [contributing guide](CONTRIBUTING.md).

## Licence

Not yet chosen. It is an open question in the mission brief.
