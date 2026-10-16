import * as scholar from './paperVisuals'
import { addScimRationaleEvidence } from './scimRationale'

export const scimSource = 'https://arxiv.org/html/2205.04561v3'
export const synthSource = 'https://journals.sagepub.com/doi/full/10.1002/cl2.70073'
const node = (id, type, code, title, short, detail, section, extra = {}) => ({ id, type, code, title, short, detail, section, group: type === 'observation' ? 'Source-based summary' : type === 'problem' ? 'Author design goal' : 'Interface feature', ...extra })
const observation = (n, ...args) => node(`o${n}`, 'observation', `O${n}`, ...args)
const goal = (n, code, ...args) => node(`p${n}`, 'problem', code, ...args)
const feature = (n, title, short, detail, section, mechanisms, tutorialAction) => node(`d${n}`, 'design', `F${n}`, title, short, detail, section, { mechanisms, features: mechanisms, tutorialAction })
function model(config) {
  const visualNodes = [...config.observations, ...config.problems, ...config.designs]
  const rationalePaths = config.links.map(([o, p, d, reason, section]) => ({ observation: `o${o}`, problem: `p${p}`, design: `d${d}`, reason, section }))
  return { ...config, visualNodes, rationalePaths }
}
const scim = model({
  source: scimSource, initialAction: 'highlight', name: 'Scim',
  goalSubtitle: 'All seven design goals · original D1–D7',
  introduction: 'How existing skimming habits shaped faceted highlights, reader controls, and navigation.',
  coverage: 'All 7 design goals · 4 feature families · 11 goal–feature connections',
  legend: 'O1–O7 = our summaries of reported evidence and reasoning · D1–D7 = author goal identifiers · F1–F4 = our feature grouping.',
  qualification: 'Goal D6 concerns classification quality. Highlights are suggestions; their labels can be wrong.',
  caption: 'Adapted from Fok et al., Scim (IUI 2023), §§3.1–4.5 and §§5.2–5.3, CC BY 4.0. Text and feature groupings are our synthesis. Solid goal–feature links are explicitly supported by the authors’ rationale; dashed links are our interpretations. Neither denotes a measured causal effect. Adaptive personalization was discussed as a possibility, not delivered as a feature.',
  observations: [
    observation(1, 'Readers already have a skim routine', 'Headings, figures, and familiar sections guide attention.', 'Participants described inspecting abstracts, introductions, contributions, results, and conclusions. Layout and typography already provide useful cues; a new layer should work alongside them.', '§3.2 · D1'),
    observation(2, 'Different reading goals need different cues', 'Finding a technique differs from getting a broad overview.', 'Readers may seek a method, locate a contribution, relate a paper to prior work, or prepare a high-level account. A single notion of relevance cannot serve every goal.', '§3.2 · D2'),
    observation(3, 'Useful information hides in long passages', 'Paragraph edges are easier to skim than their middles.', 'Readers use the start and end of paragraphs as shortcuts, but can miss content in the middle or drift into detailed reading. This motivated cues throughout the document.', '§3.2 · D3'),
    observation(4, 'An attention cue can become a distraction', 'Underlines and lowlighting had drawbacks in pilots.', 'The authors report that underlines were too subtle and faded text took extra effort to read during prototype exploration. They chose familiar background highlighting with distinguishable but restrained colors.', '§3.2 · D4'),
    observation(5, 'Sparse highlights can feel incomplete', 'Long unmarked regions leave readers uncertain.', 'Preliminary readers wanted sufficient, reasonably distributed coverage. The authors recommend roughly one highlight per paragraph and the option to request more locally; these are design recommendations, not measured optimal settings.', '§3.2 · D5'),
    observation(6, 'Wrong facet labels undermine confidence', 'An obvious category error interrupts skimming.', 'Pilot readers noticed errors such as results marked as methods. Such errors make the assistance distracting and weaken trust in its categorization.', '§3.2 · D6'),
    observation(7, 'Readers want control over the assistance', 'Preferred amount and type of highlighting vary.', 'Participants wanted to tune highlights to the task and their comfort with the system. The implemented controls are manual; possible adaptive behavior is a separate future direction.', '§3.2 · D7'),
  ],
  problems: [
    goal(1, 'D1', 'Fit existing habits', 'Augment the original reading surface.', 'Preserve familiar ways of navigating and skimming a paper.', '§3.2 · D1'),
    goal(2, 'D2', 'Support diverse goals', 'Offer several kinds of reading cues.', 'Help readers pursue different information needs instead of imposing one summary.', '§3.2 · D2'),
    goal(3, 'D3', 'Reach paragraph and paper middles', 'Expose cues beyond beginnings and endings.', 'Support attention to the middle of both individual paragraphs and the paper as a whole.', '§3.2 · D3'),
    goal(4, 'D4', 'Limit distraction', 'Make the assistance legible and restrained.', 'Avoid visual treatments that interfere with reading the underlying document.', '§3.2 · D4'),
    goal(5, 'D5', 'Provide enough coverage', 'Balance sparse and dense regions.', 'Supply enough highlights to assist skimming while letting readers request more locally.', '§3.2 · D5'),
    goal(6, 'D6', 'Prioritize accurate labels', 'Avoid misleading content categories.', 'Choose useful facets that the system can detect and improve classification quality. The interface does not eliminate classification errors.', '§3.2 · D6; §4.2'),
    goal(7, 'D7', 'Give readers control', 'Adjust the amount and types of highlights.', 'Let readers tailor assistance to their immediate needs through manual controls.', '§3.2 · D7'),
  ],
  designs: [
    feature(1, 'Faceted, distributed in-place highlights', 'Four content types with cues across the paper.', 'Objective, Novelty, Method, and Result receive consistent background colors. Sentence classification and selection provide the cues. Distribution heuristics prioritize paragraphs without highlights; the full text remains available.', '§§4.1–4.2', ['Keep the original document layout and context.', 'Use four distinguishable, low-contrast facet colors.', 'Select useful facets with classification feasibility in mind.', 'Prioritize paragraphs without highlights when distributing selected sentences.'], 'highlight'),
    feature(2, 'Global and local density controls', 'Tune a facet or a specific paragraph.', 'Per-facet sliders control paper-level density; local plus/minus controls change how much of a paragraph is highlighted. These controls let the reader change the system’s suggested coverage.', '§4.3', ['Turn a facet off or increase its density.', 'Request more or fewer highlights in a paragraph.', 'See the highlight count change immediately.'], 'density'),
    feature(3, 'Scrollbar overview', 'See where highlighted content occurs.', 'Colored scrollbar marks summarize the spatial distribution of highlighted passages and update when the reader changes density.', '§4.4', ['Scan the distribution of facets across the paper.', 'See immediate feedback from density changes.'], 'distribution'),
    feature(4, 'Linked highlight browser', 'Read highlighted passages in paper order.', 'A sidebar collects highlighted passages by section. Selecting a passage navigates to its original location for closer reading.', '§4.5', ['Browse highlighted passages grouped by section.', 'Jump back from a list entry to its source context.'], 'context'),
  ],
  links: [
    [1,1,1,'In-place highlights add cues without replacing the document and its familiar layout.','§§4.1–4.2'],
    [1,1,4,'A highlighted passage links back to its original context instead of becoming a detached summary.','§4.5'],
    [2,2,1,'Four facets expose different kinds of content for different skimming goals.','§4.2'],
    [2,2,2,'Facet-specific density lets the reader emphasize the type of information currently needed.','§4.3'],
    [3,3,1,'Distributed in-place cues draw attention to the middle of paragraphs and papers, beyond familiar beginnings and endings.','§3.2; §4.1'],
    [4,4,1,'Familiar, restrained background colors address the visual problems found in pilot designs.','§§3.2, 4.2'],
    [5,5,1,'Automatic selection prioritizes paragraphs without highlights to reduce gaps in coverage. This is a distribution heuristic, not a guarantee that all important content is marked.','§4.2; §5.3'],
    [5,5,2,'Paragraph-level controls let readers request additional highlights when the current coverage is insufficient.','§3.2 · D5; §4.3'],
    [6,6,1,'Facet selection considers detectability, but classification quality remains a technical limitation.','§4.2; §5.2'],
    [7,7,2,'Manual controls allow changes in both category and amount of assistance.','§4.3'],
    [7,7,3,'Scrollbar marks make the effect of density changes visible across the paper. This link is our synthesis of the control-feedback relationship.','§4.4'],
  ],
})
addScimRationaleEvidence(scim)

