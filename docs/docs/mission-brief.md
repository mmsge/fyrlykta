---
sidebar_position: 2
---

# Fyrlykta: mission brief

2026-10-25 · Markus Maarnes-Gjærde

## Summary

Fyrlykta is an open source, public discovery engine for the independent web: Mastodon accounts, blogs and news sites, in any language. It maps how these sites and accounts link to each other, and uses that graph to surface places people would not find inside their own bubble.

People get a browsable map, suggestions, a directory, search across sites and pages, and an open dataset. The defining goal is that diversity across communities and small sites grows over time, and that the result is useful to people other than its builder.

This brief describes the mission and the shape of the project. Implementation is deliberately left for later.

## Mission and problem

Fyrlykta's mission is to help people find good sites beyond their existing bubble, by treating the link graph as a map of communities and actively surfacing the bridges between them.

Discovery on today's web is shaped by two forces. Large platforms recommend by engagement, and large search engines reward big, heavily optimised sites. Small personal sites and niche communities exist, but are hard to stumble upon.

The naive fix, recommending what sits closest to what you already like, creates an echo chamber of its own. Fyrlykta takes the opposite stance: closeness is one signal, but the project values candidates that connect communities, link into areas the graph covers poorly, or come from small independent sites.

Like a lighthouse, it shows what is out there. It does not decide where people should go.

## Who it is for and what they get

Fyrlykta is public from the start, for anyone who wants to read beyond the big platforms. There are no user accounts, so every output works the same for everyone.

| Output | What it gives people |
| --- | --- |
| Browsable map | Explore the graph visually, see its communities and how they connect |
| Suggestions | Start from a site or account and get candidates worth following, including ones outside its cluster |
| Directory | A categorised list of sites, grouped by the communities the graph finds |
| Search | Search like DuckDuckGo, with results mixing whole sites and the pages within them |
| Open dataset | The graph published openly, for others to study, reuse or build on |

## Principles

- **Diversity over closeness.** Bridges between communities and under-covered areas count for more than near neighbours.
- **Small sites are first-class.** Independent and personal sites get a deliberate boost, since big outlets are found anyway.
- **Mostly algorithmic, human veto.** The graph proposes and admits; maintainers can veto, and anyone can suggest a site.
- **Consent is respected.** Opt-in flags, robots rules and opt-out requests are honoured, see Appendix D.
- **Open by default.** Code and dataset are open source.
- **Polite to the web.** Fyrlykta identifies itself, crawls gently and takes no more than it needs.
- **Any language.** No language is the default; the graph decides where coverage goes.

## Success measures

Fyrlykta succeeds when its diversity grows as the graph grows, and when other people find it worth using. Targets are not set yet.

| Measure | What it shows | Warning sign |
| --- | --- | --- |
| Communities represented | How many distinct clusters the graph covers | Count flatlines while the graph keeps growing |
| Share of small sites | Independent sites as a share of all admitted sites | Big outlets crowd out small ones |
| Spread across instances and languages | Whether coverage extends beyond a few hubs | A handful of instances or languages dominate |
| Outside use | Visits, searches, dataset downloads, links back | Usage comes only from the builder's own circle |

## Scope and non-goals

**In scope**

- Mastodon accounts, blogs and news sites, in any language
- The five outputs above: map, suggestions, directory, search and open dataset
- Running on its own infrastructure, separate from existing personal services

**Not now**

- User accounts, logins or personal profiles
- Real-time updates; periodic refresh is enough
- Implementation choices; this brief sets direction, not a build plan

## Open questions

None of these need answering before work starts, but each shapes a later decision.

- [ ] What seeds the graph at first, and how is the seed set kept from defining the whole graph?
- [ ] Which licences for code and for the dataset?
- [ ] Who holds the veto at the start, and how does that group grow?
- [ ] How are open suggestions protected from spam and brigading?
- [ ] Do Mastodon accounts that have not opted in appear as nodes at all, or only as anonymous edges?
- [ ] How much of a paywalled news article can be indexed?
- [ ] Viewpoint diversity is not a stated priority. Is that deliberate, or should news coverage track it?
- [ ] How is "useful to others" measured without user accounts or invasive analytics?
- [ ] What does separate infrastructure cost, and how is it paid for?

## Name suggestions

Fyrlykta is the working title. Alternatives in the same coastal, wayfinding spirit:

