# General Standards for Single-Paper Content and UI

Version: 0.1 — working draft, October 16, 2026

Derived from: [ScholarPhi development and context-selection record](scholarPhi.md).

Scope: collecting, verifying, organizing, and presenting a single HCI tool/system paper in Beyond the Query. This document does not change the current ScholarPhi implementation. It is a proposed reusable procedure derived from one developed case, not a validated universal framework or an implemented content-generation skill.

## 1. Purpose and target reader

Help a reader with some paper-reading experience and HCI knowledge understand an unfamiliar interactive system: its purpose, intended users, capabilities, design reasoning, implementation, and supporting evidence. Contextual information should resolve a concrete understanding need. A tutorial, diagram, or table is a means of explaining that information, not an objective by itself.

The product is a source-grounded explanatory page. It is not a replacement for the paper, a reproduction of the original tool, or an automated judgment of its quality or novelty.

## 2. Eligible papers and adaptation boundaries

### 2.1 Primary target

The standard targets HCI-related papers that introduce or substantially develop an interactive tool, system, or prototype and explain its human-facing purpose. The tool need not support literature reading or use AI. Authoring tools, visualization systems, collaboration tools, programming environments, accessibility technologies, and other interactive systems are potential targets when their sources support the required explanations.

A practical starting requirement is access to a full paper with enough information to identify the system's purpose, users or use context, and main capabilities. Supplements, videos, project pages, and code can extend this evidence. An abstract and a repository name alone are insufficient for a fully populated page.

### 2.2 Fit assessment before development

| Paper or source condition | Adaptation decision |
| --- | --- |
| Interactive software tool with detailed design, evaluation, and accessible code | Strong initial fit; assess all content modules and a code-grounded pipeline. |
| Tool paper without public code | Still eligible. Explain implementation from the paper if supported, label that basis, and do not invent code links or claim a code audit. |
| Tool paper with no user study, but a technical evaluation or demonstration | Still eligible with explicit evidence limits. Present the actual evaluation type; do not fabricate participants, usability findings, or comprehension benefits. |
| Tool paper without explicit design goals or formative research | Present the reported problem and design choices. Label any inferred connections, or use a simpler explanation rather than inventing an observation-to-design chain. |
| Hybrid paper combining empirical research and a new tool | Separate findings that motivated the tool from studies that evaluated it; apply this template to the tool contribution. |
| Physical, embodied, wearable, AR/VR, or multi-user system | Conditional fit. Images, video, role-based scenes, or state diagrams may be more faithful than a browser simulation. Record what the page cannot convey. |
| Pure empirical, ethnographic, survey, theoretical, or review paper without a new interactive system | Outside this version's primary target. Some evidence practices transfer, but a different content structure is needed. |
| Algorithm or benchmark paper with no substantive human-facing system | Outside the primary target even if it has code; do not infer HCI relevance from a repository alone. |
| Inaccessible or insufficient primary sources | Mark the page or affected module as pending; do not present an unsupported summary as complete. |

For each candidate, record: fit category, available sources, missing evidence, modules that can be supported, and required adaptations. Eligibility does not imply that every tab can be populated or that the same visual layout will work.

## 3. Content framework: questions before tabs

Use these six questions to establish the core content before collecting extra references. They are project reading questions, not a validated comprehension test.

| Reader question | Information to collect | Important distinction |
| --- | --- | --- |
| What problem does the paper address? | Problem, task, existing difficulty, and author-stated contribution. | Author novelty claims versus our assessment; motivation versus measured results. |
| Who is it for, and when is it used? | Intended users, expertise, goals, environment, and workflow context. | Intended population versus the evaluated sample. |
| What does the tool provide, and how is it used? | Core capability inventory, user actions, system responses, inputs, and outputs. | Whole-system capability coverage versus a selected example. |
| Why was it designed this way? | Reported observations, prior-research basis, design goals, choices, and trade-offs. | Participant evidence, author reasoning, and our synthesis. |
| How was it evaluated, and what was found? | Study types, tasks, conditions, measures, analysis, findings, and mixed or negative results. | Technical performance, usability, subjective response, and task outcomes. |
| What are the limits of the evidence? | Author-stated limitations, reported failures, study boundaries, and implementation qualifications. | Author claims versus our implications; not reported versus not supported. |

Add the implementation question where evidence permits: **What produces the information or behavior shown to users, and when does that processing occur?** This extends the six-question framework; it does not replace any of its questions.

## 4. Collection and provenance procedure

### 4.1 Establish the source set

Start with the full paper and record its title, authors, venue, year, DOI or stable URL, and exact version. Record supplements and corrections separately. Use author/project sources for demonstrations and implementation information, and the actual repository for code claims.

