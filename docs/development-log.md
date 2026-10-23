# Development Log

This log records project decisions and completed implementation. Features discussed but not built are identified separately; they are not commitments for the next development step.

## 2026-10-22 — Redesign Across Papers and consolidate its design record

### Reason and scope

The existing matrix exposed useful dimensions but repeated long descriptions and source labels. Its relationship dialog largely repeated prose. The user wanted a more approachable relationship entry and visual comparisons that reveal similarities and differences without duplicating the single-paper pages. We developed each presentation incrementally, then extended it across the fixed three-paper collection.

The full [Across Papers content and design record](across-papers.md) documents the final implementation at `78dbac895b1ebe750c95ea89a744e15625fbb8d3`, the sources and section locators, all twelve pair results, and coverage limits. The initial matrix and dialog descriptions in the October 7 entries below remain historical; the current result interface is inline.

### Decisions and implementation

- Added a relationship entry map with three paper nodes, three pair connections, and an all-three overview (`9038923`). Its positions and links express selected editorial relationships, not similarity scores, set overlap, or workflow order. Its selection remains independent of the matrix.
- Simplified every matrix cell to a short headline and qualifying sentence, replaced repeated selection prompts with compact indicators, and made full paper titles expandable. All three papers and four comparison dimensions remain available.
- A first visual Support example appeared inline while other results still used dialogs. The user identified this as inconsistent and easy to miss. We unified every result below the matrix, with explicit Compare selected, automatic scrolling/focus, and Back to selection (`04d1515`). Returning preserves the selection; changing or clearing it hides the old result.
- **Reader output:** introduced Scim × SciDaSynth (`a9fdeea`), then added both ScholarPhi pairs (`39a8a19`). Static output illustrations show contextual definitions, highlighted passages/navigation, and structured data/CSV, aligned with what readers receive and can do next. Placeholder content is explicitly illustrative.
- **Support:** retained the initial ScholarPhi × Scim example and added the two SciDaSynth pairs (`7b2cd04`). Aligned questions distinguish definition inspection, highlight control, and verification/editing of extracted data. Separate illustrative paths show selected actions within each tool.
- **Problem:** introduced ScholarPhi × Scim (`1c20624`), then extended to both SciDaSynth pairs (`61a3a6e`). Situation → Obstacle → Burden chains emphasize obstacles and compare local comprehension, reading priorities, and data reconciliation. They are motivation summaries, not measured causal diagrams.
- **Reading context:** added all three pair comparisons (`78dbac8`). Scenario cards align current goal, working scope, and when support is needed. Attention diagrams distinguish an expression, passages across a paper, and a collection around an information need. Evidence disclosures separate paper-described settings, our framing, and SciDaSynth's evaluated participant groups.

All twelve pair-by-dimension results now have dimension-specific visual presentations. Shared statements and two-paper evidence remain available in each. The original comparison notes continue to supply the map and source context; the redesign does not discard that evidence or add a model/backend.

### Sources and interpretation boundaries

