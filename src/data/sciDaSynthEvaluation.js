// Research data only. No UI, simulation, statistical recomputation, or code audit.
// Numeric values support charts; `reported` strings preserve printed precision.
// null means unavailable, never zero. Missing-value notes accompany each finding.
export const evaluationSource = {
  id: 'source-scidasynth-evaluation-v3',
  title: 'SciDaSynth: Interactive Structured Data Extraction from Scientific Literature with Large Language Model',
  url: 'https://arxiv.org/pdf/2404.13765v3',
  version: 'v3', date: '2025-09-04', verifiedOn: '2026-10-22',
  pageConvention: 'One-based PDF pages; HTML section numbers differ.',
  provenance: 'paper-reported',
  organization: 'Our explanatory grouping; not an author-supplied dataset.',
  numericalPolicy: 'No estimates from chart heights; conflicting reports remain separate.',
}

const number = reported => ({ value: Number(reported), reported })
const cite = (id, section, pages, locator, figures = [], tables = []) => ({
  id, sourceId: evaluationSource.id, section, pdfPages: pages, locator, figures, tables,
  url: `${evaluationSource.url}#page=${pages[0]}`,
  pageLinks: pages.map(page => ({ page, url: `${evaluationSource.url}#page=${page}` })),
})

export const evaluationEvidence = {
  'ev-questions': cite('ev-questions', '5', [6], 'Evaluation research questions'),
  'ev-participants': cite('ev-participants', '5.1.1', [6], '24 reported; Group A P1–P12; Group B P13–P20'),
  'ev-datasets': cite('ev-datasets', '5.2', [6, 7], 'Collection sources, convenience sampling, and reference tables'),
  'ev-table1': cite('ev-table1', '5.2', [7], 'Collection statistics, mean (SD)', [], [{ number: 1, pdfPage: 7 }]),
  'ev-baselines': cite('ev-baselines', '5.3', [7], 'Human baseline A and automated baseline B'),
  'ev-tasks': cite('ev-tasks', '5.4', [7], 'Dimensions, splits, system exposure, and counterbalancing'),
  'ev-procedure': cite('ev-procedure', '5.5', [7], 'Remote session procedure and duration'),
  'ev-measures': cite('ev-measures', '5.6', [7], 'Raters, score scale, timing, questionnaires, and statistical tests'),
  'ev-quality': cite('ev-quality', '6.1.1', [8], 'Aggregate data quality means, SDs, and pairwise tests', [{ number: 4, pdfPage: 8 }]),
  'ev-efficiency': cite('ev-efficiency', '6.1.2', [8], 'Completion-time means, SDs, tests, and reductions', [{ number: 5, pdfPage: 8 }]),
  'ev-failures': cite('ev-failures', '6.1.3', [8], 'Alternative Baseline B scores and three failure categories'),
  'ev-workflow': cite('ev-workflow', '6.2.1', [8, 9], 'Workflow, query-understanding, and generated-quality ratings; example continues on p. 9'),
  'ev-standardization': cite('ev-standardization', '6.2.2', [9], 'Two standardization-related rating comparisons'),
  'ev-validation': cite('ev-validation', '6.2.3', [9], 'Locating, organizing, validating, editing ratings; quotation attributed to P22'),
  'ev-workload': cite('ev-workload', '6.2.4', [9], 'Workload, willingness, compatibility, fit, and learning difficulty'),
  'ev-confidence': cite('ev-confidence', '6.2.5', [9], 'Confidence comparison and qualified trust'),
  'ev-discussion': cite('ev-discussion', '7.1.4', [10], 'Discussion describes comparable accuracy and remaining errors'),
  'ev-limitations': cite('ev-limitations', '7.2', [10], 'Domain understanding, quality signals, sample, longitudinal work, prompting/models; repeats 24 participants'),
  'ev-figure6': cite('ev-figure6', 'Appendix B', [13, 14], 'Questionnaire chart labels and rating directions', [{ number: 6, pdfPage: 14 }]),
  'ev-table2': cite('ev-table2', 'Appendix C', [13], 'Dataset I correct/partial/incorrect distributions', [], [{ number: 2, pdfPage: 13 }]),
  'ev-table3': cite('ev-table3', 'Appendix C', [14], 'Dataset II correct/partial/incorrect distributions', [], [{ number: 3, pdfPage: 14 }]),
  'ev-table4': cite('ev-table4', 'Appendix C', [14], 'Cohen kappa by dataset and method', [], [{ number: 4, pdfPage: 14 }]),
}

