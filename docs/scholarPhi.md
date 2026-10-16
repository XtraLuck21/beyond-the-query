# ScholarPhi: Paper-Tab Development and Context Selection Record

Last updated: October 16, 2026  
Implementation reviewed: current working tree, including the reading-first Priming glossary update

Scope: the ScholarPhi page in Beyond the Query, including its reference panels, Related work section, and code-based System Pipeline explanation.

This document records the implemented interface, the decisions that led to it, the sources used, and the limits of its coverage. It also records the newly agreed framework-first approach to selecting references. That approach formalizes how we will review and extend the content; it should not be presented as a protocol that was already applied systematically to every earlier choice.

## 1. Purpose and agreed development approach

The intended reader has some paper-reading experience and HCI knowledge but may be unfamiliar with the particular research area. The page should help this reader understand what ScholarPhi does, why it was designed that way, what its evaluation supports, and how selected external material clarifies those points.

The research focus is contextual information. A comparison table, tutorial, or diagram is a way to communicate that information, rather than the research objective in itself.

### Framework first, references second

The current team decision is to use this sequence:

1. Establish the framework of ScholarPhi's core content using the paper itself.
2. Check which parts of that framework may still be difficult to understand.
3. Identify what supplementary explanation would help with each difficulty.
4. Search ScholarPhi's cited references for material that supplies that explanation.
5. Select the relevant passage, figure, concept, or result; explain why it is included and where it belongs in the page.
6. Review the resulting explanation for usefulness, source fidelity, and duplication.

The unit of selection is therefore an **explanation attached to a specific understanding need**, not simply an entire reference paper. We do not need a fixed number of references or one reference for every feature. Where the paper and our demonstration already explain a point adequately, no additional reference is required.

The existing three backward-reference panels were introduced before this process was formalized. Their inclusion reasons are documented below as a retrospective review, not evidence that we screened all of ScholarPhi's bibliography.

## 2. Source of truth and provenance

