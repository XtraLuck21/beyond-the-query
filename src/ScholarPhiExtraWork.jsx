import './ScholarPhiEvaluation.css'

const projectUrl = 'https://scholarphi.org/'
const connectedPapersUrl = 'https://www.connectedpapers.com/main/60bf101bd61fb5fa526c1ae25d808e86958724ad/Augmenting-Scientific-Papers-with-Just%20in%20Time%2C-Position%20Sensitive-Definitions-of-Terms-and-Symbols/graph'

const followUps = [
  {
    id: 'threddy',
    name: 'Threddy',
    publication: 'UIST · 2022',
    title: 'An Interactive System for Personalized Thread-based Exploration and Organization of Scientific Literature',
    description: 'Lets readers highlight a passage, extract its cited papers, and save the passage and references into research threads that persist across papers.',
    relationship: 'Cites ScholarPhi as prior work',
    connection: 'Threddy §2.2 cites ScholarPhi [25] when discussing the difficulty of unfamiliar terms and nonce words. Both support readers within their current reading context and aim to reduce interruptions.',
    extension: 'ScholarPhi connects terms and symbols to definitions within a paper. Threddy connects selected passages to cited papers and reusable research threads across a collection. This is a conceptual connection; the cited section does not establish reuse of ScholarPhi’s code.',
    sources: [{ label: 'Threddy §2.2 · p. 3', url: 'https://arxiv.org/pdf/2208.03455#page=3' }, { label: 'ScholarPhi citation [25] · p. 12', url: 'https://arxiv.org/pdf/2208.03455#page=12' }],
    url: 'https://arxiv.org/pdf/2208.03455',
  },
  {
    id: 'citesee',
    name: 'CiteSee',
    publication: 'CHI · 2023',
    title: 'Augmenting Citations in Scientific Papers with Persistent and Personalized Historical Context',
    description: 'Adds visual cues and paper cards to inline citations using the reader’s reading history, saved papers, and publication history.',
    relationship: 'Builds on ScholarPhi’s codebase',
    connection: 'CiteSee §4.6 explicitly states that its front end was built on the open-source ScholarPhi codebase. This is a direct implementation dependency as well as a shared approach to augmenting the paper being read.',
    extension: 'ScholarPhi helps explain what a term means here. CiteSee helps explain how a cited paper relates to the reader’s previous activity and supports deciding which references to explore.',
    sources: [{ label: 'CiteSee §4.6 · code reuse · p. 8', url: 'https://arxiv.org/pdf/2302.07302#page=8' }, { label: 'CiteSee §2.1 · related work · p. 3', url: 'https://arxiv.org/pdf/2302.07302#page=3' }],
    url: 'https://arxiv.org/pdf/2302.07302',
  },
  {
    id: 'citeread',
    name: 'CiteRead',
    publication: 'IUI · 2022',
    title: 'Integrating Localized Citation Contexts into Scientific Paper Reading',
    description: 'Brings commentary from later papers into the paper being read, placing citation context near the passages it concerns.',
    relationship: 'Uses the ScholarPhi reader',
    connection: 'The ScholarPhi project lists CiteRead among publications that use its reader. Both bring relevant context to the passage being read so readers can inspect it in place.',
    extension: 'ScholarPhi surfaces definitions from the current paper. CiteRead surfaces commentary from subsequent papers that cite it, localizing that commentary in the margins of the original paper. Our comparison connects this to ScholarPhi’s vision of bringing in context from beyond one paper.',
    sources: [{ label: 'Reader reuse · ScholarPhi project', url: projectUrl }, { label: 'CiteRead summary · author’s publication page', url: 'https://www.jonathanbragg.com/' }],
    url: 'https://doi.org/10.1145/3490099.3511162',
  },
]

function ExternalLink({ href, children }) {
  return <a className="eval-source" href={href} target="_blank" rel="noopener noreferrer">{children} ↗<span className="sr-only"> (opens in a new tab)</span></a>
}

export default function ScholarPhiExtraWork() {
  return <section className="eval-page" aria-labelledby="extra-work-heading">
    <header className="eval-heading">
      <p className="eyebrow">Building on ScholarPhi</p>
      <h3 id="extra-work-heading">Related work</h3>
      <p>Explore papers related to ScholarPhi and see how each connects to its ideas, reading interface, or implementation.</p>
    </header>

    <section className="eval-section" aria-labelledby="follow-up-heading">
      <div className="eval-section-heading"><div><span className="eval-step">Three most similar papers outside this collection</span><h4 id="follow-up-heading">How do they connect to ScholarPhi?</h4></div></div>
      <p>Selected by Connected Papers similarity to ScholarPhi, excluding papers already in this collection (checked October 16, 2026). All three augment scientific reading. Their connections range from citing ScholarPhi’s ideas to directly reusing its reader or code.</p>
      <div className="eval-boundaries">
        {followUps.map((work, index) => <article key={work.id}>
          <span className="eval-kind">0{index + 1} · {work.publication}</span>
          <h5>{work.name}: {work.title}</h5>
          <p>{work.description}</p>
          <p><strong>Connection: {work.relationship}.</strong> {work.connection}</p>
          <p><strong>What it adds:</strong> {work.extension}</p>
          <details className="eval-disclosure">
            <summary>Sources for this connection</summary>
            <div className="eval-disclosure-body">{work.sources.map((source) => <p key={source.url}><ExternalLink href={source.url}>{source.label}</ExternalLink></p>)}</div>
          </details>
          <p><ExternalLink href={work.url}>Read {work.name}</ExternalLink></p>
        </article>)}
      </div>
    </section>

    <section className="eval-section" aria-labelledby="connected-papers-heading">
      <div className="eval-section-heading"><div><p className="eyebrow">Explore further</p><h4 id="connected-papers-heading">Find more related papers on Connected Papers</h4></div></div>
      <p>Explore ScholarPhi’s interactive paper network on the Connected Papers website for more related work and connections.</p>
      <a className="source-link primary-link" href={connectedPapersUrl} target="_blank" rel="noopener noreferrer">Open Connected Papers <span aria-hidden="true">↗</span><span className="sr-only"> (opens ScholarPhi’s graph in a new tab)</span></a>
    </section>

    <footer className="eval-attribution">Curated summaries of the linked papers. Citation and implementation relationships are supported by the sources in each entry; comparisons of their reading support are our interpretation.</footer>
  </section>
}