export const reportingUncertainties = [
  {
    id: 'unc-participants', title: 'Reported total and listed groups disagree',
    description: 'The stated total is 24; the enumerated groups contain 12 and 8 participants (20). P22 appears in feedback, outside the listed P1–P20 range.',
    policy: 'Retain 24 reported and 20 enumerated separately. Do not infer attrition, exclusions, or the missing group allocation.',
    evidence: ['ev-participants', 'ev-validation', 'ev-limitations'],
  },
  {
    id: 'unc-baseline-b', title: 'Baseline B scores conflict between result subsections',
    description: 'Section 6.1.1 reports 13.25 and 14.50; section 6.1.3 reports 13.50 and 14.75, labeled 67.5% and 73.8%.',
    policy: 'Keep both source-specific reports. Never average them or present one as a correction of the other.',
    evidence: ['ev-quality', 'ev-failures'],
  },
  {
    id: 'unc-assignment', title: 'Participant/system/split assignment is ambiguous',
    description: 'Section 5.4 describes using both systems for both subsets but also two tables total. The complete participant-by-condition-by-split matrix is not established.',
    policy: 'Record the within-subject and counterbalancing descriptions without reconstructing individual exposures.',
    evidence: ['ev-tasks'],
  },
  {
    id: 'unc-aggregation', title: 'Score aggregation and automated sampling are incompletely specified',
    description: 'The transformation of 0/1/2 ratings to a 0–20 participant score is not fully described. Baseline B has two tables/two splits/four data points wording in section 5.3 and two scores per split in section 5.6.',
    policy: 'Do not reconstruct denominators, sample independence, repeats, or a normalization formula.',
    evidence: ['ev-baselines', 'ev-measures'],
  },
  {
    id: 'unc-statistics', title: 'Missing statistical details and questionnaire attribution',
    description: 'Degrees of freedom, confidence intervals, effect sizes, exact p-values for inequalities, and multiplicity adjustments are not supplied for these records. Questionnaire prose values are not explicitly assigned to a dataset despite section 5.6 describing separate analyses.',
    policy: 'Use null with explanations. Do not infer participant n, pooled/subgroup attribution, missing means, or chart error-bar definitions.',
    evidence: ['ev-measures', 'ev-quality', 'ev-efficiency', 'ev-workflow', 'ev-workload', 'ev-figure6'],
  },
  {
    id: 'unc-dimension-ties', title: 'Broad superiority wording exceeds the per-dimension evidence',
    description: 'Section 6.1.1 claims superiority in all dimensions, but Table 2 ties SciDaSynth and A at 83.3% correct for raw value and 85.4% for unit. Section 7.1.4 uses comparable accuracy wording.',
    policy: 'Preserve ties; do not equate partial-credit quality scores with fully correct percentages or infer per-dimension significance.',
    evidence: ['ev-quality', 'ev-table2', 'ev-table3', 'ev-discussion'],
  },
  {
    id: 'unc-questionnaire-wording', title: 'Prose and questionnaire chart labels differ',
    description: 'Section 6.2.2 describes standardization-related ratings while Figure 6 uses Overview and Data inconsistency awareness. Section 6.2.3 uses editing while the figure uses Refining data.',
    policy: 'Retain prose labels and figure labels separately. Do not silently map the two standardization comparisons to chart items.',
    evidence: ['ev-standardization', 'ev-validation', 'ev-figure6'],
  },
]

