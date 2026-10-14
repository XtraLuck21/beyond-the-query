// Curated paraphrases of ScholarPhi §§3.3–4.4, not effectiveness claims.
export const visualSource = 'https://arxiv.org/html/2009.14237v3'
export const steps = [
  { id: 'lookup', title: 'Look up', user: 'Select an unfamiliar term', action: 'Click a marked term or symbol while reading.', support: 'Show a contextual definition', response: 'Bring a relevant definition next to the selected term.', example: 'definition', explanation: 'When several definitions exist, ScholarPhi prioritizes the most recent definition before this occurrence. The reader initiates the lookup; the system does not interrupt automatically.', section: '§4.1 Definition Tooltips' },
  { id: 'explore', title: 'Explore if needed', user: 'Decide whether more context is needed', action: 'Inspect the original definition or look at other usages.', support: 'Offer source context and usages', response: 'Provide links and expandable lists beyond the initial definition.', example: 'context', explanation: 'The source link opens the passage containing the definition. Usage lists open in a sidebar so extra information does not have to fit inside the tooltip. This step can be skipped.', section: '§4.1 Definition Tooltips; Lists of usages' },
  { id: 'continue', title: 'Continue reading', user: 'Dismiss help and resume reading', action: 'Close the tooltip when the explanation is sufficient.', support: 'Clear the reading area', response: 'Remove the tooltip; keep lookup available for the next question.', example: 'dismiss', explanation: 'The reader controls when to dismiss the assistance and can repeat a lookup later. This is one illustrative reading path, not a required sequence.', section: '§3.3 M7; §4.1 Definition Tooltips' },
]
// O labels are ours. M1–M7 and the four feature families follow the paper.
export const observations = [
  { id: 'o1', type: 'observation', code: 'O1', group: 'Pilot feedback', title: 'Which meaning applies here?', short: 'Several definitions can describe the same symbol.', detail: 'Readers wanted a definition relevant to the current passage, with surrounding context when several meanings were available. Some did not want the definition repeated at the place where they were already reading it.', section: '§3.3 M1' },
  { id: 'o2', type: 'observation', code: 'O2', group: 'Pilot feedback', title: 'Let me check the source', short: 'A detached definition was not always enough.', detail: 'Readers requested navigation to the original defining passage to judge relevance and investigate possible extraction errors.', section: '§3.3 M2' },
  { id: 'o3', type: 'observation', code: 'O3', group: 'Pilot feedback', title: 'The explanation is scattered', short: 'Symbols, sub-symbols, and related usages need to be read together.', detail: 'Readers wanted definitions for constituent symbols and ways to connect semantically equivalent symbols that looked different. Relevant explanations could be spread across the paper.', section: '§3.3 M3' },
  { id: 'o4', type: 'observation', code: 'O4', group: 'Pilot feedback', title: 'What can I look up?', short: 'Subtle underlines made available help discoverable.', detail: 'Readers appreciated dotted underlines indicating terms that could be clicked. These cues suggested where useful definition information was available.', section: '§3.3 M4' },
  { id: 'o5', type: 'observation', code: 'O5', group: 'Pilot feedback', title: 'Help covers the paper', short: 'Large tooltips blocked text; nearby help was still useful.', detail: 'Some readers reported that tooltips obscured the text and found little value in definitions beyond the first. Others valued explanations close to what they were reading.', section: '§3.3 M5' },
  { id: 'o6', type: 'observation', code: 'O6', group: 'Pilot feedback', title: 'The interface takes attention', short: 'Extra colors and marks can distract from difficult reading.', detail: 'Readers had limited attention for interface details. Multiple highlight colors caused confusion, and one reader requested a way to turn off underlines even though others found them unobtrusive.', section: '§3.3 M6' },
  { id: 'o7', type: 'observation', code: 'O7', group: 'Prior research · not pilot feedback', title: 'Extraction can be wrong', short: 'Readers need a way forward when automated help fails.', detail: 'The authors draw on prior guidelines for interfaces with imperfect machine learning (Wright et al., 2020). This is a literature-based design rationale, not a separate participant observation.', section: '§3.3 M7' },
]
export const problems = [
  { id: 'p1', type: 'problem', code: 'M1', title: 'Fit the current occurrence', short: 'Tailor definitions to where the term appears.', group: 'Context-sensitive meaning', section: '§3.3 M1' },
  { id: 'p2', type: 'problem', code: 'M2', title: 'Connect to original context', short: 'Let readers inspect the defining passage.', group: 'Source access', section: '§3.3 M2' },
  { id: 'p3', type: 'problem', code: 'M3', title: 'Bring information together', short: 'Consolidate related definitions and usages.', group: 'Consolidation', section: '§3.3 M3' },
  { id: 'p4', type: 'problem', code: 'M4', title: 'Signal available help', short: 'Show where useful information can be found.', group: 'Information scent', section: '§3.3 M4' },
  { id: 'p5', type: 'problem', code: 'M5', title: 'Keep the paper visible', short: 'Minimize how much assistance covers the text.', group: 'Occlusion', section: '§3.3 M5' },
  { id: 'p6', type: 'problem', code: 'M6', title: 'Protect reading attention', short: 'Minimize visual and interaction distractions.', group: 'Distraction', section: '§3.3 M6' },
  { id: 'p7', type: 'problem', code: 'M7', title: 'Support error recovery', short: 'Offer alternatives and easy dismissal when help fails.', group: 'Imperfect automation', section: '§3.3 M7' },
]
export const designs = [
  { id: 'd1', type: 'design', code: 'D1', group: '§4.1', title: 'Definition tooltips', short: 'Contextual help, close to the selected term.', section: '§4.1; §3.3 M6–M7', tutorialAction: 'definition',
    features: ['Position-sensitive definition', 'Source links & sidebar lists', 'Availability cues & dismissal'],
    detail: 'The closest preceding definition is shown first in a compact tooltip. Source links and optional lists let the reader investigate beyond that first explanation.',
    mechanisms: ['Prioritize the most recent preceding definition; this is a heuristic, not a guarantee of the correct meaning.', 'Link to the defining passage, highlight its context, and allow a return using the browser Back button.', 'Offer sidebar lists of prose definitions, defining formulae, and usages; allow selection of constituent symbols.', 'Underline available terms; show list counts on hover and disable unavailable options. Do not repeat a definition at its own occurrence.', 'Keep the tooltip compact, use a consistent highlight color, allow underlines to be switched off, and let the reader dismiss assistance.', 'When a definition is missing, other available information can still be inspected. Direct correction and automatic error alerts were considered but not implemented.'] },
  { id: 'd2', type: 'design', code: 'D2', group: '§4.2', title: 'Declutter', short: 'Find a term throughout the original paper.', section: '§4.2', tutorialAction: 'declutter',
    features: ['Highlight matching sentences', 'Fade unrelated passages', 'Counts & occurrence navigation'],
    detail: 'Declutter highlights sentences containing a selected term and fades the rest of the paper, preserving the original placement of information.',
    mechanisms: ['Inspect matching sentences directly in the paper instead of adding an overlay.', 'Use occurrence counts, page numbers, next/previous controls, and arrow keys to navigate matches.', 'Fade irrelevant text to direct attention while preserving the surrounding document.'] },
  { id: 'd3', type: 'design', code: 'D3', group: '§4.3', title: 'Equation diagrams', short: 'Read several symbol definitions together.', section: '§4.3', tutorialAction: 'equations',
    features: ['Definitions around an equation', 'Labels linked to symbols', 'Click through to more context'],
    detail: 'Clicking an equation shows definitions for its symbols and sub-symbols at once, using definitions appropriate to that location.',
    mechanisms: ['Display multiple position-sensitive definitions simultaneously around an equation.', 'Hover a label to highlight its symbol; click a definition to open its tooltip and reach source context.', 'Use diagonal leader lines to distinguish annotation lines from the orthogonal lines already common in mathematical notation.'] },
  { id: 'd4', type: 'design', code: 'D4', group: '§4.4', title: 'Priming glossary', short: 'Preview the vocabulary before reading.', section: '§4.4', tutorialAction: 'glossary',
    features: ['Terms & symbols in one place', 'Ordered by first appearance', 'Preview or printed reference'],
    detail: 'A glossary appears before the paper, collecting terms and symbols in order of appearance. It supports early familiarization and can be printed as a reference beside the paper.',
    mechanisms: ['Consolidate terms and symbols before the main text.', 'Preview the vocabulary and density of terminology that will appear.', 'Provide a reference that can be consulted alongside the paper, including in print.'] },
]
// Links summarize the motivations explicitly discussed in §§3.3 and 4.
const links = [
  [1, 1, 'A position-sensitive heuristic chooses the closest preceding definition.', '§4.1 · M1'],
  [1, 3, 'Equation labels use definitions appropriate to the equation’s location.', '§4.3 · M1'],
  [2, 1, 'Source links and list entries lead back to definitions in their original context.', '§4.1 · M2'],
  [2, 2, 'Declutter displays matches within the original document.', '§4.2 · M2'],
  [2, 3, 'Equation labels open tooltips that provide links to the defining context.', '§4.3 · M2'],
  [3, 1, 'Lists collect prose definitions, formulae, and usages; symbol selection exposes constituent meanings.', '§4.1 · M3'],
  [3, 3, 'Several symbol and sub-symbol definitions are visible at the same time.', '§4.3 · M3'],
  [3, 4, 'The glossary gathers terminology into one reference.', '§4.4 · M3'],
  [4, 1, 'Underlines, list counts, and disabled options signal the information available.', '§4.1 · M4'],
  [4, 2, 'Counts and navigation controls indicate where matching passages occur.', '§4.2 · M4'],
  [4, 4, 'The glossary previews which terms and definitions appear in the paper.', '§4.4 · M4'],
  [5, 1, 'A compact initial definition and separate sidebar lists limit text occlusion.', '§4.1 · M5'],
  [5, 2, 'In-place highlighting avoids covering the paper with additional widgets.', '§4.2 · M5'],
  [6, 1, 'A stable, compact layout, consistent highlighting, and optional underlines reduce distracting interface variation.', '§§3.3, 4.1 · M6'],
  [6, 2, 'Fading irrelevant text draws attention to matching passages.', '§4.2 · M6'],
  [6, 3, 'Diagonal leader lines distinguish annotations from mathematical notation.', '§4.3 · M6'],
  [7, 1, 'Alternative information and quick dismissal offer paths forward when an extracted definition is missing or wrong.', '§3.3 M7; §4.1'],
]
export const rationalePaths = links.map(([motivation, design, reason, section]) => ({ observation: `o${motivation}`, problem: `p${motivation}`, design: `d${design}`, reason, section }))
export const visualNodes = [...observations, ...problems, ...designs]
export function getRelatedPaths(selectedId) {
  if (!selectedId) return rationalePaths
  if (selectedId === 'tension') return rationalePaths.filter((path) => ['p2', 'p5'].includes(path.problem))
  return rationalePaths.filter((path) => [path.observation, path.problem, path.design].includes(selectedId))
}
