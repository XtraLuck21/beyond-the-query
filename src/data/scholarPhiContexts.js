// Approved contextual summaries; paraphrases, not quotations.
export const scholarPhiContexts = {
  "wikipedia": {
    "question": "How is ScholarPhi’s tooltip different from a linked-page preview?",
    "relationship": "Related interaction precedent.",
    "context": "Both bring additional information beside the current reading passage. Wikipedia previews the linked article, while ScholarPhi retrieves a definition from within the paper and prioritizes it according to the selected term’s location.",
    "sources": [
      {
        "label": "ScholarPhi §2.2.1 · in situ explanations",
        "url": "https://arxiv.org/html/2009.14237v3#S2.SS2.SSS1"
      },
      {
        "label": "ScholarPhi §4.1 · definition tooltips",
        "url": "https://arxiv.org/html/2009.14237v3#S4.SS1"
      },
      {
        "label": "Page Previews · Introduction",
        "url": "https://www.mediawiki.org/wiki/Page_Previews#Introduction"
      }
    ]
  },
  "guidelines": {
    "question": "What should readers be able to do when an automatically extracted definition is missing or unhelpful?",
    "relationship": "Prior research supporting the error-recovery design motivation.",
    "context": "ScholarPhi draws on human–AI interaction guidelines to motivate recovery paths and easy dismissal. Readers can inspect alternative information or close the assistance. This explains M7, rather than the fading technique used by Declutter.",
    "sources": [
      {
        "label": "ScholarPhi §3.3 · M7",
        "url": "https://arxiv.org/html/2009.14237v3#S3.SS3"
      },
      {
        "label": "Wright et al. · A Comparative Analysis of Industry Human-AI Interaction Guidelines · p. 4",
        "url": "https://arxiv.org/pdf/2010.11761#page=4"
      }
    ]
  },
  "math": {
    "question": "How can a reader select a meaningful part of a mathematical expression?",
    "relationship": "Prior technique informing symbol selection.",
    "context": "Hands-On Math demonstrates selecting symbols and larger expression parts through touch. ScholarPhi cites this work as a basis for symbol selection. The connection concerns what users can select; it does not establish the origin of ScholarPhi’s definition-label layout.",
    "sources": [
      {
        "label": "ScholarPhi §2.2.2 · mathematical expressions",
        "url": "https://arxiv.org/html/2009.14237v3#S2.SS2.SSS2"
      },
      {
        "label": "Hands-On Math · Fingertip Area Selections and Figure 13 · p. 22 (PDF p. 6)",
        "url": "https://www.andrewbragdon.com/papers/hands-on-math.pdf#page=6"
      }
    ]
  },
  "threddy": {
    "question": "How can support within a paper extend into organizing a literature collection?",
    "relationship": "Citation and conceptual connection.",
    "context": "ScholarPhi connects terms to definitions within a paper. Threddy connects selected passages to cited papers and persistent research threads. Both support work within the reading context, but the cited passage does not establish code reuse.",
    "sources": [
      {
        "label": "Threddy §2.2 · p. 3",
        "url": "https://arxiv.org/pdf/2208.03455#page=3"
      }
    ]
  },
  "citesee": {
    "question": "How can citation context reflect what a reader has already encountered?",
    "relationship": "Direct code reuse with a different contextual-information focus.",
    "context": "CiteSee builds its front end on ScholarPhi’s codebase. It adds context from the reader’s history to inline citations, helping readers recognize previously encountered work and decide which references to explore.",
    "sources": [
      {
        "label": "CiteSee §4.6 · implementation",
        "url": "https://arxiv.org/html/2302.07302#S4.SS6"
      },
      {
        "label": "CiteSee · interface and reading-history features",
        "url": "https://arxiv.org/html/2302.07302"
      }
    ]
  },
  "citeread": {
    "question": "How can later papers help readers interpret the paper currently open?",
    "relationship": "Shared reader infrastructure and context from subsequent citing papers.",
    "context": "CiteRead brings commentary from later citing papers into the current paper. Compared with ScholarPhi’s within-paper definitions, this illustrates another source of reading context: what subsequent work says about a passage.",
    "sources": [
      {
        "label": "ScholarPhi project · Publications that Make Use of the ScholarPhi Reader",
        "url": "https://scholarphi.org/"
      },
      {
        "label": "CiteRead paper",
        "url": "https://doi.org/10.1145/3490099.3511162"
      }
    ]
  }
}
