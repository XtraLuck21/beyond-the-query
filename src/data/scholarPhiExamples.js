// LISA, Strubell et al. (EMNLP 2018), pp. 5027–5030.
// Quoted prose: line-break hyphenation removed; math rendered by LisaText.
// Omitted passages are marked between excerpts. Labels and definitions are paraphrases.
export const lisaPdf = 'https://aclanthology.org/D18-1548.pdf'
export const lisaArticle = 'https://aclanthology.org/D18-1548/'

export const lisaExcerpts = [
  {
    id: 'definition', label: 'Introducing the parse attention weights', page: 4,
    sentences: [
      'Typically, neural attention mechanisms are left on their own to learn to attend to relevant inputs.',
      'Instead, we propose training the self-attention to attend to specific tokens corresponding to the syntactic structure of the sentence as a mechanism for passing linguistic knowledge to later layers.',
      'Specifically, we replace one attention head with the deep bi-affine model of Dozat and Manning (2017), trained to predict syntactic dependencies.',
      'Let A_parse be the parse attention weights, at layer i.',
      'Its input is the matrix of token representations S_previous.',
    ],
  },
  {
    id: 'parent', label: 'Selecting a syntactic parent', page: 4,
    sentences: [
      'We define the root token as having a self-loop.',
      'This attention head thus emits a directed graph where each token’s parent is the token to which the attention A_parse assigns the highest weight.',
    ],
  },
  {
    id: 'external', label: 'Using an external parse at test time', page: 4,
    sentences: [
      'This attention head now becomes an oracle for syntax, denoted P_oracle, providing a dependency parse to downstream layers.',
      'This model not only predicts its own dependency arcs, but allows for the injection of auxiliary parse information at test time by simply setting A_parse to the parse parents produced by e.g. a state-of-the-art parser.',
      'In this way, our model can benefit from improved, external parsing models without re-training.',
      'Unlike typical multi-task models, ours maintains the ability to leverage external syntactic information.',
    ],
  },
]

export const parseContext = 'As with the other attention heads, we project S_previous into key, value and query representations, denoted K_parse, Q_parse, V_parse. Here the key and query projections correspond to parent and dependent representations of the tokens, and we allow their dimensions to differ from the rest of the attention heads to more closely follow the implementation of Dozat and Manning (2017).'
export const scoreContext = 'Unlike the other attention heads which use a dot product to score key-query pairs, we score the compatibility between K_parse and Q_parse using a bi-affine operator U_heads to obtain attention weights:'

export const lisaSymbols = [
  { id: 'A_parse', label: 'Parse attention weights', definition: 'Attention weights for the syntactically informed head. A_parse[t, q] models the probability that token q is the syntactic parent of token t.', context: 'Let A_parse be the parse attention weights, at layer i.', x: 70, labelX: 125, labelY: 62, slot: 'top-left' },
  { id: 'Q_parse', label: 'Query · dependent', definition: 'Query representations for the parse attention head; here, queries correspond to dependent representations of the tokens.', context: parseContext, x: 310, labelX: 475, labelY: 62, slot: 'top-right' },
  { id: 'U_heads', label: 'Bi-affine operator', definition: 'The bi-affine operator used to score compatibility between the parse head’s key and query representations.', context: scoreContext, x: 400, labelX: 125, labelY: 238, slot: 'bottom-left' },
  { id: 'K_parse', label: 'Key · parent', definition: 'Key representations for the parse attention head; here, keys correspond to parent representations of the tokens. The superscript T in Equation (4) denotes matrix transpose.', context: parseContext, x: 490, labelX: 475, labelY: 238, slot: 'bottom-right' },
]

// Selected entries in reading order using abstract, prose, and figure captions.
// A_parse and V_parse are introduced in Figure 2's caption before §2.2.
export const lisaGlossary = [
  { id: 'SRL', meaning: 'Semantic role labeling: identifying semantic roles in a sentence, such as who did what to whom.', section: 'Abstract; §1 Introduction', page: 1 },
  { id: 'LISA', meaning: 'Linguistically-informed self-attention: the model introduced in this paper, combining self-attention with learning across parsing, POS tagging, predicate detection, and SRL.', section: 'Abstract', page: 1 },
  { id: 'POS', meaning: 'Part-of-speech information; LISA jointly predicts POS tags and predicates.', section: '§2 Model; §2.3 Multi-task learning', page: 2 },
  { id: 'A_parse', meaning: 'Parse attention weights; these weights emphasize a token’s syntactic governor.', section: 'Figure 2 caption; §2.2', page: 3 },
  { id: 'V_parse', meaning: 'Value representations used in the weighted average for the syntactically informed attention head.', section: 'Figure 2 caption; §2.2', page: 3 },
  { id: 'K_parse', meaning: 'Key representations for the parse head, corresponding to parent representations.', section: '§2.2 Syntactically-informed self-attention', page: 4 },
  { id: 'Q_parse', meaning: 'Query representations for the parse head, corresponding to dependent representations.', section: '§2.2 Syntactically-informed self-attention', page: 4 },
  { id: 'U_heads', meaning: 'Bi-affine operator for scoring compatibility between keys and queries in the parse head.', section: '§2.2; Equation (4)', page: 4 },
]
