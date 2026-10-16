export const examplePaper = {
  title: 'Cross-document Misinformation Detection based on Event Graph Reasoning',
  authors: 'Xueqing Wu, Kung-Hsiang Huang, Yi R. Fung, and Heng Ji',
  url: 'https://aclanthology.org/2022.naacl-main.40/',
  pdf: 'https://aclanthology.org/2022.naacl-main.40.pdf',
}

// Quoted from the ACL 2022 published PDF (CC BY 4.0). Line-wrap hyphenation
// is normalized; omissions are indicated in the UI. Ranks are teaching choices,
// not Scim model scores. figure3 identifies the corresponding author example;
// wording follows Wu et al.'s PDF, which differs slightly from Scim's figure.
export const excerptGroups = [
  { id: 'introduction', title: 'Abstract & Introduction', paragraphs: [
    { id: 'abstract', locator: 'Abstract · p. 543', page: 1, omission: 'Opening abstract sentence omitted; dataset and detector sentences omitted before the final result sentence.', sentences: [
      { id: 'a-context', text: 'Multiple news articles may contain complementary or contradictory information that readers can leverage to help detect fake news.' },
      { id: 'a-novelty', facet: 'Novelty', rank: 2, text: 'Inspired by this process, we propose a novel task of cross-document misinformation detection.' },
      { id: 'a-objective', facet: 'Objective', rank: 1, figure3: true, text: 'Given a cluster of topically related news documents, we aim to detect misinformation at both document level and a more fine-grained level, event level.' },
      { id: 'a-result', facet: 'Result', rank: 1, figure3: true, gapBefore: true, text: 'Experimental results show that our proposed method significantly outperforms existing methods by up to 7 F1 points on this new task.' },
    ] },
    { id: 'task', locator: '§1 Introduction · p. 543', page: 1, omission: 'Selected final two sentences of a longer paragraph.', sentences: [
      { id: 'i-document', facet: 'Objective', rank: 2, text: 'Document-level detection aims to detect fake news documents.' },
      { id: 'i-event', text: 'Event-level detection is a more fine-grained task that aims to detect fake events, thereby pinpointing specific fake information in news documents.' },
    ] },
    { id: 'generation', locator: '§1 Introduction · p. 543', page: 1, omission: 'Final sentence of this paragraph omitted. This describes dataset construction, not the detection pipeline.', sentences: [
      { id: 'g-context', text: 'To the best of our knowledge, there are no fake news detection datasets with clusters of topically related documents.' },
      { id: 'g-novelty', facet: 'Novelty', rank: 2, text: 'Therefore, we construct 3 new benchmark datasets based on existing real news corpus with such clusters.' },
      { id: 'g-method', facet: 'Method', rank: 1, figure3: true, text: 'Following Fung et al. (2021), we train a generator that generates a document from a knowledge graph (KG), and feed manipulated KGs into the generator to generate fake news documents.' },
    ] },
  ] },
  { id: 'related', title: 'Related Work', paragraphs: [
    { id: 'prior-work', locator: '§2 Related Work · p. 544', page: 2, omission: 'Selected final sentence of the fake-news-detection paragraph. This is the authors’ novelty claim.', sentences: [
      { id: 'r-novelty', facet: 'Novelty', rank: 1, figure3: true, text: 'However, to the best of our knowledge, no published work has considered using cross-document inference for misinformation detection.' },
    ] },
  ] },
  { id: 'method', title: 'Misinformation Detector', paragraphs: [
    { id: 'representations', locator: '§4.3 Misinformation Detector · p. 547', page: 5, sentences: [
      { id: 'm-context', text: 'Using the previously described graph encoder, we are able to obtain representations of the document and event nodes.' },
      { id: 'm-levels', facet: 'Method', rank: 1, text: 'We conduct document-level detection using the document node representations, and event-level detection using the event node representations.' },
      { id: 'm-training', facet: 'Method', rank: 2, text: 'We separately train two detectors for these two levels of tasks.' },
    ] },
    { id: 'dependency', locator: '§4.3 Misinformation Detector · p. 547', page: 5, omission: 'Notation, projection details, and Equation 8 following these sentences omitted.', sentences: [
      { id: 'd-context', text: 'However, these two tasks are not mutually independent.' },
      { id: 'd-reason', text: 'Intuitively, document-level detection can benefit from the results of event-level detection, because the presence of a large number of false events indicates that the document is more likely to be fake.' },
      { id: 'd-method', facet: 'Method', rank: 2, text: 'Therefore, we feed the results produced by a well-trained event-level detector into each layer of the document-level detector.' },
    ] },
  ] },
  { id: 'results', title: 'Document-level Detection Results', paragraphs: [
    { id: 'findings', locator: '§6.3 Document-level Detection Results · p. 549', page: 7, sentences: [
      { id: 'f-context', text: 'Table 3 shows the results of document-level detection.' },
      { id: 'f-result', facet: 'Result', rank: 2, text: 'Our method yields consistent improvements on all three datasets and significantly outperforms the baselines that judge the authenticity for each document in isolation.' },
      { id: 'f-ablation', text: 'To understand the effectiveness of each component, we conducted an ablation study and show the results in Table 4.' },
      { id: 'f-following', text: 'We have the following findings:' },
    ], omission: 'The numbered findings that follow this paragraph are not reproduced. See Tables 3–4 and the full discussion for conditions and qualifications.' },
  ] },
]

export const facets = ['Objective', 'Novelty', 'Method', 'Result']
export const paragraphs = excerptGroups.flatMap(group => group.paragraphs)
export const sentences = paragraphs.flatMap(paragraph => paragraph.sentences.map(sentence => ({ ...sentence, paragraphId: paragraph.id, locator: paragraph.locator, page: paragraph.page })))
export const initialDensity = Object.fromEntries(facets.map(facet => [facet, 1]))

export function isHighlighted(sentence, density, local) {
  return Boolean(sentence.facet && density[sentence.facet] > 0 && sentence.rank <= Math.max(0, Math.min(2, density[sentence.facet] + (local[sentence.paragraphId] || 0))))
}

// Local controls select the next threshold that actually changes this paragraph.
export function nextLocalLevel(paragraphId, direction, density, local) {
  const candidates = sentences.filter(sentence => sentence.paragraphId === paragraphId)
  const count = offset => candidates.filter(sentence => isHighlighted(sentence, density, { ...local, [paragraphId]: offset })).length
  const current = local[paragraphId] || 0
  for (let offset = current + direction; offset >= -2 && offset <= 2; offset += direction) {
    if (count(offset) !== count(current)) return offset
  }
  return null
}
