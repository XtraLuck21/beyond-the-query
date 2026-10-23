# Scim: Content and Development Record

Updated: October 22, 2026. Detailed single-paper audit baseline: October 16, commit `2d510c4514bd2b9ff3f4fc38f25f87440d80cc95`.

The October 22 documentation review retains the six-tab content and the audit boundaries below. Shared Across Papers now uses Problem, Reading context, Support, and Reader output with twelve inline visual results and versioned source locators; see [Across Papers](across-papers.md). That comparison-source update does not resolve every single-paper source item listed below. No additional Scim feature or broader source audit is claimed.

This is the current record for all six Scim tabs in Beyond the Query. It documents implemented content, editorial decisions, sources, teaching adaptations, and outstanding work using [general_standards.md](general_standards.md). It is not a claim that the entire paper, original application, or bibliography has been reproduced.

The October 16 consolidation inspected the frontend content, state handlers, styles, and commit history. It also checked the two arXiv abstract presentations. Earlier source-inspection claims below are preserved from the implemented records; this documentation pass did not rerun the Scim backend or independently re-audit every upstream code line and experimental result.

## Paper identity, fit, and source register

- **Paper:** Scim: Intelligent Skimming Support for Scientific Papers; IUI 2023; [publication DOI](https://doi.org/10.1145/3581641.3584034).
- **Primary version:** [arXiv v3 metadata](https://arxiv.org/abs/2205.04561v3), revised September 25, 2023; [v3 full text](https://arxiv.org/html/2205.04561v3); [v3 PDF](https://arxiv.org/pdf/2205.04561v3).
- **Fit:** strong fit for the current HCI tool-paper standard: an interactive reading system with a feature description, formative design process, technical and human evaluations, and accessible code. Code accessibility does not imply reproducibility.
- **Our reader:** someone with paper-reading experience and some HCI knowledge who wants to understand an unfamiliar system. This is distinct from Scim's intended users and evaluated participant groups.
- **Implementation source:** [rayfok/scim at 3380689fc0df7912ce72e65add56beb692bb7050](https://github.com/rayfok/scim/tree/3380689fc0df7912ce72e65add56beb692bb7050). Pipeline links are pinned to this revision. Static inspection is recorded; execution, weights, service availability, and correspondence to the study deployment are not verified.

| Source ID | Source and locator | Use and evidence status |
| --- | --- | --- |
| S1 | [Scim v3 metadata abstract](https://arxiv.org/abs/2205.04561v3) | Overview text and author order follow this record. Checked again during this consolidation. |
| S2 | [Scim §§3.1–3.2](https://arxiv.org/html/2205.04561v3#S3) | Formative process, reported basis, and D1–D7. Relations are individually qualified in the data. |
| S3 | [Scim §§4.1–4.5, Figures 1–3](https://arxiv.org/html/2205.04561v3#S4) | Core capabilities and rationale links. Source of the four-family teaching organization; not our UI's original design. |
| S4 | [Scim §5, Figure 4](https://arxiv.org/html/2205.04561v3#S5) and pinned repository above | Paper-reported implementation versus inspected public code, with discrepancies and integration gaps preserved. |
| S5 | [Scim §5.2.2](https://arxiv.org/html/2205.04561v3#S5.SS2.SSS2), [§6](https://arxiv.org/html/2205.04561v3#S6), [§7](https://arxiv.org/html/2205.04561v3#S7), [§8](https://arxiv.org/html/2205.04561v3#S8) | Three evaluation types, findings, and limitations; summaries are already implemented, not a new statistical reanalysis. |
| S6 | [Wu et al., Cross-document Misinformation Detection based on Event Graph Reasoning](https://aclanthology.org/2022.naacl-main.40/), NAACL 2022; [PDF](https://aclanthology.org/2022.naacl-main.40.pdf) | Shared tutorial excerpts: pp. 543, 544, 547, 549. Quoted wording, omissions, and attribution are recorded per excerpt. |
| S7 | [Cohan et al., Pretrained Language Models for Sequential Sentence Classification](https://aclanthology.org/D19-1383/), §3.3 / Table 2, p. 3695 | Category provenance, available on demand in Design rationale. |
| S8 | [Teufel et al., Towards Domain-Independent Argumentative Zoning: Evidence from Chemistry and Computational Linguistics](https://aclanthology.org/D09-1155/), §2 / Figure 2, p. 1495 | NOV_ADV category context; not an independent novelty judgment. |
| S9 | [ScholarPhi, §4.2](https://arxiv.org/html/2009.14237#S4.SS2) | Lowlighting precedent in Design rationale. Existing external link is unversioned; version pinning remains an audit item. |
| S10 | HiText and TLDR original sources | Full titles, links, locators, selection gates, and exclusions remain in the Related work section below. |

**Source-presentation distinction:** the arXiv metadata abstract starts with different wording from the abstract in the rendered v3 full text. The Overview matches the explicitly linked metadata abstract, so it is not a fabricated summary. Future source labels should preserve this distinction rather than silently replacing one with the other. The general Read paper link currently uses an unversioned arXiv URL; section-level links mostly pin v3.

The Scim and Wu sources are attributed as CC BY 4.0 in the interface. The tutorial normalizes line wrapping/hyphenation and identifies omissions. Diagrams, thought bubbles, charts, comparison prose, and teaching controls are our adaptations. No external Related work figures are reproduced.

## Core reader questions and current destinations

| Reader question | Current answer / location | Coverage assessment |
| --- | --- | --- |
| What problem is addressed? | Overview abstract; rationale introduces skimming and attention guidance. | Covered at summary level. No separate contribution inventory or claim of independent novelty verification. |
| Who uses it, and when? | Overview describes research-paper skimming; Evaluation separates participant profiles and the experienced-skimmer boundary. | Present but distributed. The concise entry does not prominently distinguish intended user expertise from our own target reader. |
| What can the tool do? | How it works exposes four selectable feature families and a shared source-based example. | All four families represented; only selected mechanisms and text are simulated. |
| Why these design choices? | Design rationale combines the formative process, three trade-off summaries, seven goals, and eleven feature links. | Bounded goal inventory covered; the graph is our organization of selected relationships. |
| What evidence supports it? | Evaluation & Findings separates the lab, diary, and technical evaluations. | All three types represented; results and usage observations are selective. |
| What limits the claims? | Evaluation limitations, tutorial attribution, and pipeline notices. | Material boundaries present; no claim to reproduce every qualification or failure example. |
| How does it run? | System Pipeline separates model preparation, per-paper processing, and browser interaction. | Core explanatory path covered; complete training and data integration remain unverified. |

## Overview

**Implemented:** full title, IUI/year, three-paragraph metadata abstract, expandable author/source/license attribution, Read paper and View repository links. Source data: [papers.js](../src/data/papers.js); presentation: [App.jsx](../src/App.jsx).

**Decision and reason:** keep the entry concise and place mechanisms, evidence, and context in dedicated tabs. The top paper selector uses full-width title rows and can collapse. One selected content tab is shown at a time; this avoids repeating a long single-paper page below the abstract.

**Default/on demand:** title, venue, abstract and original-source links are visible. Author and abstract attribution details expand on request.

**Boundary:** this is an entry point, not a complete account of contributions or user eligibility. No upload or arbitrary-paper selection is implemented. A project/video/supplement source inventory has not been completed; availability must not be inferred from its absence here.

## How it works

### Feature inventory and interactions

| Family and source | Input / reader action | Current response / output | Teaching boundary |
| --- | --- | --- | --- |
| Faceted highlights — [§4.2](https://arxiv.org/html/2205.04561v3#S4.SS2) | Select a colored sentence in the shared excerpts. | Show its category, meaning, source location, and whether its category follows Figure 3 or our annotation. Surrounding text remains visible. | Clicking to explain a category is our teaching interaction, not a claim that this was an original Scim feature. |
| Highlight controls — [§4.3](https://arxiv.org/html/2205.04561v3#S4.SS3) | Adjust a facet's Off/Some/More slider, or paragraph More/Fewer; optionally restore the global setting. | Update eligible highlights, counts, distribution marks, and the browser list. | Three levels and manually assigned priorities replace the original scoring mechanism; controls operate on excerpts only. |
| Highlight distribution — [§4.4](https://arxiv.org/html/2205.04561v3#S4.SS4) | Inspect the overview and adjust density. | Labeled excerpt-group marks show highlighted versus ordinary sentences in sentence order. | A non-clickable excerpt map replaces PDF scrollbar coordinates. Whole-paper distribution and marker-to-PDF navigation are not demonstrated. |
| Highlight browser and context linking — [§4.5](https://arxiv.org/html/2205.04561v3#S4.SS5) | Choose a current highlight from the section-grouped list. | Scroll/focus the corresponding passage; use a gold outline for location without changing its category color. | Returns to the selected reflowed excerpt, not the original full PDF. |

**Why four selectable families:** the earlier three-step presentation could be mistaken for the full feature inventory. These are alternative capabilities rather than a mandatory sequence. Feature switching preserves settings and location; Reset example restores the initial feature, global density, local adjustments, and selection.

### Authentic example and bounded coverage

The current dataset in [scimExample.js](../src/data/scimExample.js) contains **4 excerpt groups, 7 excerpt paragraphs, and 20 sentences** from Wu et al. There are **11 manually categorized candidate sentences**, of which **4 correspond to Scim Figure 3 examples**. Default settings show **5 highlights**. These counts were calculated from the current bundled data, not estimated from a screenshot.

| Excerpt group | Original locations | What it helps demonstrate |
| --- | --- | --- |
| Abstract & Introduction | Abstract and §1, p. 543 | Objective, contribution, reported result, and dataset-construction method, alongside unhighlighted context. |
| Related Work | §2, p. 544 | A novelty claim in relation to earlier work. |
| Misinformation Detector | §4.3, p. 547 | Method density controls and surrounding explanatory text. |
| Document-level Detection Results | §6.3, p. 549 | Result language and links back to the original tables and qualifications. |

Four labels follow the categories in Scim Figure 3, while wording follows Wu et al.'s PDF, which differs slightly from the figure. Remaining categories and all priorities are our annotations. Ordinary text, gaps between groups, and within-paragraph omissions are explicitly marked. Figures, equations, tables, and most of the source paper are omitted.

The example distinguishes dataset construction from misinformation detection and qualifies the abstract's maximum reported improvement. Novelty means an author claim. Reader thought bubbles are illustrative, not study quotations. No classifier, PDF parser, or online inference runs here.

**Visible:** capability overview, selected feature instructions, provenance banner, color legend, highlight count, shared text, and relevant controls. **On demand:** sentence explanations and the full Sources, coverage, and teaching adaptations disclosure.

Implementation: [ScimTutorial.jsx](../src/ScimTutorial.jsx), [ScimTutorial.css](../src/ScimTutorial.css), [scimExample.js](../src/data/scimExample.js). Some shared feature styles remain in [PaperVisuals.css](../src/PaperVisuals.css).

## System Pipeline

### Three phases and eleven selectable nodes

Each node exposes **Input, Processing, Output, When it runs, Why this matters, and Sources**. The following is a navigation inventory; the full field-level descriptions and pinned code locators live in [scimPipeline.js](../src/data/scimPipeline.js).

| Phase | Node IDs | Explained handoff / operation | Source basis |
| --- | --- | --- | --- |
| Model preparation | `labels`, `model` | Labeled examples and weak supervision → reusable classifier; distinguish training from loading a checkpoint. | Paper §5.2 and weak-label/predictor code. |
| Per-paper processing | `extract`, `predict`, `export` | PDF → located sentences → model/rule signals → exported artifacts. | Paper §§5.1–5.3 and processing scripts. |
| Reading-time initialization | `load`, `initialize`, `select`, `render` | Prepared records → candidates → visible set → linked reading views. | Bundled reader data and browser code, with paper interface context. |
| Reading-time interaction | `controls`, `navigate` | Density changes loop back into selection/rendering; navigation returns to stored PDF positions. | Reader handlers; no claim that these actions rerun the model. |

**Code source map:**

- [Weak-label generation](https://github.com/rayfok/scim/blob/3380689fc0df7912ce72e65add56beb692bb7050/model/sse_skimming/weak_label/__main__.py#L6).
- [Predictor and checkpoint loading](https://github.com/rayfok/scim/blob/3380689fc0df7912ce72e65add56beb692bb7050/model/sse_skimming/sse_skimming/predictor.py#L25).
- [PDF extraction pipeline](https://github.com/rayfok/scim/blob/3380689fc0df7912ce72e65add56beb692bb7050/model/pdf2sents/pdf2sents/pipeline.py#L86).
- [Per-paper prediction, rules, and export](https://github.com/rayfok/scim/blob/3380689fc0df7912ce72e65add56beb692bb7050/model/sse_skimming/sse_skimming/__main__.py#L101).
- [Reader initialization, selection, controls, navigation, and rendering](https://github.com/rayfok/scim/blob/3380689fc0df7912ce72e65add56beb692bb7050/reader/ui/src/ScholarReader.tsx#L844), with more precise anchors per node.
- [Bundled reader records](https://github.com/rayfok/scim/blob/3380689fc0df7912ce72e65add56beb692bb7050/reader/ui/src/skimmingData/facets.json).
- [PDF overlays](https://github.com/rayfok/scim/blob/3380689fc0df7912ce72e65add56beb692bb7050/reader/ui/src/components/faceted-highlights/HighlightLayer.tsx), [scrollbar](https://github.com/rayfok/scim/blob/3380689fc0df7912ce72e65add56beb692bb7050/reader/ui/src/components/scrollbar/ScrollbarMarkup.tsx), and [highlight list](https://github.com/rayfok/scim/blob/3380689fc0df7912ce72e65add56beb692bb7050/reader/ui/src/components/drawer/Facets.tsx).

### Decisions, discrepancies, and verification limits

- Separate model development, per-paper work, and browser behavior rather than presenting one linear operation per click.
- Keep model preparation expandable to reduce initial detail. Each phase has its own selected-node panel; no node executes upstream software.
- Name transferred data/actions on arrows. Treat the three reading views as parallel outputs and user controls as a feedback loop.
- Show the data-packaging handoff with a dashed warning: the exported artifacts and reader's nested model/heuristic schema were inspected separately; their complete conversion is unverified.
- Preserve the five default predictor labels versus four visible facets, including reader rules for Novelty. Do not collapse paper and repository versions into one claimed model.
- Distinguish probabilities, heuristic weights, and reader-relevant importance. None is an established probability of usefulness to a particular reader.
- Preserve the missing full training-to-checkpoint verification. No original-system execution, model download, or service validation has occurred in this implementation record.

The diagram explains the core skimming path. Broader infrastructure, inherited ScholarPhi features, logging, deployment, and an arbitrary-PDF service are outside its coverage. The original code's localStorage behavior is discussed as a code finding; our tutorial itself only uses in-memory state.

Implementation: [ScimPipeline.jsx](../src/ScimPipeline.jsx), [ScimPipeline.css](../src/ScimPipeline.css), [scimPipeline.js](../src/data/scimPipeline.js), with shared pipeline styles.

## Design rationale

### Content and design choices

The page starts with the formative process (8 interview/observation readers; 13 readers across two preliminary prototype studies; thematic synthesis), then three trade-offs, then a selectable relationship map. Detailed procedure is expandable. These activities are kept separate from final-system evaluation.

The trade-off summaries are our organization: importance/diversity/distribution, sufficient guidance/distraction, and useful categories/reliable labels. They are not measured causal findings.

The map contains **7 basis summaries O1–O7**, **all 7 author goals D1–D7**, and **4 feature families F1–F4**, with **11 goal–feature relationships**. O/F identifiers are ours; D identifiers retain the paper's numbering. Participant IDs in evidence notes are source identifiers, not node IDs.

| Goal | Mapped feature relationships | Provenance and reason |
| --- | --- | --- |
| D1: fit existing habits | F1 in-place highlights; F4 context linking | F1 explicit in §4.1; F4 is our inference from §4.5. |
| D2: diverse reading goals | F1 faceted highlights; F2 controls | F1 explicit in §4.2; the extra D2–F2 connection is our inference from §4.3 and the goal. |
| D3: paragraph/paper middles | F1 distributed highlights | Author-explicit basis in §4.1 and Figure 2. |
| D4: minimize distraction | F1 restrained background highlighting | Author reasoning in §§3.2 and 4.2; not a universal controlled comparison of treatments. |
| D5: sufficient coverage | F1 automatic distribution; F2 local quantity control | Two distinct responses: distribution heuristics (§§4.2, 5.3) and requesting more locally (§§3.2, 4.3). D5 is not represented as scrollbar feedback. |
| D6: accurate labels | F1 category/classification constraints | §4.2 with §§5.2–5.3; visible category colors do not establish accuracy. |
| D7: reader control | F2 manual controls; F3 scrollbar feedback | F2 explicit in §4.3; the D7–F3 feedback link is our interpretation of §4.4. |

There are **8 author-explicit and 3 inferred goal–feature links**. Solid/dashed styling and textual labels distinguish them. The reported-basis-to-goal mappings are summaries, not seven independent discoveries by our team. Selecting a node filters connected information and reveals substantive evidence, feature mechanisms, and tutorial shortcuts. Selecting it again or returning to overview restores the map. Node reordering is not implemented.

### Context references attached to rationale nodes

| Question / placement | Included context and why | Boundary |
| --- | --- | --- |
| Why these categories? O2/D2, O6/D6, F1 | Cohan et al. §3.3/Table 2 and Teufel et al. §2/Figure 2 explain category provenance; Scim §4.2 reports the adaptation. | These sources do not establish that four categories are optimal or that a novelty label verifies novelty. |
| Why background highlighting rather than lowlighting? O4/D4 | ScholarPhi §4.2 provides the visual precedent mentioned in Scim §3.2 D4. | A different reading task and Scim's prototype judgment; not a head-to-head effectiveness result. |

Panels appear only for relevant selected nodes and then expand on demand. Their sources are listed in the source register above. This is contextual support for specific decisions, not an exhaustive literature review.

Implementation: [visualModels.js](../src/data/visualModels.js), [scimRationale.js](../src/data/scimRationale.js), [ScimRationale.jsx](../src/ScimRationale.jsx), and shared [PaperVisuals.jsx](../src/PaperVisuals.jsx). Narrow-screen CSS replaces the three-column connector diagram with stacked nodes and textual connection labels; a new all-tab accessibility verification remains pending.

## Evaluation & Findings

### Evidence inventory and presentation

| Evidence type | Current method coverage | Findings presented | Coverage / interpretation boundary |
| --- | --- | --- | --- |
| Lab information-seeking study, §6 | 19 participants; within-participant comparison against a standard reader; counterbalanced interface/paper order; six NAACL papers; familiarization excluded; within/outside-highlight questions; time to correct answer, first-answer accuracy, and difficulty; analysis details on demand. | Time selector for all questions and the two task types, plus accuracy and difficulty summaries. | Time to locate answers is not whole-paper comprehension; multiple attempts allowed. The original study's manual-correction status is not established in the inspected account. |
| Two-week diary study, §7 | 12 readers; first day standard reader, subsequent days Scim; selected reading materials, daily diary, exit interview, thematic analysis and usage logs. | Five theme groups corresponding to §§7.2.1–7.2.5, with observations expandable. | Repeated diary responses are not independent participants; fixed ordering does not establish randomized causal gains. |
| Preliminary technical check, §5.2.2 | 20 NLP papers; three annotations per paper; majority-supported significant sentences as reference. | F1 0.533 against reference; annotator agreement F1 0.725. | Not percent accuracy, four-facet classification accuracy, reader comprehension, or proof of state-of-the-art performance. |

Displayed mean times are 94.3 vs. 117.7 seconds overall, 93.8 vs. 127.3 when answers are highlighted, and 94.8 vs. 108.0 when they are not. The first two comparisons are reported significant; the third is not (p = .45). Accuracy is 80% vs. 76% (p = .64), and perceived difficulty 2.32 vs. 2.31 (p = .92). The UI explicitly avoids treating nonsignificance as equivalence. Standard deviations and test statistics remain in expandable source-linked details in [ScimEvaluation.jsx](../src/ScimEvaluation.jsx).

The mean-time chart is our rendering on a common 0–140 second scale, not a reproduction of Figure 5's boxplots; it does not show uncertainty intervals. A visible scanning-versus-skimming qualification accompanies it.

The diary page displays 74/105 responses (paper-reported 70.4%) saying highlights helped; it distinguishes this denominator from 12 participants and 177 responses across prompts. Its five themes cover focus/overlooked material, different feature uses, dense or less familiar material, missing context, and requests for broader reading support. Only selected usage counts and participant observations are reproduced.

### Limitations represented

Eight entries distinguish reported difficulty, author-discussed boundaries/risks, and our inference:

1. Missing surrounding or distant context.
2. Conflicts with author-provided cues and contribution lists.
3. Dense math, visual content, and parsing problems.
4. Scanning tasks versus whole-paper understanding.
5. Experienced-skimmer scope rather than teaching novice reading skills.
6. Possible attention costs and overreliance, not proven long-term harm.
7. Highlighting as only part of sensemaking; future social/adaptive support is not evaluated functionality.
8. Our interpretation of limited generalization and feature-level causal attribution.

**Visible:** study overview, headline results, key qualifications, diary themes, technical metric scope, and limitation summaries. **On demand:** methods, statistical details, participant/material descriptions, evidence excerpts in paraphrase, and interpretive reasoning. This covers the three evaluation types and major boundaries, not every quotation, table cell, or possible limitation.

Implementation: [ScimEvaluation.jsx](../src/ScimEvaluation.jsx), [ScimEvaluation.css](../src/ScimEvaluation.css), and shared evaluation styles. Evaluation records currently live inside the component rather than a separate data file; this is a maintainability consideration, not missing user-facing evidence.

## Related work: contextual reference selection

Date: October 16, 2026. Status: implemented in `2d510c4`; selection and research effectiveness remain open to review.

This record applies Section 6 of [general_standards.md](general_standards.md) to the new Related work tab. It is not a retrospective claim that the whole bibliography was systematically screened.

### Purpose and scope

The user preferred references that help explain Scim over selection by Connected Papers similarity. The existing core page determines what contextual explanation is useful. This pass addresses two questions: what information-type categories add to salience highlighting, and why support reading inside the source document rather than provide only a summary.

The focal source is [Scim, arXiv:2205.04561v3](https://arxiv.org/html/2205.04561v3), especially §§2.2.2–2.2.4 and §§4.2–4.3. Candidates were nominated from these discussions; this is not an exhaustive search or a similarity ranking. The two initial candidates were already proposed before this screening procedure was written. The procedure makes the inclusion decisions auditable; it does not establish an independently reproduced selection.

### Repeatable screening procedure

1. Freeze the focal paper version and snapshot the existing UI content. Write each remaining question before choosing a new reference. Record its destination tab and why the existing explanation is insufficient.
2. Inspect the focal section discussing that question and list its directly cited candidates. Record title, bibliographic identity, and citation location. For a future complete screening pass, record every candidate in the declared sections, including exclusions. No such completeness is claimed here.
3. Apply the following gates to each candidate. Use Pass, Fail, or Pending with a locator and a short explanation. Any Pending source check prevents implementation of the affected claim.

| Gate | Observable inclusion requirement |
| --- | --- |
| G1: Question fit | Name the exact reader question and identify the mechanism/output in the source that answers it. General topical similarity is insufficient. |
| G2: Traceable relationship | Locate the citation in Scim and classify the relation as precedent, contrast, definition, design basis, or other supported relation. Do not infer code reuse from citation. |
| G3: Primary evidence | Inspect the original source and record a section/page/figure supporting the displayed claim. Secondary characterization alone remains pending for precise claims. |
| G4: Incremental value | State what the candidate adds beyond content already present, including Design rationale. Prefer linking to existing explanations over duplication. |
| G5: Bounded interpretation | Separate source description from our comparison; keep task, output, and evaluation qualifications. A reference cannot establish superiority without appropriate comparative evidence. |

4. For this first implementation, retain one passing example per question. If multiple candidates pass, prefer the one directly discussed for that mechanism in the focal section, then the one with a clearer locatable primary example; if still tied, document the team's judgment rather than invent a numerical ranking. This remains a qualitative editorial rule.
5. Record accepted, deferred, and already-covered candidates. Revisit the selection if the core page or questions change. Preserve the date, version, and reason for that revision.

### Included records

| Candidate | Gap and relation | Primary evidence | Decision |
| --- | --- | --- | --- |
| [HiText: Text Reading with Dynamic Salience Marking](https://archives.iw3c2.org/www2017/proceedings/companion/p311.pdf) | G1/G2: earlier highlighting approach, cited in Scim §2.2.2; explains the distinction between salience and information-type grouping. | G3: HiText §4.2 and Figure 2, pp. 314–315; compare with Scim §§4.2–4.3. | G4/G5: adds an interaction-level contrast to the existing feature inventory. Include, with no claim of implementation inheritance or comparative performance. |
| [TLDR: Extreme Summarization of Scientific Documents](https://aclanthology.org/2020.findings-emnlp.428/) | G1/G2: alternative output format, cited in Scim §2.2.4; explains the difference between compression and document exploration. | G3: TLDR §1 and Figure 1, p. 4766; Scim §2.2.4. | G4/G5: adds a distinct output-format contrast. Include; do not attribute general summarization concerns to a measured TLDR failure. |

The actual UI summaries and source locators are maintained in `src/data/scimRelatedWork.js` to avoid divergent copies of the content. Cross-system explanations are our source-based synthesis, not quotations. Only selected mechanisms are covered, not the whole external papers or their evaluations.

### Considered alternatives and boundaries

| Candidate | Current disposition | Reason / next condition |
| --- | --- | --- |
| ScholarPhi | Already covered; no new entry | The lowlighting design context is already in Scim Design rationale. |
| Cohan et al. (2019), Teufel et al. (2009) | Already covered; no new entry | Category provenance is already in Design rationale. |
| ScentHighlights | Deferred candidate | A query-guided reading question could justify it. No full original-source mechanism audit is claimed in this pass. |
| Connected Papers recommendations | Outside this selection route | Similarity discovery answers a different question. No similarity scores or top-three claim are used for these entries. |

Other references in the declared sections have not been exhaustively screened. HiText and TLDR are a small approved starting set, not proven optimal choices. Independent reviewers can follow the evidence and gates, but may nominate other eligible works; document such differences.

### UI decisions

- Add Related work to Scim's existing single-paper tabs; preserve ScholarPhi's separate content and selection route.
- Lead each entry with the reader question, full title, publication, and relationship type.
- Place the external mechanism beside Scim's mechanism, stacking the pair on narrow screens.
- Keep the inclusion reason and material qualification visible. Put claim-level source notes and the selection procedure behind native, keyboard-accessible disclosures.
- Use concise paraphrases without copied figures or simulated external systems. No live retrieval, automatic selection, or backend is introduced.

### Implementation and checks

Content: `src/data/scimRelatedWork.js`. View: `src/ScimRelatedWork.jsx` and its stylesheet. Integration: `src/App.jsx` and `src/PaperVisuals.jsx`.

Validation results are recorded in the development log after implementation checks. Source verification and UI checks do not establish comprehension benefit; that remains a study question.

## Shared navigation, state, and implementation boundaries

Current tab order: **Overview → How it works → System Pipeline → Design rationale → Evaluation & Findings → Related work**. [App.jsx](../src/App.jsx) owns paper/tab selection; [PaperVisuals.jsx](../src/PaperVisuals.jsx) renders the paper-specific modules.

Code inspection shows the following state contract:

- Switching tabs hides rather than unmounts the Scim content, preserving tutorial density/local adjustments/selection, rationale selection, pipeline node choices, evaluation filter, and most open disclosures during the current session.
- Switching to another paper resets the section to Overview and remounts `PaperVisuals` through its paper-ID key. Returning to Scim creates fresh module state. Reload also resets our in-memory interactions.
- Changing tutorial feature preserves reading settings; Reset example restores the tutorial defaults. Rationale tutorial shortcuts select the corresponding family and move focus to its heading.
- Changing the evaluation question set remounts its keyed numerical-evidence disclosure. Changing a selected rationale node remounts its contextual-reference panels. These specific disclosures need not retain their open state.
- The original Scim reader's persistence is a subject of the pipeline explanation; it is not our prototype's storage behavior. This frontend does not run the original models or save study data.

Buttons, tab roles, focus styles, source-link labels, native disclosures, and status messages are present in the source. Responsive styles provide stacked layouts for dense content. Source inspection is not a substitute for keyboard/screen-reader/browser validation; the remaining checks below are explicit.

## Standards audit and remaining gaps

Audit basis: the current implementation at `2d510c4`, compared with the October 16 working draft of [general_standards.md](general_standards.md). **Covered** means the bounded information is represented; it does not mean user benefit is validated. **Selected** means a disclosed teaching/editorial subset. **Pending verification** is not evidence of a defect or absence in the original system.

| Standard | Current status and evidence | Remaining gap / disposition |
| --- | --- | --- |
| §§1–2: reader and eligible paper | Documented target, fit, and source availability above. | Original participant expertise and our target reader are different; test whether this distinction is clear in the UI. |
| §3: six core questions | All have a current destination in the question table. | User/use-context information is spread across tabs; a short entry-point scope statement is a candidate, not an implemented requirement. |
| §4.1: source/version register | Paper v3, metadata abstract distinction, source locations, original repository SHA, and excerpt provenance recorded. | General Read paper and the ScholarPhi context link remain unversioned. Pinning them would require a later code/content edit. Supplements/project/video availability has not been comprehensively inventoried. |
| §4.2: evidence records | Node IDs, claim sources, provenance labels, and qualifications are present in module data/components. | No single claim-level ledger with review status for every field; review status is currently module-level. External source accessibility and all fine-grained claims were not rechecked in this consolidation. |
| §5.1: Overview | Identity, original metadata abstract, attribution, paper/code links. | Intended-reader expertise is not prominent; no extra overview section added this turn. |
| §5.2: capability inventory | Four families with a shared authentic text example, reset, linked controls, and teaching disclosures. | Selected excerpts only. No full PDF/whole-paper distribution; distribution marks are not navigation controls. No worked misclassification/missing-context failure example. Those are potential teaching additions, not claims of missing original features. |
| §5.3: implementation explanation | Eleven nodes, timing, data/action arrows, loop, node-level sources, version warnings. | Training-to-checkpoint and exported-artifact-to-reader conversion remain unverified. Do not remove warnings until supported; backend reproduction is outside the current project scope. |
| §5.4: rationale | All seven named goals; eleven qualified feature links; design process and trade-offs; relevant context panels. | Goal coverage is complete only for D1–D7. The eleven-link map is selected synthesis, not an exhaustive causal graph; inferred edges need reader interpretation checks. |
| §5.5: evaluation | Three evaluation types, tasks/methods, positive and nonsignificant results, diary themes, limitations. | Selected usage counts/quotes only. No uncertainty intervals in our mean chart. Manual correction of study highlights remains a reporting uncertainty, not a known property. |
| §§5.6–6: contextual references | Five referenced works across rationale and Related work; per-question inclusion reasons and primary locators. | No exhaustive bibliography screen or independent selection replication. Future additions need a named question, not a quota. ScentHighlights remains deferred. |
| §7: progressive disclosure and state | Detailed sources/methods collapsed; material qualifications visible; state contract recorded above. | Whether users can discover node-specific references and understand the long pages requires observation. Module-wide keyboard/screen-reader/zoom checks are not newly certified here. |
| §9: acceptance checks | Existing Related work lint/build/browser record retained; current documentation consistency checks recorded below. | No new full six-tab regression was performed. A combined review should cover tab/paper switching, focus, narrow maps, source links, and interaction resets. |
| §10: per-paper development record | This consolidation fills identity, inventories, rationale, sources, scope, files, history, and gaps. | Keep this record synchronized after future changes; do not treat historical decisions as current behavior. |
| §11: validity/generalization | Static curated frontend and source-based explanations clearly bounded. | Comprehension benefit, distraction, transfer across papers, and usefulness of the reference selection remain research questions. |

### Prioritized follow-up, without authorizing implementation

These remain candidates, not approved next steps. At the October 22 wrap-up, the current application is retained, including legacy visual-section badges and the existing below-map rationale details. Experimental-design comparisons also remain undecided.

1. **Before presenting stronger coverage or reproducibility claims:** retain the pipeline warnings and distinguish the original tool from the demo. Resolve the two handoffs only if the research needs that level of verification; a successful backend run is not a prerequisite to a qualified explanatory page.
2. **Before study readiness:** perform a combined six-tab interaction/accessibility check and ask whether readers can locate target-user scope, interpret the rationale edge types, find reference evidence, and understand excerpt-only distribution. These are proposed checks, not already observed participant problems.
3. **Small source-consistency candidates:** pin currently unversioned source links and make “metadata abstract” explicit if users confuse it with the full-text abstract. The current abstract itself is supported by its linked source.
4. **Content additions only if a reading need is confirmed:** a concise intended-user/use-context statement, one source-grounded failure case, or more faithful PDF distribution/navigation. These would extend the current demo; they are not silently included in its coverage.
5. **Research rather than engineering completion:** test whether the chosen references actually resolve the two questions, and whether source disclosures add confidence or reading burden. More citations or more tabs alone do not close this gap.

No additional mandatory tab was identified in this audit. Across Papers is a separate workspace module and was not revised or certified against the newer single-paper content in this pass.

## Development sequence and decision history

| Recorded checkpoint | Change and reason | Current status |
| --- | --- | --- |
| October 7 log entry | Initial three-step Scim example and seven-goal map established a working single-paper page. | Historical; the old six-sample-passage description is superseded. |
| `db42945` · October 16 | Replace the step-only tutorial with four core families and a shared Wu et al. example so readers can see the capability inventory. | Current tutorial basis. |
| `e44367e` · October 16 | Add design-process context, trade-offs and edge-level provenance; separate D5 distribution from local controls; add taxonomy/lowlighting references. | Current rationale basis. |
| `e1bbc06` · October 16 | Add a three-phase pipeline to explain the mechanism behind visible interaction while preserving paper/code discrepancies. | Current pipeline basis; handoffs still qualified. |
| `badbf37` · October 16 | Add technical/lab/diary evidence and limitations to avoid equating a working demonstration with proven comprehension benefits. | Current evaluation basis. |
| `2d510c4` · October 16 | Add HiText/TLDR through understanding questions, record selection gates and limits, and establish `scim.md` as the broader record. | Current Related work basis. |
| This documentation consolidation · October 16 | Extend `scim.md` from its reference section to all six tabs, backfill missing development-log milestones, and audit standards gaps. | Documentation only; application unchanged. |

## Validation record

The bullets below describe the **October 16 consolidation**, not fresh October 22 test runs. The October 22 follow-up checks documentation against the current source and local links; it does not repeat the full six-tab regression or verify every upstream claim.

- **This pass:** inspected module source, styles, integration, and commit history; counted tutorial and pipeline inventories directly from the data; checked metadata/full-text abstract distinction against arXiv; checked Markdown relative links/anchors and whitespace; confirmed the resulting diff is restricted to `docs/scim.md` and `docs/development-log.md`.
- **Previously recorded:** Related work passed ESLint/build and desktop/390-pixel browser checks, including source disclosures and Enter-key collapse. See the corresponding development-log entry. Historical initial-UI checks remain historical and do not certify later revisions.
- **Not claimed:** fresh six-tab browser regression, screen-reader audit, original Scim execution, repeated upstream code audit, statistical replication, systematic bibliography review, or a user study of Beyond the Query. Lint/build were not rerun for prose-only changes.

Review status: current implementation inventory documented; source and research boundaries retained; proposed UI changes remain unimplemented. No application code, commits, or pushes are part of this documentation update.
