import { papers } from './data/papers'
import { comparisonRows, getPairNote } from './data/comparison'
import { supportComparisons } from './data/comparisonSummaries'

const support = comparisonRows.find((row) => row.id === 'support')

export default function SupportRelationshipPanel({ paperIds }) {
  const pair = papers.filter((paper) => paperIds.includes(paper.id))
  const note = getPairNote(support, pair.map((paper) => paper.id))
  const comparison = supportComparisons[pair.map((paper) => paper.id).join('|')]
  return (
    <>
      <div className="support-shared"><span className="eyebrow">Shared</span><p>{note.shared}</p></div>
      <div className="support-alignment-wrap">
        <table className="support-alignment">
          <caption className="sr-only">Differences in reading support, aligned by question</caption>
          <thead><tr><th scope="col">Compare by</th>{pair.map((paper) => <th scope="col" className={`support-column-${paper.id}`} key={paper.id}>{paper.name}</th>)}</tr></thead>
          <tbody>{comparison.rows.map((item) => <tr key={item.question}>
            <th scope="row">{item.question}</th>
            {pair.map((paper) => <td key={paper.id}>{item[paper.id]}</td>)}
          </tr>)}</tbody>
        </table>
      </div>
      <h3 className="support-flow-heading">Follow the information</h3>
      <p className="support-flow-note">Illustrative paths within each tool. Readers can revisit steps; these are not a required sequence between tools.</p>
      <div className="support-flows">{pair.map((paper) => <div className={`support-flow support-flow-${paper.id}`} key={paper.id}>
        <h4>{paper.name}</h4>
        <ol style={{ '--support-step-count': comparison.flows[paper.id].length }}>{comparison.flows[paper.id].map((step, index) => <li key={step}>
          {index > 0 && <span className="support-flow-arrow" aria-hidden="true">→</span>}
          <span className="support-flow-step">{step}</span>
        </li>)}</ol>
      </div>)}</div>
      <details className="support-evidence">
        <summary>Evidence &amp; sources</summary>
        <p className="relationship-disclaimer">Curated interpretation of the cited papers, not a quotation or a head-to-head evaluation. These paths illustrate selected interactions, not every feature.</p>
        <div className="support-evidence-grid">{pair.map((paper) => <article key={paper.id}>
          <h4>{paper.title}</h4>
          <p>{support.cells[paper.id].text}</p>
          <a href={support.cells[paper.id].sourceUrl} target="_blank" rel="noopener noreferrer">{support.cells[paper.id].section} ↗<span className="sr-only"> (opens in a new tab)</span></a>
        </article>)}</div>
      </details>
    </>
  )
}
