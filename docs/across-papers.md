# Across Papers: Content, Design, and Development Record

Updated: October 22, 2026, including the label/source follow-up below. Original visual implementation audit: `78dbac895b1ebe750c95ea89a744e15625fbb8d3`.

This document records the current Across Papers view for ScholarPhi, Scim, and SciDaSynth: its reading questions, design decisions, implemented interactions, primary sources, editorial interpretations, and coverage limits. It consolidates the relationship-map and comparison-panel iterations completed on October 22. It does not report a user study or claim that the interface improves comprehension.

Related records: [development log](development-log.md), [single-paper standards](general_standards.md), [ScholarPhi](scholarPhi.md), [Scim](scim.md), and [SciDaSynth](SciDaSynth.md). The single-paper standards inform provenance and teaching boundaries; they are not a validated standard for cross-paper comparison.

## 1. Purpose and intended reader

Our intended reader has some paper-reading experience and HCI knowledge but is exploring unfamiliar systems or a subfield. The broader use scenario begins with candidate papers already collected. The current implementation supplies three fixed papers; it does not import or discover papers.

The research focus remains contextual information that helps readers understand papers and relationships. Comparison is a means of presenting that information, not an automated comparison strategy, quality ranking, or novelty detector. We do not assume the three papers represent all HCI research.

Across Papers has three complementary levels:

| Level | Reader question | Implemented presentation |
| --- | --- | --- |
| Relationship entry map | Which connection is worth exploring? | Three paper nodes, three pair connections, and an all-three overview. |
| Compact matrix | How do these papers differ on one broad dimension? | Three paper columns and four rows; concise summaries. |
| Selected-pair panel | What exactly is shared or different on this dimension? | One result region below the matrix, with dimension-specific visuals and evidence on demand. |

The map has its own selection state. Choosing a map node or connection updates its adjacent detail area; it does not select matrix cells, open the matrix result panel, or synchronize a pair into it. Matrix comparisons retain a separate, explicit selection-and-compare interaction.

## 2. Decisions and reasons

These are decisions made during the project discussion and implementation. They are not findings from participants or instructions derived directly from the cited papers.

| Decision | Reason | Implementation and boundary |
| --- | --- | --- |
| Add a visual relationship entry | A dense table was a difficult starting point for exploring the three systems. | A selectable graph exposes paper focuses and selected connections. It is not a Venn diagram or similarity visualization. |
| Retain four dimensions, shorten every cell | Full explanations, repeated selection prompts, and long source labels made the matrix text-heavy. | Each cell now has a short headline, one qualifying sentence, a selection indicator, and a compact source link. Full titles are available through expandable column headers. |
| Keep comparisons within the same row | Two selected cells need a clear shared question. | Exactly two different papers within one dimension. Cross-dimension comparison is excluded. |
| Unify results below the matrix | The temporary mixture of one inline sample and other pairs in dialogs made results unpredictable and easy to miss. | Every pair uses the same inline result region, automatic result navigation, and Back to selection. No comparison dialog remains. |
| Use different visual forms for different questions | A single prose template or forced flowchart would obscure the distinction between a problem, a scenario, an interaction, and an output. | Problem chains, reading-context cards, Support alignments/flows, and Reader output illustrations. |
| Keep shared context before differences | Readers need a common comparison basis without implying that the systems solve identical problems. | Pair-specific Shared text precedes aligned differences or illustrations. |
| Keep evidence expandable | Readers should be able to scan the comparison and inspect its basis when needed. | Each result exposes two source notes and links. Reading context explicitly separates paper descriptions, editorial framing, and evaluation context. |
| Develop one example, then extend it | The user wanted to inspect each bounded change before committing to a full redesign. | Support began with ScholarPhi × Scim; Reader output with Scim × SciDaSynth; Problem with ScholarPhi × Scim. Each now covers all three pairs. Reading context was implemented for all pairs together. |

## 3. Relationship map

The map provides seven selectable entry points: three papers, three pairs, and All three (the default). Paper nodes summarize emphasis as Understand / Terms & symbols, Skim / Salient passages, and Structure / Extracted records. These are editorial labels, not exclusive capability categories.

| Pair entry | Label | Existing comparison record used |
| --- | --- | --- |
| ScholarPhi × Scim | Support reading | Reading context (`context`) |
| ScholarPhi × SciDaSynth | Return to context | Support (`support`) |
| Scim × SciDaSynth | Focus information | Reader output (`result`) |

