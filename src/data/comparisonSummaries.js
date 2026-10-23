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

export const supportComparison = [
  { question: 'What is surfaced?', scholarphi: 'Definitions & usages', scim: 'Salient passages' },
  { question: 'How do readers act?', scholarphi: 'Select a term or symbol', scim: 'Adjust highlight density and content types' },
  { question: 'What does it support?', scholarphi: 'Clarify local meaning', scim: 'Direct reading attention' },
]

export const supportFlows = {
  scholarphi: ['Term or symbol', 'Definition / usage', 'Continue reading'],
  scim: ['Paper passages', 'Adjustable highlights', 'Inspect selected context'],
}
