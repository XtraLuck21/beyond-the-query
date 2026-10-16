const scim = 'https://arxiv.org/html/2205.04561v3'

export const scimRelatedWork = [
  {
    id: 'hitext',
    title: 'HiText: Text Reading with Dynamic Salience Marking',
    publication: 'Yang et al. · WWW Companion · 2017',
    relationship: 'Earlier highlighting approach',
    question: 'What does organizing highlights by information type add to salience highlighting?',
    summary: 'HiText marks important sentences and reveals additional, graded highlights in the paragraph under the pointer.',
    contrast: 'Scim groups highlights into Objective, Novelty, Method, and Result, with controls for how many to show.',
    reason: 'A concrete comparison makes the distinction between sentence importance and information type easier to inspect.',
    boundary: 'This is a comparison of described mechanisms, not evidence that Scim outperforms HiText or reuses its code.',
    sources: [
      { label: 'Scim §2.2.2 · Typographical Cueing', href: `${scim}#S2.SS2.SSS2`, note: 'The authors explicitly cite HiText as dynamic, salience-based highlighting.' },
      { label: 'HiText §4.2, Figure 2 · pp. 314–315', href: 'https://archives.iw3c2.org/www2017/proceedings/companion/p311.pdf#page=4', note: 'Top-ranked sentences remain highlighted; pointer position reveals graded highlighting in the active paragraph.' },
      { label: 'Scim §§4.2–4.3 · Faceted Highlights and Controls', href: `${scim}#S4.SS2`, note: 'Check the category and density controls underlying our comparison.' },
    ],
    url: 'https://archives.iw3c2.org/www2017/proceedings/companion/p311.pdf',
  },
  {
    id: 'tldr',
    title: 'TLDR: Extreme Summarization of Scientific Documents',
    publication: 'Cachola et al. · Findings of EMNLP · 2020',
    relationship: 'Alternative information format',
    question: 'Why support skimming inside a paper when a short summary is available?',
    summary: 'TLDR studies generating a single-sentence scientific-paper summary focused on key information, such as the main contribution.',
    contrast: 'Scim keeps selected passages within the full paper so readers can inspect surrounding text and change their reading focus.',
    reason: 'This contrast clarifies the output being offered: a compressed summary or guidance for exploring the original document.',
    boundary: 'Summaries and in-document guidance can be complementary. Scim’s general concerns about summarization are not a measured failure of TLDR, nor a direct comparison between the two.',
    sources: [
      { label: 'Scim §2.2.4 · Summarization', href: `${scim}#S2.SS2.SSS4`, note: 'The authors cite TLDR and motivate retaining document context and interactivity.' },
      { label: 'TLDR §1 and Figure 1 · p. 4766', href: 'https://aclanthology.org/2020.findings-emnlp.428.pdf#page=1', note: 'The task definition and example explain extreme compression into a single sentence.' },
    ],
    url: 'https://aclanthology.org/2020.findings-emnlp.428/',
  },
]

export const scimContextSelection = [
  'Start with a named question about Scim that the current page does not sufficiently explain.',
  'Find a directly cited candidate in the relevant Scim section and record its citation location.',
  'Check the original source for the specific mechanism or output being compared; record a section, page, or figure.',
  'Include it only when it adds a distinct explanation beyond the existing page. Keep one example per question in this first pass.',
  'Record the inclusion reason, alternatives considered, and evidence limits. Defer unsupported candidates instead of filling gaps by inference.',
]
