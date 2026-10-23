# Beyond the Query

A research prototype for exploring contextual information within and across scientific papers, developed for USC CSCI 615.

Explore three curated papers through source-based explanations, interactive examples, and comparisons. Our intended readers are students with some paper-reading experience and HCI knowledge who are unfamiliar with the specific subfield.

## Current scope

The prototype is a frontend-only workspace with three built-in papers. Its focus is useful contextual information, rather than prescribing a literature-review strategy or ranking systems. Content and examples are curated in advance; the original tools are explained, not integrated or executed.

This README describes the working version reviewed on October 22, 2026. Further design changes remain undecided; this documentation update does not expand implementation scope.

## Built-in papers

| Paper | Publication | Accompanying code |
| --- | --- | --- |
| [Augmenting Scientific Papers with Just-in-Time, Position-Sensitive Definitions of Terms and Symbols (ScholarPhi)](https://arxiv.org/abs/2009.14237v3) | CHI 2021 — conference | [allenai/scholarphi](https://github.com/allenai/scholarphi) |
| [Scim: Intelligent Skimming Support for Scientific Papers](https://arxiv.org/abs/2205.04561v3) | IUI 2023 — conference | [rayfok/scim](https://github.com/rayfok/scim) |
| [SciDaSynth: Interactive Structured Data Extraction from Scientific Literature with Large Language Model](https://doi.org/10.1002/cl2.70073) | Campbell Systematic Reviews, 2025 — journal | [xingbow/SciDaEx](https://github.com/xingbow/SciDaEx) |

These examples address term/symbol understanding, skimming, and structured extraction across documents. They are an initial implementation set, not a demonstrated representative sample of HCI research.

## Papers

Choose a full-title paper row at the top of the workspace. **Hide list** collapses the selector; **Change paper** reopens it. Each paper has six content tabs; selecting a tab displays only that section.

| Tab | Current content |
| --- | --- |
| **Overview** | Author-written abstract, attribution, publication information, and paper/repository links |
| **How it works** | Core capability overview and selectable, bounded demonstrations |
| **System Pipeline** | Selectable processing stages with inputs, processing, outputs, dependencies, and evidence |
| **Design rationale** | Observations/basis → design motivations/goals → responses, with selected connections and supporting explanations |
| **Evaluation & Findings** | Original-study methods, selected findings, limitations, and expandable evidence |
| **Related work** | Selected explanatory connections, reasons for inclusion, and evidence links |

### Paper-specific coverage

| Paper | Demonstrations | Pipeline and research context |
| --- | --- | --- |
| **ScholarPhi** | Four feature families using LISA: tooltips, Declutter, equation diagrams, and a priming glossary. The glossary defaults to **Read with glossary** (passage left, terminology right); **Preview terminology** retains advance preview. | Thirteen nodes distinguish preparation and reading using pinned code. Rationale covers M1–M7; evaluation summarizes the final study. Three backward-reference contexts and three subsequent related works have separately documented selection routes. |
| **Scim** | Four feature families using selected real passages from Wu et al.: faceted highlights, density controls, distribution feedback, and context navigation. Labels/priorities are curated teaching data. | Eleven nodes distinguish model preparation, paper processing, and reading, with paper/code discrepancies retained. Rationale includes the formative process and D1–D7. Evaluation separates technical, lab, and diary evidence. Related work explains HiText and TLDR. |
| **SciDaSynth** | Four capability groups share a prepared crop table: extraction, source checking/editing, standardization, and database accumulation/export. A second prepared result can add an attribute and Document D. | A paper-based architecture map has ten elements in four groups; it is not a code audit. Rationale covers DG1–DG3. Evaluation separates methods, results, failure cases, and reporting uncertainties. Related Work displays PaperMage, RAG, and RAGAs. |

Selecting a rationale node highlights its connections and displays details below the map. These diagrams are explanatory syntheses, not measured causal models. Feature inventories are broader than the individual mechanisms simulated.

## Across Papers

A relationship entry map offers three individual-paper entries, three pair connections, and one all-three overview. Positions and links express curated relationships, not similarity scores or proportional overlap. Map selection is independent of matrix selection.

The compact matrix compares all three papers along four dimensions:

| Dimension | Pair-result presentation |
| --- | --- |
| **Problem** | Aligned Situation → Obstacle → Burden chains |
| **Reading context** | Parallel scenario cards and attention-scope diagrams |
| **Support** | Aligned reader questions, assistance differences, and selected interaction paths |
| **Reader output** | Parallel output illustrations and possible next activities |

Select two cells from different papers in the same row, then choose **Compare selected**. Every combination opens an inline relationship panel below the matrix, with automatic scrolling/focus and **Back to selection**. Returning preserves the selection; changing or clearing it hides the previous result. There is no comparison modal.

All twelve pair-by-dimension results have a visual presentation, shared concern, and evidence available on demand. Matrix source links open a primary location; expanded evidence lists supporting locations separately. ScholarPhi and Scim comparison links use pinned v3 HTML section anchors. SciDaSynth comparison links use its v3 PDF pages because its HTML numbering differs. PDF page navigation depends on viewer support; a section-range link opens the start of the range.

See [Across Papers](docs/across-papers.md) for the full design record, source register, and interpretation boundaries.

## Content and limitations

- Abstracts retain author wording and source/license attribution. Scim's metadata abstract is distinguished in its record from the rendered full-text abstract.
- ScholarPhi uses real LISA material with a mixture of labeled quotations, paraphrases, and adapted controls. Its glossary is eight selected entries, not an exhaustive glossary.
- Scim uses selected excerpts from [Wu et al., NAACL 2022](https://aclanthology.org/2022.naacl-main.40/), with omissions and attribution. The prototype does not run Scim's classifier or reproduce a full PDF reader.
- SciDaSynth's Documents A–D, passages, and values are invented teaching fixtures. Entering another question still reveals prepared data, not a generated answer. Accepted data can be downloaded as CSV; this is not an export of the reading workspace.
- Source-based interpretations, author-reported results, code findings, and teaching adaptations have different evidence status. The paper records identify coverage and known gaps. No tab reproduces an entire paper.
- Original-system evaluations do not establish that Beyond the Query improves comprehension. Results across different tasks/populations are not a head-to-head ranking.

There is no arbitrary paper import, live search, model call, automated extraction, automatic repository analysis, general text annotation/comment storage, or backend. Fine-grained comparison modes, experimental-design comparison, note synthesis, and brief/RQ generation are not implemented. A reusable skill and broader paper library remain future possibilities, not current capabilities.

### Session state

- Paper sections remain mounted when switching sections or moving between **Papers** and **Across Papers**, preserving local interaction state.
- Changing paper opens its **Overview** and resets that paper's tutorial/graph state; returning does not restore the previous edits.
- Tutorial reset controls restore their prepared examples. Reloading resets all workspace state; there is no server or browser-storage persistence.
- SciDaSynth edits affect Current Result. Its accepted DB snapshot remains separate; further edits make it stale and disable CSV download until the revised table is accepted again.
- Matrix and relationship-map selections are independent. The matrix supports horizontal scrolling when necessary on narrow screens.

## Local development

Use a Node.js version compatible with the installed Vite release and npm. Node 22.22.2 was used in earlier local validation; dated logs identify other environments used for specific checks.

```sh
npm ci
npm run dev
```

Open the URL printed in the terminal, normally `http://localhost:5173/`.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Check source with ESLint |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Preview a production build |

The existing `scripts/check-source-analysis.mjs` targets the earlier four-entry Source Analysis interface. It is stale for the current three-entry Related Work page and is not a current acceptance check. This documentation pass leaves it unchanged.

## Technology and implementation

React, JavaScript/JSX, CSS, and Vite provide the frontend; ESLint checks code. TypeScript is not used.

| Location | Responsibility |
| --- | --- |
| [App.jsx](src/App.jsx) | Paper selector and workspace/content tabs |
| [PaperVisuals.jsx](src/PaperVisuals.jsx) | Paper-specific routing and shared rationale map |
| `ScholarPhiTutorial.jsx`, `ScimTutorial.jsx`, `SciDaSynthTutorial.jsx` | Feature overviews and demonstrations; ScholarPhi tooltips also use `PaperTutorial.jsx` |
| `*Pipeline.jsx`, `*Evaluation.jsx`, and related-work components | Paper-specific explanations and evidence |
| [PaperRelationshipMap.jsx](src/PaperRelationshipMap.jsx) | Across Papers relationship entry |
| [ComparisonMatrix.jsx](src/ComparisonMatrix.jsx) | Compact matrix, selection, and inline results |
| `ProblemRelationshipPanel.jsx`, `ReadingContextComparison.jsx`, `SupportRelationshipPanel.jsx`, `ReaderOutputComparison.jsx` | Dimension-specific pair presentations |
| [ComparisonSources.jsx](src/ComparisonSources.jsx), [comparisonSources.js](src/data/comparisonSources.js) | Shared comparison source rendering and versioned locators |
| `src/data/` | Curated metadata, examples, comparisons, rationale, pipeline, and source records |

## Documentation guide

| Record | Purpose |
| --- | --- |
| [Development log](docs/development-log.md) | Project decisions, implementation milestones, validation scope, and pending decisions |
| [General standards](docs/general_standards.md) | Reusable working procedure for HCI tool-paper content and UI; eligibility and limits |
| [ScholarPhi](docs/scholarPhi.md) | Original detailed paper record from which the general standards were derived |
| [Scim](docs/scim.md) | Application of those standards, including feature coverage, evidence, and reference selection |
| [SciDaSynth](docs/SciDaSynth.md) | Current six-tab inventory and retained historical increments |
| [SciDaSynth reference ledger](docs/scidasynth-source-analysis.md) | Current Related Work selection and historical Source Analysis evidence |
| [Across Papers](docs/across-papers.md) | Relationship map, four comparison dimensions, twelve results, and sources |
| [Teammate's original log](docs/Bob_development-log.md) | October 16 selection rationale, preserved with a later status note |

Documentation describes implemented coverage and does not certify all claims, source availability, accessibility, or learning effectiveness. Historical checks apply to the versions and scope stated in each record.
