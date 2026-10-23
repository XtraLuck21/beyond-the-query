// Compact entry points into the full, source-linked notes in comparison.js.
// These describe selected focuses, not exhaustive capability lists.
export const comparisonSummaries = {
  motivation: {
    label: 'Problem',
    scholarphi: ['Unfamiliar terminology', 'Definitions are separated from where readers need them.'],
    scim: ['Finding salient content', 'Skimming requires deciding which passages deserve attention.'],
    scidasynth: ['Scattered research data', 'Extracted information needs checking and standardization.'],
  },
  context: {
    label: 'Reading context',
    scholarphi: ['Understanding a passage', 'Encountering paper-specific terms and symbols.'],
    scim: ['Getting an initial overview', 'Skimming and deciding where to read further.'],
    scidasynth: ['Extracting across papers', 'Working with a collection after search and screening.'],
  },
  support: {
    label: 'Support',
    scholarphi: ['Definitions on demand', 'Inspect meanings and usages in context.'],
    scim: ['Adjustable highlights', 'Explore passages by content type and density.'],
    scidasynth: ['Editable extraction tables', 'Check sources, correct values, and group entries.'],
  },
  result: {
    label: 'Reader output',
    scholarphi: ['Clarification within the paper', 'Continue reading with definitions available.'],
    scim: ['A focused view of the paper', 'Navigate between highlights and surrounding text.'],
    scidasynth: ['Reusable structured data', 'Merge tables and export for further analysis.'],
  },
}

// Pair-specific comparison questions are editorial interpretations of the
// source-linked Support notes in comparison.js, not author-defined categories.
export const supportComparisons = {
  'scholarphi|scim': {
    heading: 'Two ways to support reading',
    rows: [
      { question: 'What is surfaced?', scholarphi: 'Definitions & usages', scim: 'Salient passages' },
      { question: 'How do readers act?', scholarphi: 'Select a term or symbol', scim: 'Adjust highlight density and content types' },
      { question: 'What does it support?', scholarphi: 'Clarify local meaning', scim: 'Direct reading attention' },
    ],
    flows: {
      scholarphi: ['Term or symbol', 'Definition / usage', 'Continue reading'],
      scim: ['Paper passages', 'Adjustable highlights', 'Inspect selected context'],
    },
  },
  'scholarphi|scidasynth': {
    heading: 'Inspect meanings or refine extracted data?',
    rows: [
      { question: 'What is inspected?', scholarphi: 'A term’s definition and usages within the paper', scidasynth: 'Structured entries generated for an information need' },
      { question: 'Why return to the source?', scholarphi: 'See what a term means at this location and how it is used', scidasynth: 'Check an extracted value against its source context' },
      { question: 'What does the user control?', scholarphi: 'Which definition or usage to inspect', scidasynth: 'Which values to edit and which entries to group or standardize' },
      { question: 'What does it support?', scholarphi: 'Clarifying meaning while reading', scidasynth: 'Verifying and refining an extracted table' },
    ],
    flows: {
      scholarphi: ['Select term / symbol', 'View definition', 'Inspect source / usages', 'Continue reading'],
      scidasynth: ['Specify information need', 'Inspect extracted table', 'Check source context', 'Edit / group entries'],
    },
  },
  'scim|scidasynth': {
    heading: 'Adjust highlights or edit extracted data?',
    rows: [
      { question: 'What is inspected?', scim: 'Selected passages within the original paper', scidasynth: 'Values organized in an extracted table' },
      { question: 'What does the user adjust?', scim: 'Highlight density and content types', scidasynth: 'Extracted values and groups of inconsistent entries' },
      { question: 'What changes?', scim: 'Which original passages are emphasized', scidasynth: 'The content and standardization of table entries' },
      { question: 'Why inspect context?', scim: 'Read the surrounding text of a highlighted passage', scidasynth: 'Verify an extracted entry before refining the table' },
    ],
    flows: {
      scim: ['View paper highlights', 'Adjust density / types', 'Locate a passage', 'Read surrounding text'],
      scidasynth: ['Specify information need', 'Inspect extracted table', 'Check source context', 'Edit / group entries'],
    },
  },
}

export const problemHeadings = {
  'scholarphi|scim': 'Understand the meaning or find where to focus?',
  'scholarphi|scidasynth': 'Understand notation or reconcile research data?',
  'scim|scidasynth': 'Find reading priorities or prepare comparable data?',
}