export const studySetup = {
  id: 'study-evaluation',
  researchQuestions: [
    { id: 'rq-quality', question: 'How does SciDaSynth affect extracted data quality?', evidence: ['ev-questions'] },
    { id: 'rq-efficiency', question: 'How does SciDaSynth affect extraction speed?', evidence: ['ev-questions'] },
    { id: 'rq-perceptions', question: 'What benefits and limitations do users perceive?', evidence: ['ev-questions'] },
  ],
  participants: {
    reportedTotal: number('24'),
    enumeratedTotal: { value: 20, provenance: 'derived-arithmetic', explanation: '12 + 8; not a corrected recruitment total.' },
    groups: [
      { id: 'group-nutrition', label: 'Nutrition science', size: number('12'), participantRange: 'P1–P12', datasetId: 'dataset-i', evidence: ['ev-participants'] },
      { id: 'group-nlp', label: 'NLP/ML', size: number('8'), participantRange: 'P13–P20', datasetId: 'dataset-ii', evidence: ['ev-participants'] },
    ],
    evidence: ['ev-participants'], uncertaintyIds: ['unc-participants'],
  },
  design: {
    type: 'within-subjects', participantConditionIds: ['method-scidasynth', 'method-a'],
    separateAutomatedConditionId: 'method-b',
    counterbalancing: '2 system orders × 2 split orders; participants assigned one domain collection.',
    assignment: null,
    missing: { assignment: 'No unambiguous participant/system/split assignment matrix is available.' },
    evidence: ['ev-tasks'], uncertaintyIds: ['unc-assignment'],
  },
  procedure: {
    mode: 'Remote Zoom study; interactive systems deployed on a cloud server.',
    durationHours: number('2.5'), durationQualifier: 'approximately', compensationUSD: number('30'),
    steps: [
      { id: 'procedure-brief', label: 'Consent, background, setup and briefing', minutes: number('10') },
      { id: 'procedure-tutorials', label: 'Tutorial for each interactive system', minutesPerSystem: number('10') },
      { id: 'procedure-tasks', label: 'Counterbalanced extraction tasks', minutes: null, missing: 'Task duration is an outcome, not a fixed reported allowance.' },
      { id: 'procedure-survey', label: 'Post-task surveys', minutes: null, missing: 'No duration reported.' },
      { id: 'procedure-explore', label: 'SciDaSynth free exploration with think-aloud', minutes: number('15') },
      { id: 'procedure-interview', label: 'Concluding semi-structured interview', minutes: null, missing: 'No duration reported.' },
    ],
    evidence: ['ev-procedure'],
  },
  scoring: {
    reference: 'Original review data tables used as ground truth.',
    ratersPerDataset: number('2'), blindedToConditions: true,
    recordRatings: [{ value: 0, label: 'Not Correct' }, { value: 1, label: 'Partially Correct' }, { value: 2, label: 'Correct' }],
    disagreementResolution: 'Discussion to reach consensus.',
    participantScoreRange: [0, 20], aggregationFormula: null,
    automatedSampling: { tablesDescription: 'Two tables for two splits (four data points) per dataset.', scoresDescription: 'Two scores per dataset split.' },
    missing: { aggregationFormula: 'Transformation from record ratings to the reported participant score is incomplete.' },
    evidence: ['ev-datasets', 'ev-baselines', 'ev-measures'], uncertaintyIds: ['unc-aggregation'],
  },
  interpretation: 'This is the final system evaluation, distinct from the formative interview study in section 3.',
  evidence: ['ev-questions', 'ev-tasks', 'ev-measures'],
}

const collectionStatistics = (pages, characters, figures, tables) => ({
  pages: { mean: number(pages[0]), sd: number(pages[1]) },
  characters: { mean: number(characters[0]), sd: number(characters[1]) },
  figures: { mean: number(figures[0]), sd: number(figures[1]) },
  tables: { mean: number(tables[0]), sd: number(tables[1]) },
})

export const evaluationDatasets = [
  {
    id: 'dataset-i', label: 'Dataset I · Nutrition science', sourceReference: '[20]',
    collection: 'Micronutrient retention in biofortified crops under processing.',
    paperCount: number('20'), splitPaperCounts: [number('10'), number('10')],
    sampling: 'Convenience sample from the review collection; balanced split characteristics.',
    dimensions: [{ id: 'dim-crop', label: 'Crop type' }, { id: 'dim-micronutrient', label: 'Micronutrient' }, { id: 'dim-raw', label: 'Raw nutrient value' }, { id: 'dim-unit', label: 'Measurement unit' }],
    collectionStatistics: collectionStatistics(['9.40', '2.97'], ['34842', '14569'], ['3.6', '1.95'], ['5.2', '3.35']),
    evidence: ['ev-datasets', 'ev-table1', 'ev-tasks'], uncertaintyIds: ['unc-assignment'],
  },
  {
    id: 'dataset-ii', label: 'Dataset II · Language models', sourceReference: '[57]',
    collection: 'LLM survey collection.', paperCount: number('20'), splitPaperCounts: [number('10'), number('10')],
    sampling: 'Convenience sample from the survey collection; balanced split characteristics.',
    dimensions: [{ id: 'dim-name', label: 'Model name' }, { id: 'dim-size', label: 'Model size' }, { id: 'dim-scale', label: 'Pretrained data scale' }, { id: 'dim-hardware', label: 'Hardware specifications' }],
    collectionStatistics: collectionStatistics(['24.10', '7.50'], ['74882', '22077'], ['7.00', '3.97'], ['13.60', '4.30']),
    evidence: ['ev-datasets', 'ev-table1', 'ev-tasks'], uncertaintyIds: ['unc-assignment'],
  },
]