| Name | Meaning and fit |
| --- | --- |
| Fyrlykta | The lighthouse lamp; shows what is out there without steering |
| Varde | A cairn marking a path; built up stone by stone, like the graph |
| Los | A harbour pilot; guides you into waters you do not know |
| Sjømerke | A sea mark; many small markers that together make a route |
| Sjøkartet | The nautical chart; fits the browsable map |

## Appendix A: Sources and crawling

Feeds do most of the work. Fyrlykta reads published feeds and public metadata rather than crawling the web broadly.

| Source | How it is read | Main caveat |
| --- | --- | --- |
| Mastodon | Public profile RSS, ActivityPub actor and outbox, public follows, boosts, mentions and replies | Text only from accounts that opted in to indexing |
| Blogs | RSS and Atom, with full article text extracted from the page | Feeds vary in quality; extraction must handle messy markup |
| News sites | RSS for headlines and ledes, links to the full article | Paywalls and bot blocks limit full text |

**Finding new sources.** Outbound links in posts and articles, feed autodiscovery on linked pages, and inbound links from public web graphs such as Common Crawl's host graph. Inbound links matter because a crawl only sees what known sites link *to*.

**Politeness.** Identifiable user agent with a contact page, robots.txt respected, per-host rate limits, conditional requests so unchanged feeds cost almost nothing.

**Languages.** Detect language per document, so coverage can be measured and no language is treated as the default.

## Appendix B: Graph and discovery

The graph exists to find new sites, and its scoring is built to resist the echo chamber.

**Graph model.** Nodes are sites, accounts and documents. Edges are links, follows, boosts, mentions, replies, and two outlets covering the same story. Community detection (Leiden or Louvain) groups nodes into clusters.

**How candidates are scored.**

- **Bridges.** Candidates linked from two or more clusters, or linking into a thinly covered one, score higher than those deep inside a well-covered cluster.
- **Inbound links.** Who links to admitted sites, not only who they link to, reveals audiences, critics and adjacent scenes.
- **Small-site boost.** Independent and personal sites are weighted up.
- **Exploration budget.** The candidate queue is split between near neighbours, bridges and far nodes from long random walks. A bandit approach adjusts the split based on which strategy produces sites that survive veto.
- **Diverse shortlists.** Maximal marginal relevance over topic embeddings, so a set of suggestions is not ten variations on one site.

**Vetoes are data.** A vetoed site teaches the scoring what to avoid without narrowing everything else toward one taste.

**Watching for drift.** The success measures double as an alarm. If diversity flatlines while the graph grows, the scoring has drifted toward closeness.

## Appendix C: Search and ranking

Search covers both sites and pages, ranked by text relevance combined with graph signals, and applies the same diversity stance as discovery.

- **Two result types.** A query can match a whole site or account (by what it is about) and individual pages or posts. Results mix both.
- **Relevance baseline.** Classic full-text ranking such as BM25, optionally combined with embeddings for semantic matches across languages.
- **Graph signals.** Standing within communities, not closeness to any one user. With no accounts there is no personalisation, so everyone sees the same ranking.
- **Diverse result pages.** A cap on results per site and a mix across communities, so one big outlet cannot fill the page.
- **Small-site boost.** The same weighting as in discovery, so independent sites are not buried by volume.
- **Spam resistance.** Algorithmic admission invites spam. Trust flows from the graph's established nodes, and vetoes remove what slips through.
- **Consent applies to the index.** Only text Appendix D allows is searchable.

## Appendix D: Consent and governance

Fyrlykta honours opt-in and opt-out signals before anything is stored, and keeps admission mostly algorithmic with human checks.

**Consent signals honoured**

- Mastodon's `indexable` flag: post text is stored and searchable only for accounts that opted in
- Mastodon's `discoverable` setting, and the fediverse `#nobot` convention in profiles
- robots.txt and `noindex` on blogs and news sites
- Direct opt-out requests from any site or account, acted on promptly and removed from future dataset releases

**The open dataset.** Published data is hard to retract once copied. The dataset should contain only what consent allows, with text from opted-in sources only and graph edges at a level that does not expose people who have not opted in.

**Governance**

- The algorithm proposes and admits sites into the graph
- Maintainers can veto, and vetoes are logged with a reason
- Anyone can suggest a site; suggestions enter the same scoring as everything else, with no fast track
- How the maintainer group forms and grows is an open question
