const paper = 'https://arxiv.org/html/2205.04561v3'
const source = (section, anchor) => ({ section, href: `${paper}#${anchor}` })
const goalsSource = source('Scim §3.2 · Design Goals', 'S3.SS2')

// The paper explicitly connects some goals to features; the remaining mappings
// are our interpretations of reported behavior. This metadata describes edges,
// not the strength of a causal finding or the success of a feature.
const relationships = {
  'p1-d1': ['explicit', '§4.1 explicitly names D1 when describing support for existing skimming practices.', [source('Scim §4.1 · D1', 'S4.SS1')]],
  'p1-d4': ['inferred', '§4.5 reports context linking. Connecting it specifically to D1 is our interpretation; the authors do not name D1 in this passage.', [source('Scim §4.5 · Context linking', 'S4.SS5'), goalsSource]],
  'p2-d1': ['explicit', '§4.2 explicitly links faceted highlights to D2 and explains the choice of categories.', [source('Scim §4.2 · Faceted', 'S4.SS2')]],
  'p2-d2': ['inferred', '§4.3 discusses changing reading goals, but explicitly names D7. Its additional connection to D2 is our mapping.', [source('Scim §4.3 · Controls', 'S4.SS3'), goalsSource]],
  'p3-d1': ['explicit', '§4.1 names D3; Figure 2 also connects distribution to D3 and D5. This includes both paragraph middles and the middle of a paper.', [source('Scim §4.1 · D3', 'S4.SS1'), goalsSource]],
  'p4-d1': ['explicit', '§4.2 explicitly names D4 for low-distraction highlighting. §3.2 describes the rejected visual treatments.', [source('Scim §3.2 · D4', 'S3.SS2'), source('Scim §4.2 · Low distraction', 'S4.SS2')]],
  'p5-d1': ['explicit', '§4.2 explicitly connects distribution to D5; §5.3 explains prioritizing paragraphs without existing highlights.', [source('Scim §4.2 · Distributed', 'S4.SS2'), source('Scim §5.3 · Distribution heuristic', 'S5.SS3')]],
  'p5-d2': ['explicit', 'D5 directly recommends letting readers request additional highlights in dense passages. §4.3 describes the local controls that provide this action.', [source('Scim §3.2 · D5', 'S3.SS2'), source('Scim §4.3 · Paragraph-level controls', 'S4.SS3')]],
  'p6-d1': ['explicit', '§4.2 explicitly names D6 as a constraint on category choice. Classification and cleaning support this goal; the colors themselves do not make labels accurate.', [source('Scim §4.2 · D6', 'S4.SS2'), source('Scim §5.2 · Classification', 'S5.SS2'), source('Scim §5.3 · Cleaning', 'S5.SS3')]],
  'p7-d2': ['explicit', '§4.3 explicitly names D7 when introducing paper-level and paragraph-level controls.', [source('Scim §4.3 · D7', 'S4.SS3')]],
  'p7-d3': ['inferred', '§4.4 states that scrollbar marks provide feedback during density changes. Linking that feedback specifically to D7 is our interpretation.', [source('Scim §4.4 · Scrollbar annotations', 'S4.SS4'), goalsSource]],
}

const observationBasis = [
  ['Interview & reading observation', 'The authors report existing strategies and visible cues, then recommend preserving them. O1 is our summary of that account, not a separate observation collected by our team.', '§3.2 D1; formative participants F1–F8 are cited for different strategies.'],
  ['Interview accounts', 'Readers described different skimming goals. The recommendation to support varied content is the authors’ design conclusion from these accounts.', '§3.2 D2; examples cite F1–F4 and F7.'],
  ['Reported strategy & observed behavior', 'Readers discussed paragraph-edge strategies; the researchers also observed transitions from skimming to deeper reading. The design goal extends to the middle of paragraphs and papers.', '§3.2 D3; observed transitions cite F1, F3, and F5.'],
  ['Prototype exploration & author reasoning', 'The authors describe trials of underlining, lowlighting, and background highlighting. Do not interpret this as a controlled comparison proving one visual treatment universally superior.', '§3.2 D4; this paragraph does not attribute each visual-treatment judgment to a named participant.'],
  ['Preliminary usability feedback', 'Readers were uncomfortable with long unhighlighted passages and requested more even distribution. About one highlight per paragraph and the ability to request more are the authors’ recommendations, not measured optimal settings.', '§3.2 D5; no individual participant IDs are assigned to these statements.'],
  ['Preliminary usability feedback', 'Readers noticed facet-label errors and became skeptical. The authors conclude that classification accuracy matters; this does not claim that the final system eliminates errors.', '§3.2 D6; E11 and E12.'],
  ['Preliminary feedback & author response', 'Readers requested manual or adaptive control. The implemented response is manual density control; adaptive personalization remains a suggested direction.', '§3.2 D7; E5, E7, E8, and E12.'],
]

