# Beyond the Query

A research prototype for exploring contextual information within and across scientific papers, developed for USC CSCI 615.

The project investigates how an interface can help readers understand relationships among papers they have already collected. Our intended users are students with some experience reading research papers and a foundation in HCI, but limited familiarity with the specific subfield they are exploring.

## Current scope

The current prototype is a frontend-only workspace with three built-in papers and curated comparison content. Our semester scope focuses on developing and refining the interface without implementing a backend.

The focus is on making contextual information useful and accessible. The comparison matrix is one way to present that information; the prototype does not prescribe a literature review strategy or rank the papers.

## Built-in papers

| Paper | Publication | Accompanying code |
| --- | --- | --- |
| [Augmenting Scientific Papers with Just-in-Time, Position-Sensitive Definitions of Terms and Symbols (ScholarPhi)](https://arxiv.org/abs/2009.14237v3) | CHI 2021 — conference | [allenai/scholarphi](https://github.com/allenai/scholarphi) |
| [Scim: Intelligent Skimming Support for Scientific Papers](https://arxiv.org/abs/2205.04561v3) | IUI 2023 — conference | [rayfok/scim](https://github.com/rayfok/scim) |
| [SciDaSynth: Interactive Structured Data Extraction from Scientific Literature with Large Language Model](https://doi.org/10.1002/cl2.70073) | Campbell Systematic Reviews, 2025 — journal | [xingbow/SciDaEx](https://github.com/xingbow/SciDaEx) |

These papers provide an initial set of related but contrasting examples: understanding terms and symbols, skimming passages, and extracting structured information across documents. Each has an accompanying code repository. They are a starting set for implementation, not an established representative sample of HCI research. Their systems are not integrated into this prototype.

## Implemented features

### Papers

- Select one of the three papers from a sidebar displaying full titles.
- Read its full title, publication information, and author-written abstract.
- Inspect abstract attribution, source version, and license links.
- Open the original paper or its accompanying repository.

### Across Papers

View all three papers together in a matrix with four dimensions:

| Dimension | Guiding question |
| --- | --- |
| Problem & Motivation | What difficulty motivates the work? |
| Users & Use Context | Who needs support, and when? |
| Support & Interaction | What help is offered, and how is it used? |
| Result & Next Action | What does the reader get, and what can they do next? |

Select two cells from different papers within the same row, then choose **View relationship** to see:

- **Similarities**
- **Differences**
- **Check the source context**, including the corresponding reading notes and source links

The matrix contains 12 cells and 12 predefined pairwise comparisons: three paper pairs for each of four dimensions. Users can deselect cells or clear the selection. Selection state is preserved when switching tabs, but resets on page reload.

Keyboard navigation is supported for tabs and controls. The comparison dialog can be closed with its Close button or Escape. The matrix supports horizontal scrolling on narrower screens.

## Content and limitations

Abstracts reproduce the authors' wording, with paragraph layout adjusted for readability. Their sources and licenses are recorded in `src/data/papers.js` and displayed in the interface.

Matrix cells are curated paraphrases with source-section references. Pairwise notes are our interpretations of those sources, not direct quotations or findings from a head-to-head evaluation. Source links open the articles; they do not necessarily jump directly to the labeled section.

All comparison content is predefined. The app currently has no paper upload, live search, LLM calls, automated extraction, repository analysis, annotation storage, or export. Selecting a cell for comparison is not text highlighting or commenting. The pairwise dialog uses the current broad dimensions; a separate fine-grained comparison mode has not been implemented.

## Local development

Use Node.js **22.22.2**, the version used to validate this project, and npm.

```sh
npm ci
npm run dev
```

Open the local URL shown in the terminal (normally `http://localhost:5173/`).

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Check the source with ESLint |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Preview the production build locally after building |

## Technology and files

The app uses **React, JavaScript/JSX, CSS, and Vite**, with ESLint for code checks. It does not use TypeScript.

```text
src/
  App.jsx                 Workspace tabs and single-paper view
  App.css                 Workspace and paper-view styles
  ComparisonMatrix.jsx    Matrix selection and relationship dialog
  ComparisonMatrix.css    Matrix and dialog styles
  data/
    papers.js             Paper metadata, abstracts, attribution, and links
    comparison.js         Curated matrix cells and pairwise notes
  index.css               Global styles
  main.jsx                React entry point
docs/
  development-log.md      Decisions and implementation history
```

See the [Development Log](docs/development-log.md) for the decisions behind the current prototype and the work completed so far.