| Material | Source | Role in this page |
| --- | --- | --- |
| ScholarPhi paper | [Augmenting Scientific Papers with Just-in-Time, Position-Sensitive Definitions of Terms and Symbols, arXiv v3](https://arxiv.org/html/2009.14237v3) | Primary basis for the system, design motivations, evaluation, findings, and limitations. |
| ScholarPhi code | [allenai/scholarphi, pinned revision](https://github.com/allenai/scholarphi/tree/05712d5bcd59d37db32a390da2fa62c123d132e7) | Primary source for the System Pipeline map and node-level code links. The prototype explains this code; it does not run or integrate the original system. |
| ScholarPhi project | [scholarphi.org](https://scholarphi.org/) | Project information and evidence about subsequent publications using the reader. |
| Reading example | [Linguistically-Informed Self-Attention for Semantic Role Labeling (LISA), EMNLP 2018](https://aclanthology.org/D18-1548/) · [PDF](https://aclanthology.org/D18-1548.pdf) | Shared example for the four feature demonstrations. It is the material being explained, not a design-precedent reference selected by the new screening process. |
| Historical team decisions | [Development log](development-log.md) | Records layout, interaction, content, corrections, and prior validation. |
| Teammate's original rationale | [Bob Development Log](Bob_development-log.md) | Records the initial reference and related-work selections. Some placements and selection descriptions were subsequently corrected. |

Provenance must remain explicit:

- **Author content:** original abstract, reported motivations, feature descriptions, study results, and stated limitations.
- **Our source-based synthesis:** observation summaries, map organization, explanatory connections, contextual summaries, and comparisons.
- **Our code-based synthesis:** the System Pipeline map, dependency grouping, and input/processing/output summaries, checked against a pinned repository revision rather than assumed to match the original study implementation exactly.
- **Our teaching adaptation:** staged user actions, thought bubbles, selected excerpts, fixed equation labels, and glossary navigation controls.
- **Team decisions:** content priorities, layout choices, selection rules, and implementation scope.
- **External discovery metadata:** the dated Connected Papers ranking used for Related work; it is not calculated by this app.

## 3. Core content framework and current coverage

The following six questions organize this record. They consolidate the reading needs discussed during development; they are not a validated paper-comprehension instrument or a verbatim questionnaire from a source publication.

| Reader question | Current presentation | Coverage boundary |
| --- | --- | --- |
| What problem does this paper address? | Original abstract; observation and motivation summaries. | Covers the central reading problem, not every argument in the introduction or related work. |
| Who is the system for, and in what situation is it used? | Overview, situated reading examples, and evaluation participant/material details. | The evaluated participant sample is not a complete definition of all intended users. |
| What does the system provide, and how is it used? | Four-feature overview and selectable demonstrations. | All four feature families are represented; their mechanisms are demonstrated selectively. |
| Why were these design decisions made? | Observations & basis → Design motivations → Design responses. | All seven reported motivations are represented. The graph is our synthesis, not a complete reconstruction of every pilot observation. |
| How was it evaluated, and what was found? | Evaluation & Findings, with expandable study and result details. | Selected substantive findings from the final study, not every analysis, quotation, or implementation experiment. |
| What are the limits of the evidence? | Study-scope limits, short-term use, curated-data condition, and a reported incomplete-definition failure. | Selected important boundaries; not an exhaustive transcription of the paper's discussion. |

**No current tab reproduces the entire paper.** Complete coverage claims are limited to explicitly enumerable sets: the original abstract, the four core feature families, and M1–M7. Broad coverage of the research narrative is different from exhaustive coverage of all paper information.

The System Pipeline tab now explains selected automatic processing and reading paths from the repository. It is not exhaustive architecture coverage. The full related-work literature, every formative-study detail, and the complete statistical analysis also remain outside comprehensive coverage.

## 4. Page structure and presentation decisions

### 4.1 A single paper page

The initial page showed the paper title, publication, abstract, and paper/code links. We avoided adding numerous disconnected summaries below the abstract because that would duplicate the article without necessarily improving understanding.

Visual explanations were initially developed in a separate Paper Visuals tab. We then merged them into Papers because the abstract and explanations refer to the same selected paper.

The current ScholarPhi page has six sections:

1. **Overview**
2. **How it works**
3. **System Pipeline**
4. **Design rationale**
5. **Evaluation & Findings**
6. **Related work**

Selecting a section displays its own content rather than scrolling to a section on one long page. A full-width paper selector sits above the content and can be collapsed. Full paper titles remain the primary identifiers. The workspace was widened to provide more room for diagrams instead of permanently reserving a left sidebar.

Across Papers remains a separate workspace view. Its four-dimension matrix and predefined pairwise explanations are not evidence that the ScholarPhi page covers the full paper or that the compared systems were evaluated head-to-head.

### 4.2 Progressive disclosure

The default view should expose the main content and available capabilities. Detailed evidence, statistical qualifications, and supplementary references can be opened when needed.

We removed the repetitive “How to read this difference” section from pairwise comparisons, the misleading expand-style labels on rationale nodes, and observation-reordering controls that did not add clear value. The tooltip walkthrough no longer displays an additional “Optional” badge: “Explore if needed” already communicates that the action is not mandatory.

### 4.3 System Pipeline: explain how the implementation supports the features

**Reason for adding it.** How it works demonstrates the reader-facing interaction, but does not explain what data makes that interaction possible. The new tab answers a separate question: what enters ScholarPhi, what processing happens before reading, and what runs when a reader opens a paper or uses a feature?

**Evidence and selection standard.** We inspected the original repository at commit `05712d5bcd59d37db32a390da2fa62c123d132e7`. The map follows the TeX-based processing route and the API/browser paths that support the four core reading features. It groups stages by their data dependencies and role in explaining those features, rather than reproducing the repository's folder structure. Every node provides input, processing, output, an explanation of its relevance, and links pinned to that revision, with line anchors where applicable.

| Phase | Included nodes | Main code evidence |
| --- | --- | --- |
| Preparation: obtain sources | Prepare paper sources | [Pipeline entry](https://github.com/allenai/scholarphi/blob/05712d5bcd59d37db32a390da2fa62c123d132e7/data-processing/scripts/run_pipeline.py); [preparation commands and dependency ordering](https://github.com/allenai/scholarphi/blob/05712d5bcd59d37db32a390da2fa62c123d132e7/data-processing/scripts/commands.py#L25). |
| Preparation: extract contextual information | Extract sentences; Extract equations; Parse symbols; Detect definitions | Entity pipelines for [sentences](https://github.com/allenai/scholarphi/blob/05712d5bcd59d37db32a390da2fa62c123d132e7/data-processing/entities/sentences/__init__.py), [equations](https://github.com/allenai/scholarphi/blob/05712d5bcd59d37db32a390da2fa62c123d132e7/data-processing/entities/equations/__init__.py), [symbols](https://github.com/allenai/scholarphi/blob/05712d5bcd59d37db32a390da2fa62c123d132e7/data-processing/entities/symbols/__init__.py), and [definitions](https://github.com/allenai/scholarphi/blob/05712d5bcd59d37db32a390da2fa62c123d132e7/data-processing/entities/definitions/__init__.py). |
| Preparation: locate and store | Locate entities on the page; Store linked data | [Color/compile/rasterize/localize procedure](https://github.com/allenai/scholarphi/blob/05712d5bcd59d37db32a390da2fa62c123d132e7/data-processing/common/commands/locate_entities.py#L38); [entity storage](https://github.com/allenai/scholarphi/blob/05712d5bcd59d37db32a390da2fa62c123d132e7/data-processing/common/upload_entities.py#L43). |
| Reading: load the reading surface and prepared data | Open the paper; Load prepared data | [Paper identity](https://github.com/allenai/scholarphi/blob/05712d5bcd59d37db32a390da2fa62c123d132e7/ui/src/index.tsx#L25); [reader data loading](https://github.com/allenai/scholarphi/blob/05712d5bcd59d37db32a390da2fa62c123d132e7/ui/src/ScholarReader.tsx#L711); [API route](https://github.com/allenai/scholarphi/blob/05712d5bcd59d37db32a390da2fa62c123d132e7/api/src/api.ts#L237). |
| Reading: use available features | Definition tooltips; Declutter; Equation diagrams; Priming glossary | [Position-sensitive definition selection](https://github.com/allenai/scholarphi/blob/05712d5bcd59d37db32a390da2fa62c123d132e7/ui/src/components/entity/SimpleSymbolGloss.tsx#L72); [sentence-based mask](https://github.com/allenai/scholarphi/blob/05712d5bcd59d37db32a390da2fa62c123d132e7/ui/src/components/mask/SearchPageMask.tsx#L19); [equation layout](https://github.com/allenai/scholarphi/blob/05712d5bcd59d37db32a390da2fa62c123d132e7/ui/src/components/entity/equation/EquationDiagram.tsx#L363); [glossary filtering](https://github.com/allenai/scholarphi/blob/05712d5bcd59d37db32a390da2fa62c123d132e7/ui/src/components/primer/PrimerPage.tsx#L236). |

**Presentation decisions.** Green and blue regions, each with a numbered heading and timing label, distinguish preparation from use time without relying on color alone. Thirteen selectable nodes reveal details below their respective phase. Preparation arrows expose required dependencies: equations feed symbols; sentences and symbols feed definition detection. The four reading features are parallel choices rather than mandatory sequential steps. Selected extraction nodes emphasize their connected arrows. On narrower screens, groups stack and retain a textual dependency summary.

**Technical distinctions that the diagram preserves.** Localization and uploads repeat within entity pipelines; they are not single final operations after all extraction. Stored data is the handoff to the reader, and ordinary reading clicks do not rerun extraction. Position-sensitive definition selection, equation-label layout, and glossary filtering include browser-side processing. The visible priming glossary is distinct from the separate external-glossary extraction module. Feature availability also depends on [reader settings](https://github.com/allenai/scholarphi/blob/05712d5bcd59d37db32a390da2fa62c123d132e7/ui/src/settings.ts#L166).

**Coverage boundary.** This is a curated explanatory map based on static code inspection, not execution or reproduction of ScholarPhi. The pinned repository includes later changes and is not confirmed to be the exact CHI 2021 study version. It does not establish arbitrary PDF-only processing support, complete or correct extraction, or current availability of external services. The original study's curated data remains distinct from the automatic extraction path. Citation processing is linked as a separate omitted branch; other processing routes, deployment, logging, and editing infrastructure are outside the main map. The tab currently exists only for ScholarPhi.

## 5. How it works: coverage and demonstrations

### 5.1 Why a feature overview was added

The first tutorial focused on lookup, additional context, and dismissal. This made it easy to mistake the tooltip workflow for the entire system. We therefore added a visible overview of all four core feature families, followed by a demonstration of the selected feature.

The four features are **capabilities**, not four obligatory stages of a user workflow. Only the tooltip demonstration uses a three-step reading sequence.

| Feature | User question | Implemented example and interaction | Deliberate demonstration limit |
| --- | --- | --- | --- |
| Definition tooltips, §4.1 | What does this term mean here? | Select LISA, reveal a definition, inspect defining context or two additional usages, and dismiss assistance. Left-side User/System actions drive one shared scene. | One prepared lookup path. Passage, definition, and usages are curated paraphrases. No automatic definition extraction or general position-sensitive retrieval runs. |
| Declutter, §4.2 | Where else is this term used? | Highlight matching sentences containing `A_parse`, fade other displayed text, and navigate occurrences in selected LISA excerpts. | Three excerpts from §2.2, not a full-paper search. Counts refer to the demonstration content, not all occurrences in LISA. |
| Equation diagrams, §4.3 | What do these symbols mean together? | Open LISA Equation (4); inspect four labels for `A_parse`, `Q_parse`, `U_heads`, and `K_parse`; highlight corresponding symbols and inspect defining context. | One equation with a fixed label arrangement. This is not an automatic equation-labeling/layout system or a demonstration of every symbol in the paper. |
| Priming glossary, §4.4 | Which terms will I encounter? | Default to Read with glossary: the LISA passage is on the left and eight selected glossary entries are on the right. Select a marked symbol to locate its entry, or choose Preview terminology to view the glossary alone. | A manually curated subset, not an exhaustive or automatically generated LISA glossary. View switching and linked highlights are our teaching controls. |

Sources: [ScholarPhi §4](https://arxiv.org/html/2009.14237v3#S4); [LISA §2.2 and Equation (4), PDF p. 4](https://aclanthology.org/D18-1548.pdf#page=4).

### 5.2 Why one shared source paper

We replaced the original invented `k` / “number of groups” example because it was too simple and did not clearly communicate the value of contextual assistance. LISA supplies authentic technical terminology and mathematical content and is used in ScholarPhi's examples and final evaluation.

Using one paper across demonstrations reduces unnecessary changes in reading context. It does not mean every displayed sentence is a quotation:

- The tooltip walkthrough uses source-based paraphrases.
- Declutter uses three quoted excerpts with omissions marked; line wrapping and mathematical presentation are adapted.
- The equation comes from LISA; explanatory labels are paraphrases, and selected defining passages are quoted.
- The glossary contains eight selected entries: SRL, LISA, POS, `A_parse`, `V_parse`, `K_parse`, `Q_parse`, and `U_heads`. Definitions are paraphrased, with source links.

The original ScholarPhi source navigation and usage sidebar are simplified into inline context in our demonstration. Reader thought bubbles and stronger highlights explain what changes at each action. These aids belong to Beyond the Query, not the original system.

### 5.3 Reading-first glossary demonstration

The demonstration now opens in **Read with glossary** mode. The passage appears before the glossary in document order: left/right on wide screens and above/below when the layout stacks. Clicking a marked symbol still locates and highlights its glossary entry. **Preview terminology** remains available as a glossary-only view; switching to preview clears the selected entry.

We changed the default because showing the vocabulary list first could suggest a required preview step and obscure how the glossary helps with an actual passage. The new button labels also clarify that “glossary” means term and symbol definitions, not bibliographic references. The feature description, reader thought bubble, and selection feedback now use language consistent with that interaction.

This is a teaching decision for Beyond the Query. [ScholarPhi §4.4](https://arxiv.org/html/2009.14237v3#S4.SS4) places the priming glossary before the paper and describes both advance familiarization and side-by-side reference use. Our default emphasizes the latter without removing the former. The mode buttons and linked highlights remain our adaptations, not controls reported in the original paper. The eight entries and their sources are unchanged; this update adds no new glossary content or automatic extraction.

Validation for this iteration: lint, production build, and whitespace checks passed. Browser checks confirmed the default reading state, left/right placement at a wide viewport, selection of a passage symbol and the corresponding glossary highlight, preview mode with eight entries and no passage, and switching back to reading. No browser warnings or errors were recorded. These are interface checks, not evidence that the new default improves comprehension.

## 6. Design rationale: what the graph represents

The graph is organized as **Observations & basis → Design motivations → Design responses**, reflecting the user's need to understand how a problem was identified and how a design responds.

| Motivation | Meaning in our presentation |
| --- | --- |
| M1 | Fit the definition to the current occurrence. |
| M2 | Connect explanations to their original context. |
| M3 | Bring related definitions and usages together. |
| M4 | Signal where useful help is available. |
| M5 | Keep the paper visible. |
| M6 | Protect reading attention. |
| M7 | Support recovery when automated assistance fails. |

All seven motivations from [ScholarPhi §3.3](https://arxiv.org/html/2009.14237v3#S3.SS3) and all four feature families from §4 are represented. The current data contains 17 motivation-to-feature paths. This is the scope of the implemented map, not a claim to enumerate every possible conceptual relationship in the paper.

O1–O7 are our observation/basis labels. M1–M7 follow the paper's motivation identifiers. D1–D4 are our identifiers for its four feature families. O1–O6 summarize pilot-feedback themes; O7 represents prior research supporting M7 and must not be described as an additional participant observation.

Selecting a node highlights related information and shows the source-backed explanation, connection reasons, and relevant mechanisms below the map. Relevant feature explanations link to their demonstrations. A selectable M2/M5 trade-off explains providing enough context while avoiding occlusion. These connections are explanatory synthesis, not measured causal effects.

The initial three example paths were expanded because the user wanted the paper's full set of motivations. Observation reordering was removed because it did not provide a clear understanding benefit.

## 7. Evaluation & Findings: evidence and boundaries

We added this section because knowing the features and motivations did not tell the reader whether the system was tested, what changed for participants, or where the claims stop.

### 7.1 Study setup

The current page summarizes the original final study: 27 participants, one LISA paper, a within-participant comparison of Basic, Declutter, and full ScholarPhi, and a one-hour remote session. Expandable details explain participants, tasks, condition assignment, measures, and analysis. These describe the original study, not a study of Beyond the Query.

The curated-data condition is prominent: definitions were extracted by hand, with automatic extraction and limited manual correction for symbols, defining formulae, and usages. This matters when interpreting the evaluation as evidence about interaction design rather than end-to-end extraction quality.

Source: [ScholarPhi §6.1](https://arxiv.org/html/2009.14237v3#S6.SS1).

### 7.2 Selected findings

The page separates four result categories: answering time, reported ease/confidence, correctness, and browsing behavior. Each finding identifies its comparison; expandable details supply numbers and qualifications.

We explicitly distinguish subjective confidence from correctness, and reduced scrolling from comprehension. A nonsignificant difference is not presented as proof of equivalence. Feature-use observations cover all four feature families but do not isolate the causal effect of each feature.

Sources: [§6.2, quantitative results](https://arxiv.org/html/2009.14237v3#S6.SS2); [§6.3.2, feature use](https://arxiv.org/html/2009.14237v3#S6.SS3.SSS2).

### 7.3 Selected limitations and reported issue

- **Author-stated scope limitation:** one paper and three questions.
- **Author-stated duration limitation:** short unstructured reading rather than longitudinal use.
- **Author-reported failure:** readers could treat the definitions list as exhaustive even when it omitted meanings of `T`.
- **Our interpretation:** these boundaries constrain generalization, long-term benefit claims, and assumptions about completeness.

The first two are linked to [§7.2](https://arxiv.org/html/2009.14237v3#S7.SS2); the incomplete-definition issue is linked to §6.2. The demonstration does not recreate that failure case. These are selected boundaries, not every limitation or discussion point in the paper.

## 8. Reference selection standard

### 8.1 Adopted principle

Start with the core-content framework, identify an understanding gap, and then choose cited material that helps explain it. Similarity, citation count, visual appeal, or availability of a screenshot is not sufficient on its own.

### 8.2 Working checklist for applying the principle

The following checklist operationalizes the agreed approach. It is a project working procedure, not an externally validated scoring scale:

1. **Name the gap:** What specific question remains after the core content is presented?
2. **Locate the relationship:** Where does ScholarPhi cite this source, and in what role?
3. **Identify the added value:** What does the selected material explain beyond the existing page?
4. **Check the evidence:** Locate the supporting passage or figure in the source; preserve its task, population, and scope.
5. **Choose the presentation:** Decide whether a short explanation, figure, example, or source link is sufficient, and whether it should be on demand.
6. **Record the decision:** Keep the inclusion reason and a brief reason for excluding competing candidates when alternatives were reviewed.

Eligible relationships include a concept definition, an interaction precedent, a stated design basis, a relevant contrast, and evidence that explains a design trade-off. One reference can serve multiple needs; several sources may be needed for one relationship. We should not imply a single origin where ScholarPhi cites multiple contributing techniques.

Product documentation and books may be useful contextual sources, but must not be labeled research papers. Subsequent related work belongs to a separate selection route described in Section 10.

## 9. Backward-reference contexts currently included

The following three explanations are implemented. Their wording is source-based synthesis, with cross-system comparisons labeled as our interpretation.

### 9.1 Wikipedia Page Previews

- **Location:** How it works → Definition tooltips → Reference.
- **Question:** How is ScholarPhi's tooltip different from a linked-page preview?
- **Reason for inclusion:** Provide a familiar interaction example, then make the distinction explicit rather than showing an unexplained screenshot.
- **Included content:** A comparison of nearby information presentation, a readable preview image, caption, attribution, and a full-size link.
- **Scope:** A related interaction precedent. It does not establish ScholarPhi's novelty or effectiveness and is product documentation rather than a research paper.
- **Decision provenance:** The teammate's original log describes the familiar-preview rationale. Our subsequent review made the distinction and reading question explicit and replaced the low-resolution image.
- **Sources:** [ScholarPhi §2.2.1](https://arxiv.org/html/2009.14237v3#S2.SS2.SSS1), [§4.1](https://arxiv.org/html/2009.14237v3#S4.SS1), [Page Previews introduction](https://www.mediawiki.org/wiki/Page_Previews#Introduction), [image source and attribution](https://commons.wikimedia.org/wiki/File:Hovercards_-_Alps_Mont_Blanc.jpg).

### 9.2 Human–AI interaction guidelines

- **Source title:** A Comparative Analysis of Industry Human-AI Interaction Guidelines.
- **Location:** Design rationale → O7 or M7 → Reference.
- **Question:** What should readers be able to do when an automatically extracted definition is missing or unhelpful?
- **Reason for inclusion:** Explain the research basis for recovery paths and easy dismissal when assistance fails.
- **Included content:** A short explanation linking the guideline discussion to M7 and the ability to inspect alternatives or dismiss assistance.
- **Scope:** A design rationale, not an evaluation of ScholarPhi and not the source of Declutter's fading technique.
- **Decision provenance:** The teammate initially placed it under Declutter. Review relocated it to O7/M7 and removed an unrelated personalization statement. This correction is documented separately from the historical log.
- **Sources:** [ScholarPhi §3.3, M7](https://arxiv.org/html/2009.14237v3#S3.SS3); [Wright et al., p. 4](https://arxiv.org/pdf/2010.11761#page=4).

### 9.3 Hands-On Math

- **Source title:** Hands-On Math: A page-based multi-touch and pen desktop for technical work and problem solving.
- **Location:** How it works → Equation diagrams → Reference.
- **Question:** How can a reader select a meaningful part of a mathematical expression?
- **Reason for inclusion:** Explain the selection of symbols and expression parts with a concrete prior interaction example.
- **Included content:** Figure 13 showing fingertip area selections, an explanation, caption, source link, and full-size image link.
- **Scope:** A precedent for symbol selection, not evidence that ScholarPhi's equation-label layout originates in this work. Placement beside the equation demonstration must not broaden that claim.
- **Decision provenance:** The teammate introduced the selection example. Review narrowed the attribution and replaced the image with a clearer extraction from the author-hosted PDF.
- **Sources:** [ScholarPhi §2.2.2](https://arxiv.org/html/2009.14237v3#S2.SS2.SSS2); [Hands-On Math, p. 22 / PDF p. 6, Figure 13](https://www.andrewbragdon.com/papers/hands-on-math.pdf#page=6); [publication DOI](https://doi.org/10.1145/1866029.1866035).

### 9.4 Shared context presentation

Each implemented context answers a reading question, names its relationship, supplies a short explanation, and provides evidence links. Reference panels remain expandable. This makes their relevance inspectable without requiring the reader to leave the main explanation immediately.

## 10. Related work: a separate selection route

Threddy, CiteSee, and CiteRead are subsequent related works, not three references selected from ScholarPhi's original bibliography under the framework-first rule.

The team clarified the implemented selection as: use the supplied Connected Papers graph, rank by similarity to ScholarPhi, exclude papers already in the workspace, and take the first three remaining papers. The October 16 check recorded Threddy 30.4, CiteSee 26.9, Scim 25.9, and CiteRead 24.8. Scim was excluded because it is already in the workspace. These values are a historical external observation, not live app output or measurements made during this documentation task.

Discovery source: [Connected Papers graph for ScholarPhi](https://www.connectedpapers.com/main/60bf101bd61fb5fa526c1ae25d808e86958724ad/Augmenting-Scientific-Papers-with-Just%20in%20Time%2C-Position%20Sensitive-Definitions-of-Terms-and-Symbols/graph).

| Included work | Question and reason for contextual inclusion | Relationship and evidence |
| --- | --- | --- |
| **Threddy: An Interactive System for Personalized Thread-based Exploration and Organization of Scientific Literature** | How can support within a paper extend into organizing a literature collection? Explain passages, citations, and persistent research threads. | Citation and conceptual connection; the cited passage does not establish code reuse. [Paper](https://arxiv.org/pdf/2208.03455), [§2.2, p. 3](https://arxiv.org/pdf/2208.03455#page=3). |
| **CiteSee: Augmenting Citations in Scientific Papers with Persistent and Personalized Historical Context** | How can citation context reflect what a reader has already encountered? Explain reading-history information attached to citations. | Explicit front-end code reuse, alongside a different information focus. [Paper and interface](https://arxiv.org/html/2302.07302), [§4.6, implementation](https://arxiv.org/html/2302.07302#S4.SS6). |
| **CiteRead: Integrating Localized Citation Contexts into Scientific Paper Reading** | How can later papers help interpret the current paper? Explain commentary supplied by subsequent citing work. | Shared reader infrastructure, distinguished from the contextual information source. [Paper](https://doi.org/10.1145/3490099.3511162), [ScholarPhi project list of publications using its reader](https://scholarphi.org/). |

The section was renamed from Extra work to Related work. Its explanations remain visible and evidence links are expandable. A separate link opens the Connected Papers graph. These entries are a small curated set, not a comprehensive genealogy, literature review, or ranking of research quality.

## 11. Coverage audit: comprehensive sets versus selected examples

| Content | Status | What we can accurately claim |
| --- | --- | --- |
| Original abstract | Complete abstract from the linked version | The author-written abstract is reproduced with attribution. |
| Core feature inventory | All four families | Readers can discover every core feature family described in §4. |
| Design motivation inventory | All M1–M7 | All named motivations are represented, with condensed supporting explanations. |
| Observation/design graph | Seven synthesized basis nodes and 17 paths | Source-based explanation of the selected links; not all underlying observations or a complete causal model. |
| Tooltip tutorial | One prepared LISA example | An illustrative interaction, not arbitrary-term lookup. |
| Declutter tutorial | Three selected excerpts | Demonstrates highlighting/fading locally, not exhaustive occurrence coverage. |
| Equation tutorial | One equation, four labels | Demonstrates simultaneous contextual definitions, not general equation analysis. |
| Glossary tutorial | Eight selected entries | Demonstrates the glossary concept, not a full glossary. |
| Evaluation | Setup, four result categories, four feature-use summaries | A substantive summary of selected final-study evidence, not a complete reproduction of the study. |
| Limitations | Two stated limits and one reported issue, plus relevant study qualifications | Selected boundaries with our implications labeled. |
| Backward-reference panels | Three sources | Selected explanatory contexts; no exhaustive bibliography screening has been completed. |
| Related work | Three externally discovered papers | A dated selection with exclusions and individually explained relationships. |
| System Pipeline | Thirteen source-linked nodes covering selected preparation and reading paths | Explains inputs, processing, outputs, dependencies, and timing from a pinned code revision; not a complete architecture map or an executable backend. |

## 12. Development sequence

| Checkpoint | Reason for the change | Result |
| --- | --- | --- |
| October 6: paper browsing | Establish a readable starting point with full titles. | Built-in paper selection, metadata, abstract, and source/code links (`886bc32`). |
| October 7: visual explanations | Text summaries alone did not clearly communicate interaction and design reasoning. | Added ScholarPhi tutorial and rationale map; clarified User/System actions and one shared scene (`f32fdd3`). |
| October 7: page organization | Separate visuals and long scrolling fragmented the single-paper experience. | Merged visuals into Papers, used dedicated content tabs, widened the layout, and moved selection above the content (`69ea5e3`). |
| October 14: feature and example coverage | The lookup walkthrough looked like the whole system; invented/simple examples were insufficient. | Added the four-feature overview and source-grounded LISA demonstrations (`ad6aa40`). |
| October 15: evaluation and boundaries | Readers could understand intended behavior but not the supporting evidence. | Added Evaluation & Findings with expandable study details and limitations (`2dd6f5f`). |
| October 16: external context | Supplement selected mechanisms and show related subsequent work. | Teammate added reference panels and Extra work (`b0b6a04`). |
| October 16: source and placement review | Figures were unreadable and some reference roles/placements were misleading. | Improved figures, captions, and links; moved guidelines to M7; narrowed Hands-On Math attribution; renamed Related work (`0204ac6`). |
| October 16: explain each context's value | A link or relationship label alone did not explain what the user would learn. | Integrated six question-driven context explanations with explicit relationships and evidence (`3eda4e8`). |
| October 16: document the selection approach | Future additions need a clear rationale grounded in the core paper framework. | This record formalizes framework → understanding gap → cited supporting material and distinguishes implemented content from candidates. No UI change is made by this document. |
| October 16: connect features to implementation | Interaction demos did not show where contextual data comes from or what happens before versus during reading. | Inspected a pinned ScholarPhi revision and added System Pipeline with two phases, 13 selectable nodes, input/processing/output details, and code links. This is an explanatory frontend addition. |
| October 16: glossary demonstration order | Preview-first presentation obscured the reading use case, and “reference” could be mistaken for citations. | Defaulted to Read with glossary, moved the passage before the glossary, retained Preview terminology, and clarified instructional text. The original priming purpose remains documented. |

## 13. Discussed but not implemented as new context

The following are discussion records, not approved additions or claims of completed source screening:

- **Information scent:** the teammate log proposed an information-foraging reference under the glossary. It is absent from the current implementation. A future explanation should first establish the relevant gap and place it with availability cues/M4 where appropriate, rather than assume it explains the glossary. [Reference proposed in the log](https://act-r.psy.cmu.edu/wordpress/wp-content/uploads/2012/12/280uir-1999-05-pirolli.pdf#page=10).
- **Other symbol-selection antecedents:** ScholarPhi also cites Entity Quick Click in §2.2.2. The current Hands-On Math panel should not imply a complete account of the selection mechanism's sources.
- **Declutter's design precedents:** Stencils-Based Tutorials was discussed as a possible explanatory reference. No dedicated panel has been added. [Author research page](https://www.cs.cmu.edu/~caitlin/research.htm).
- **Assistance versus distraction:** Cognitive load in hypertext reading: A review was discussed as possible context for the trade-off. It has not been added, and findings from hypertext tasks must not be treated as direct measurements of ScholarPhi. [Paper DOI](https://doi.org/10.1016/j.chb.2005.08.012).
- **Positioning against prior systems:** a targeted comparison could clarify what is new about the information source or position sensitivity. No additional baseline has been selected through the new process yet.

We have not established that every candidate is necessary, or that the existing contexts improve comprehension. Participatory design can help identify which understanding gaps remain and which supplemental material is distracting or redundant.

## 14. Implementation locations and review status

| File | Responsibility |
| --- | --- |
| `src/App.jsx` and `src/data/papers.js` | Paper selection, section tabs, metadata, and abstract. |
| `src/ScholarPhiTutorial.jsx` | Four-feature overview; Declutter, equation, and glossary examples. |
| `src/PaperTutorial.jsx` | Shared-scene ScholarPhi tooltip walkthrough and Wikipedia reference. |
| `src/data/scholarPhiExamples.js` | Curated LISA excerpts, symbol definitions, and glossary entries. |
| `src/data/paperVisuals.js` | ScholarPhi observations, motivations, features, and graph paths. |
| `src/PaperVisuals.jsx` | Rationale graph, section rendering, reference placement, and links to examples. |
| `src/ScholarPhiPipeline.jsx` and `src/ScholarPhiPipeline.css` | Two-phase pipeline diagram, dependency connectors, selectable node details, and responsive layout. |
| `src/data/scholarPhiPipeline.js` | Thirteen curated node records and source links pinned to the inspected repository revision. |
| `src/ScholarPhiEvaluation.jsx` | Study setup, selected findings, feature use, and limitations. |
| `src/ScholarPhiExtraWork.jsx` | Related work entries and Connected Papers link; filename retains its earlier name. |
| `src/data/scholarPhiContexts.js` | Six approved context explanations and evidence links. |
| `src/PaperContext.jsx` and `src/PaperContext.css` | Shared context presentation and evidence disclosures. |

The prototype is frontend-only, with curated content and local interaction state. It does not upload or parse arbitrary papers, compute similarity, generate definitions, or automatically select references. Following a code-repository link does not execute that paper's system.

The System Pipeline implementation passed ESLint, the production build, and Git whitespace checks. Browser checks covered all 13 node selections, matching input/processing/output details and source-link presence, wide and narrow layouts, and rendered dependency connectors; no browser warnings or errors were recorded in those checks. These checks validate our explanatory interface, not execution of ScholarPhi or a comprehension benefit. This documentation follow-up records the completed checks without claiming a fresh full regression run, verification of every external URL, or a completed user study. No files were committed or pushed.