export function addScimRationaleEvidence(model) {
  model.hasRationaleEvidence = true
  model.observations.forEach((item, index) => {
    const [group, evidenceNote, locator] = observationBasis[index]
    Object.assign(item, { group, evidenceNote, locator, sources: [source(`Scim §3.2 · D${index + 1}`, 'S3.SS2'), source('Scim §3.1 · How the evidence was collected', 'S3.SS1')] })
  })
  model.problems.forEach((item, index) => { item.sources = [source(`Scim §3.2 · D${index + 1}`, 'S3.SS2')] })
  const featureSources = [
    [source('Scim §§4.1–4.2 · In-place, faceted, distributed highlights', 'S4.SS2'), source('Scim §5.3 · Selection and distribution', 'S5.SS3')],
    [source('Scim §4.3 · Global and local controls', 'S4.SS3')],
    [source('Scim §4.4 · Scrollbar annotations', 'S4.SS4')],
    [source('Scim §4.5 · Sidebar and context linking', 'S4.SS5')],
  ]
  model.designs.forEach((item, index) => { item.sources = featureSources[index] })
  model.rationalePaths.forEach(path => {
    const [provenance, evidence, sources] = relationships[`${path.problem}-${path.design}`]
    Object.assign(path, { provenance, evidence, sources })
  })
}

export const scimReferences = [
  {
    id: 'taxonomy', nodes: ['o2', 'p2', 'o6', 'p6', 'd1'],
    question: 'Why these four content categories?',
    relation: 'Classification taxonomy adapted from prior research',
    explanation: 'Scim reports combining a coarse scientific-abstract taxonomy with the NOV_ADV category from Argumentative Zoning. The authors also constrain the choice by reader needs, memorability, and classification reliability.',
    basis: source('Where Scim explains this choice · §4.2', 'S4.SS2'),
    works: [
      { title: 'Pretrained Language Models for Sequential Sentence Classification', authors: 'Cohan et al., 2019', href: 'https://aclanthology.org/D19-1383/', locator: '§3.3 and Table 2 · p. 3695', evidenceHref: 'https://aclanthology.org/D19-1383.pdf#page=3', text: 'CSAbstruct annotates sentences in computer-science abstracts with Background, Objective, Method, Result, or Other. This supplies category-level context; it is not already Scim’s final four-facet scheme.' },
      { title: 'Towards Domain-Independent Argumentative Zoning: Evidence from Chemistry and Computational Linguistics', authors: 'Teufel, Siddharthan, and Batchelor, 2009', href: 'https://aclanthology.org/D09-1155/', locator: '§2, Figure 2 · p. 1495', evidenceHref: 'https://aclanthology.org/D09-1155.pdf#page=3', text: 'The AZ-II scheme includes NOV_ADV for novelty or advantage of the authors’ approach. It identifies a rhetorical claim, not an independent assessment that the research is novel.' },
    ],
    qualification: 'The adaptation relationship is reported by Scim. The source category definitions were checked in the cited papers. Neither reference establishes that four categories are optimal for every reader or paper.',
  },
  {
    id: 'lowlighting', nodes: ['o4', 'p4'],
    question: 'Why use background highlights instead of fading other text?',
    relation: 'An explored visual precedent, followed by a different design choice',
    explanation: 'Scim explicitly reports trying lowlighting inspired by ScholarPhi. In Scim’s prototype exploration, reading faded content required extra effort, so the authors chose familiar background highlighting with restrained colors.',
    basis: source('Where Scim reports the exploration · §3.2, D4', 'S3.SS2'),
    works: [
      { title: 'Augmenting Scientific Papers with Just-in-Time, Position-Sensitive Definitions of Terms and Symbols', authors: 'Head et al., 2021 · ScholarPhi', href: 'https://arxiv.org/abs/2009.14237', locator: '§4.2 · Declutter', evidenceHref: 'https://arxiv.org/html/2009.14237#S4.SS2', text: 'ScholarPhi uses decluttering to keep passages containing a selected term or symbol prominent while fading other text. That focused lookup task differs from Scim’s broad, multi-category skim.' },
    ],
    qualification: 'This describes Scim’s own prototype experience, not a head-to-head comparison or evidence that ScholarPhi’s declutter feature is generally ineffective.',
  },
]
