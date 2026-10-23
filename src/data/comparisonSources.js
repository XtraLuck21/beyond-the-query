// Checked October 22, 2026 against the linked editions.
// SciDaSynth HTML renumbers sections; these locators follow the v3 PDF.
const scholarPhi = 'https://arxiv.org/html/2009.14237v3'
const scim = 'https://arxiv.org/html/2205.04561v3'
const sciDaSynth = 'https://arxiv.org/pdf/2404.13765v3'
const html = (url, anchor, label) => ({ url: `${url}#${anchor}`, label: `${label} · arXiv v3` })
const pdf = (page, label) => ({ url: `${sciDaSynth}#page=${page}`, label: `${label} · v3 PDF p. ${page}` })

export const comparisonSources = {
  motivation: {
    scholarphi: [html(scholarPhi, 'S1', '§1 Introduction')],
    scim: [html(scim, 'S1', '§1 Introduction')],
    scidasynth: [pdf(1, '§1 Introduction')],
  },
  context: {
    scholarphi: [html(scholarPhi, 'S1', '§1 Introduction'), html(scholarPhi, 'S4', '§4 User Interface')],
    scim: [html(scim, 'S1', '§1 Introduction'), html(scim, 'S7.SS2.SSS3', '§7.2.3 Circumstances in which Scim was useful')],
    scidasynth: [pdf(1, '§1 Introduction · intended use'), pdf(6, '§5.1.1 Participants · evaluation sample')],
  },
  support: {
    scholarphi: [html(scholarPhi, 'S4.SS1', '§4.1 Definition Tooltips'), html(scholarPhi, 'S4.SS2', '§§4.2–4.4 Declutter, Equation Diagrams, Priming Glossary')],
    scim: [html(scim, 'S4.SS2', '§4.2 Faceted Highlights'), html(scim, 'S4.SS3', '§4.3 Controls'), html(scim, 'S4.SS5', '§4.5 Side Bar Display of Faceted Highlights')],
    scidasynth: [pdf(4, '§§4.3.1–4.3.2 Information needs and validation'), pdf(6, '§4.3.2 continued; §4.3.3 Summarization and standardization')],
  },
  result: {
    scholarphi: [html(scholarPhi, 'S4.SS1', '§§4.1–4.4 User Interface')],
    scim: [html(scim, 'S4.SS4', '§4.4 Scrollbar Annotations'), html(scim, 'S4.SS5', '§4.5 Side Bar Display of Faceted Highlights')],
    scidasynth: [pdf(4, '§4.1 System Workflow'), pdf(6, '§4.3.4 Iterative table editing and database construction')],
  },
}