export const evaluationConditions = [
  {
    id: 'method-scidasynth', label: 'SciDaSynth', humanOperated: true,
    definition: 'Interactive extraction and structuring with human validation/refinement.',
    role: 'Evaluated human-in-the-loop system.', evidence: ['ev-tasks', 'ev-measures'],
  },
  {
    id: 'method-a', label: 'Baseline A · Human', humanOperated: true,
    definition: 'Simplified SciDaSynth without automatic extraction/structuring; includes PDF annotation/search, automatic parsing, manual data entry, and side-by-side sources.',
    role: 'Interactive manual-work baseline, not an unaided paper-only condition.', evidence: ['ev-baselines'],
  },
  {
    id: 'method-b', label: 'Baseline B · Automated GPT', humanOperated: false,
    definition: 'Separately run GPT-3.5/4 extraction pipeline using specified dimensions/descriptions as JSON queries.',
    role: 'Automated output comparison; not a third participant-operated condition.',
    evidence: ['ev-baselines', 'ev-tasks'], uncertaintyIds: ['unc-aggregation', 'unc-baseline-b'],
  },
]

export const evaluationMetrics = [
  { id: 'metric-quality', label: 'Data quality score', nature: 'objective-expert-rated', unit: 'score', scale: [0, 20], direction: 'higher', methods: ['Paired Student t-test: S versus A', 'Mann–Whitney U: comparisons involving B'], evidence: ['ev-measures'], uncertaintyIds: ['unc-aggregation', 'unc-statistics'] },
  { id: 'metric-time', label: 'Task completion time', nature: 'objective', unit: 'minutes', scale: null, direction: 'lower', definition: 'PDF upload to final table download.', missing: { scale: 'Duration has no fixed bounded response scale.' }, methods: ['Paired Student t-test: S versus A'], evidence: ['ev-measures'] },
  { id: 'metric-distribution', label: 'Correct/partial/incorrect distribution', nature: 'objective-expert-rated', unit: 'percent', scale: [0, 100], direction: 'category-dependent', methods: [], missing: { methods: 'No per-dimension significance tests reported.' }, evidence: ['ev-table2', 'ev-table3'] },
  { id: 'metric-kappa', label: 'Cohen kappa', nature: 'rater-agreement', unit: 'coefficient', scale: [-1, 1], direction: 'higher-agreement', methods: ['Cohen kappa'], evidence: ['ev-measures', 'ev-table4'] },
  { id: 'metric-rating', label: 'Questionnaire item rating', nature: 'subjective', unit: 'rating', scale: [1, 7], direction: 'item-dependent', methods: ['Wilcoxon signed-rank'], instruments: ['NASA TLX (6 items reported)', 'Adapted Technology Acceptance Model (5 items reported)', 'Custom utility/confidence items'], evidence: ['ev-measures', 'ev-figure6'], uncertaintyIds: ['unc-statistics', 'unc-questionnaire-wording'] },
  { id: 'metric-b-accuracy', label: 'Baseline B accuracy as labeled in case analysis', nature: 'author-labeled-summary', unit: 'percent', scale: [0, 100], direction: 'higher', methods: [], missing: { methods: 'No additional test supplied with these alternate summaries.' }, evidence: ['ev-failures'], uncertaintyIds: ['unc-baseline-b', 'unc-aggregation'] },
]

