// Paper-based architecture, not executable pipeline configuration or a code audit.
// IDs, four groups, artifact boundaries, and edge types are explanatory modeling.
// Edges describe information flow, not scheduling, concurrency, or API contracts.
export const pipelineSource = {
  id: 'scidasynth-v3',
  title: 'SciDaSynth: Interactive Structured Data Extraction from Scientific Literature with Large Language Model',
  url: 'https://arxiv.org/pdf/2404.13765v3',
  version: 'v3',
  date: '2025-09-04',
  verifiedOn: '2026-10-22',
  pageConvention: 'PDF pages, one-based; HTML section numbering differs',
  basis: 'paper',
  codeAudit: 'not-performed',
}

const cite = (id, section, pages, locator, figures = []) => ({
  id, sourceId: pipelineSource.id, section, pdfPages: pages, locator, figures,
  url: `${pipelineSource.url}#page=${pages[0]}`,
  provenance: 'paper-grounded',
})

export const pipelineEvidence = {
  parsing: cite('parsing', '4.2', [4], 'Opening paragraph: PDF parsing; toolkit reference [35]'),
  modalities: cite('modalities', '4.2', [4], 'Figure insights and few-shot table structuring; footnote 3'),
  indexing: cite('indexing', '4.2', [4], 'Vector database construction'),
  retrieval: cite('retrieval', '4.2', [4], 'Question-based retrieval'),
  schema: cite('schema', '4.2', [4], 'Data table structure inference; schema example'),
  generation: cite('generation', '4.2', [4], 'Data extraction and structuring'),
  quality: cite('quality', '4.2', [4], 'Data quality evaluation; references [14, 53]'),
  request: cite('request', '4.3.1', [4], 'Natural-language questions or attribute specifications'),
  workflow: cite('workflow', '4.1', [4], 'System workflow and iterative refinement'),
  validation: cite('validation', '4.3.2', [4, 6], 'Starts on p. 4; continues on p. 6 after the figure page'),
  grouping: cite('grouping', '4.3.3', [6], 'Dimension-guided data exploration; footnotes 4 and 5'),
  standardization: cite('standardization', '4.3.3', [6], 'Group-based standardization and live chart/statistic updates'),
  accumulation: cite('accumulation', '4.3.4', [6], 'Outer joins on document names; repeated queries; CSV download'),
  figure1: cite('figure1', '4', [5], 'Figure 1: technical framework and refinement workflow', [{ number: 1, pdfPage: 5 }]),
  figure2: cite('figure2', '4.3', [5], 'Figure 2: query, result, context, source, and standardization panels', [{ number: 2, pdfPage: 5 }]),
  figure3: cite('figure3', '4.3.3', [6], 'Figure 3: group statistics, editing, and application to the table', [{ number: 3, pdfPage: 6 }]),
}

export const pipelineGroups = [
  { id: 'preprocessing', title: 'Document preprocessing', nodeIds: ['parse', 'prepare', 'index'], provenance: 'explanatory-grouping' },
  { id: 'generation', title: 'Retrieval and data generation', nodeIds: ['retrieve', 'schema', 'generate', 'assess'], provenance: 'explanatory-grouping' },
  { id: 'refinement', title: 'Interactive validation and standardization', nodeIds: ['inspect', 'standardize'], provenance: 'explanatory-grouping' },
  { id: 'output', title: 'Iterative refinement and final output', nodeIds: ['accumulate'], provenance: 'explanatory-grouping' },
]

// Artifacts are conceptual information boundaries, not additional processing nodes.
// In particular, the retrieval index is NOT the accumulated structured database.
export const pipelineArtifacts = {
  documents: { id: 'documents', title: 'Uploaded PDFs', kind: 'external-input', evidence: ['workflow', 'parsing'] },
  request: { id: 'request', title: 'Question or attribute specification', kind: 'external-input', evidence: ['request'] },
  attributes: { id: 'attributes', title: 'Selected attributes', kind: 'external-input', evidence: ['grouping'] },
  parsed: { id: 'parsed', title: 'Parsed text, tables, and figures', kind: 'intermediate', evidence: ['parsing'] },
  prepared: { id: 'prepared', title: 'Figure insights and structured table content', kind: 'intermediate', evidence: ['modalities'] },
  'retrieval-index': { id: 'retrieval-index', title: 'Summary embedding retrieval index', kind: 'retrieval-store', evidence: ['indexing', 'figure1'] },
  contexts: { id: 'contexts', title: 'Retrieved original content', kind: 'intermediate', evidence: ['retrieval'] },
  structure: { id: 'structure', title: 'Inferred output schema', kind: 'intermediate', evidence: ['schema'] },
  'current-table': { id: 'current-table', title: 'Current structured table', kind: 'mutable-result', evidence: ['generation', 'validation', 'standardization'] },
  summary: { id: 'summary', title: 'Generated result summary', kind: 'result', evidence: ['generation'] },
  signals: { id: 'signals', title: 'Preliminary quality signals', kind: 'review-guidance', evidence: ['quality'] },
  groups: { id: 'groups', title: 'Attribute summaries and proposed groups', kind: 'intermediate', evidence: ['grouping', 'standardization'] },
  'accumulated-database': { id: 'accumulated-database', title: 'Accumulated structured database', kind: 'result-store', evidence: ['accumulation'] },
  csv: { id: 'csv', title: 'Exported database CSV', kind: 'final-output', evidence: ['accumulation'] },
}

