// Curated reading notes, not quotations or a live model response.
// Source articles and licenses are recorded with the original abstracts in papers.js.
import { comparisonSources } from './comparisonSources'

function cell(paperId, text, rowId) {
  const sources = comparisonSources[rowId][paperId]
  return { text, sources, section: sources.map(source => source.label).join('; '), sourceUrl: sources[0].url }
}

export const comparisonRows = [
  {
    id: 'motivation',
    label: 'Problem',
    question: 'What difficulty motivates the work?',
    cells: {
      scholarphi: cell('scholarphi', 'Paper-specific terms and symbols can interrupt understanding. Finding their definitions elsewhere in the paper takes effort and disrupts reading.', 'motivation'),
      scim: cell('scim', 'Researchers must keep up with extensive literature. Skimming requires finding important content without reading every passage in depth.', 'motivation'),
      scidasynth: cell('scidasynth', 'Extracting comparable data across papers is laborious. Information scattered across text, tables, and figures can be inconsistent and difficult to standardize.', 'motivation'),
    },
    pairs: {
      'scholarphi|scim': { shared: 'Both address effort involved in reading scientific papers.', difference: 'ScholarPhi focuses on understanding unfamiliar notation; Scim focuses on finding salient passages during skimming.' },
      'scholarphi|scidasynth': { shared: 'Both help readers work with information that is difficult to access directly.', difference: 'ScholarPhi connects a term to its definition within a paper; SciDaSynth reconciles extracted information across a collection.' },
      'scim|scidasynth': { shared: 'Both respond to the effort of working through substantial literature.', difference: 'Scim helps prioritize what to read; SciDaSynth helps structure and validate information extracted from selected papers.' },
    },
  },
  {
    id: 'context',
    label: 'Reading context',
    question: 'Who needs support, and when?',
    cells: {
      scholarphi: cell('scholarphi', 'Researchers reading scientific papers who encounter unfamiliar terms, abbreviations, or symbols defined by that paper.', 'context'),
      scim: cell('scim', 'Researchers skimming a paper for an initial understanding or keeping up with literature, including papers outside their expertise.', 'context'),
      scidasynth: cell('scidasynth', 'Researchers extracting data from a collection after searching and screening papers. Evaluation includes nutrition and NLP researchers.', 'context'),
    },
    pairs: {
      'scholarphi|scim': { shared: 'Both support researchers reading individual scientific papers.', difference: 'ScholarPhi addresses a local comprehension need; Scim supports a broader pass through a paper. This distinguishes reading activities rather than levels of expertise.' },
      'scholarphi|scidasynth': { shared: 'Both are intended to support research work involving scientific literature.', difference: 'ScholarPhi supports understanding a passage; SciDaSynth supports a defined extraction task over screened papers.' },
      'scim|scidasynth': { shared: 'Both serve researchers handling scientific papers.', difference: 'Scim supports skimming; SciDaSynth is positioned after search and screening, when a collection is ready for extraction.' },
    },
  },
  {
    id: 'support',
    label: 'Support',
    question: 'What help is offered, and how is it used?',
    cells: {
      scholarphi: cell('scholarphi', 'Click terms or symbols to inspect position-sensitive definitions and usages. Additional views expose equation definitions and a glossary.', 'support'),
      scim: cell('scim', 'Read highlights grouped by content type. Adjust their density for the paper or a paragraph, and follow highlighted passages back to their context.', 'support'),
      scidasynth: cell('scidasynth', 'Specify information needs to create a data table. Inspect source contexts, edit extracted values, and group or standardize inconsistent entries.', 'support'),
    },
    pairs: {
      'scholarphi|scim': { shared: 'Both augment the paper and connect selected information to its original context.', difference: 'ScholarPhi exposes definitions on demand; Scim directs attention with adjustable highlights.' },
      'scholarphi|scidasynth': { shared: 'Both connect displayed information to source context.', difference: 'ScholarPhi surfaces definitions already present in the paper; SciDaSynth generates structured entries that users can verify and edit.' },
      'scim|scidasynth': { shared: 'Both give users control over which information to inspect.', difference: 'Scim changes the visibility of original passages; SciDaSynth lets users correct and standardize an extracted table.' },
    },
  },
  {
    id: 'result',
    label: 'Reader output',
    question: 'What does the reader get, and what can they do next?',
    cells: {
      scholarphi: cell('scholarphi', 'Definitions and usages remain connected to the paper. Readers can inspect their context and continue reading with clarification of the notation.', 'result'),
      scim: cell('scim', 'A paper with adjustable highlights and a compact passage list. Readers can navigate to relevant passages and inspect surrounding text.', 'result'),
      scidasynth: cell('scidasynth', 'A refined, structured collection of extracted data. Users can merge tables and export CSV for subsequent analysis or reporting.', 'result'),
    },
    pairs: {
      'scholarphi|scim': { shared: 'Both primarily offer support within an ongoing reading experience.', difference: 'ScholarPhi provides definitions and usages; Scim provides selected passages and navigation cues.' },
      'scholarphi|scidasynth': { shared: 'Both organize information that a researcher can inspect further.', difference: 'ScholarPhi keeps clarification within the reading context; SciDaSynth produces a reusable table that can leave the interface as CSV.' },
      'scim|scidasynth': { shared: 'Both present a more focused view of information from the literature.', difference: 'Scim retains original passages for further reading; SciDaSynth structures extracted values for downstream analysis.' },
    },
  },
]

// Selecting a different row or a third paper leaves the current pair intact.
export function toggleCell(selection, rowId, paperId) {
  if (selection.rowId && selection.rowId !== rowId) return selection
  if (selection.paperIds.includes(paperId)) {
    const paperIds = selection.paperIds.filter((id) => id !== paperId)
    return { rowId: paperIds.length ? rowId : null, paperIds }
  }
  if (selection.paperIds.length === 2) return selection
  return { rowId, paperIds: [...selection.paperIds, paperId] }
}

export function getPairNote(row, paperIds) {
  const key = Object.keys(row.cells).filter((id) => paperIds.includes(id)).join('|')
  return row.pairs[key]
}