const measurement = (methodId, mean, sd) => ({
  methodId, mean: mean === null ? null : number(mean), sd: sd === null ? null : number(sd), n: null,
  missing: {
    n: 'Analysis sample size is not assigned from the conflicting participant/sampling descriptions.',
    ...(mean === null ? { mean: 'Not numerically reported for this comparison in the prose; not estimated from the chart.' } : {}),
    ...(sd === null ? { sd: 'Not reported for this value.' } : {}),
  },
})
const test = (type, symbol, statistic, operator, p) => ({
  type, statistic: statistic === null ? null : { symbol, ...number(statistic) },
  pValue: p === null ? null : { operator, ...number(p) },
  degreesOfFreedom: null, confidenceInterval: null, effectSize: null, multiplicityAdjustment: null,
  missing: {
    ...(statistic === null ? { statistic: 'Test statistic not reported for this finding.' } : {}),
    ...(p === null ? { pValue: 'No comparison p-value reported for this finding.' } : {}),
    degreesOfFreedom: 'Not reported.', confidenceInterval: 'Not reported.', effectSize: 'Not reported.', multiplicityAdjustment: 'Not reported; do not import ScholarPhi correction methods.',
  },
})
const qualityValues = {
  'dataset-i': { 'method-scidasynth': ['17.58', '1.44'], 'method-a': ['16.08', '2.02'], 'method-b': ['13.25', '0.50'] },
  'dataset-ii': { 'method-scidasynth': ['17.79', '1.05'], 'method-a': ['16.56', '1.31'], 'method-b': ['14.50', '0.76'] },
}
const qualityComparison = (id, datasetId, methods, type, symbol, statistic, p) => ({
  id, datasetId, metricId: 'metric-quality', condition: 'Section 6.1.1 aggregate quality comparison',
  measurements: methods.map(method => measurement(method, ...qualityValues[datasetId][method])),
  unit: 'score', scale: [0, 20], test: test(type, symbol, statistic, '<', p),
  evidence: ['ev-measures', 'ev-quality'],
  uncertaintyIds: ['unc-participants', 'unc-assignment', 'unc-aggregation', 'unc-statistics', 'unc-dimension-ties', ...(methods.includes('method-b') ? ['unc-baseline-b'] : [])],
  interpretation: 'First listed method has the higher reported mean. Partial-credit score differences do not establish a fully-correct percentage or a feature-specific causal effect.',
})
const distribution = (id, datasetId, dimensionId, rows, evidenceId, tied = false) => ({
  id, datasetId, dimensionId, metricId: 'metric-distribution', condition: 'Per-item average distribution in Appendix C',
  unit: 'percent', scale: [0, 100],
  measurements: ['method-scidasynth', 'method-a', 'method-b'].map((methodId, i) => ({
    methodId, correct: number(rows[i][0]), partial: number(rows[i][1]), incorrect: number(rows[i][2]),
    mean: null, sd: null, n: null, missing: 'Category percentages only; no means, SDs, or denominators supplied for this row.',
  })),
  test: null, missing: { test: 'No per-dimension test or p-value reported.' },
  evidence: [evidenceId], uncertaintyIds: ['unc-aggregation', 'unc-dimension-ties'],
  interpretation: tied ? 'SciDaSynth and A tie in fully correct percentage; preserve partial/incorrect differences separately.' : 'Descriptive distribution; no per-dimension significance claim.',
})