The selected pair reveals shared concerns and differences using the existing notes. A selected paper shows its full title, primary focus, reader output, and separate problem/output evidence disclosures. The all-three overview explains the common scientific-literature setting and three reader questions.

Position, distance, node size, and connectors do not encode similarity scores, magnitude, citation direction, or a required workflow. Selection highlights related nodes and connections. At narrow widths, the map becomes a labelled button layout rather than overlapping circles. It uses no Connected Papers ranking, live graph computation, or external recommendation service.

## 4. Matrix dimensions and complete pair coverage

| Displayed row | Stable data ID | Question | Result form | Coverage |
| --- | --- | --- | --- | --- |
| Problem | `motivation` | Why is help needed? | Situation → Obstacle → Burden, two aligned chains | 3 of 3 pairs |
| Reading context | `context` | When, with what goal, and over what scope is the tool used? | Parallel scenario cards and attention-scope diagrams | 3 of 3 pairs |
| Support | `support` | What help is offered, and how does the reader interact with it? | Pair-specific aligned questions and separate interaction paths | 3 of 3 pairs |
| Reader output | `result` | What does the reader receive, and what can they do next? | Parallel schematic outputs and next activities | 3 of 3 pairs |

There are 12 matrix cells and 12 pair-by-dimension results: three unique pairs across four dimensions. All results now have dimension-specific presentations; none of these twelve relies only on the old Similarities / Differences prose layout. The original prose records remain in the data and continue to supply shared statements, source context, and entry-map details.

### 4.1 Problem: situation, obstacle, and burden

Each paper has a three-node chain. The obstacle node receives stronger emphasis. The two tracks align by question, using green for ScholarPhi, blue for Scim, and gold for SciDaSynth.

| Paper | Situation | Obstacle | Burden |
| --- | --- | --- | --- |
| ScholarPhi | Reading unfamiliar notation | Paper-specific definitions may be elsewhere | Find the definition, connect its meaning to the notation, and resume reading |
| Scim | Skimming for an overview | Salient passages must be identified among many passages | Scan and assess where closer reading is worthwhile |
| SciDaSynth | Extracting comparable information across selected papers | Data is scattered across text, tables, and figures, with inconsistent expressions | Locate, verify, and standardize the target information |

ScholarPhi × Scim contrasts local meaning with reading priorities. ScholarPhi × SciDaSynth contrasts notation comprehension with data reconciliation. Scim × SciDaSynth contrasts prioritizing reading with preparing comparable data.

Arrows are explanatory links in our summary of motivation. They are not measured causal effects, original author diagrams, or a required sequence of using these tools. Feature instructions and output previews are deliberately left to the other dimensions.

### 4.2 Reading context: goal, scope, and situation

Each card aligns Current goal, Working scope, and When support is needed. The attention diagrams illustrate the reader's focus, not actual tool output:

- ScholarPhi: one expression circled within a passage, with nearby context indicated. This does not restrict the tool to one passage or to novice readers.
- Scim: several outlined passage regions across a paper. These are attention markers, not generated highlights from a real paper.
- SciDaSynth: a collection of schematic papers connected without directional arrows to an information need. No records have been extracted in this illustration.

ScholarPhi × Scim distinguishes local clarification and broader orientation, without assigning expertise levels. ScholarPhi × SciDaSynth distinguishes an encountered comprehension need and a collection-level extraction task. Scim × SciDaSynth distinguishes orientation and a specified extraction need; a reader can still skim with a specific question.

The evidence disclosure separates **Paper-described setting**, **Our comparison framing**, and, for SciDaSynth, **Evaluation context**. Nutrition and NLP researchers are evaluated participant groups, not exclusive eligibility criteria. The cards do not prescribe an order of using the systems.

### 4.3 Support: object of inspection and user control

Each pair has its own aligned comparison questions rather than a single forced table:

| Pair | Shared basis | Main contrast and alignment |
| --- | --- | --- |
| ScholarPhi × Scim | Both augment reading and connect selected information to original context | Definitions/usages versus salient passages; selecting notation versus adjusting highlight density/types; local clarification versus directing attention. Three aligned questions and three-step illustrative paths. |
| ScholarPhi × SciDaSynth | Both connect displayed information to source context | Inspecting meaning and usages versus verifying generated entries; choosing information to inspect versus editing/grouping values. Four aligned questions and four-step paths. |
| Scim × SciDaSynth | Both let readers control what to inspect | Changing which original passages are emphasized versus changing extracted table entries; reading surrounding text versus checking a value before refinement. Four aligned questions and four-step paths. |