export const pipelineNodes = {
  parse: {
    id: 'parse', title: 'Parse the document collection', group: 'preprocessing',
    inputs: ['Uploaded PDF collection.'],
    processing: ['Parse documents into text snippets, tables, and figures using the cited scientific-document toolkit [35].'],
    outputs: ['Parsed multimodal components.'],
    humanIntervention: { responsibility: 'human-directed', actions: ['Supply the PDF collection.'] },
    evidence: ['parsing', 'workflow', 'figure1'],
    limitations: ['No parser recipe, exact package version, OCR behavior, or failure-recovery protocol is established here.'],
  },
  prepare: {
    id: 'prepare', title: 'Prepare figure and table content', group: 'preprocessing',
    inputs: ['Parsed figures and table strings.'],
    processing: ['Generate figure insights with a vision-language model.', 'Use few-shot LLM prompting to infer and structure table strings into CSV.'],
    outputs: ['Figure insights and structured table content for downstream indexing.'],
    humanIntervention: { responsibility: 'automated', actions: [] },
    evidence: ['modalities', 'figure1'],
    limitations: ['The two modality operations are grouped for explanation; no execution ordering or concurrent scheduling is asserted.'],
  },
  index: {
    id: 'index', title: 'Construct the retrieval index', group: 'preprocessing',
    inputs: ['Processed text, figure content, and table content.'],
    processing: ['Summarize components, embed the summaries, and index the corresponding original content.'],
    outputs: ['Summary embeddings associated with retrievable original content.'],
    humanIntervention: { responsibility: 'automated', actions: [] },
    evidence: ['indexing', 'retrieval', 'figure1'],
    limitations: ['Index storage technology and update policy are not specified in this model.', 'This retrieval store is distinct from the database of accepted structured results.'],
  },
  retrieve: {
    id: 'retrieve', title: 'Retrieve supporting content', group: 'generation',
    inputs: ['User request and summary embedding index.'],
    processing: ['Embed the question and search summary vectors by similarity.'],
    outputs: ['Corresponding original content, rather than only the indexed summaries.'],
    humanIntervention: { responsibility: 'human-directed', actions: ['Provide the question or attribute specification.'] },
    evidence: ['request', 'retrieval', 'figure1'],
    limitations: ['No top-k, similarity threshold, reranker, or retrieval accuracy guarantee is supplied.'],
  },
  schema: {
    id: 'schema', title: 'Infer the output schema', group: 'generation',
    inputs: ['User request.'],
    processing: ['Prompt the LLM to propose column names and value descriptions.'],
    outputs: ['Query-specific table structure.'],
    humanIntervention: { responsibility: 'human-directed', actions: ['Specify information needs.'] },
    evidence: ['request', 'schema', 'figure1'],
    limitations: ['Retrieval is not modeled as a prerequisite; this does not claim the operations execute concurrently.'],
  },
  generate: {
    id: 'generate', title: 'Generate structured results', group: 'generation',
    inputs: ['Request, retrieved original contexts, and inferred schema.'],
    processing: ['Generate a table and summary from the supplied evidence; instruct the model to return Empty for undetermined values.'],
    outputs: ['Current structured table and associated summary.'],
    humanIntervention: { responsibility: 'automated', actions: [] },
    evidence: ['generation', 'figure1'],
    limitations: ['Grounding instructions do not guarantee correctness.', 'Empty does not prove that the complete original document lacks the information.'],
  },
  assess: {
    id: 'assess', title: 'Assess preliminary quality', group: 'generation',
    inputs: ['Request, retrieved contexts, and generated results.'],
    processing: ['Estimate answer relevance, context relevance, and faithfulness; track missingness.'],
    outputs: ['Quality signals to guide review attention.'],
    humanIntervention: { responsibility: 'automated', actions: [] },
    evidence: ['quality', 'validation', 'figure2'],
    limitations: ['Signals are not an automatic acceptance gate or calibrated correctness probabilities.', 'Thresholds and automatic rescoring after edits are not established here.'],
  },
  inspect: {
    id: 'inspect', title: 'Trace evidence and refine records', group: 'refinement',
    inputs: ['Current records, retrieved contexts, original sources, and optional quality guidance.'],
    processing: ['Expose source context with exact-match highlighting and access to PDFs or parsed content; accept user corrections.'],
    outputs: ['Inspected records and, when corrected, an updated current table.'],
    humanIntervention: { responsibility: 'human-directed', actions: ['Judge source support and correct records; clear reviewed alerts.'] },
    evidence: ['validation', 'figure2'],
    limitations: ['Inspection is an optional interaction path, not a forced step after every alert.', 'Edits are table updates; no regeneration, retraining, or rescoring is implied.'],
  },
  standardize: {
    id: 'standardize', title: 'Group attributes and apply standardization', group: 'refinement',
    inputs: ['Current records and selected attributes.'],
    processing: ['Encode attribute descriptions, project vectors, cluster with KMeans, and generate group labels.', 'Apply user-approved grouping edits to the table and update overview statistics.'],
    outputs: ['Attribute/group summaries and, when applied, standardized records.'],
    humanIntervention: { responsibility: 'human-directed', actions: ['Select attributes, revise groups or values, and decide which changes to apply.'] },
    evidence: ['grouping', 'standardization', 'figure2', 'figure3'],
    limitations: ['The paper does not identify the projection algorithm or clustering parameters here.', 'Proposed similarity groups do not establish scientific equivalence.', 'Updated statistics do not establish that every change reruns embeddings or clustering.'],
  },
  accumulate: {
    id: 'accumulate', title: 'Accumulate results and export', group: 'output',
    inputs: ['User-accepted current table and existing accumulated data when available.'],
    processing: ['Merge accepted tables using outer joins on document names; support repeated queries and database CSV export.'],
    outputs: ['Accumulated structured database and optional exported CSV.'],
    humanIntervention: { responsibility: 'human-directed', actions: ['Accept a table for addition, initiate another query, or request export.'] },
    evidence: ['workflow', 'accumulation', 'figure1'],
    limitations: ['Merge conflict resolution and database storage technology are not specified.', 'Export does not require adding a new table first.', 'The diagram does not impose completion of both refinement paths before acceptance.'],
  },
}