export const quantitativeFindings = {
  dataQuality: [
    qualityComparison('quality-i-s-a', 'dataset-i', ['method-scidasynth', 'method-a'], 'paired-student-t', 't', '2.34', '0.05'),
    qualityComparison('quality-i-s-b', 'dataset-i', ['method-scidasynth', 'method-b'], 'mann-whitney-u', 'U', '48.0', '0.01'),
    qualityComparison('quality-i-a-b', 'dataset-i', ['method-a', 'method-b'], 'mann-whitney-u', 'U', '44.0', '0.05'),
    qualityComparison('quality-ii-s-a', 'dataset-ii', ['method-scidasynth', 'method-a'], 'paired-student-t', 't', '2.73', '0.05'),
    qualityComparison('quality-ii-s-b', 'dataset-ii', ['method-scidasynth', 'method-b'], 'mann-whitney-u', 'U', '48.0', '0.01'),
    qualityComparison('quality-ii-a-b', 'dataset-ii', ['method-a', 'method-b'], 'mann-whitney-u', 'U', '43.0', '0.05'),
  ],
  efficiency: [
    { id: 'time-i', datasetId: 'dataset-i', metricId: 'metric-time', condition: 'PDF upload to final table download', measurements: [measurement('method-scidasynth', '44.74', '9.37'), measurement('method-a', '73.22', '14.17')], unit: 'minutes', scale: null, missing: { scale: 'No bounded duration scale.' }, test: test('paired-student-t', 't', '5.19', '<', '0.001'), reportedReductionPercent: number('38.9'), evidence: ['ev-measures', 'ev-efficiency'], uncertaintyIds: ['unc-participants', 'unc-assignment', 'unc-statistics'], interpretation: 'Reported time reduction versus A only; not an automated-B timing comparison.' },
    { id: 'time-ii', datasetId: 'dataset-ii', metricId: 'metric-time', condition: 'PDF upload to final table download', measurements: [measurement('method-scidasynth', '29.72', '9.37'), measurement('method-a', '61.59', '9.43')], unit: 'minutes', scale: null, missing: { scale: 'No bounded duration scale.' }, test: test('paired-student-t', 't', '7.38', '<', '0.0001'), reportedReductionPercent: number('51.7'), evidence: ['ev-measures', 'ev-efficiency'], uncertaintyIds: ['unc-participants', 'unc-assignment', 'unc-statistics'], interpretation: 'Prose gives p<0.0001; Figure 5 uses the broader p<0.001 star legend. Preserve the prose precision.' },
  ],
  perDimension: [
    distribution('distribution-crop', 'dataset-i', 'dim-crop', [['95.8','2.5','1.7'],['93.8','4.2','2.1'],['83.3','8.3','8.3']], 'ev-table2'),
    distribution('distribution-micronutrient', 'dataset-i', 'dim-micronutrient', [['93.8','4.2','2.1'],['87.5','8.3','4.2'],['85.4','4.2','10.4']], 'ev-table2'),
    distribution('distribution-raw', 'dataset-i', 'dim-raw', [['83.3','8.3','8.3'],['83.3','8.3','8.3'],['72.8','15.0','12.2']], 'ev-table2', true),
    distribution('distribution-unit', 'dataset-i', 'dim-unit', [['85.4','8.3','6.3'],['85.4','7.9','6.7'],['75.0','12.5','12.5']], 'ev-table2', true),
    distribution('distribution-name', 'dataset-ii', 'dim-name', [['98.8','0.6','0.6'],['95.0','3.2','1.8'],['90.6','6.3','3.1']], 'ev-table3'),
    distribution('distribution-size', 'dataset-ii', 'dim-size', [['94.4','2.5','3.1'],['93.0','3.9','3.1'],['87.5','5.6','6.9']], 'ev-table3'),
    distribution('distribution-scale', 'dataset-ii', 'dim-scale', [['90.6','4.4','5.0'],['89.4','5.6','5.0'],['81.3','8.8','10.0']], 'ev-table3'),
    distribution('distribution-hardware', 'dataset-ii', 'dim-hardware', [['90.0','8.1','1.9'],['87.5','5.0','7.5'],['84.4','5.0','10.6']], 'ev-table3'),
  ],
  raterAgreement: [
    ['agreement-i-s','dataset-i','method-scidasynth','0.763'], ['agreement-i-a','dataset-i','method-a','0.721'], ['agreement-i-b','dataset-i','method-b','0.775'],
    ['agreement-ii-s','dataset-ii','method-scidasynth','0.738'], ['agreement-ii-a','dataset-ii','method-a','0.767'], ['agreement-ii-b','dataset-ii','method-b','0.842'],
  ].map(([id,datasetId,methodId,value]) => ({ id, datasetId, methodId, metricId: 'metric-kappa', condition: 'Dataset/method agreement as tabulated', coefficient: number(value), unit: 'coefficient', scale: [-1,1], test: null, missing: { test: 'No inference test reported with kappa.' }, evidence: ['ev-measures','ev-table4'], uncertaintyIds: ['unc-aggregation'], interpretation: 'Table 4 rows are dataset/method summaries, not a supplied per-dimension breakdown.' })),
  conflictingReports: [
    { id: 'alternate-b-i', datasetId: 'dataset-i', methodId: 'method-b', metricId: 'metric-b-accuracy', condition: 'Section 6.1.3 case-analysis summary', reportedScore: number('13.50'), scoreDenominator: number('20'), reportedPercent: number('67.5'), unit: 'percent', scale: [0,100], sd: null, test: null, missing: { sd: 'Not reported here.', test: 'No test supplied with this alternate summary.' }, evidence: ['ev-failures'], uncertaintyIds: ['unc-baseline-b','unc-aggregation'], interpretation: 'Conflicts with 13.25 in section 6.1.1; not a replacement or an extra independent experiment.' },
    { id: 'alternate-b-ii', datasetId: 'dataset-ii', methodId: 'method-b', metricId: 'metric-b-accuracy', condition: 'Section 6.1.3 case-analysis summary', reportedScore: number('14.75'), scoreDenominator: number('20'), reportedPercent: number('73.8'), unit: 'percent', scale: [0,100], sd: null, test: null, missing: { sd: 'Not reported here.', test: 'No test supplied with this alternate summary.' }, evidence: ['ev-failures'], uncertaintyIds: ['unc-baseline-b','unc-aggregation'], interpretation: 'Conflicts with 14.50 in section 6.1.1; preserve printed 73.8 rather than recomputing rounding.' },
  ],
}