The paths show selected interactions within each tool. They may be revisited and are not exhaustive feature inventories, live system execution, or dependencies between tools. Support focuses on the action and its target; it does not rank usability or effectiveness.

### 4.4 Reader output: illustrations and next activities

Each pair reuses its two paper-specific illustrations and aligns What do you get? with What can you do next?

| Paper | Illustration | Supported next activity |
| --- | --- | --- |
| ScholarPhi | A selected term/symbol connected to a contextual-definition callout and source/usage labels | Inspect the meaning or usage in context and continue reading |
| Scim | A paper with highlighted placeholder passages and a passage list | Locate passages and read surrounding text |
| SciDaSynth | A structured table of placeholder entries and a CSV-to-analysis/reporting cue | Merge tables and export data for subsequent work |

All three pairs use the same card structure. The figures are static teaching illustrations, not original screenshots, actual extracted values, quotations, functioning controls, or live export features. The depicted output is a supported artifact/activity, not a measured improvement in understanding. Selecting a pair does not execute any of the original tools.

## 5. Interaction and state rules

1. Read across a matrix row and select two different paper cells. Selected cells are visually marked and expose pressed state.
2. Selecting another row or a third paper while the current selection prevents it produces a notice. Deselect or clear before changing the comparison basis.
3. Compare selected becomes available after two cells are selected. Selecting the second cell alone does not open a result.
4. Compare selected renders one panel below the matrix, focuses its heading, and scrolls it into view with space for the sticky selection toolbar.
5. Back to selection focuses and scrolls to the first selected paper cell in display order. It preserves both the selection and existing result until the selection changes.
6. A successful selection change or Clear selection hides the old result. Source disclosures reset with the newly rendered result; old evidence does not carry into a different pair.
7. Matrix and map state are held in React memory. App tab switching hides rather than unmounts Across Papers, so state remains in that page session; reloading resets it. No backend or persistent annotation store is involved.

The matrix remains horizontally scrollable on narrow screens (760 px minimum table width). Result panels reflow: output/scenario cards stack, problem chains stack, and Support paths stack at their narrow breakpoint. The redesign does not promise a scroll-free matrix on phones. Controls use semantic buttons, pressed states, visible focus, accessible source labels, and native disclosure elements. Schematics provide accessible descriptions and do not rely only on color.

## 6. Source register and provenance

### Primary papers used in Across Papers