// Endpoints resolve against pipelineNodes OR pipelineArtifacts. Artifact endpoints
// keep table-edit feedback separate from generation and distinguish the two stores.
const edge = (id, from, to, kind, label, evidence, condition = null) => ({
  id, from, to, kind, label, evidence, condition,
  optional: condition !== null,
  provenance: 'paper-grounded',
  representation: 'explanatory-information-flow',
})

export const pipelineEdges = [
  edge('documents-parse', 'documents', 'parse', 'data', 'PDF collection', ['parsing']),
  edge('parse-parsed', 'parse', 'parsed', 'data', 'Parsed components', ['parsing']),
  edge('parsed-prepare', 'parsed', 'prepare', 'data', 'Figures and table strings', ['modalities']),
  edge('prepare-prepared', 'prepare', 'prepared', 'data', 'Interpreted and structured content', ['modalities']),
  edge('parsed-index', 'parsed', 'index', 'data', 'Text component input', ['parsing', 'indexing']),
  edge('prepared-index', 'prepared', 'index', 'data', 'Prepared modality input', ['modalities', 'indexing']),
  edge('index-store', 'index', 'retrieval-index', 'data', 'Summary embedding index', ['indexing']),
  edge('store-retrieve', 'retrieval-index', 'retrieve', 'data', 'Searchable summaries and originals', ['retrieval']),
  edge('request-retrieve', 'request', 'retrieve', 'data', 'Question for retrieval', ['retrieval', 'request']),
  edge('request-schema', 'request', 'schema', 'data', 'Question for structure inference', ['schema']),
  edge('retrieve-contexts', 'retrieve', 'contexts', 'data', 'Original supporting content', ['retrieval']),
  edge('schema-structure', 'schema', 'structure', 'data', 'Columns and descriptions', ['schema']),
  edge('request-generate', 'request', 'generate', 'data', 'Question', ['generation']),
  edge('contexts-generate', 'contexts', 'generate', 'data', 'Retrieved evidence', ['generation']),
  edge('structure-generate', 'structure', 'generate', 'data', 'Output schema', ['generation']),
  edge('generate-table', 'generate', 'current-table', 'data', 'Initial structured result', ['generation']),
  edge('generate-summary', 'generate', 'summary', 'data', 'Associated summary', ['generation']),
  edge('request-assess', 'request', 'assess', 'data', 'Question for relevance', ['quality']),
  edge('contexts-assess', 'contexts', 'assess', 'data', 'Context for quality assessment', ['quality']),
  edge('generated-assess', 'generate', 'assess', 'data', 'Generated answers and missingness, not later manual edits', ['quality']),
  edge('assess-signals', 'assess', 'signals', 'data', 'Preliminary review signals', ['quality']),
  edge('table-inspect', 'current-table', 'inspect', 'interaction', 'Inspect a record', ['validation'], 'When the user inspects a record.'),
  edge('signals-inspect', 'signals', 'inspect', 'guidance', 'Direct review attention', ['validation'], 'When quality guidance informs review; inspection is not restricted to alerts.'),
  edge('contexts-inspect', 'contexts', 'inspect', 'data', 'Supporting context', ['validation'], 'When the user opens retrieved contexts.'),
  edge('documents-inspect', 'documents', 'inspect', 'data', 'Original PDF', ['validation'], 'When the user opens the source PDF.'),
  edge('parsed-inspect', 'parsed', 'inspect', 'data', 'Parsed figures and tables', ['validation'], 'When the user inspects parsed source content.'),
  edge('inspect-table', 'inspect', 'current-table', 'feedback', 'Corrected records', ['validation'], 'If the user changes record values; no model rerun implied.'),
  edge('table-standardize', 'current-table', 'standardize', 'interaction', 'Explore attribute values', ['grouping'], 'When the user explores selected attributes.'),
  edge('attributes-standardize', 'attributes', 'standardize', 'data', 'Attribute selection', ['grouping'], 'When attributes are selected for exploration.'),
  edge('standardize-groups', 'standardize', 'groups', 'data', 'Group summaries and statistics', ['grouping', 'standardization']),
  edge('standardize-table', 'standardize', 'current-table', 'feedback', 'Applied standardization', ['standardization', 'figure3'], 'If the user applies group changes; no forced validation order.'),
  edge('table-accumulate', 'current-table', 'accumulate', 'interaction', 'Accepted table', ['accumulation'], 'When the user adds the current table to the database.'),
  edge('database-accumulate', 'accumulated-database', 'accumulate', 'data', 'Existing accumulated results', ['accumulation'], 'When prior data exists for merging, or the user requests database export.'),
  edge('accumulate-database', 'accumulate', 'accumulated-database', 'feedback', 'Merged results', ['accumulation'], 'When an accepted table is added.'),
  edge('accumulate-request', 'accumulate', 'request', 'iteration', 'Another user query', ['workflow', 'accumulation'], 'If the user continues extraction; this is a workflow loop, not generated query text.'),
  edge('accumulate-csv', 'accumulate', 'csv', 'output', 'Database CSV', ['accumulation'], 'When the user requests export.'),
]