const rating = (id, label, values, p, evidenceId, direction = 'higher', extras = {}) => ({
  id, label, datasetId: null, metricId: 'metric-rating',
  condition: 'Post-task questionnaire; dataset attribution not explicit in the results prose.',
  measurements: [measurement('method-scidasynth', values[0], values[1]), ...(values.length > 2 ? [measurement('method-a', values[2], values[3])] : [])],
  unit: 'rating', scale: [1,7], direction,
  test: test('wilcoxon-signed-rank', null, null, p === null ? null : '=', p),
  evidence: ['ev-measures', evidenceId, 'ev-figure6'],
  uncertaintyIds: ['unc-participants','unc-statistics'],
  missing: { datasetId: 'Do not assign these prose values to either domain or assume a pooled sample.' },
  interpretation: 'Subjective rating, not an independent extraction-quality measurement.',
  ...extras,
})

export const userPerceptionFindings = [
  rating('rating-workflow', 'Workflow simplification', ['5.83','0.58','4.33','1.50'], '0.012', 'ev-workflow'),
  rating('rating-query', 'Query understanding', ['6.00','0.74'], null, 'ev-workflow', 'higher', { interpretation: 'Single-method descriptive rating; no comparator statistics or comparison test reported.', test: null, missing: { datasetId: 'Unspecified in results prose.', comparator: 'Not reported.', test: 'No comparison test reported.' } }),
  rating('rating-generated', 'Generated table quality', ['5.50','0.80'], null, 'ev-workflow', 'higher', { interpretation: 'Perceived quality; keep distinct from expert-rated quality scores.', test: null, missing: { datasetId: 'Unspecified in results prose.', comparator: 'Not reported.', test: 'No comparison test reported.' } }),
  rating('rating-standardization-overview', 'Standardization-related ability (prose)', ['5.67','0.49','3.75','1.06'], '0.005', 'ev-standardization', 'higher', { figureLabel: null, candidateFigureLabels: ['Overview','Data inconsistency awareness'], uncertaintyIds: ['unc-participants','unc-statistics','unc-questionnaire-wording'], missing: { datasetId: 'Unspecified in results prose.', figureLabel: 'Do not assert a direct mapping from this prose description to a Figure 6 item.' } }),
  rating('rating-standardization-groups', 'Group-standardization facilitation (prose)', ['5.67','0.83','4.25','1.36'], '0.019', 'ev-standardization', 'higher', { figureLabel: null, candidateFigureLabels: ['Overview','Data inconsistency awareness'], uncertaintyIds: ['unc-participants','unc-statistics','unc-questionnaire-wording'], missing: { datasetId: 'Unspecified in results prose.', figureLabel: 'Do not assert a direct mapping from this prose description to a Figure 6 item.' } }),
  ...[
    ['rating-locate','Locating data','5.50','0.67'], ['rating-organize','Organizing data','5.92','0.79'],
    ['rating-validate','Validating data','5.17','0.83'], ['rating-edit','Editing data','5.75','0.45'],
  ].map(([id,label,mean,sd]) => rating(id,label,[mean,sd,null,null],null,'ev-validation','higher',{
    test: test('wilcoxon-signed-rank',null,null,'<','0.05'),
    uncertaintyIds: ['unc-participants','unc-statistics',...(id==='rating-edit'?['unc-questionnaire-wording']:[])],
    interpretation: 'The prose reports all p<0.05; A is the study comparator, but its numeric means/SDs are not provided here.',
  })),
  rating('rating-willingness','Future-use interest',['5.75','0.97','3.92','1.31'],'0.002','ev-workload'),
  rating('rating-mental','Mental workload',['3.17','1.03','4.75','0.97'],'0.015','ev-workload','lower'),
  rating('rating-physical','Physical workload',['2.92','1.00','4.25','1.22'],'0.034','ev-workload','lower'),
  rating('rating-compatibility','Compatibility',[null,null,null,null],'0.027','ev-workload'),
  rating('rating-fit','Fit with expected ways of working',[null,null,null,null],'0.005','ev-workload'),
  rating('rating-learning','Learning difficulty',[null,null,null,null],'0.21','ev-workload','lower',{ interpretation: 'No significant difference reported; not evidence of equivalence.' }),
  rating('rating-confidence','Confidence',['5.75','0.45','5.08','0.90'],'0.33','ev-confidence','higher',{ interpretation: 'No significant confidence difference reported; not proof of equal trust or accuracy.' }),
]

