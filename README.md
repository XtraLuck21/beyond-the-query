# Beyond the Query

A research prototype for exploring contextual information within and across scientific papers, developed for USC CSCI 615.

The project investigates how an interface can help readers understand relationships among papers they have already collected. Our intended users are students with some experience reading research papers and a foundation in HCI, but limited familiarity with the specific subfield they are exploring.

## Current scope

The current prototype is a frontend-only workspace with three built-in papers, interactive explanations of their systems, source-linked design rationale maps, and curated comparison content. Our semester scope focuses on developing and refining the interface without implementing a backend.

SciDaSynth also has a **Source Analysis** tab with four citation-grounded connections, original-paper evidence, and explicit limitations. Open **Papers → SciDaSynth → Source Analysis**. See the [source audit and evidence ledger](docs/scidasynth-source-analysis.md) for methodology, sources, and validation. Run its focused checks with `node scripts/check-source-analysis.mjs`.

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

Choose a paper from the full-width list at the top of the workspace. Each row displays the full title and publication information. **Hide list** collapses the selector; **Change paper** reopens it. The wider workspace leaves room for the visualizations without a persistent sidebar.

Each paper has three content tabs. Selecting a tab shows only that section, rather than scrolling through a single long page:

| Tab | Content |
| --- | --- |
| **Overview** | Author-written abstract, attribution and license details, original paper, and repository links |
| **How it works** | User/System steps controlling one shared interactive example, with reader thought bubbles and source notes |
| **Design rationale** | Selectable observation → design motivation/goal → interface response graph, with supporting explanations and source references |

All three papers now have both visual sections:

| Paper | Interactive workflow | Design rationale coverage |
| --- | --- | --- |
| **ScholarPhi** | Select LISA in a reading passage; reveal its definition; inspect source context or other usages; dismiss assistance and resume reading | Seven motivations (M1–M7) connected to four feature families: tooltips, decluttering, equation diagrams, and a priming glossary |
| **Scim** | Reveal four content facets; adjust global and paragraph-level highlight density; select a highlight-browser entry to locate its context | Seven design goals (D1–D7) connected to highlighting, density controls, scrollbar feedback, and a linked highlight browser |
| **SciDaSynth** | Reveal a prepared extraction table; inspect and correct a missing value; standardize selected crop labels; keep a snapshot and download CSV | Three goals (DG1–DG3), with DG3 expanded into preliminary quality evaluation, source verification, and batch refinement |

ScholarPhi's **Priming glossary** demonstration opens in **Read with glossary** mode: the LISA passage is on the left and eight selected glossary entries are on the right. Clicking a marked symbol locates and highlights its entry. **Preview terminology** shows the glossary alone; narrow layouts place the passage above the glossary. These mode controls are teaching adaptations, while the original paper describes both previewing terminology and using a glossary beside the paper. See the [ScholarPhi development record](docs/scholarPhi.md#53-reading-first-glossary-demonstration) for scope and sources.

In the rationale graphs, selecting a node emphasizes its connected paths and reveals the supporting observations, reasons, concrete mechanisms, and source links. Selecting it again clears the selection. Applicable feature details link to the corresponding interactive example. These maps describe more features than the tutorials simulate; they are not complete reproductions of the original systems.

Tutorials include restart and previous/next controls. On narrow screens, tutorial columns stack and the rationale graph becomes a vertical layout with explicit connection labels.

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

The matrix contains 12 cells and 12 predefined pairwise comparisons: three paper pairs for each of four dimensions. Users can deselect cells or clear the selection. Comparison selection is preserved when switching workspace tabs, but resets on page reload.

Keyboard navigation is supported for tabs and controls. The comparison dialog can be closed with its Close button or Escape. The matrix supports horizontal scrolling on narrower screens.

## Content and limitations

Abstracts reproduce the authors' wording, with paragraph layout adjusted for readability. Their sources and licenses are recorded in `src/data/papers.js` and displayed in the interface.

Matrix cells are curated paraphrases with source-section references. Pairwise notes are our interpretations of those sources, not direct quotations or findings from a head-to-head evaluation. Source links open the articles; they do not necessarily jump directly to the labeled section.

The visualizations also distinguish source content from our interpretation:

- **ScholarPhi:** the LISA reading example uses curated paraphrases of [Strubell et al., EMNLP 2018](https://aclanthology.org/D18-1548/). Its interactions are adapted from ScholarPhi, with source context shown inline for this tutorial.
- **Scim:** sample passages paraphrase the Scim paper. Facet labels and highlight priorities are curated teaching examples, not live classifier output.
- **SciDaSynth:** the crop scenario is inspired by the paper's nutrition setting. Documents A–C, source passages, and records are invented teaching fixtures, not extracted research data. The tutorial simulates one table and a snapshot, not a database of uploaded papers.
- **Design rationale:** author goal identifiers are preserved, while observation summaries, feature groupings, and connecting explanations are curated. Graph edges express design rationale, not independently demonstrated causal effects. Inferred connections are identified in the content.

All comparisons and tutorial content are predefined. The app has no paper upload, live search, LLM calls, automated extraction, repository analysis, annotation storage, or backend. The SciDaSynth tutorial can export its kept example table as CSV; this does not export the reading workspace or a research brief. After a saved table edit, the old snapshot is invalidated and must be kept again before download.

Selecting a matrix cell is distinct from annotating text. Scim's simulated highlights illustrate the original system's behavior; they are not a general highlighting/comment feature for the reading workspace. A separate fine-grained comparison mode, note synthesis, and brief/RQ generation have not been implemented.

### Session state

- The selected paper, current section, tutorial edits, and graph selection remain in memory when switching between **Papers** and **Across Papers** or between sections of the same paper.
- Selecting a different paper opens its **Overview** and resets the tutorial and graph state. Returning to the previous paper does not restore its edits.
- **Restart** resets the current tutorial. Reloading the page resets all workspace state.
- No state is saved to a server or browser storage. A downloaded CSV is a separate local file.

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
  App.jsx                  Paper selector, workspace tabs, and paper content tabs
  App.css                  Wide workspace and responsive paper layout
  ComparisonMatrix.jsx     Matrix selection and relationship dialog
  ComparisonMatrix.css     Matrix and dialog styles
  PaperVisuals.jsx         Per-paper tutorial routing and shared rationale graph
  PaperVisuals.css         Tutorial scenes, graph, and responsive visual styles
  PaperTutorial.jsx        ScholarPhi's shared LISA reading example
  TutorialFrame.jsx        Shared step/action layout for Scim and SciDaSynth
  ScimTutorial.jsx          Faceted highlighting and context-navigation example
  SciDaSynthTutorial.jsx    Table validation, standardization, and CSV example
  data/
    papers.js              Metadata, abstracts, attribution, and links
    comparison.js          Curated matrix cells and pairwise notes
    paperVisuals.js        ScholarPhi steps, motivations, and rationale links
    visualModels.js        Per-paper graph configuration and Scim/SciDaSynth content
  index.css                Global styles
  main.jsx                 React entry point
docs/
  development-log.md       Decisions and implementation history
```

See the [Development Log](docs/development-log.md) for the decisions behind the current prototype and the work completed so far.
