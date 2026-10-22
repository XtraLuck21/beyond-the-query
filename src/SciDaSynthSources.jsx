import PaperContext from './PaperContext'
import { sciDaSynthPdf, sciDaSynthSources } from './data/sciDaSynthSources'
import './ScholarPhiEvaluation.css'
import './SciDaSynthSources.css'

export default function SciDaSynthSources() {
  return <section className="eval-page synth-sources" aria-labelledby="synth-sources-heading">
    <header className="eval-heading">
      <p className="eyebrow">SciDaSynth · Follow the evidence</p>
      <h3 id="synth-sources-heading">Source Analysis</h3>
      <p>Four research questions, traced through SciDaSynth’s references to the original publications.</p>
    </header>

    <div className="eval-context">
      <strong>Reading edition: arXiv:2404.13765v3 · September 4, 2025</strong>
      <p>Section and reference numbers below follow the PDF. The v3 HTML numbers sections differently. External page locators distinguish printed pages from PDF pages where needed.</p>
      <a className="eval-source" href={sciDaSynthPdf} target="_blank" rel="noopener noreferrer">Open the pinned SciDaSynth PDF ↗<span className="sr-only"> (opens in a new tab)</span></a>
    </div>

    <nav className="synth-source-navigation" aria-label="Research connections">
      {sciDaSynthSources.map((source, index) => <a key={source.id} href={`#synth-source-${source.id}`}><span>0{index + 1}</span>{source.theme}</a>)}
    </nav>

    <details className="eval-disclosure synth-source-method">
      <summary><strong>How were these sources selected?</strong><span>Citation → research question → original evidence → qualified connection</span></summary>
      <div className="eval-disclosure-body">
        <p>We followed citations from SciDaSynth’s Related Work and technical framework, then checked the original papers for a concrete mechanism that answers a reader’s question. Selection favors distinct explanatory roles over general topic similarity or citation popularity.</p>
        <p>These four cover representation, structured relationships, retrieval, and evaluation. This is a curated reading path, not an exhaustive review. It does not establish the origin of every standardization interaction. ScholarPhi supplies this page’s question-first context cards, evidence disclosures, and visual styling.</p>
        <p>All evidence is paraphrased. Connections and inclusion judgments are our interpretation; citation does not imply code reuse or a measured causal effect.</p>
      </div>
    </details>

    {sciDaSynthSources.map((source, index) => <article key={source.id} id={`synth-source-${source.id}`} className="eval-section synth-source-entry" aria-labelledby={`synth-source-title-${source.id}`}>
      <div className="eval-section-heading"><div><span className="eval-step">0{index + 1} · {source.theme} · SciDaSynth [{source.reference}]</span><h4 id={`synth-source-title-${source.id}`}>{source.name}</h4></div></div>
      <p className="synth-source-title"><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗<span className="sr-only"> (opens in a new tab)</span></a></p>
      <p className="synth-source-authors">{source.authors}</p>
      <p className="eval-note">{source.publication}</p>
      <PaperContext context={source} collapseEvidence>
        <p><strong>Original-source evidence · paraphrase</strong><br />{source.evidence}</p>
        <p><strong>Exact locator</strong><br />{source.locator}</p>
      </PaperContext>
      <div className="synth-source-judgment">
        <div><h5>Why include this connection?</h5><p>{source.inclusion}</p></div>
        <div><h5>Evidence limits</h5><p>{source.limitation}</p></div>
      </div>
      <a className="eval-source" href="#synth-sources-heading">Back to research questions ↑</a>
    </article>)}
    <footer className="eval-attribution">Original sources checked October 22, 2026. PDF fragments target pages, not exact passages, and depend on viewer support. This analysis does not run the cited systems or reproduce their evaluations.</footer>
  </section>
}
