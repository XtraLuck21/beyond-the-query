# Development Log

This log records project decisions and completed implementation. Features discussed but not built are identified separately; they are not commitments for the next development step.

## 2026-10-07 — Interactive paper explanations and a unified workspace

This update records the work after the initial comparison prototype, through commit `cb66f10`. The earlier entry below remains a historical checkpoint; the feature status in this entry and the README describes the current app.

### Decision: explain a paper's system and design reasoning visually

We kept the abstract as the concise overview and added two complementary visual explanations: how the paper's system is used, and how its observations and motivations connect to design responses. The aim is to make contextual relationships visible rather than duplicate the article as a set of standalone text summaries.

For the workflow, we settled on explicit numbered steps with separate **User** and **System** actions on the left and one shared example on the right. Selecting an action changes that example's state. Reader thought bubbles communicate the need behind a user action; system actions demonstrate the corresponding assistance. Previous/next controls and restart support guided exploration.

For the rationale, we organized the map as **Observations & basis → Design motivations → Design responses**. Selecting any node highlights its related paths and reveals source-backed explanations and concrete mechanisms below the graph. We removed observation-reordering controls and misleading expand-style labels. Source identifiers and our own labels are explained, and connections are not presented as measured causal findings.

### Implemented: ScholarPhi tutorial and rationale

