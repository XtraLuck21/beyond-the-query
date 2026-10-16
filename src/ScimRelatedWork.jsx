import { scimContextSelection, scimRelatedWork } from './data/scimRelatedWork'
import './ScholarPhiEvaluation.css'
import './ScimRelatedWork.css'

function SourceLink({ href, children }) {
  return <a className="eval-source" href={href} target="_blank" rel="noopener noreferrer">{children} ↗<span className="sr-only"> (opens in a new tab)</span></a>
}

export default function ScimRelatedWork() {
  return <section className="eval-page scim-related" aria-labelledby="scim-related-heading">
    <header className="eval-heading">
      <p className="eyebrow">Context for understanding Scim</p>
      <h3 id="scim-related-heading">Related work</h3>
      <p>Two cited works help explain Scim’s approach: how it highlights information, and why it keeps that information inside the paper.</p>
      <p className="eval-note">Selected for these questions, not by a similarity ranking. This is a bounded selection, not a complete review of related work.</p>
    </header>

    <div className="eval-boundaries">
      {scimRelatedWork.map((work, index) => <article key={work.id} aria-labelledby={`related-${work.id}`}>
        <span className="eval-kind">0{index + 1} · {work.relationship}</span>
        <h4 id={`related-${work.id}`}>{work.question}</h4>
        <h5>{work.title}</h5>
        <p className="eval-note">{work.publication}</p>
        <dl className="scim-related-comparison">
          <div><dt>What this work provides</dt><dd>{work.summary}</dd></div>
          <div><dt>How Scim differs</dt><dd>{work.contrast}</dd></div>
        </dl>
        <p><strong>Why this is here:</strong> {work.reason}</p>
        <p className="scim-related-boundary">{work.boundary}</p>
        <details className="eval-disclosure">
          <summary>Evidence &amp; sources — {work.id === 'hitext' ? 'HiText' : 'TLDR'}</summary>
          <div className="eval-disclosure-body">
            <p>Source-based paraphrases. The explanatory comparison and inclusion decision are our synthesis.</p>
            <ul>{work.sources.map(source => <li key={source.href}><SourceLink href={source.href}>{source.label}</SourceLink><p>{source.note}</p></li>)}</ul>
          </div>
        </details>
        <p><SourceLink href={work.url}>Read the original paper</SourceLink></p>
      </article>)}
    </div>

    <section className="eval-section" aria-label="Reference selection">
      <details className="eval-disclosure">
        <summary>How were these references selected?</summary>
        <div className="eval-disclosure-body">
          <p>Selection record · October 16, 2026 · Scim arXiv v3. We began with the two questions above and inspected its highlighting and summarization discussion (§§2.2.2–2.2.4).</p>
          <ol>{scimContextSelection.map(step => <li key={step}>{step}</li>)}</ol>
          <p>HiText and TLDR each provide an original-source example for a different question. Other candidates could also qualify; this first implementation does not establish that these are the best or only choices.</p>
          <p>ScholarPhi and the category sources by Cohan et al. and Teufel et al. are already available in Design rationale. They are not duplicated here. ScentHighlights remains a candidate for a separate query-guided reading question; it is not implemented in this pass.</p>
        </div>
      </details>
    </section>
    <footer className="eval-attribution">Curated explanations of selected mechanisms. Neither external tool is running here. These entries do not reproduce their interfaces or establish comparative effectiveness.</footer>
  </section>
}