For code, record the repository, inspected commit, paths, relevant symbols or line anchors, and whether the code was only read or also executed. A later repository may differ from the evaluated system. Preserve discrepancies between paper, video, and code with source/version labels rather than silently combining them.

For figures and quotations, record the original location, attribution, reuse basis where applicable, and adaptations such as cropping, omissions, or redrawing. Prefer concise paraphrases with source links when reproduction is unnecessary.

### 4.2 Build an evidence record before writing UI content

Use a Markdown table or structured content records; no particular database or implementation language is required. Each substantive claim or relationship should retain:

| Field | Required content |
| --- | --- |
| ID and module | Stable identifier and intended page section. |
| Reader question | What this item helps the reader understand. |
| Claim or explanation | The proposed displayed statement, separated from any quotation. |
| Source and locator | Title/URL/version plus section, page, figure, table, or code location. |
| Provenance | Author-reported content; source-based synthesis; code-based synthesis; teaching adaptation; team decision; or external discovery metadata. |
| Scope and qualification | Task, population, condition, assumptions, missing evidence, or other relevant boundaries. |
| Presentation | Always visible, available on demand, omitted with a recorded reason, or pending. |
| Review status | Located, checked against source, needs clarification, or ready for display. |

A link alone is not verification. Check that the linked material supports the specific displayed relationship. For missing information, use **Not reported**, **Not inspected**, **Unavailable**, or **Not applicable** accurately; do not substitute zero, “none,” or guessed values.

### 4.3 Build the core, then supplement it

1. Inventory the paper's main features, design goals, studies, findings, and limitations.
2. Map the inventory to the reader questions and evidence records.
3. Identify remaining understanding gaps.
4. Select supplemental context using Section 6.
5. Choose the presentation and demonstration scope.
6. Review content before implementing interactions.

Collection may iterate as new gaps appear. Record changed decisions and their reasons, rather than presenting the first pass as exhaustive screening.

## 5. Content modules and UI generation rules

The six tabs below are the default organization inherited from ScholarPhi. They are a reusable starting structure, not six equally populated requirements. Unsupported sections should have an honest status or be omitted from navigation with the reason recorded. Do not leave an empty tab that suggests a broken interface.

### 5.1 Overview

Collect the full title, publication metadata, abstract, and available paper/project/code links. Preserve attribution for an original abstract; label a condensed abstract as a summary.

Keep this entry concise. Make the problem and intended use understandable without duplicating every later section. Put extensive mechanism, evaluation, and reference detail in the relevant module.

### 5.2 How it works

**Collect:** the full inventory of core capabilities described by the paper. For each capability, record its purpose, preconditions/input, user action, system response, output, source, and demonstration coverage. There is no fixed feature count.

**Generate:** a visible feature overview followed by an explanation or demonstration of the selected feature. Where there is a genuine sequence, use numbered steps and distinguish User actions from System responses. Where capabilities are alternatives, present them as selectable features rather than consecutive stages.

Use a shared scenario across related steps when it makes changes easier to follow. Each action should visibly illustrate a different state or effect, not merely change a heading. Highlight the affected object and provide clear restart or dismissal controls when relevant. Thought bubbles are teaching aids, not original participant quotations.

Prefer authentic examples from the paper, supplement, or demonstrated task. Identify paraphrases and adapted controls. If no suitable example is available, use a clearly labeled illustrative example only after recording why it is necessary; never present invented passages or results as source material.

A feature overview can cover the system while its demonstrations remain selective. Fixed examples must not imply general extraction, live AI, unrestricted search, or full-document coverage. Preserve important failures or uncertainty when otherwise the demonstration would imply capabilities the system does not have.

### 5.3 System Pipeline

**Collect:** input artifacts, stages, processing, outputs, dependencies, execution timing, human intervention, storage or state, and feature connections. For each node, retain code sources when inspected, otherwise paper/supplement sources and an explicit evidence label.

**Generate:** a data-flow or control-flow diagram that explains the mechanism, rather than a folder tree alone. Selecting a node reveals Input, Processing, Output, its relevance, and source links.

Distinguish preparation/training/indexing from use-time activity only where that distinction exists. Some systems need multiple phases, continuous loops, multiple actors, or no preprocessing. Label whether an arrow means data transfer, a prerequisite, control flow, or repetition. Show shared operations as shared; do not turn them into one-time final stages. Distinguish human, model, service, and browser work when it affects interpretation.

Code availability is required for a **code-verified** diagram, not for paper eligibility. Static inspection does not prove successful execution, service availability, extraction quality, or study-version equivalence. Record those boundaries close to the diagram.

### 5.4 Design rationale