// Derived incoming dependencies are the single source of truth, including their
// conditions. Optional feedback/guidance is not a mandatory execution barrier.
for (const node of Object.values(pipelineNodes)) {
  node.provenance = 'paper-grounded'
  node.dependencies = pipelineEdges.filter(item => item.to === node.id).map(item => ({
    edgeId: item.id, source: item.from, kind: item.kind,
    optional: item.optional, condition: item.condition,
  }))
}

export const pipelineBoundaries = [
  'Four phases and ten elements are explanatory groupings, not author-numbered execution stages.',
  'Dependencies do not specify scheduling, thread parallelism, or a mandatory total order.',
  'The request independently feeds retrieval and schema inference; there is no retrieval-to-schema prerequisite edge.',
  'Validation and standardization update the shared current table through optional feedback paths.',
  'No edit-to-generation, edit-to-index, or edit-to-assessment rerun is asserted.',
  'This module contains no live model execution, record simulation, UI state, or inspected code-level implementation claims.',
]

export const sciDaSynthPipeline = {
  schemaVersion: 1,
  source: pipelineSource,
  groups: pipelineGroups,
  nodes: pipelineNodes,
  artifacts: pipelineArtifacts,
  edges: pipelineEdges,
  evidence: pipelineEvidence,
  boundaries: pipelineBoundaries,
}