const scidasynth = model({
  source: synthSource, initialAction: 'question', name: 'SciDaSynth',
  goalSubtitle: 'DG1, DG2, and the three parts of DG3',
  introduction: 'From extraction and consistency problems to traceable tables, validation, and standardization.',
  coverage: 'All 3 design goals · DG3 expanded into 3 subgoals',
  legend: 'O1–O6 = our summaries of formative findings · DG identifiers follow the paper · F1–F4 = our interface grouping.',
  qualification: 'The workflow starts with an included paper collection. Automated quality signals help prioritize review; they do not certify correctness.',
  caption: 'Adapted from Wang et al., SciDaSynth (2025), Formative Study and System, CC BY 3.0. Paraphrased goal and feature summaries; lines synthesize the design rationale. The database/export connection is a workflow interpretation, not a separate author design goal.',
  observations: [
    observation(1,'Relevant data are scattered','Text, tables, and figures must be combined.','Interviewees described time-consuming retrieval of qualitative and quantitative information across document regions and modalities. Extraction forms depend on their research questions.','Formative Study · Challenges; Workflow and Tools'),
    observation(2,'Manual transfer is repetitive','Switching between a paper and a spreadsheet invites errors.','Researchers described memorizing values, switching tools, and entering them by hand. They wanted requested information organized directly into tables.','Formative Study · Challenges; Expectations and Concerns'),
    observation(3,'Equivalent concepts have different names','Terminology, units, and conditions vary across papers.','Readers spend time interpreting abbreviations, grouping concepts, and deciding how to standardize values. Similar labels do not automatically mean equivalent conditions.','Formative Study · Challenges'),
    observation(4,'Data can lose their source connections','Revisiting an origin should not rely on memory.','Links between extracted information and its original passage are difficult to maintain as a collection grows, making verification and later refinement expensive.','Formative Study · Challenges'),
    observation(5,'AI output needs checking','Missing values and irrelevant evidence need attention.','Participants worried about AI misunderstanding a domain or using the wrong source content. They requested uncertainty and missing-data signals and ways to validate results.','Formative Study · Expectations and Concerns About AI Support'),
    observation(6,'Extraction develops through revision','Forms and results change; final tables leave the tool.','Participants revisited documents, revised extraction fields and results, and produced CSV or XLSX tables. They also requested batch review and editing.','Formative Study · Workflow and Tools; Expectations and Concerns'),
  ],
  problems: [
    goal(1,'DG1','Flexible extraction and structure','Translate information needs into a table.','Support custom questions and fields, extract across modalities, and organize qualitative and quantitative data into tables.','Formative Study · Design Goals · DG1'),
    goal(2,'DG2','Summarize and standardize','Make variation across documents visible.','Offer multi-faceted summaries and help standardize terminology, measurements, and categories.','Formative Study · Design Goals · DG2'),
    goal(3,'DG3.1','Prioritize validation','Offer preliminary quality signals.','Help readers identify potentially problematic records and decide where to invest review effort. Scores are not guarantees of correctness.','Formative Study · Design Goals · DG3.1'),
    goal(4,'DG3.2','Trace original evidence','Compare extracted values with their sources.','Make it easy to inspect the original material supporting an extracted record.','Formative Study · Design Goals · DG3.2'),
    goal(5,'DG3.3','Refine efficiently','Edit relevant subsets together.','Support batch edits and refinement for records that share attribute values.','Formative Study · Design Goals · DG3.3'),
  ],
  designs: [
    feature(1,'Query-driven structured results','Questions or custom fields become table columns.','Users specify information needs over uploaded PDFs. Retrieval-augmented generation uses parsed text, tables, and figures to produce a summary and structured records.','System · System Workflow; Data Extraction and Structuring',['Ask a natural-language question or specify fields.', 'Receive a summary and a table matching the request.'], 'table'),
    feature(2,'Alerts with source inspection','Investigate a value before correcting it.','Missingness and model-based quality metrics direct attention to records that may need checking. Readers can inspect retrieved context and original PDFs, edit cells, and clear reviewed alerts.','System · Guided Data Validation and Refinement',['Flag missing or potentially problematic values.', 'Inspect linked context and original document content.', 'Correct values after checking the evidence.'], 'evidence'),
    feature(3,'Semantic exploration and group editing','Inspect variations before applying a common label.','Attribute summaries and projected semantic groups expose patterns. Group cards show variations and frequencies; readers can rename groups, move entries, and apply standardization.','System · Multi-Level and Multi-Faceted Data Summarization and Standardization',['Explore selected attributes and their value groups.', 'Revise group membership and names.', 'Apply a chosen label to the relevant records.'], 'standardize'),
    feature(4,'Iterative database and export','Keep reviewed tables and build on them.','Users add the current table to a database, merge by document name through outer joins, repeat with further queries, and export CSV. This is a workflow feature, not an additional numbered design goal.','System · Iterative Table Editing and Database Construction',['Add a reviewed table to the database.', 'Repeat queries and merge information by document.', 'Export the accumulated table as CSV.'], 'export'),
  ],
  links: [
    [1,1,1,'Custom queries and multimodal retrieval address varied information needs and scattered source content.','System · Data Extraction and Structuring'],
    [2,1,1,'Structured results reduce repeated manual copying between the source and an extraction table.','Formative Study · Challenges; System Workflow'],
    [3,2,3,'Attribute summaries and editable groups expose variation and support deliberate standardization.','System · Multi-Level and Multi-Faceted Data Summarization and Standardization'],
    [4,4,2,'Context and PDF access maintain a route from extracted values back to original evidence.','System · Guided Data Validation and Refinement'],
    [5,3,2,'Missing-value alerts and preliminary quality metrics guide review effort. They do not validate a claim by themselves.','System · Data Extraction and Structuring; Guided Data Validation and Refinement'],
    [5,4,2,'Inspecting original content lets the reader challenge the retrieved context or generated answer.','System · Guided Data Validation and Refinement'],
    [6,5,3,'Group-based edits apply refinements to relevant subsets instead of repeating the same change cell by cell.','System · Multi-Level and Multi-Faceted Data Summarization and Standardization'],
    [6,5,4,'Our workflow mapping: retain refined tables and extend them through later queries, then export for downstream work.','System · Iterative Table Editing and Database Construction'],
  ],
})
export const visualModels = {
  scholarphi: { ...scholar, source: scholar.visualSource, name: 'ScholarPhi', initialAction: 'select', tension: true, goalSubtitle: 'Problems and needs · original M1–M7', introduction: 'From observations to design: seven motivations connected to four interface feature families.', coverage: 'All 7 motivations · all 4 feature families', legend: 'O1–O7 = our evidence summaries · M1–M7 = the paper’s design motivations · D1–D4 = its four feature families.', qualification: 'M7 draws on prior research about imperfect automation; it is not a pilot-study observation.', caption: 'Source-based synthesis of all seven design motivations and four feature families in §§3.3–4.4. Lines express design rationale, not independently measured causal effects. The observations and connections are paraphrased for this map.' },
  scim, scidasynth,
}
for (const item of Object.values(visualModels)) {
  item.mapEdges = [...new Map(item.rationalePaths.flatMap((path) => [
    { from: path.observation, to: path.problem, provenance: item.hasRationaleEvidence ? 'reported' : undefined },
    { from: path.problem, to: path.design, provenance: path.provenance },
  ]).map((edge) => [`${edge.from}-${edge.to}`, edge])).values()]
}
