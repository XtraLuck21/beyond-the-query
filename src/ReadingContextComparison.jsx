import { papers } from './data/papers'
import { comparisonRows, getPairNote } from './data/comparison'
import { readingContexts, readingContextNotes } from './data/readingContexts'
import './ReadingContextComparison.css'

const context = comparisonRows.find((row) => row.id === 'context')

function AttentionScope({ paperId }) {
  const model = readingContexts[paperId]
  const collection = paperId === 'scidasynth'
  return (
    <figure className="context-scope">
      <span className="context-scope-label">Attention scope · schematic</span>
      <svg viewBox="0 0 360 180" role="img" aria-label={model.diagramLabel}>
        {collection ? <>
          {[56, 148, 240].map((x, index) => <g key={x}>
            <rect className="context-page" x={x} y="10" width="64" height="92" rx="4" />
            {[32, 44, 56, 68, 80].map((y) => <line className="context-prose" key={y} x1={x + 10} x2={x + 54} y1={y} y2={y} />)}
            <text className="context-diagram-text" x={x + 32} y="119" textAnchor="middle">Paper {index + 1}</text>
            <path className="context-connection" d={`M ${x + 32} 124 L ${x + 32} 136 L 180 136 L 180 144`} />
          </g>)}
          <rect className="context-need" x="102" y="144" width="156" height="28" rx="14" />
          <text className="context-diagram-text" x="180" y="162" textAnchor="middle">Information need</text>
        </> : <>
          <rect className="context-page" x="114" y="8" width="132" height="164" rx="4" />
          {[26, 38, 50, 68, 80, 92, 110, 122, 134, 152].map((y, index) => <line className="context-prose" key={y} x1="130" x2={index % 3 === 2 ? 211 : 230} y1={y} y2={y} />)}
          {paperId === 'scholarphi' ? <>
            <rect className="context-local-passage" x="123" y="61" width="114" height="38" rx="4" />
            <ellipse className="context-attention" cx="167" cy="80" rx="31" ry="13" />
          </> : [19, 61, 103].map((y) => <rect className="context-attention" key={y} x="123" y={y} width="114" height="38" rx="4" />)}
        </>}
      </svg>
      <figcaption>{model.caption}</figcaption>
    </figure>
  )
}

export default function ReadingContextComparison({ paperIds }) {
  const pair = papers.filter((paper) => paperIds.includes(paper.id))
  const pairKey = pair.map((paper) => paper.id).join('|')
  const note = getPairNote(context, pair.map((paper) => paper.id))
  return (
    <>
      <div className="support-shared"><span className="eyebrow">Shared</span><p>{note.shared}</p></div>
      <p className="context-illustration-note">The diagrams show what readers attend to, not interface screenshots or tool outputs.</p>
      <div className="context-scenarios">
        {pair.map((paper) => {
          const model = readingContexts[paper.id]
          return <article className={`context-scenario context-scenario-${paper.id}`} key={paper.id} aria-labelledby={`context-${paper.id}-heading`}>
            <header><span className="eyebrow">{paper.name}</span><h3 id={`context-${paper.id}-heading`}>{model.title}</h3></header>
            <AttentionScope paperId={paper.id} />
            <dl>
              <div><dt>Current goal</dt><dd>{model.goal}</dd></div>
              <div><dt>Working scope</dt><dd>{model.scope}</dd></div>
              <div><dt>When support is needed</dt><dd>{model.when}</dd></div>
            </dl>
          </article>
        })}
      </div>
      <p className="context-pair-note">{readingContextNotes[pairKey]}</p>
      <details className="support-evidence">
        <summary>Evidence &amp; sources</summary>
        <p className="relationship-disclaimer">Paper descriptions below are paraphrased. Scenario titles, aligned questions, and attention-scope diagrams are our comparison framing, not author-defined categories or participant quotations.</p>
        <div className="support-evidence-grid">{pair.map((paper) => {
          const model = readingContexts[paper.id]
          return <article key={paper.id}>
            <h4>{paper.title}</h4>
            <p><strong>Paper-described setting:</strong> {model.reported}</p>
            <p><strong>Our comparison framing:</strong> {model.framing}</p>
            {model.evaluation && <p><strong>Evaluation context:</strong> {model.evaluation}</p>}
            <a href={context.cells[paper.id].sourceUrl} target="_blank" rel="noopener noreferrer">{context.cells[paper.id].section} ↗<span className="sr-only"> (opens in a new tab)</span></a>
          </article>
        })}</div>
      </details>
    </>
  )
}