**Collect:** each explicit design goal, its reported basis, relevant design responses, and documented trade-offs. Inventory all author-enumerated goals before choosing how much supporting detail to show.

**Generate:** a relationship map such as **Evidence or basis → Need or goal → Design response** when supported. Observations, prior literature, and author arguments are different kinds of basis. Preserve many-to-many relationships; avoid forcing one observation per feature.

Use author identifiers when available and label our own identifiers. A connection needs its own explanation and evidence; having citations on both endpoint nodes does not establish the edge. Distinguish explicit author links from our interpretation. If the evidence does not support a complete chain, use a shorter map or source-backed list.

Selecting a node should expose connected content and a substantive explanation. Do not use expand labels for highlighting-only actions. Add editing or reordering only when it serves an identified reading need. Design links are not automatically causal findings.

### 5.5 Evaluation & Findings, including limitations

**Collect per study:** purpose, study type, participants/materials, tasks, conditions/baselines, assignment or ordering, duration, measures, analysis, findings, and limitations. Separate formative work from summative evaluation, and technical tests from human studies. For qualitative studies, collect reported methods and themes rather than imposing quantitative fields that do not apply.

**Generate:** a concise study overview and major findings, with detailed methods, numerical results, quotations, and qualifications available on demand. Identify the condition and outcome for each result. Include consequential mixed or negative findings, not just favorable outcomes. Keep qualifications that materially change a claim visible beside it.

Separate perceived confidence from correctness, speed from understanding, and tool-level results from evidence about an individual feature. Do not interpret a nonsignificant result as proof of equivalence or a technical benchmark as proof of user benefit. Identify curated, manually corrected, or simulated data used in the original evaluation.

Include author-stated limitations and relevant reported failures. Label our further implications as interpretation. If evaluation is absent, say so; if some studies are summarized selectively, disclose the selection and list the studies not covered.

### 5.6 Related work

**Collect:** a small justified set of external works with a concrete relationship to the focal paper, such as a predecessor, alternative approach, later extension, or confirmed infrastructure reuse.

**Generate:** entries that explain what reading the work adds, the relationship, and the supporting evidence. A similarity score can identify candidates but does not establish citation, inheritance, implementation reuse, research quality, or an unmet need.

If using an external ranking, record the service, seed paper, date, ranking/score when available, exclusions, and final selection rationale. Distinguish a historical lookup from live app functionality. ScholarPhi's top-three-after-workspace-exclusion rule is a local choice, not a requirement for every paper. New papers may have no later citing work.

## 6. Selecting contextual references

Use **core framework → understanding gap → cited supporting material**. Select an explanation attached to a specific need, not a paper merely because it has a familiar name or an attractive image.

For every proposed context, record:

1. The question the reader still needs answered and its location in our page.
2. The relevant reference and where the focal paper cites it.
3. The actual relationship: definition, interaction precedent, design basis, contrast, or evidence for a trade-off.
4. The source passage/figure/result that provides the additional explanation.
5. What this adds beyond the existing content and why a shorter explanation is insufficient, if using a larger visual.
6. The displayed summary, source link, limitations, and default/on-demand placement.
7. Inclusion reason and reasons for excluding reviewed alternatives.

First inspect the focal paper's references. If useful material is not cited by it, label it as an **additional explanatory source**, not a backward reference. Books and product documentation may be relevant but must not be labeled research papers. Subsequent or similar papers follow the separate discovery route in Related work.

Do not require one reference per feature, exactly three references, or a reference for every understanding gap. A local explanation may suffice. Check the original cited source before making precise claims about it; if only the focal paper's characterization is available, attribute the statement accordingly and record that verification limit.

A reference panel should answer **why this is here**, explain the specific relationship, and link to locatable evidence. Preserve the original task, population, and scope. Do not attribute an entire mechanism to a source that supports only one component.

## 7. Shared presentation and interaction requirements

- Keep full paper titles as primary identifiers. In the current workspace, retain the collapsible paper list above the content and one content tab at a time.
- Make essential questions, feature availability, major findings, and important qualifications visible. Put supplemental context and detailed evidence on demand.
- Choose visuals for meaning: a workflow for sequence, a map for relationships, a table for attributes, and a state demonstration for interaction. Decorative charts or section-length proportions are not useful by default.
- Keep labels and figure text readable at ordinary viewing size. Provide captions, attribution, and a larger view when needed; do not stretch a low-resolution image and call it readable.
- Use consistent colors with textual labels. Selected, highlighted, inferred, and unavailable states should not be visually conflated.
- Route connectors around content and recalculate their positions when layout changes. Offer a stacked or textual representation on narrow screens rather than forcing unreadable diagrams.
- Support keyboard interaction, visible focus, appropriate tab/button semantics, and text alternatives. Make state changes perceivable beyond color.
- Define whether state persists across tabs and resets on paper change/reload. Keep the behavior consistent and avoid accidental carry-over between papers.
- Keep source links near the claims they support. Do not make readers search one undifferentiated bibliography for the basis of a particular relationship.

