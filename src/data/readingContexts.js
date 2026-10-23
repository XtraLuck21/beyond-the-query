// Scenario labels and attention-scope diagrams are our comparison framing.
// Paper-described settings are paraphrases of the context sources in comparison.js.
export const readingContexts = {
  scholarphi: {
    title: 'Understanding a passage',
    goal: 'Understand the meaning of a term or symbol in the current passage.',
    scope: 'A local expression and its definitions or usages elsewhere in the paper.',
    when: 'While reading, an unfamiliar or ambiguous expression needs clarification.',
    diagramLabel: 'A paper page with one term circled inside a passage, showing local attention rather than a tool output.',
    caption: 'Attention centers on an expression and its context.',
    reported: 'ScholarPhi supports researchers who encounter unfamiliar paper-specific terms, abbreviations, and symbols while reading scientific papers.',
    framing: '“Understanding a passage” and the circled expression summarize the local comprehension need. They do not imply a novice-only audience or that the tool is limited to a single passage.',
  },
  scim: {
    title: 'Getting an overview',
    goal: 'Gain an initial understanding and decide where to read more closely.',
    scope: 'Multiple passages across the paper being skimmed.',
    when: 'Skimming a paper, keeping up with literature, or reading outside a familiar area.',
    diagramLabel: 'A paper page with several separated passage regions outlined, showing attention across the paper rather than actual system highlights.',
    caption: 'Attention ranges across multiple parts of a paper.',
    reported: 'Scim supports skimming for initial understanding and keeping up with literature. The paper discusses use with papers outside readers’ expertise.',
    framing: '“Getting an overview” and the outlined regions summarize broad reading attention. Readers may still have a specific question and may switch between skimming and close reading.',
  },
  scidasynth: {
    title: 'Extracting from a collection',
    goal: 'Collect specified information from a set of selected papers.',
    scope: 'A paper collection organized around an information need.',
    when: 'After searching and screening papers, with a collection and an information need to express.',
    diagramLabel: 'Three paper pages connected without arrows to one information-need label, showing the scope of an extraction task rather than generated results.',
    caption: 'Attention spans a collection and a defined information need.',
    reported: 'SciDaSynth is positioned for data extraction from a paper collection after searching and screening.',
    framing: '“Extracting from a collection” and the shared information-need label summarize a task context. They do not establish that the other tools must be used first.',
    evaluation: 'The evaluation includes nutrition and NLP researchers (§5.1.1). These are study participant groups, not an exclusive definition of the intended audience.',
  },
}

export const readingContextNotes = {
  'scholarphi|scim': 'These are reading activities, not expertise levels. Readers may alternate between skimming and local clarification.',
  'scholarphi|scidasynth': 'A local comprehension need and a collection-level extraction task are different contexts, not required consecutive stages.',
  'scim|scidasynth': 'The contrast is orientation versus a specified extraction need. Skimming can also be guided by a specific question.',
}