- Replaced the initial invented `k` example with LISA, using curated paraphrases of [Linguistically-Informed Self-Attention for Semantic Role Labeling](https://aclanthology.org/D18-1548/), a paper used in ScholarPhi's examples.
- Added three steps: look up a term, explore more context if needed, and resume reading. A single scene supports definition lookup, source context, other usages, and dismissal.
- Made the selected term and relevant controls more visible and added reader thought bubbles. Removed the redundant **Optional** badge from the second step.
- Expanded the rationale beyond three initial examples to all seven motivations (M1–M7) and four feature families. The map includes a selectable relationship between keeping the paper visible and providing sufficient context.
- Distinguished pilot feedback from the prior-research basis for M7. The interactive tutorial demonstrates tooltip behavior; the graph also explains decluttering, equation diagrams, and the priming glossary.

Basis: [ScholarPhi, §§3.3–4.4](https://arxiv.org/html/2009.14237v3). Source context is displayed inline in our simplified tutorial; this is an adaptation of the original interface.

### Decision and implementation: merge Paper Visuals into Papers

We merged the separate Paper Visuals view into the selected paper's page. The workspace now has **Papers** and **Across Papers**, with three content tabs inside Papers: **Overview**, **How it works**, and **Design rationale**.

We first considered section links on one long page, then changed to tabs that show one section at a time. We also replaced the persistent left sidebar with a paper selector at the top: one full-width row per title, publication metadata, and **Hide list / Change paper** controls. The workspace is wider, with a maximum width of 1760 px, to make better use of available screen space.

The graph uses connectors based on the rendered node positions. On narrow screens it stacks vertically and shows connection labels; tutorials also stack their steps and shared example. The comparison matrix retains its separate horizontal scrolling behavior when needed.

### Implemented: Scim tutorial and rationale

The shared example illustrates skimming with four facets: **Objective**, **Novelty**, **Method**, and **Result**.

- Added three steps: orient reading, tune highlights, and return to context.
- Added per-facet density controls and paragraph-level More/Fewer controls, a live highlight count, and a simplified location strip.
- Added a highlight browser grouped by section; selecting an entry locates the passage while preserving its surrounding text. The list and count respond to density changes.
- Added all seven author design goals (D1–D7), connected to four interface feature groupings (F1–F4). Classification accuracy and reader control remain distinct concerns.
- Labeled the six sample passages and facet assignments as curated teaching content. The tutorial runs no classifier and does not implement the paper's proposed adaptive personalization ideas.

Basis: [Scim, §§3.1–4.5 and implementation details in §5](https://arxiv.org/html/2205.04561v3). Tutorial passage content also draws on the evaluation discussion in §7.2. The source is attributed as CC BY 4.0.

### Implemented: SciDaSynth tutorial and rationale

The shared example uses three invented crop-study records to demonstrate a structured extraction workflow. The research setting motivates the example, but its document labels, source passages, and values are teaching fixtures.

- Added four steps: specify information, validate a record, standardize variations, and keep/export the table.
- Added a prepared extraction request and table with a missing processing value. Readers can inspect the corresponding example source and edit the value; the missing-value count updates.
- Added a proposed group for crop-name variants. Readers choose its members, edit the shared label, and apply it to selected records; the unique-value count updates.
- Added a local table snapshot and CSV download. Saved edits invalidate the previous snapshot so an outdated table cannot be exported without being kept again.
- Added all three author goals, expanding DG3 into preliminary quality evaluation, source verification, and batch refinement. The graph connects them to query-driven tables, validation support, semantic grouping, and iterative database/export features.
- Distinguished the paper's database/LLM functionality from our fixed frontend demonstration. The database/export edge is explicitly described as a workflow interpretation; quality signals are not treated as proof of correctness.

Basis: [SciDaSynth, Formative Study and System](https://journals.sagepub.com/doi/full/10.1002/cl2.70073), published in Campbell Systematic Reviews in 2025, attributed as CC BY 3.0.

### Shared implementation and state behavior

`PaperVisuals.jsx` now selects the appropriate tutorial and renders a reusable rationale graph for all three papers. `TutorialFrame.jsx` shares the step/action structure for Scim and SciDaSynth. ScholarPhi content remains in `src/data/paperVisuals.js`; `src/data/visualModels.js` adds the common configuration and the other papers' rationale data. Each new tutorial has its own component.

Switching paper sections or workspace tabs preserves the current paper's in-memory tutorial state. Selecting another paper resets the visual state and returns to Overview. Restart resets the tutorial; a page reload resets the workspace. There is no backend or persistent browser storage. CSV export is limited to the SciDaSynth example table.

The existing four-dimension matrix, same-row two-cell selection, and 12 predefined pairwise comparisons remain available under Across Papers. No separate fine-grained comparison or general text-annotation tool was added.

### Validation recorded

The final implementation passed ESLint, the production build, and Git whitespace checks using Node.js 22.22.2. Browser checks covered:

- Scim density changes, synchronized highlight counts and lists, paragraph-control boundaries, and navigation back to a passage.
- SciDaSynth source-based correction, batch label updates, exported CSV contents, and invalidation of a previously kept snapshot after editing.
- Rationale-node selection, matching source links, and navigation from a feature explanation to its tutorial.
- State preservation across the selected paper's content tabs and reset when changing papers.
- A 390 px layout check with no page-level horizontal overflow in the tested SciDaSynth tutorial and rationale views.
- ScholarPhi definition lookup and its full rationale map after the shared-component refactor; no browser errors were recorded in the checks.

These are implementation checks, not user-study findings. No automated regression suite was added in this iteration. The documentation update records these completed checks; it does not rerun them or change application behavior.

### Remaining scope

The semester implementation remains frontend-only. Study task selection and participant deliverables still need to be decided. Paper upload, live search, LLM extraction, general annotations/comments, note synthesis, code diagrams, fine-grained comparison, and brief/RQ generation remain unimplemented. The tutorials explain selected mechanisms from published systems; they do not integrate those systems or establish their comparative effectiveness.

## 2026-10-07 — Initial paper set and comparison prototype

This early October 7 checkpoint records the initial setup and interface work from October 6 through the comparison prototype and first documentation update (`e76ef02`). Later changes are recorded in the entry above.

### Research focus and implementation scope

We are focusing on how to provide contextual information that helps readers understand papers and their relationships. We are using comparison as a presentation mechanism rather than making comparison strategy the central research contribution.

Our intended users are students with some paper-reading experience and HCI knowledge who are exploring an unfamiliar subfield. The use scenario starts with an existing collection of candidate papers. In the current prototype, we supply that collection as three built-in papers instead of implementing import or search.

We agreed to keep the semester implementation frontend-only and refine the interface without adding a backend. The specific study task and required participant deliverable remain undecided.

### Decision: start with three papers that have accompanying code

| Selected paper | Publication | Contextual support illustrated | Sources |
| --- | --- | --- | --- |
| Augmenting Scientific Papers with Just-in-Time, Position-Sensitive Definitions of Terms and Symbols (ScholarPhi) | CHI 2021 | Understanding paper-specific terms and symbols in reading context | [Paper](https://arxiv.org/abs/2009.14237v3) · [Code](https://github.com/allenai/scholarphi) |
| Scim: Intelligent Skimming Support for Scientific Papers | IUI 2023 | Finding salient passages and adjusting skimming support | [Paper](https://arxiv.org/abs/2205.04561v3) · [Code](https://github.com/rayfok/scim) |
| SciDaSynth: Interactive Structured Data Extraction from Scientific Literature with Large Language Model | Campbell Systematic Reviews, 2025 | Extracting, validating, and organizing structured information across papers | [Paper](https://doi.org/10.1002/cl2.70073) · [Code](https://github.com/xingbow/SciDaEx) |

The three papers share a connection to working with scientific literature while differing in the information they expose and the activities they support. This gives us concrete content for trying a broad comparison matrix. Having accompanying repositories also satisfies our requirement that the initial papers include accessible code.

This selection is an initial implementation choice. We have not established that these three papers represent the whole HCI field or validated their suitability for a particular study task. Linking their repositories does not mean we have reproduced or integrated their systems.

### Decision: keep the single-paper entry concise

We kept the single-paper view focused on the full paper title, publication information, and original abstract, with links to the paper and code. Full titles are the primary identifiers; tool names are used where a compact label is useful.

We decided against adding extensive standalone summaries of motivation, users, and methods below the abstract at this stage. That would repeat information readers can find in the paper. We instead prioritized exposing contextual information across papers.

### Decision: begin with a four-dimension matrix

We selected four broad dimensions for the initial three-paper comparison:

1. **Problem & Motivation** — the difficulty that motivates the work.
2. **Users & Use Context** — who needs support and in what activity.
3. **Support & Interaction** — what information or assistance is provided and how users access it.
4. **Result & Next Action** — what users receive and what they can do with it.

All three papers remain visible in the matrix. Users can select two cells from different papers in the same row to inspect their relationship. Cross-dimension selection is excluded from this version so the comparison has a clear shared basis.

Cell selection is distinct from text highlighting and commenting. It currently opens a predefined comparison; it does not create an annotation or invoke a model.

### Decision: prioritize similarities and differences

The relationship dialog now centers on **Similarities** and **Differences**, followed by **Check the source context**.

We removed the separate **How to read this difference** section because it often repeated the difference without adding useful context. A necessary qualification can remain within the relevant comparison text instead of requiring another section for every pair.

Source context remains available so readers can inspect the supporting material. The displayed notes are paraphrases and interpretations, not author quotations or evidence that one system performs better than another.

### Implemented so far

- Initialized a React + JavaScript/JSX + CSS project using Vite and ESLint.
- Added the **Papers** and **Across Papers** tabs.
- Built the three-paper sidebar and selected-paper title, publication, and abstract view.
- Added abstract authorship, source/version, and license attribution, plus paper and repository links.
- Added the four-row, three-paper comparison matrix with section references and source links.
- Added same-row selection of two papers, deselection, clear selection, and selection feedback.
- Added 12 curated pairwise comparisons covering all three pairs across all four dimensions.
- Added the relationship dialog with similarities, differences, and source context.
- Preserved selections while switching tabs within the current page session.
- Added keyboard tab navigation, visible focus styling, dialog dismissal, and horizontal matrix scrolling for narrow layouts.

Paper records are stored in `src/data/papers.js`. Matrix content and comparison notes are stored in `src/data/comparison.js`. All content is bundled with the frontend, and interaction state is held in memory.

### Validation recorded

The implementation passed ESLint and the production build using Node.js 22.22.2. Earlier interaction checks covered same-row selection, the two-paper limit, deselection/reset, relationship display, Escape dismissal, and selection persistence across tabs. Code checks also covered all 12 comparisons and selection-order consistency.

After removing the redundant interpretation section, lint and build passed again. This documentation update does not change application behavior. These checks establish implementation behavior, not usability or research effectiveness; those require the planned studies.

### Not implemented or decided in this entry

Text highlighting, comments, note synthesis, fine-grained comparison, concept-based discovery, code diagrams, and brief/RQ generation remain outside the implemented interface. A code repository link is available, but no code analysis runs in the app.

We have not selected the next feature in this entry. We will review the current step and decide the next bounded change together.