| ID | Paper | Version or publication used by current comparison links |
| --- | --- | --- |
| P1 | **Augmenting Scientific Papers with Just-in-Time, Position-Sensitive Definitions of Terms and Symbols** (ScholarPhi), CHI 2021 | [arXiv v3 full text](https://arxiv.org/html/2009.14237v3) |
| P2 | **Scim: Intelligent Skimming Support for Scientific Papers**, IUI 2023 | [arXiv v3 full text](https://arxiv.org/html/2205.04561v3) |
| P3 | **SciDaSynth: Interactive Structured Data Extraction from Scientific Literature with Large Language Model**, Campbell Systematic Reviews, 2025 | [Pinned arXiv v3 PDF](https://arxiv.org/pdf/2404.13765v3); publication identity remains Campbell Systematic Reviews, 2025 |

The current locators are centralized in [comparisonSources.js](../src/data/comparisonSources.js), shared by the map, matrix, and pair panels. The October 22 follow-up checked the cited content and section IDs in ScholarPhi/Scim v3 HTML and the relevant text/pages of SciDaSynth v3 PDF. This is a focused comparison-source check, not a fresh audit of every single-paper source.

| Dimension | P1: ScholarPhi | P2: Scim | P3: SciDaSynth |
| --- | --- | --- | --- |
| Problem | §1 Introduction: unfamiliar notation and effort of finding definitions | §1 Introduction: keeping up, skimming, and locating important content | §1 Introduction: laborious extraction, scattered information, and standardization |
| Reading context | §1 Introduction; §4 User Interface: researchers encountering paper-specific expressions | §1 Introduction; §7.2.3 Circumstances in which Scim was useful: initial understanding, keeping up, and unfamiliar areas | §1 Introduction: extraction after searching/screening; §5.1.1 Participants: evaluation sample only |
| Support | §4.1 Definition Tooltips; §§4.2–4.4: definitions, usages, equation definitions, glossary | §4.2 Faceted Highlights; §4.3 Controls; §4.5: categories, density, and surrounding context | §§4.3.1–4.3.3 User Interface: specify needs, validate/refine, group/standardize |
| Reader output | §§4.1–4.4 User Interface: clarification within the paper | §4.4 Scrollbar Annotations; §4.5 Side Bar Display: selected passages and navigation | §4.1 System Workflow; §4.3.4 Iterative Table Editing and Database Construction: merged tables and CSV |

**Locator behavior:** ScholarPhi and Scim links now target verified HTML section IDs in v3. SciDaSynth uses v3 PDF pages: Introduction on p. 1; System Workflow and the start of §§4.3.1–4.3.2 on p. 4; validation continuation, §§4.3.3–4.3.4, and §5.1.1 Participants on p. 6. Its generated HTML has shifted section numbering, so PDF labels are not applied to HTML destinations. A section-range link opens the start of that range. Compact matrix Source links open the primary locator; expanded evidence lists the additional locators separately. PDF page navigation depends on the browser viewer. The paper-title links remain general publication entry points.

### What is evidence and what is ours?

| Content | Provenance and boundary |
| --- | --- |
| Problems, described activities, capabilities, output types | Paraphrases of the primary papers, carried forward from the existing source-linked notes. |
| Shared statements, pair contrasts, row selection, scenario titles, aligned subquestions | Our cross-paper synthesis and design decisions. Individual papers do not establish these as author-defined comparisons. |
| Map positioning, colors, problem arrows, attention diagrams, output placeholders | Our explanatory representations; no quantitative encoding or empirical result. |
| Scim/SciDaSynth controls and ScholarPhi definitions depicted in comparisons | Selected capabilities summarized from source notes, not a reproduction or new code audit. |
| Benefits of our workspace | Unestablished. Implementation checks and paper-reported benefits of the original systems do not validate our comparative interface. |

No new external contextual references, similarity ranking, repository analysis, or general-purpose content-generation skill were added by this Across Papers iteration. The primary papers support the content being explained; they do not directly prove that our graph, cards, or chains are better than reading the papers.

## 7. Implementation locations

| File | Responsibility |
| --- | --- |
| [ComparisonMatrix.jsx](../src/ComparisonMatrix.jsx), [styles](../src/ComparisonMatrix.css) | Matrix selection, result navigation, shared panel shell, dimension routing, and Support layout |
| [PaperRelationshipMap.jsx](../src/PaperRelationshipMap.jsx), [styles](../src/PaperRelationshipMap.css) | Seven entry choices and independent map detail state |
| [comparison.js](../src/data/comparison.js) | Original four-dimensional notes, 12 shared/difference records, source links, selection helpers |
| [comparisonSources.js](../src/data/comparisonSources.js), [ComparisonSources.jsx](../src/ComparisonSources.jsx) | Versioned comparison locators and shared source-list rendering; compact cells use the primary location, expanded evidence lists all supporting locations |
| [comparisonSummaries.js](../src/data/comparisonSummaries.js) | Compact matrix content, Support pair questions/flows, and Problem pair headings |
| [ProblemRelationshipPanel.jsx](../src/ProblemRelationshipPanel.jsx), [styles](../src/ProblemRelationshipPanel.css) | Reusable situation/obstacle/burden chains and motivation evidence |
| [ReadingContextComparison.jsx](../src/ReadingContextComparison.jsx), [styles](../src/ReadingContextComparison.css), [readingContexts.js](../src/data/readingContexts.js) | Scenario cards, SVG attention diagrams, setting/framing/evaluation separation |
| [SupportRelationshipPanel.jsx](../src/SupportRelationshipPanel.jsx) | Pair-specific aligned differences, separate interaction paths, and evidence |
| [ReaderOutputComparison.jsx](../src/ReaderOutputComparison.jsx), [styles](../src/ReaderOutputComparison.css) | Three reusable schematic outputs, next activities, and evidence |

All content is bundled with the frontend. The figures are implemented in HTML/CSS or SVG. The interactions select curated content; they do not generate it dynamically. Source clicks open external documents, while the comparisons themselves require no model or database service.

## 8. Iteration record

All commits below are dated October 22, 2026 in the repository history. They record implementation milestones, not participant-study sessions.

| Commit | Milestone |
| --- | --- |
| `9038923` | Add the relationship entry map while preserving the matrix. |
| `04d1515` | Condense all matrix rows, add the ScholarPhi × Scim Support sample, and unify all results below the matrix after the user identified inconsistent dialog/inline behavior. |
| `a9fdeea` | Add Scim × SciDaSynth Reader output illustrations. |
| `39a8a19` | Extend Reader output to both ScholarPhi pairs. |
| `7b2cd04` | Extend Support to both SciDaSynth pairs. |
| `1c20624` | Add the ScholarPhi × Scim Problem chains. |
| `61a3a6e` | Extend Problem chains to both SciDaSynth pairs. |
| `78dbac8` | Add all three Reading context scenario comparisons. |

## 9. Coverage, validation, and remaining questions

**Implemented:** the relationship entry map; 12 concise matrix cells; all 12 dimension-specific pair results; evidence disclosures; same-row selection and reset; result/return navigation; keyboard focus handling; responsive panel layouts. This is complete coverage of the chosen four-dimension, three-paper matrix, not of all information in the papers.

**Deliberately bounded:** static scenario/output diagrams; selected interaction paths; manually curated statements; three fixed papers. Fine-grained methodological comparison, comparative evaluation claims, annotation/highlighting tools, note synthesis, automatic recommendations, arbitrary paper combinations beyond the fixed set, upload, and brief/RQ generation are not implemented by this iteration.

**Checks recorded during implementation:** ESLint and production builds passed at each completed visual iteration. The existing build warning about a JavaScript chunk larger than 500 kB remains. Browser checks covered pair-specific content and source disclosures, all 12 results after panel unification, later checks of all three pairs for each updated dimension, Back to selection, stale-result removal, keyboard activation, and representative wide/narrow layouts. No browser errors were observed in those checks. These were incremental checks, not a new automated test suite or an accessibility certification.

This documentation pass inspected code, existing documentation, and commit history and checked local documentation links and diff scope. It did not rerun application tests, reproduce the original systems, re-audit every primary source, or conduct a user study.

Open review questions include whether users distinguish Reading context from Reader output, whether broad shared statements add enough value, whether the map and matrix feel complementary despite independent selections, whether evidence is discoverable, and whether the remaining matrix width/text density is appropriate. A combined final usability/accessibility review remains; the comparison-source alignment follow-up below addresses the earlier locator gap. These are follow-up questions, not scheduled features or validated findings.

## 10. October 22 follow-up: consistent labels and source navigation

- **Reason:** the matrix used short dimension names while selection status and accessible controls retained older names. All now use Problem, Reading context, Support, and Reader output from one row-label record. Map evidence headings follow those names too. Pair-specific explanatory question titles remain.
- **Entry description:** the homepage now introduces three curated papers, source-based explanations, interactive examples, and comparisons.
- **Source implementation:** added a centralized locator register and a shared source-list component. The compact matrix retains one primary source link; expanded map/pair evidence exposes separate supporting locations with edition labels. Comparison content and pair selection behavior are unchanged.
- **Verification:** ESLint and a production build passed (existing large-chunk warning remains). Browser checks opened all twelve pair results and their evidence, confirming consistent status labels and the expected edition/section/page links. External section IDs were inspected in the source DOM; SciDaSynth PDF locators were checked against the extracted PDF text. PDF screenshots could not be retrieved, so visual PDF-page rendering was not verified in this pass.
- **Not implemented:** automatic rationale-detail navigation, removal of legacy visual section numbers, and an experimental-design comparison. These were discussed separately; the latter should distinguish intended users from recruited participants and avoid ranking unlike task results.

## 11. October 22 documentation wrap-up

The application is retained at the end of the label/source/introduction update. README and the paper records now describe the same four dimensions, inline result behavior, and source-link precision. Earlier log entries about dialogs, whole-article links, or older labels describe their dated versions and are superseded by Sections 3–10 of this record.

Further changes remain undecided: an experimental-design comparison, removal of the single-paper 01/02 badges, easier navigation from rationale nodes to their below-map details, and integration of the map's selection with the matrix. No additional dimensions, navigation behaviors, or research claims were added during the documentation review.
