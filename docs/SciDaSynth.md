# SciDaSynth: Content and Development Record

Updated: October 20, 2026. Current scope: **Feature 1 — Extraction and structuring**, following approval of the four-feature interaction plan.

**Current implementation:** four selectable capability cards and the new extraction simulation; dedicated demonstrations for Features 2–4 remain pending. The existing crop editing/export walkthrough remains available. See [the current Feature 1 record](#october-20-2026-feature-1-interactive-extraction-current) for the approved arXiv reading source, source-page mappings, interaction changes, and fresh checks.

The sections below, through the first review-status paragraph, preserve the **initial increment's historical record**. Their static-overview descriptions, publisher/text-fragment links, and verification results describe that earlier implementation. The current Feature 1 record supersedes those descriptions where explicitly noted; it does not retroactively replace the original evidence or claim that historical tests cover later changes.

This record uses the source, coverage, adaptation, decision-history, and verification conventions in [scholarPhi.md](scholarPhi.md), [scim.md](scim.md), and [general_standards.md](general_standards.md). Those records were inspected before writing. The user-created `docs/SciDaSynth.md` was present and empty at the start; this update populates that existing file rather than creating a second record.

This is a record of the implemented explanation and its limits, not a claim that the original SciDaSynth system or the whole paper has been reproduced. Existing Overview and Design rationale content was not changed. System Pipeline, Evaluation & Findings, and Related work were not added.

## Paper identity and source register

- **Paper:** Xingbo Wang, Samantha L. Huey, Rui Sheng, Saurabh Mehta, and Fei Wang, *SciDaSynth: Interactive Structured Data Extraction From Scientific Literature With Large Language Model*, Campbell Systematic Reviews, 2025.
- **Primary source for this change:** [published full text, DOI 10.1002/cl2.70073](https://journals.sagepub.com/doi/full/10.1002/cl2.70073), inspected October 20, 2026. The new links use this published article, not an assumed equivalent preprint.
- **Reuse attribution:** source-based paraphrases of the article, CC BY 3.0, as stated in its Rights and permissions section. No new original-paper figure, source-document excerpt, numerical result, or participant quotation is reproduced.
- **Source boundary:** this pass inspected the relevant published passages. It did not inspect or execute the original system repository, independently audit study data, or retrieve the unnamed nutrition paper underlying the selected failure case.

The named headings and paragraph descriptions below are the primary locators. UI links also contain text fragments as a navigation aid; successful browser scrolling to the publisher's passage is not assumed.

| Source ID | Exact section or passage | Use and checked scope |
| --- | --- | --- |
| S1 | **System → System Workflow**, Figure 1 and Figure 2; **User Interface → Flexibly Specify Information Needs** | Questions or attribute forms produce a summary and structured records; supports the extraction capability summary. |
| S2 | **System → Data Extraction and Structuring**, paragraphs beginning **Data quality evaluation** and **Additionally, we compute data missingness** | The paper's terms are answer relevancy, context relevancy, faithfulness, and data missingness. These are described as reported capabilities; no score is computed in the tutorial. |
| S3 | **System → User Interface → Guided Data Validation and Refinement**, two paragraphs; Figure 2 | Inspect retrieved contexts, use matching text spans, access the original PDF or parsed figures/tables, edit cells, and clear alerts. Supports validation coverage and the educational connection to source checking. |
| S4 | **System → User Interface → Multi-Level and Multi-Faceted Data Summarization and Standardization**, especially **Dimension-guided data exploration** and **Group-based standardization**; Figures 2–3 | Semantic grouping, scatter plots, group statistics, group editing, and applying labels back to the table. The grouping of these mechanisms into one overview entry is ours. |
| S5 | **System → User Interface → Iterative Table Editing and Database Construction**, single paragraph | Reviewed tables merge through outer joins on document names; repeated queries grow the database; accumulated data can be exported as CSV. This is broader than the local snapshot simulation. |
| S6 | **Results and Analyses → Effectiveness of Data Extraction → Case Analyses of Automated LLM Baseline**, third reason, beginning **Third, missing associations between different parts of papers**, specifically its crop-variety-number example | The authors report returning variety numbers from a table instead of crop names; name-to-number mappings were in method sections. The enclosing section attributes the case to automated Baseline B. |

All entries refer to the published full text linked above. Heading hierarchy, the third-reason locator, and the crop case were checked against the article; page numbers are not invented for its HTML presentation.

## How it works: existing foundation preserved

Before this change, [SciDaSynthTutorial.jsx](../src/SciDaSynthTutorial.jsx) already supplied four workflow steps and eight User/System action states through [TutorialFrame.jsx](../src/TutorialFrame.jsx):

| Existing interaction | Behavior retained | Teaching boundary |
| --- | --- | --- |
| Specify information and reveal results | A prepared crop/processing request reveals the same three records. | No actual uploaded collection, retrieval, or LLM extraction. |
| Inspect and correct a record | Inspect Example B, read its invented passage, save or clear its processing value, and update missingness. | Only one editable processing cell; the invented passage is not research evidence. |
| Standardize selected records | Choose A and/or B, edit a shared crop label, apply it to that subset, and update unique-value counts. | Fixed candidate records, no automatic semantic clustering or scatter plot. |
| Keep and export | Keep a snapshot and download CSV; subsequent saved table changes invalidate that snapshot. | One snapshot stands in for the original database; repeated query/outer-join construction is absent. |

Documents A–C, their passages, field values, and initial grouping remain explicitly labeled invented teaching fixtures. The existing scenario is not replaced with, or silently relabeled as, the paper-grounded case.

The original state hooks, action records, editing handlers, reset handler, CSV quoting, download filename, and snapshot logic are unchanged. The new components are static explanations outside `TutorialFrame`; they do not write to tutorial state. `TutorialFrame.jsx`, shared data models, paper routing, and the other paper implementations were not modified.

## October 20, 2026: capability overview

### Purpose and understanding gap

The existing staged simulation could be mistaken for the complete SciDaSynth capability inventory. It demonstrated missingness, one correction, a proposed group, and export, while leaving other major mechanisms inside an attribution disclosure.

### Implemented content and presentation

`CapabilityOverview` and the local `capabilities` records in [SciDaSynthTutorial.jsx](../src/SciDaSynthTutorial.jsx) add a visible overview before the existing walkthrough. Each entry pairs a paper-reported function with an explicit **Walkthrough coverage** statement and a published-paper locator:

1. **Flexible data extraction and structuring:** questions/forms, multimodal source content, summary, and structured records; the fixed prepared request/table is identified as the demonstrated subset.
2. **Guided data validation and refinement:** missingness, the named quality signals, contexts/original sources, and editing; metric computation and original-PDF inspection are explicitly undemonstrated.
3. **Multi-level and multi-faceted summarization and standardization:** visual semantic grouping, scatter plots, statistics, and group edits; only choosing records and applying a shared label is simulated.
4. **Iterative table editing and database construction:** document-name outer joins, repeated queries, and CSV export; only one local snapshot and download are demonstrated.

**Paper evidence:** S1–S5. These are source-based paraphrases, not quotations or promises of live functionality. Four entries are an editorial organization of this paper's mechanisms, not a prescribed count for other explainers or four additional sequential tutorial steps.

**Design rationale:** visible capability-versus-coverage statements help readers separate the broader system from the local demonstration without replacing its established workflow. Informational cards avoid adding new action semantics or teaching controls. Scoped styles in [SciDaSynthTutorial.css](../src/SciDaSynthTutorial.css) follow the existing green text, pale backgrounds, borders, typography, and responsive stacking; they do not restyle ScholarPhi or Scim.

## October 20, 2026: populated-field verification example

### Purpose and source selection

The missing-value example shows that a blank extraction can need correction. It does not explain why an already populated field may still be unsuitable. S6 provides a concrete reported mismatch without requiring invented values or an assumed correction outcome.

### Author-reported case

`VerificationExample`, placed between the capability overview and the simulated walkthrough, separates three parts of the reported case:

| Part | Displayed substance | Provenance |
| --- | --- | --- |
| Requested information | Which crops appear in a paper. | Paraphrase of S6's crop question, not a verbatim query transcript. |
| Returned information | Crop variety numbers from a table rather than crop names. | Author-reported automated-baseline failure in S6. No actual numbers are supplied. |
| Information elsewhere | Method sections contained mappings between names and variety numbers. | Author-reported source relationship in S6. No methods excerpt is reconstructed. |

The visible label identifies **automated GPT baseline (Baseline B)**. The case must not be described as an error observed in a SciDaSynth participant's final table or a recorded correction performed by a participant.

### Educational connection and boundaries

The **Our reading lesson** paragraph explains that a non-empty field can contain the wrong kind of information and suggests comparing identifiers with method-section mappings. This checking procedure and the observation that an Empty-only check would miss the mismatch are our educational interpretation.

An expandable evidence disclosure gives the full S6 locator and connects the example to S3's source-inspection and cell-editing mechanisms. Applying those mechanisms to this specific baseline case is not an author-reported user action or demonstrated successful repair. The article's case passage does not name the underlying paper, list the returned variety identifiers, provide the corrected row, or establish which quality score would flag the case. No values, scores, document excerpts, or outcomes were invented to fill those gaps.

**Design rationale:** requested information → returned information → evidence elsewhere exposes the semantic mismatch without manufacturing a dataset. Keeping it outside the editable table maintains a clear boundary between reported evidence and simulated records. The source details use a native keyboard-operable disclosure consistent with the reference pages; the core mismatch and baseline qualification remain visible.

## Coverage audit and implementation locations

| Content | Current coverage | Boundary |
| --- | --- | --- |
| Capability overview | Four editorial groups covering the major functions summarized above, with per-entry coverage and source locators. | Not a complete transcription of every control, model, parameter, or feature in the paper. |
| Populated-field case | One concrete, author-reported automated-baseline failure with a labeled educational interpretation. | No underlying source row or correction outcome is available in the inspected case passage. |
| Interactive walkthrough | Existing four steps/eight action states, three records, correction, selective standardization, snapshot, and CSV. | Invented teaching fixtures and fixed local behavior; no backend. |
| Other SciDaSynth sections | Existing Overview and Design rationale retained. | No new Pipeline, Evaluation, or Related work content. |

| File | Change |
| --- | --- |
| `src/SciDaSynthTutorial.jsx` | Local capability records, static overview/case components, source-link helper, and additive rendering around the unchanged walkthrough. No separate data file was needed for this bounded addition. |
| `src/SciDaSynthTutorial.css` | New styles scoped to the added SciDaSynth content; responsive cards and case facts; disclosure focus styling. |
| `docs/SciDaSynth.md` | This evidence, adaptation, implementation, coverage, decision, and verification record in the existing user-created file. |

## Verification record

### Source and content checks performed

- Read the published System Workflow, Data Extraction and Structuring, relevant User Interface subsections, and automated-baseline case analysis. Checked the reported crop mismatch and its Baseline B attribution.
- Checked that the new capability text distinguishes reported functionality from simulated coverage and that the paper example supplies no invented row, number, score, excerpt, or repair outcome.
- Inspected the code diff to confirm the original interaction/state handlers and fixtures remain unchanged and the styles target only the new content. A text comparison against `HEAD` confirmed that the original walkthrough body is identical after removing the additive wrapper.
- Verified that all six new UI source links point to the published DOI full text and contain text-fragment targets. This checks destinations and construction, not successful fragment scrolling on every browser or a live publisher-page interaction test.

### Build and lint checks performed

The machine's shell did not expose `node` or `npm` on PATH. The project scripts' underlying commands were run using the locally installed Playwright Node executable, **Node v24.18.1**:

```text
<node executable> node_modules/eslint/bin/eslint.js .
<node executable> node_modules/vite/bin/vite.js build
git diff --check
```

- **ESLint:** passed, exit 0.
- **Production build:** passed with Vite 8.3.3 after restoring missing Windows optional dependencies. The initial build failed because `node_modules` contained Linux bindings without the Windows Rolldown binding. The lockfile-pinned `@rolldown/binding-win32-x64-msvc` 1.2.12 and `lightningcss-win32-x64-msvc` 1.33.0 packages were restored under ignored `node_modules`, with archive integrity checked against `package-lock.json`. Package manifests and the lockfile were not changed.
- **Whitespace/diff checks:** `git diff --check` passed. Also checked all three changed/new files for trailing whitespace and verified that all seven local Markdown links resolve. The final changed-file set is restricted to the three paths listed above.

### Browser checks performed

Ran headless Chromium through Python Playwright against the new production build served locally by Vite preview. The successful interaction run verified:

1. Four capability entries, the visible baseline qualification, and all six new source-link destinations.
2. Enter-key opening and closing of the new evidence disclosure.
3. Initial table concealment/reveal, three records, source inspection, saved correction, and synchronized missing-value count.
4. Applying a label to A alone leaves B/C unchanged; applying it to A/B updates the unique-label count.
5. Edits persist across How it works/Design rationale and Papers/Across Papers tab switches.
6. Download is disabled before keeping a snapshot. An actual downloaded CSV contains the expected header and all three edited records, including correct handling of a crop label containing commas and double quotes. The filename remains `scidasynth-illustrative-records.csv`.
7. A saved processing edit invalidates the kept snapshot and disables download again.
8. Restart restores the initial missing value, crop-label count, and hidden table; all eight actions navigate; a paper switch resets the tutorial and returns to Overview.
9. At 1440 × 1000 and 390 × 844 viewports, no page-level horizontal overflow or capability-card content overflow was detected. Visually reviewed desktop and mobile screenshots, including separate mobile captures of the capability overview and verification case: text and links wrap, cards and case facts stack, and no clipping or overlap was observed in the added content. These temporary QA images are not product assets.

No browser console errors or uncaught page errors were captured during the successful run. The initial browser-check attempt stopped on an arrow-character selector encoding issue; the completed run used ASCII selector patterns. This was a test-harness correction, not an application change.

These checks validate the explanatory interface and its preserved behavior. They are not a screen-reader audit, an original-system reproduction, a statistical replication, or evidence of a learning benefit.

## Development sequence and decision history

| Date | Understanding gap / decision | Implemented result |
| --- | --- | --- |
| October 20, 2026 | The four-step simulation did not make the broader capability inventory visible. | Added source-linked capability/coverage entries while retaining the walkthrough. |
| October 20, 2026 | A missing-cell-only example did not explain why populated output still requires checking. | Added the published crop-variety-number baseline case, with precise attribution and no reconstructed data. |
| October 20, 2026 | The new evidence could otherwise be mistaken for the source of Documents A–C or a demonstrated correction. | Kept the case outside the simulated table and explicitly labeled the educational connection and missing evidence. |
| October 20, 2026 | Changes needed a durable source and verification record matching the existing paper records. | Populated the existing `docs/SciDaSynth.md`; recorded actual checks and deferred scope. |

## Limitations and follow-up

- The original example's actual row and source document remain unavailable in the inspected passage. Obtain primary supporting artifacts before any future attempt to reproduce that exact correction interactively.
- The capability overview describes quality metrics, multimodal extraction, semantic plots, and database accumulation; none is newly simulated or executed.
- The existing editable walkthrough remains invented. Its crop-name similarity must not be treated as evidence that any arbitrary values or units can safely be standardized together.
- Source links include precise heading/paragraph labels and optional text-fragment navigation; cross-browser publisher scrolling remains unverified.
- Additional demonstrations, quantitative findings, pipeline/code inspection, contextual references, accessibility audits, and user evaluation remain deferred. They are not recorded as completed work.

Review status: approved first How it works improvement implemented and checked within the scope above. No commits or pushes were made.

## October 20, 2026: Feature 1 interactive extraction (current)

### Purpose and approved scope

The initial overview described capabilities but did not let readers see information needs become columns and records. After approving the source mapping and four-feature interaction plan, the user authorized **only Feature 1's demonstration**, alongside the four selection cards. This increment implements that boundary: it does not add dedicated validation, grouping, or database-merge demonstrations, nor any Pipeline, Evaluation, or Related work section.

### Current reading source and verified mappings

The user explicitly selected [https://arxiv.org/pdf/2404.13765](https://arxiv.org/pdf/2404.13765) as the SciDaSynth reading source. The PDF inspected in this increment is **arXiv:2404.13765v3, September 4, 2025**, an author preprint accepted to Campbell Systematic Reviews. It is not labeled the published version of record. The provided unversioned URL is retained as requested; a future revision could change pagination.

All How it works source links now use this PDF, including the retained baseline-case explanation and walkthrough attribution. The separate Overview metadata and Design rationale sources were not modified. Publisher-derived historical evidence remains in the initial record above.

| Capability card | Compact source label / URL | Exact source heading and evidence |
| --- | --- | --- |
| Extraction and structuring | [§4.3.1 · p. 4](https://arxiv.org/pdf/2404.13765#page=4) | **Flexibly specify information needs**: questions or attribute forms yield a summary and a table in Current Result. **§4.2, p. 4**, explains column names/value descriptions and includes the language-model question and five-key schema used in the disclosure. |
| Validation and refinement | [§4.3.2 · p. 4](https://arxiv.org/pdf/2404.13765#page=4) | **Guided data validation and refinement** starts on p. 4; context inspection, original-source access, editing, and alert clearing continue on [p. 6](https://arxiv.org/pdf/2404.13765#page=6). Figure 2 is on p. 5. The continuation link is available in this card's pending-feature disclosure. |
| Summarization and standardization | [§4.3.3 · p. 6](https://arxiv.org/pdf/2404.13765#page=6) | **Multi-level and multi-faceted data summarization and standardization**; dimension-guided exploration, semantic grouping, and group-based standardization; Figure 3. |
| Database construction and export | [§4.3.4 · p. 6](https://arxiv.org/pdf/2404.13765#page=6) | **Iterative table editing and database construction**: outer joins on document names, repeated queries, and CSV export. |

The section numbers/headings and one-based PDF page locations were checked against the PDF text. A direct request to the supplied URL returned **HTTP 200**, `application/pdf`, and a PDF file header. Browser assertions checked the four card destinations exactly: `#page=4`, `#page=4`, `#page=6`, `#page=6`. These are page-level links, not fabricated HTML anchors or paragraph targets. Cross-viewer handling of the PDF fragment is not guaranteed; section numbers and printed page locations remain visible as fallbacks.

### Implementation and visual organization

- [SciDaSynthTutorial.jsx](../src/SciDaSynthTutorial.jsx): replaced the static capability overview with four feature-selection cards, added `FeaturePreview` and `ExtractionDemo`, and added feature-selection state. Kept content local to the component rather than introducing a shared framework or new data-file abstraction.
- [SciDaSynthTutorial.css](../src/SciDaSynthTutorial.css): scoped card selection, preview schematics, request/output workspace, field-to-column colors, placeholder/revealed states, disclosures, and responsive stacking. Reuses the existing `feature-overview`, `feature-choice`, `feature-question`, `feature-preview`, and `selected-feature` conventions without editing shared styles or the reference papers.
- Each card has a separate compact PDF link at the top, a reader question, an illustrative mechanism preview, and a native selection button. Links are outside the buttons to avoid nested interactive elements. Selected state uses `aria-pressed` and connects to the detail panel through `aria-controls`.
- Features 2–4 can be selected to inspect their short capability description, scope, and source. They explicitly say **Dedicated demo pending** and provide access to the existing walkthrough. Their previews are schematics, not working new demonstrations.
- The previous baseline-case explanation and original walkthrough are now expandable below the prominent extraction workspace. They remain mounted. The original walkthrough automatically opens when an external rationale shortcut selects one of its noninitial actions; focus from the shared router moves to the visible top How it works heading.

### Feature 1: concrete interaction and state contract

| Input / user action | Visible system response | Data boundary |
| --- | --- | --- |
| Initial view | Documents A–C, two checked information fields, a generated request sentence, Document/Crop/Processing headers, and hidden-value placeholders. | Three invented shared records; no file upload or model request. |
| Check/uncheck Crop or Processing | The request and corresponding headers update together; matching field/header colors preserve the relationship. Previously revealed values return to placeholders. | Fields are a projection of the current shared rows, not new inferred research data. Document identity is always retained. |
| Click **Show prepared records** | Placeholders become current values under exactly the requested columns. B's missing processing value is shown as Empty when that column is selected. The status announces three prepared records and the requested-column count. | Explicitly labeled educational simulation with predefined records. |
| Deselect both fields | Document identities remain, the status requests at least one field, and Show prepared records is disabled. | No data is removed. |
| Click **Reset extraction view** | Restore both selected fields and hidden-value placeholders. | Does not reset shared edits, clear the old walkthrough, or invalidate its snapshot. |
| Switch feature cards or section/workspace tabs | Extraction selection/reveal state and existing edits remain available on return. | Components stay mounted; changing papers/reloading resets their in-memory state. |
| Open the existing crop walkthrough and save edits | Existing correction, selective standardization, counts, snapshot, and CSV behavior remain available; the extraction projection reflects shared edits. | The old dataset and handlers are reused rather than copied into a competing dataset. |

The legacy action definitions, fixtures, correction/standardization handlers, snapshot invalidation, CSV quoting, and download logic were preserved. New field selection and reveal controls do not call those mutation handlers. All exports still contain the original full three-column table, regardless of which columns are currently selected in the extraction view.

### Paper-grounded material and adaptations

The evidence disclosure includes the paper's actual **§4.2 Data Table Structure Inference Example**, p. 4: the question about tasks and accuracy of different LMs, and the keys `language_model_name`, `tasks_supported`, `accuracy_metric`, `accuracy_value`, and `accuracy_source`. It does not invent language-model rows or numerical results. This source example remains separate from the crop simulation.

The interactive choices, request sentence, colored field-to-column correspondence, placeholders, reveal/reset controls, three-stage explanatory strip, card previews, and panel organization are **our educational adaptations**. The paper supports selecting information needs and producing a structured table; the simulation does not run PDF parsing, multimodal retrieval, structure inference, LLM generation, or text-summary generation.

The retained crop-variety-number baseline case was also located in the arXiv PDF on **p. 8, Case Analyses of Automated LLM Baseline, third reason**. Its source link now points there. It remains qualified as an automated Baseline B failure, with no reconstructed identifier, source excerpt, or correction outcome. Moving the existing explanation into a disclosure is a presentation change, not implementation of Feature 2's approved future demonstration.

### Design rationale

The main workspace prioritizes an observable transformation: selected information → visible columns → prepared cells. Request and output remain beside each other on wide screens and stack in that order on narrow screens. Revealing values is a distinct action so readers can inspect the schema before seeing records. No timed animation or pretend processing delay suggests live AI work.

Detailed provenance, the genuine paper schema, and simulation limits stay in a compact native disclosure. The existing walkthrough is retained on demand so Feature 1 is prominent without removing editing/export functionality or prematurely rebuilding the other features.

### Verification performed in this increment

**Content/source checks:** re-read §§4.1–4.3.2 and the source schema example in the supplied arXiv PDF; retained the previously verified §§4.3.3–4.3.4 mappings. Confirmed the existing baseline case on p. 8. Verified the PDF HTTP response and inspected UI link destinations as described above. An optional local PDF-parsing attempt could not run because the installed `fitz` package lacked its `frontend` dependency; source-page checks used the PDF-reading tool instead, and no dependency was added for that attempt.

**Static checks:** ESLint and Vite production build passed with the same locally installed Node v24.18.1 executable documented in the first increment. Commands were `node_modules/eslint/bin/eslint.js .` and `node_modules/vite/bin/vite.js build` through that executable. `git diff --check` passed. No package manifests or lockfile changes were needed in this increment.

**Headless Chromium checks against the production build:**

- Four cards, separate source links with the approved page targets, selected state, and pending labels for Features 2–4.
- Initial hidden values; two-field, Crop-only, Processing-only, and no-field states; immediate request/header updates; disabled reveal with no fields; observable prepared values and Empty cell after reveal.
- Extraction state survives switching among pending cards. Enter selects a card and opens/closes the evidence disclosure; the disclosure contains all five original schema keys.
- Existing source correction, one-record and two-record standardization, and synchronized counts; saved edits appear in the new projection. Resetting the extraction view does not erase those edits.
- Actual CSV download contains the expected header and three edited rows, including a label with a comma and double quotes. Projection changes do not invalidate a kept snapshot or alter exported columns. A saved data edit still invalidates the snapshot and disables download.
- Section/workspace switching preserves state. Legacy restart and all eight actions work. The existing rationale shortcut opens the source editor and focuses the new top heading. Paper switching resets the new and legacy state.
- At **1440 × 1000**, **768 × 1024**, and **390 × 844**, checked page/card widths for horizontal overflow. Captured responsive screenshots; visually reviewed the desktop page and mobile workspace, including wrapped table content and visible controls.

Early browser runs stopped on test-harness assumptions about nested disclosure summaries and whether Restart closes its container. Corrected the selectors/expectation without changing application behavior; subsequent targeted checks passed. No browser console or uncaught page errors were captured in the completed responsive/legacy integration run. These checks do not constitute a screen-reader audit, an original-system reproduction, or a comprehension study.

### Limitations, deferred scope, and change record

| Date | Change / understanding gap | Current status |
| --- | --- | --- |
| October 20, 2026 | Approved arXiv reading source and section/page mapping. | All How it works links use the supplied PDF; publisher-derived initial records are retained as history. |
| October 20, 2026 | Static capability descriptions did not show the mechanism at a glance. | Four selectable cards now contain compact sources, reader questions, and schematic previews. |
| October 20, 2026 | Feature 1 needed observable information-to-structure behavior. | Implemented field selection, request/schema changes, and a separate prepared-record reveal. |
| October 20, 2026 | Preserve prior editing, state, and export while emphasizing Feature 1. | Existing walkthrough retained in a mounted disclosure; regression checks above performed. |

**Deferred:** dedicated demonstrations for Features 2–4, semantic plots/grouping, prepared database merges, and further sections. No claim is made that they are implemented. The crop dataset remains invented; source schema evidence does not validate crop values. PDF page fragments have page-level precision and depend on viewer support. The live arXiv URL may change version in the future.

Current review status: **Feature 1 implemented; stopped for user review before Features 2–4.** Only `src/SciDaSynthTutorial.jsx`, `src/SciDaSynthTutorial.css`, and this existing documentation file are changed in the working tree. ScholarPhi, Scim, other SciDaSynth sections, shared components/data, package files, and routing remain untouched. No commit or push was made.
