import { scholarPhiContexts } from './data/scholarPhiContexts'
import './PaperContext.css'

export default function PaperContext({ contextId, context: suppliedContext, collapseEvidence = false, children }) {
  const context = suppliedContext || scholarPhiContexts[contextId]
  const evidence = <>{children}<ul className="paper-context-sources">{context.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗<span className="sr-only"> (opens in a new tab)</span></a></li>)}</ul></>
  return <section className="paper-context" aria-label={context.question}>
    <p className="paper-context-label">Question this context helps answer</p>
    <h6 className="paper-context-question">{context.question}</h6>
    <p className="paper-context-relationship"><strong>Relationship</strong><span>{context.relationship}</span></p>
    <p className="paper-context-explanation">{context.context}</p>
    {collapseEvidence ? <details className="paper-context-evidence"><summary>Evidence &amp; sources</summary>{evidence}</details> : <div className="paper-context-evidence"><p className="paper-context-label">Evidence &amp; sources</p>{evidence}</div>}
    <p className="paper-context-attribution">Source-based summary; cross-system comparisons are our interpretation.</p>
  </section>
}
