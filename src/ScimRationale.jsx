import { scimSource } from './data/visualModels'
import { scimReferences } from './data/scimRationale'
import './ScimRationale.css'

function Link({ href, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children} ↗<span className="sr-only"> (opens in a new tab)</span></a>
}

export function ScimRationaleOverview() {
  return <div className="scim-rationale-overview">
    <section className="scim-design-process" aria-labelledby="scim-process-heading">
      <h4 id="scim-process-heading">How the design goals were formed</h4>
      <ol className="scim-process-steps">
        <li><span>01 · Observe & interview</span><strong>8 readers</strong><p>Understand existing skimming habits, goals, and difficulties.</p></li>
        <li><span>02 · Iterate & try</span><strong>13 readers across two preliminary studies</strong><p>Collect feedback on an early highlighting prototype.</p></li>
        <li><span>03 · Synthesize</span><strong>Seven design goals</strong><p>The authors analyze themes and turn them into actionable design guidance.</p></li>
      </ol>
      <details><summary>Study context and how the goals were derived</summary>
        <p>The first group consisted of graduate students and academic faculty. Readers skimmed a paper of their choice and discussed their process. The prototype studies used one-hour remote sessions with timed skimming and tasks such as outlining a paper or answering questions.</p>
        <p>The early prototype had fewer, less evenly distributed highlights. It offered paper-level quantity controls and facet toggles, but not paragraph-level controls or facet-specific density sliders.</p>
        <p>One author analyzed notes and transcripts thematically; a second author reviewed the themes. O1–O7 below are our summaries of the reported basis for D1–D7, not seven new observations or independent studies. These formative activities are separate from the later evaluations of the finished system.</p>
        <Link href={`${scimSource}#S3.SS1`}>Scim §3.1 · Design Methodology</Link>
      </details>
    </section>
    <section className="scim-design-tradeoffs" aria-labelledby="scim-tradeoffs-heading">
      <h4 id="scim-tradeoffs-heading">What the design balances</h4>
      <p className="scim-rationale-caption">Our organization of the authors’ reported design considerations. These are not measured causal effects.</p>
      <div className="scim-tradeoff-grid">
        <article><h5>Importance · diversity · distribution</h5><p>Important sentences alone may leave content types or regions uncovered. Facets support different goals; selection heuristics also favor paragraphs without highlights.</p><span>D2 · D3 · D5</span><Link href={`${scimSource}#S3.SS2`}>§3.2 · Figure 2</Link></article>
        <article><h5>Enough guidance · limited distraction</h5><p>Sparse cues can feel incomplete, while visual interventions can interrupt reading. Background highlights and adjustable density offer different responses to these concerns.</p><span>D4 · D5 · D7</span><Link href={`${scimSource}#S3.SS2`}>§3.2 · D4–D7</Link></article>
        <article><h5>Useful categories · reliable labels</h5><p>Four facets reflect reading needs and a memorable category set, constrained by what can be recognized reliably. Color makes categories visible; it does not make predictions correct.</p><span>D2 · D6</span><Link href={`${scimSource}#S4.SS2`}>§4.2 · Category choices</Link></article>
      </div>
    </section>
  </div>
}

export function ScimReferencePanels({ selectedId }) {
  const references = scimReferences.filter(reference => reference.nodes.includes(selectedId))
  if (!references.length) return null
  return <div className="scim-reference-panels" aria-label="Contextual references for the selected rationale">
    {references.map(reference => <details key={reference.id}>
      <summary>Reference context · {reference.question}</summary>
      <div className="scim-reference-body"><p className="scim-reference-relation">{reference.relation}</p><p>{reference.explanation}</p><Link href={reference.basis.href}>{reference.basis.section}</Link>
        {reference.works.map(work => <article key={work.href}><h5><Link href={work.href}>{work.title}</Link></h5><span>{work.authors}</span><p>{work.text}</p><Link href={work.evidenceHref}>{work.locator}</Link></article>)}
        <p className="scim-reference-boundary">{reference.qualification}</p>
      </div>
    </details>)}
  </div>
}