export const failureCases = [
  { id: 'failure-query', kind: 'automated-baseline-failure', title: 'Query interpretation in domain context', methodIds: ['method-b'], datasetIds: ['dataset-i','dataset-ii'], examples: ['Raw crop values not recognized through unprocessed/unwashed wording or zero processing time; multiple crops reduced to one.', 'Pretraining scale confused with fine-tuning data size.'], frequency: null, missing: { frequency: 'No numeric prevalence supplied.' }, evidence: ['ev-failures'], uncertaintyIds: ['unc-baseline-b'], interpretation: 'Author-reported B failures; not measured failure rates for human-assisted SciDaSynth.' },
  { id: 'failure-parsing', kind: 'automated-baseline-failure', title: 'Incomplete or incorrect table/figure evidence', methodIds: ['method-b'], datasetIds: ['dataset-i','dataset-ii'], examples: ['Complex hierarchical tables parsed incorrectly; figure information overlooked; insufficient evidence led to Empty outputs.'], frequency: null, missing: { frequency: 'No numeric prevalence supplied.' }, evidence: ['ev-failures'], uncertaintyIds: [], interpretation: 'No underlying source records or corrected rows are reconstructed.' },
  { id: 'failure-association', kind: 'automated-baseline-failure', title: 'Missing associations across sections', methodIds: ['method-b'], datasetIds: ['dataset-i','dataset-ii'], examples: ['Crop variety identifiers returned without method-section name mappings.', 'Model variants and sizes not distinguished across pages/sections.'], frequency: null, missing: { frequency: 'No numeric prevalence supplied.' }, evidence: ['ev-failures'], uncertaintyIds: [], interpretation: 'Explains a documented failure mechanism without treating it as an isolated-feature experiment.' },
  { id: 'limit-domain', kind: 'author-stated-technical-limitation', title: 'Domain understanding', methodIds: ['method-scidasynth'], datasetIds: ['dataset-i','dataset-ii'], description: 'Specialized knowledge/reasoning may remain inadequate.', evidence: ['ev-limitations'], uncertaintyIds: [], interpretation: 'Future improvement direction, not a measured benefit of fine-tuning.' },
  { id: 'limit-signals', kind: 'author-stated-technical-limitation', title: 'Incomplete quality signals', methodIds: ['method-scidasynth'], datasetIds: ['dataset-i','dataset-ii'], description: 'Relevance/missingness guidance and exact-match highlighting can miss errors.', evidence: ['ev-limitations'], uncertaintyIds: [], interpretation: 'An alert-free record is not certified correct.' },
  { id: 'limit-generalization', kind: 'author-stated-study-limitation', title: 'Limited evaluated population/domains', methodIds: ['method-scidasynth','method-a','method-b'], datasetIds: ['dataset-i','dataset-ii'], description: 'Broader disciplines and larger user samples remain future work.', evidence: ['ev-limitations'], uncertaintyIds: ['unc-participants'], interpretation: 'Avoid generalizing effect sizes beyond the evaluated collections.' },
  { id: 'limit-longitudinal', kind: 'author-stated-study-limitation', title: 'Predefined tasks and short-term use', methodIds: ['method-scidasynth','method-a'], datasetIds: ['dataset-i','dataset-ii'], description: 'Longitudinal research with participants’ own questions and collections remains future work.', evidence: ['ev-limitations'], uncertaintyIds: [], interpretation: 'Short-session preference is not evidence of sustained adoption.' },
  { id: 'limit-models', kind: 'author-stated-technical-limitation', title: 'Prompting and model alternatives', methodIds: ['method-scidasynth'], datasetIds: ['dataset-i','dataset-ii'], description: 'Prompt variations and open-weight model evaluation remain future work.', evidence: ['ev-limitations'], uncertaintyIds: [], interpretation: 'No comparative performance is inferred for unevaluated prompts/models.' },
]