Primary content comes from [ScholarPhi v3](https://arxiv.org/html/2009.14237v3), [Scim v3](https://arxiv.org/html/2205.04561v3), and the [published SciDaSynth article](https://doi.org/10.1002/cl2.70073). The new record maps each dimension to the current section labels and explains which parts are paraphrases, team synthesis, or teaching illustrations.

These sources ground descriptions of the original tools; they do not prove that our visual comparisons improve reading. Source links currently open whole articles rather than verified passage anchors. SciDaSynth's numbered comparison labels and publisher heading presentation need further alignment checking. This documentation update records that limitation without modifying the UI or claiming a fresh primary-source audit.

### Validation and remaining scope

During the implementation iterations, ESLint and production builds passed; the existing large-chunk warning remains. Browser checks covered all twelve results after unifying the panel and all three pairs within each subsequently updated dimension, source disclosures, navigation back to selection, stale-result removal, keyboard activation, and representative wide/narrow layouts. These are implementation checks, not user-study outcomes or proof of accessibility completeness.

This documentation-only pass added `docs/across-papers.md` and this entry, inspected source and commit history, and checked local Markdown links, whitespace, and changed-file scope. It did not repeat application tests or change application code. No commit or push was performed.

The current comparison remains a curated, frontend-only explanation for three papers. Open questions include evidence discoverability, distinction between context and output diagrams, complementarity of map and matrix, source-link precision, and final usability review. Automatic comparison generation, general annotation, fine-grained evaluation/method comparisons, and arbitrary paper import remain outside this iteration. No additional implementation step was decided here.

## 2026-10-16 — Consolidate Scim documentation and audit the general standards

### Reason and scope

Scim now has six populated single-paper tabs, but its dedicated document covered only Related work and this log lacked the intervening October 16 milestones. We expanded [scim.md](scim.md) into the current content and development record, preserving its reference-selection section and adding sources, inventories, design decisions, teaching boundaries, state behavior, and a standards audit.

This entry audits implementation commit `2d510c4`. The milestone entries below were reconstructed from current source and commits `db42945`, `e44367e`, `e1bbc06`, and `badbf37`; they do not invent new implementation dates, participant feedback, or earlier test runs. The October 7 entries remain historical.

### Current coverage and decisions recorded

- **Overview:** source-attributed metadata abstract, identity, and source links. The metadata abstract differs from the rendered paper's abstract; both are source presentations, and the existing text matches its linked metadata record.
- **How it works:** four core families, one authentic excerpt collection, and explicit teaching adaptations. The current dataset has four groups, seven paragraphs, twenty sentences, eleven categorized candidates, four Figure 3 correspondences, and five initial highlights.
- **System Pipeline:** eleven nodes across model development, per-paper processing, and reading interaction, with pinned code sources and two unresolved verification chains.
- **Design rationale:** all seven author goals, four feature families, and eleven goal–feature links: eight author-explicit and three inferred. Reported basis and team-added identifiers remain distinguished.
- **Evaluation & Findings:** all three evaluation types, selected results, methods on demand, and eight limitation/boundary entries. Evidence about the original tool is distinct from evaluation of our workspace.
- **Related work:** the approved HiText/TLDR entries and question-driven screening gates remain; rationale also contains Cohan, Teufel, and ScholarPhi contexts. No comprehensive bibliography-screen claim was added.

### Remaining gaps identified

The [standards audit](scim.md#standards-audit-and-remaining-gaps) separates intentional demo limits, unresolved source questions, proposed presentation improvements, and research-validation needs. Key follow-ups are prominent intended-user scope, source-link version consistency, whole-paper versus excerpt-map clarity, discovery of node-specific references, and a combined six-tab keyboard/responsive review. Training/checkpoint provenance and the exported-data/reader-schema bridge remain explicitly unverified. No new mandatory tab was identified, and no proposed UI change was implemented.

### Validation and changes made

This documentation pass inspected the current source, styles, and commit history, calculated data inventory counts, and checked the arXiv metadata/full-text abstract distinction. Relative Markdown links/anchors, whitespace, and documentation-only diff scope were checked. The previous Related work test record is retained below; no fresh full-app browser regression, build, lint run, upstream system reproduction, or user evaluation is claimed for this prose-only update. Only `docs/scim.md` and this log were edited. No commit or push was performed.

## 2026-10-16 — Add question-driven contextual references for Scim

### Reason and scope

The user preferred HiText and TLDR as explanations of Scim's approach over a similarity-ranked list, while asking for a more concrete and reproducible selection standard. We added a Scim-specific Related work tab and recorded the bounded selection in the [Scim content and development record](scim.md#related-work-contextual-reference-selection).

### Decisions and implementation

- Begin with two explicit understanding questions and include one source-checked reference per question in this pass.
- Record five screening gates: question fit, traceable relationship, primary evidence, incremental explanatory value, and bounded interpretation. Record already-covered and deferred alternatives. These gates make decisions auditable; the two candidates were nominated before formalizing the procedure, and no exhaustive bibliography screening or unique optimal selection is claimed.
- Lead each reference with a question, full title, publication, relationship, external mechanism, and its contrast with Scim. Keep the inclusion reason and material qualifications visible.
- Make evidence with section/page/figure links and the selection method expandable. Distinguish original-paper descriptions from our explanatory comparison; do not imply code inheritance or comparative effectiveness.
- Preserve ScholarPhi's existing Related work implementation and discovery route. No external tool, ranking service, or model runs in this new tab.

Content is in `src/data/scimRelatedWork.js`; the view is `src/ScimRelatedWork.jsx` with its stylesheet. `App.jsx` and `PaperVisuals.jsx` expose and render the new tab.

### Validation

ESLint, the production build, and whitespace checks passed. Browser checks confirmed Scim's new tab, both reference entries, independent evidence disclosures, selection-method expansion, and keyboard Enter dismissal of the HiText disclosure. At a 390-pixel viewport, the comparison panels stack and document width remains 390 pixels without horizontal overflow. The viewport was restored and the desktop layout inspected. No browser warnings or errors were recorded. These checks do not establish comprehension benefit. No commit or push was performed.

## 2026-10-16 — Add Scim Evaluation & Findings

Retrospective entry for implementation commit `badbf37`, consolidated on October 16 from the current source and commit record.

### Reason and decisions

A tutorial can explain capabilities without showing whether they worked, for whom, or under which tasks. We therefore added Evaluation & Findings to separate the lab information-seeking study, longitudinal diary study, and preliminary technical check, while retaining the earlier formative work in Design rationale.

### Implemented

- Added a three-study overview and selectable mean-time comparisons for all questions, answers within highlights, and answers outside highlights. Kept the scanning-versus-comprehension distinction visible.
- Presented accuracy and perceived difficulty alongside timing, including nonsignificant results. Means, statistical detail, and methods are attributed to the paper; our chart is not the original distribution plot.
- Organized diary findings into five themes with expandable observations, participation/material/analysis details, and correct response-versus-participant denominators.
- Explained significant-sentence-selection F1 separately from facet-classification accuracy and reader understanding.
- Added eight limitation/boundary entries distinguishing user difficulties, author discussion, potential risks, and our scope interpretation. Kept uncertainty about study-highlight manual correction explicit.

Sources: [Scim §5.2.2](https://arxiv.org/html/2205.04561v3#S5.SS2.SSS2), [§§6–8](https://arxiv.org/html/2205.04561v3#S6). Files: `src/ScimEvaluation.jsx`, `src/ScimEvaluation.css`, plus tab integration. [Current inventory and coverage](scim.md#evaluation--findings) retains the results and qualifications. No new runtime verification is implied by this retrospective entry.

## 2026-10-16 — Add Scim System Pipeline

Retrospective entry for implementation commit `e1bbc06`, consolidated on October 16 from the current source and commit record.

### Reason and decisions

The feature demo explains what readers do, but not how sentence data becomes highlights or which operations run during reading. We added an explanatory pipeline with separate model-preparation, paper-processing, and browser-interaction phases rather than implying that every UI action invokes a language model.

### Implemented

- Added eleven selectable nodes with input, processing, output, timing, relevance, and paper/code sources. Model preparation is expandable; each phase has its own selected-node detail panel.
- Named transferred data and actions, showed linked reading views as parallel outputs, and represented controls as a loop back to selection/rendering.
- Pinned repository links to `3380689fc0df7912ce72e65add56beb692bb7050`. Distinguished four visible facets from the default predictor's five labels and reader-side rules.
- Marked the exported-artifacts-to-reader-data conversion as an unverified handoff, and preserved the missing complete training-to-checkpoint verification. Static inspection does not establish an executable end-to-end reproduction.

Sources: [Scim §5](https://arxiv.org/html/2205.04561v3#S5) and [pinned repository](https://github.com/rayfok/scim/tree/3380689fc0df7912ce72e65add56beb692bb7050). Files: `src/ScimPipeline.jsx`, `src/ScimPipeline.css`, `src/data/scimPipeline.js`. [Node inventory and boundaries](scim.md#system-pipeline) remain the current reference. No model execution or new source-code audit was performed while backfilling this entry.

## 2026-10-16 — Expand Scim Design rationale and contextual evidence

Retrospective entry for implementation commit `e44367e`, consolidated on October 16 from the current source and commit record.

### Reason and decisions

The initial map needed to explain how goals were formed, what was traded off, and which connections were authored versus inferred. Source citations on endpoint nodes alone were insufficient to support each relationship.

### Implemented

- Added the formative process and three source-based trade-off summaries before the graph. Separated formative observations from evaluation of the finished system.
- Retained all seven author goals and four feature families, with eleven goal–feature relationships. Added relationship-specific evidence and explicit/inferred styling plus textual labels.
- Split D5 into automatic distribution and local requests for more highlights. Kept scrollbar feedback as an inferred connection to D7. Clarified that category colors do not guarantee accurate classification.
- Added on-demand category-provenance context from Cohan et al. and Teufel et al., and the ScholarPhi lowlighting precedent, attached to relevant selected nodes. Distinguished task-specific design exploration from a universal performance comparison.
- Preserved node filtering, substantive detail, and shortcuts into the corresponding tutorial feature; narrow layouts have textual connection labels.

Sources: [Scim §§3–5](https://arxiv.org/html/2205.04561v3#S3), plus the external sources and locators in [scim.md](scim.md#design-rationale). Files: `src/data/scimRationale.js`, `src/data/visualModels.js`, `src/ScimRationale.jsx`, `src/ScimRationale.css`, and shared `PaperVisuals`. This entry confirms implemented content from source, not new user feedback or fresh interaction tests.

## 2026-10-16 — Replace Scim's step-only tutorial with four core feature families

Retrospective entry for implementation commit `db42945`, consolidated on October 16 from the current source and commit record.

### Reason and decisions

The initial three-step example could make a small demonstration look like the complete tool. We first exposed the four core feature families, then used one authentic paper across their demonstrations. This makes capability scope visible while avoiding repeated unrelated examples.

### Implemented

- Added selectable faceted highlights, highlight controls, highlight distribution, and highlight browser/context linking. These are alternative capabilities, not required sequential stages.
- Replaced the earlier six illustrative passages with selected published text from Wu et al. (2022), the paper used for Scim Figure 3. Four category correspondences follow that figure; additional labels and all priorities are teaching choices.
- Added linked global/local controls, counts, an excerpt distribution overview, section-grouped browsing, return-to-context focus, sentence explanations, and reset.
- Preserved settings when changing features. Kept category color distinct from reading-location highlighting and identified omissions, attribution, no live classification, and the difference between excerpt order and PDF coordinates.

Sources: [Scim §§4.2–4.5](https://arxiv.org/html/2205.04561v3#S4.SS2) and [Wu et al., NAACL 2022](https://aclanthology.org/2022.naacl-main.40/). Files: `src/ScimTutorial.jsx`, `src/ScimTutorial.css`, `src/data/scimExample.js`, plus rationale/tutorial integration. [Current inventory](scim.md#how-it-works) supersedes the October 7 tutorial description. No additional historical test results are asserted in this backfilled entry.

## 2026-10-16 — Make the Priming glossary demonstration start with reading

### Reason and decision

The preview-first demonstration could imply that readers must inspect the whole glossary before reading. The label “Read with the reference” also left unclear whether “reference” meant a glossary or cited papers. We chose to demonstrate the reading use case first while preserving terminology preview as an alternative.

### Implemented changes

- Default to **Read with glossary**, with the LISA passage on the left and the glossary on the right on wide screens. Their document order also places the passage first in stacked layouts.
- Rename the other mode to **Preview terminology**, which shows only the eight selected glossary entries and clears the current selection.
- Preserve clicking marked passage symbols to locate and highlight their corresponding glossary entries.
- Update the feature description, reader thought bubble, and selected-entry feedback to clarify glossary use.

This is an adaptation of the tutorial, not a change to our account of ScholarPhi's original design. [ScholarPhi §4.4](https://arxiv.org/html/2009.14237v3#S4.SS4) describes a glossary before the paper for familiarization and as a side-by-side reference. Both uses remain represented. The curated entries and sources are unchanged.

### Documentation and validation

Updated the README with the current glossary controls and layout, and [scholarPhi.md](scholarPhi.md#53-reading-first-glossary-demonstration) with the rationale, source distinction, behavior, and development checkpoint. The general standards remain unchanged because the default is a paper-specific teaching choice, not a new requirement for all HCI tools.

The implementation passed lint, production build, and whitespace checks. Browser checks confirmed the default reading state, wide-screen left/right layout, symbol-to-entry highlighting, glossary-only preview with eight entries, and return to reading mode. No browser warnings or errors were recorded. This documentation follow-up records those checks without rerunning the application or claiming a usability result. No commit or push was performed.

## 2026-10-16 — Explain ScholarPhi's implementation with System Pipeline

### Reason and agreed scope

The existing How it works tab shows what a reader can do, but does not explain where definitions, symbol locations, and relationships come from. We added a separate **System Pipeline** tab to connect those features to their implementation: what enters each stage, how it is processed, what comes out, and where the supporting code can be inspected.

This addition is limited to ScholarPhi. It preserves the frontend-only prototype and adds an explanation of the original system, rather than integrating or running its backend. The detailed decisions and coverage record are maintained in [scholarPhi.md](scholarPhi.md#43-system-pipeline-explain-how-the-implementation-supports-the-features).

### Evidence before presentation

We inspected [allenai/scholarphi at commit 05712d5](https://github.com/allenai/scholarphi/tree/05712d5bcd59d37db32a390da2fa62c123d132e7). Node-level links use the full commit hash so the explanation refers to a stable code revision. The inspection followed the TeX processing commands, entity dependencies, localization/storage code, API retrieval, and browser feature implementations. The pipeline summaries are our code-based synthesis, not author quotations or a verified reconstruction of the study deployment.

### Design decisions and implementation

- Added System Pipeline after How it works in ScholarPhi's selected-paper tabs.
- Separated **preparation** (green, seven nodes) from **reading-time behavior** (blue, six nodes), with explicit timing labels and a stored-data handoff between them.
- Preparation covers paper sources, sentences, equations, symbols, definitions, entity localization, and storage. Reading covers opening the PDF, fetching prepared data, and the four core features.
- Used dependency arrows for equations → symbols and sentences/symbols → definitions. Localization is a shared operation repeated inside pipelines; storage summarizes repeated uploads rather than a single final transaction.
- Presented the four reading features as alternatives that share data, avoiding a misleading sequence. Ordinary reading clicks reuse prepared information rather than rerun extraction.
- Made all 13 nodes selectable. Each phase has its own detail panel containing Input, Processing, Output, why the stage matters, relevant qualifications, and pinned code links.
- Added selected-node and connected-arrow emphasis, keyboard focus styling, and responsive stacking with a textual dependency summary.
- Added an expandable coverage note explaining repository/study-version differences, feature switches, omitted citation processing, and the distinction between the visible glossary and the external-glossary extractor.

Implementation lives in `src/ScholarPhiPipeline.jsx`, `src/ScholarPhiPipeline.css`, and `src/data/scholarPhiPipeline.js`, with tab integration in `src/App.jsx` and `src/PaperVisuals.jsx`.

### Coverage and validation

The map explains selected paths, not every module or deployment concern. We did not run ScholarPhi, verify its external services, establish arbitrary PDF-only support, or test extraction quality. The automatic code path should not be confused with the original evaluation's curated contextual data.

ESLint, the production build, and Git whitespace checks passed. Browser checks verified all 13 nodes' selected states, corresponding input/processing/output details, and source-link presence. Visual checks covered dependency arrows and wide/narrow layouts; the tested layouts had no page-level horizontal overflow, and no browser warnings or errors were recorded. This documentation follow-up records those completed checks and does not claim a new full regression run or a user-study result.

The changes remain in the working tree for review. No commit or push was performed.

## 2026-10-16 — Make ScholarPhi context explain a concrete reading question

This entry records the reference review and the subsequent integration of six approved context explanations. Reference-image and placement corrections were already committed in `0204ac6`; the six-context integration and this log update form the current follow-up. Earlier entries describe historical checkpoints, not the latest feature inventory.

### Why we changed the context presentation

The initial reference panels and related-paper entries provided useful sources, but did not consistently explain what a reader would learn from them. A reference link or a similar-paper recommendation alone did not establish why that material helped with the paper currently being read. We therefore organized each context around a specific reading question, its relationship to ScholarPhi, an explanation, and supporting evidence.

The goal remains contextual understanding. We are not introducing a new comparison strategy or treating relatedness as evidence that one system is better than another.

### Corrections already implemented in `0204ac6`

- **Readable reference figures:** The Wikipedia screenshot was too small to read. We replaced it with the original 1169 × 608 image and re-extracted Hands-On Math Figure 13 from the author-hosted PDF. Both figures have captions, attribution/source links, and full-size viewing links. The purpose is to make the illustrated interaction inspectable.
- **Match references to the claims they support:** Human–AI interaction guidelines concern error recovery, not Declutter's fading technique. We moved that reference to ScholarPhi's O7/M7 rationale and removed the unrelated personalization sentence. Hands-On Math is explicitly identified as a symbol-selection precedent, rather than the source of the equation-diagram label layout.
- **Clarify the related-work section:** Renamed **Extra work** to **Related work** so the tab describes its content rather than sounding like an additional assignment.
- **Clarify selection provenance:** The original teammate log described a graph-guided curated selection. The subsequent team clarification specified the rule: rank by Connected Papers similarity to ScholarPhi, exclude papers already in the workspace, and take the first three remaining papers. On October 16, the displayed scores were Threddy 30.4, CiteSee 26.9, Scim 25.9, and CiteRead 24.8. Scim is already in the workspace, so the retained set is Threddy, CiteSee, and CiteRead. These are observed external scores, not values computed by our prototype. The page records the exclusion rule and check date; it does not update rankings automatically.

The earlier [teammate log](Bob_development-log.md) remains a historical record. This entry records the clarified rule and revised reference placement. Ranking source: [Connected Papers graph for ScholarPhi](https://www.connectedpapers.com/main/60bf101bd61fb5fa526c1ae25d808e86958724ad/Augmenting-Scientific-Papers-with-Just%20in%20Time%2C-Position%20Sensitive-Definitions-of-Terms-and-Symbols/graph).

### Implemented now: six approved context explanations

| Context | Location | Reading need and reason for the change |
| --- | --- | --- |
| Wikipedia Page Previews | How it works → Definition tooltips → Reference | Explain how an article preview differs from a definition selected for a term's location in a paper. A familiar interaction example needs an explicit connection to ScholarPhi. |
| Human–AI Interaction Guidelines | Design rationale → O7 or M7 → Reference | Explain recovery when an extracted definition is missing or unhelpful. Preserve the distinction between prior research supporting M7 and feedback from ScholarPhi's own participants. |
| Hands-On Math | How it works → Equation diagrams → Reference | Explain selection of meaningful mathematical parts. Limit the claimed connection to symbol selection rather than attributing the full diagram design to this work. |
| Threddy | Related work → Threddy | Explain the transition from within-paper definitions to passages, citations, and persistent research threads. A citation and conceptual connection do not establish code reuse. |
| CiteSee | Related work → CiteSee | Explain how a reader's history adds context to citations. Distinguish its explicit code reuse from its different information focus. |
| CiteRead | Related work → CiteRead | Explain how later citing papers can add commentary to the current paper. Distinguish shared reader infrastructure from the source of the contextual information. |

Each explanation now contains **Question this context helps answer**, **Relationship**, a context paragraph, and **Evidence & sources** links. The approved text is stored centrally in `src/data/scholarPhiContexts.js` and rendered by `PaperContext.jsx` with shared styling in `PaperContext.css`.

### Presentation decisions

- Replaced overlapping reference introductions and related-work connection/extension paragraphs with the approved explanations, rather than appending another duplicate summary.
- Kept the three reference explanations inside their existing disclosures and added source names to the disclosure labels so readers can anticipate the contents.
- Kept the three related-work explanations visible within their paper entries, with evidence links available on demand through **Evidence & sources** disclosures.
- Retained the source figures, captions, full-size links, paper descriptions, and paper-reading links.
- Marked the text as source-based summaries and cross-system comparisons as our interpretation. These are not author quotations, measured causal relationships, or comparative effectiveness findings.

### Evidence basis

- [ScholarPhi §§2.2.1–2.2.2, §3.3 M7, and §4.1](https://arxiv.org/html/2009.14237v3); [Wikipedia Page Previews introduction](https://www.mediawiki.org/wiki/Page_Previews#Introduction).
- [Wright et al., A Comparative Analysis of Industry Human-AI Interaction Guidelines, p. 4](https://arxiv.org/pdf/2010.11761#page=4).
- [Hands-On Math, Fingertip Area Selections and Figure 13, p. 22 / PDF p. 6](https://www.andrewbragdon.com/papers/hands-on-math.pdf#page=6).
- [Threddy §2.2, p. 3](https://arxiv.org/pdf/2208.03455#page=3); [CiteSee §4.6](https://arxiv.org/html/2302.07302#S4.SS6).
- [ScholarPhi project: publications using its reader](https://scholarphi.org/); [CiteRead](https://doi.org/10.1145/3490099.3511162).

### Validation and scope

The six-context implementation passed ESLint, the production build, and Git whitespace checks. Browser checks verified the six context explanations at their intended locations, the three related-work evidence disclosures, the feature-reference disclosures, and the O7/M7 reference entry through M7 selection. Visual inspection covered the related-work context layout. This documentation-only follow-up records those checks; it does not claim a new full regression run or a completed user study.

The content remains curated and bundled with the frontend. This change does not add live recommendation, automatic extraction, new papers to the workspace, or changes to Across Papers. The current work has not been committed or pushed as part of this documentation task.


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

Historical checkpoint: the three-step/six-passage tutorial below was superseded by `db42945` on October 16; rationale evidence was expanded in `e44367e`. See [scim.md](scim.md) for current behavior and coverage.

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
