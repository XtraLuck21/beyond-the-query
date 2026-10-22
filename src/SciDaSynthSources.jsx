import { sciDaSynthPdf, sciDaSynthSources } from './data/sciDaSynthSources'
import './ScholarPhiEvaluation.css'
import './SciDaSynthSources.css'

// Directly cited foundations with distinct roles in SciDaSynth's architecture.
// The structured-extraction precedent remains intact in the research data.
const selectedPapers = ['papermage', 'rag', 'ragas'].map(id => sciDaSynthSources.find(source => source.id === id))
const contributions = {
  papermage: 'A unified document representation connects text spans with visual structure such as bounding boxes.',
  rag: 'Combines document retrieval with generation conditioned on retrieved passages.',
  ragas: 'Separates faithfulness, answer relevance, and context relevance when evaluating retrieval-augmented generation.',
}

export default function SciDaSynthSources() {
  return <section className="eval-page synth-sources" aria-labelledby="synth-sources-heading">
    <header className="eval-heading">
      <h3 id="synth-sources-heading">Related Work</h3>
      <p>Three earlier papers help explain SciDaSynth’s document processing, retrieval, and quality signals.</p>
      <p className="synth-source-edition"><a href={sciDaSynthPdf} target="_blank" rel="noopener noreferrer">SciDaSynth v3 PDF ↗<span className="sr-only"> (opens in a new tab)</span></a> · Section and reference numbers follow this PDF.</p>
    </header>

    <div className="synth-source-papers">{selectedPapers.map(source => <article key={source.id} id={`synth-source-${source.id}`} className="eval-section synth-source-entry" aria-labelledby={`synth-source-title-${source.id}`}>
      <p className="synth-source-publication">{source.publication}</p>
      <h4 id={`synth-source-title-${source.id}`} className="synth-source-title"><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} ↗<span className="sr-only"> (opens in a new tab)</span></a></h4>
      <div className="synth-source-summary">
        <div><h5>Main contribution</h5><p>{contributions[source.id]}</p></div>
        <div><h5>Connection to SciDaSynth</h5><p>{source.context}</p></div>
      </div>
      <p className="synth-source-references" aria-label="Supporting references">
        <a href={source.sources[0].url} title={source.basis} target="_blank" rel="noopener noreferrer">SciDaSynth [{source.reference}] · PDF p. {source.page} ↗<span className="sr-only"> (opens in a new tab)</span></a>
        <a href={source.evidenceUrl} title={source.locator} target="_blank" rel="noopener noreferrer">Original-source evidence ↗<span className="sr-only"> (opens in a new tab)</span></a>
      </p>
      <details className="eval-disclosure synth-source-evidence">
        <summary>Evidence and connection details</summary>
        <div className="eval-disclosure-body">
          <p className="synth-source-authors">{source.authors}</p>
          <p><strong>Original-source evidence · paraphrase</strong><br />{source.evidence}</p>
          <p><strong>Exact locator</strong><br />{source.locator}</p>
          <p><strong>SciDaSynth citation</strong><br />{source.basis}</p>
          <p><strong>Relationship</strong><br />{source.relationship}</p>
          <p><strong>Why this connection matters · our interpretation</strong><br />{source.inclusion}</p>
          <p><strong>Evidence limits</strong><br />{source.limitation}</p>
        </div>
      </details>
    </article>)}</div>
    <footer className="eval-attribution">Selected source-based summaries; connections are our interpretation. Citation does not establish shared code or guarantee extraction correctness. PDF page links depend on viewer support.</footer>
  </section>
}
