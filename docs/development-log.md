# Development Log

This log records project decisions and completed implementation. Features discussed but not built are identified separately; they are not commitments for the next development step.

## 2026-10-07 — Initial paper set and comparison prototype

This entry consolidates the recent decisions and implementation work completed through October 7, including the initial setup and interface work from October 6.

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