These are page-design requirements for this project. They do not establish that the resulting UI improves comprehension.

## 8. Practical production sequence and deliverables

| Step | Deliverable | Completion criterion |
| --- | --- | --- |
| 1. Assess fit and gather sources | Paper profile and source register | Target fit, versions, missing materials, and adaptations are explicit. |
| 2. Extract the core framework | Six-question inventory and evidence records | Each core question has supported content or an honest gap status. |
| 3. Select contextual additions | Context inclusion/exclusion record | Each addition answers a named gap and has a verified relationship. |
| 4. Specify the page | Module plan, feature inventory, example choices, diagram relationships, and disclosure rules | Every visible element has a purpose and source; demo boundaries are stated. |
| 5. Build the frontend | Curated content records and interactive views | UI uses paper-specific content and states, not copied ScholarPhi semantics. |
| 6. Review content and behavior | Coverage audit and implementation-check record | Claims, diagrams, interactions, and layout pass the checks below. |
| 7. Record decisions | A paper-specific development document | Reasons, sources, adaptations, omissions, and unresolved questions are traceable. |

Reuse the page shell and suitable components; keep paper-specific content separate where practical. Reuse does not require making all papers look identical. This version does not prescribe a new shared schema, backend, model, or automatic generation engine, and does not authorize refactoring existing pages.

## 9. Coverage and acceptance checks

Maintain a per-paper coverage table with: content inventory, included items, omitted/pending items and reasons, provenance, demonstration boundary, and review status.

Use **complete** only for an explicitly bounded inventory verified against the source, such as all named core features or all numbered design goals. Do not convert that into a claim of complete paper coverage. An example may demonstrate one mechanism without reproducing the original system.

Before marking a page ready for review, check:

- All core reader questions are addressed or transparently marked as unsupported/pending.
- The feature overview does not hide capabilities merely because their demos are unfinished.
- Each substantive claim, figure, pipeline node, and rationale edge has an appropriate source and scope.
- Original content, our interpretation, teaching adaptations, and discovery metadata are distinguishable.
- Study findings retain their comparisons and limitations; the evaluated and implemented versions are not silently conflated.
- Context references resolve actual gaps and add more than an unexplained link or screenshot.
- Diagrams represent dependencies and timing accurately; labels and examples remain readable.
- Clicks produce the described state changes; source links target the intended records; tab switching and reset behavior are coherent.
- Applicable lint/build checks pass; browser checks cover the changed interactions, keyboard access, and relevant wide/narrow layouts. Record checks actually performed and remaining gaps.

Content review, software checks, and user-study evidence are separate. Passing the first two does not demonstrate learning, comprehension, reduced effort, or generalizability.

## 10. Required per-paper record

Use a document such as `docs/<paper-name>.md` to record:

1. Paper identity, fit assessment, source versions, and intended explanatory scope.
2. Core content inventory and answers to the reader questions.
3. Module/UI decisions and the reason for each major choice.
4. Feature examples, authentic versus invented content, and simplifications.
5. Rationale and pipeline relationships with evidence and provenance.
6. Evaluation summaries, limitations, and selection boundaries.
7. Context and related-work selection rules, included material, and source links.
8. Coverage audit: complete inventories versus selected demonstrations.
9. Implementation locations, checks performed, unresolved issues, and decision history.

Keep historical decisions distinguishable from current policy. Do not retroactively claim that this procedure was systematically applied to earlier work.

## 11. Limits of this generalization

This standard is intended for adaptation across HCI tool papers, but has not been validated across that population. ScholarPhi is the worked example; its four feature families, LISA examples, seven motivations, 13 pipeline nodes, and two-phase architecture are not template requirements.

Accessibility of sources, repository drift, insufficient reporting, and domain expertise constrain what can be verified. Some systems depend on physical experience, collaboration, latency, or longitudinal use that a static browser demonstration cannot reproduce. Complex systems may require multiple scenarios and diagrams.

The current approach produces curated frontend explanations. It does not automatically ingest arbitrary papers, select references, infer reliable causal relationships, verify novelty, or reproduce tools. A future skill could assist collection and page generation, but source verification and adaptation decisions would still need review.

Participatory design and later evaluation should test whether the selected content answers readers' questions, whether the representations are understandable, and what becomes distracting or misleading. This document organizes that work; it does not predetermine those findings.
