# Bob Development Log

> **Editorial status note — October 22, 2026:** The entries below preserve the teammate's October 16 rationale and terminology. They are historical, not the current UI specification. Human–AI guidelines were subsequently moved from Declutter to Design rationale O7/M7; Hands-On Math was narrowed to symbol/constituent selection; Extra work was renamed Related work. The three related works exclude papers already in the workspace. Information scent remains unimplemented. See [scholarPhi.md](scholarPhi.md) for the current content, corrected placements, and selection provenance. This note does not attribute the later decisions to the original log author.

## 2026-10-16 — Reference selection

We added references to ScholarPhi’s **How it works** demonstrations to explain the ideas behind specific interactions. We chose sources that give readers a concrete example or design rationale, rather than a general list of related papers.

- **Definition tooltips — [Wikipedia Page Previews [68]](https://www.mediawiki.org/wiki/Page_Previews):** a familiar example of showing contextual information beside the text. The image helps readers understand the preview idea, while the description distinguishes Wikipedia’s hover interaction from ScholarPhi’s selection-based lookup.
- **Declutter — [Human–AI interaction guidelines, p. 4](https://arxiv.org/pdf/2010.11761#page=4):** provides broader rationale for user control, error recovery, and easy dismissal of unwanted assistance.
- **Equation diagrams — [Hands-On Math, p. 6](https://dl.acm.org/doi/epdf/10.1145/1866029.1866035#page=6):** explains selecting meaningful parts of an expression. Its selection examples help readers understand how constituent symbols can be inspected individually.
- **Considered for Priming glossary — [information scent theory [76], p. 10](https://act-r.psy.cmu.edu/wordpress/wp-content/uploads/2012/12/280uir-1999-05-pirolli.pdf#page=10):** explains why dotted underlines signal available definitions. This requested reference is absent from the current glossary implementation.

References appear in expandable panels beside the relevant demonstrations, so readers can inspect the rationale when they need more context.

## 2026-10-16 — Extra work

We used the supplied Connected Papers graph to guide a three-paper selection, then checked sources to explain each paper’s relationship to ScholarPhi. The rationale was to show how contextual reading support develops into related activities, while distinguishing conceptual connections from implementation reuse.

- **[Threddy](https://arxiv.org/pdf/2208.03455):** cites ScholarPhi and shares its concern with preserving reading flow. It extends contextual support to collecting passages and organizing research threads across papers.
- **[CiteSee](https://arxiv.org/pdf/2302.07302):** explicitly builds on ScholarPhi’s codebase. It shows a direct implementation connection while adding personalized citation context.
- **[CiteRead](https://doi.org/10.1145/3490099.3511162):** uses the ScholarPhi reader and brings commentary from later citing papers into the current paper, extending support beyond within-paper definitions.

The **Extra work** tab shows these three papers first, with their connections, added contributions, and evidence links. We removed the original research agenda to keep the section focused. The [Connected Papers graph](https://www.connectedpapers.com/main/60bf101bd61fb5fa526c1ae25d808e86958724ad/Augmenting-Scientific-Papers-with-Just%20in%20Time%2C-Position%20Sensitive-Definitions-of-Terms-and-Symbols/graph) appears afterward for readers who want to explore further. These are curated selections; the app does not calculate similarity rankings.
