import { papers } from './data/papers'
import { comparisonRows, getPairNote } from './data/comparison'
import './ReaderOutputComparison.css'

const pair = papers.filter((paper) => ['scim', 'scidasynth'].includes(paper.id))
const result = comparisonRows.find((row) => row.id === 'result')
const note = getPairNote(result, pair.map((paper) => paper.id))

function HighlightedPaper() {
  return (
    <figure className="output-figure">
      <div className="output-reading-preview" role="img" aria-label="Schematic: a paper with highlighted passages next to a passage navigation list. The surrounding text remains available.">
        <div className="output-paper-page" aria-hidden="true">
          <span className="output-mini-label">Paper text</span>
          <div className="output-text-lines"><i /><i /><i /></div>
          <div className="output-highlight output-highlight-a">Passage A</div>
          <div className="output-text-lines"><i /><i /></div>
          <div className="output-highlight output-highlight-b">Passage B</div>
          <div className="output-text-lines"><i /><i /><i /></div>
        </div>
        <div className="output-passage-list" aria-hidden="true">
          <span className="output-mini-label">Passage list</span>
          <span className="output-passage-item">A <span>Locate in paper</span></span>
          <span className="output-passage-item">B <span>Locate in paper</span></span>
          <span className="output-context-label">Original context stays available</span>
        </div>
      </div>
      <figcaption>Highlights and navigation point back into the paper.</figcaption>
    </figure>
  )
}

function StructuredTable() {
  return (
    <figure className="output-figure">
      <div className="output-data-preview">
        <span className="output-mini-label">Extracted records · placeholder entries</span>
        <table className="output-mini-table">
          <caption className="sr-only">Illustrative table structure, not actual extracted data</caption>
          <thead><tr><th scope="col">Paper</th><th scope="col">Field 1</th><th scope="col">Field 2</th></tr></thead>
          <tbody>{['A', 'B', 'C'].map((id) => <tr key={id}><th scope="row">{id}</th><td>Value</td><td>Value</td></tr>)}</tbody>
        </table>
        <div className="output-export-path"><span className="output-file-label">CSV</span><span aria-hidden="true">→</span><span>Analysis / reporting</span></div>
      </div>
      <figcaption>Structured values can be merged and exported for reuse.</figcaption>
    </figure>
  )
}

export default function ReaderOutputComparison() {
  return (
    <>
      <div className="support-shared"><span className="eyebrow">Shared</span><p>{note.shared}</p></div>
      <p className="output-illustration-note"><strong>Output illustrations</strong> · Simplified diagrams, not screenshots or live tool results. Passage labels and table entries are placeholders.</p>
      <div className="output-comparison-grid">
        <article className="output-card output-card-scim" aria-labelledby="output-scim-heading">
          <header><span className="eyebrow">Scim</span><h3 id="output-scim-heading">A focused view of the paper</h3></header>
          <HighlightedPaper />
          <dl className="output-takeaways">
            <div><dt>What do you get?</dt><dd>The paper with adjustable highlights and a compact list of passages.</dd></div>
            <div><dt>What can you do next?</dt><dd>Locate relevant passages and read the surrounding text.</dd></div>
          </dl>
        </article>
        <article className="output-card output-card-scidasynth" aria-labelledby="output-scidasynth-heading">
          <header><span className="eyebrow">SciDaSynth</span><h3 id="output-scidasynth-heading">Reusable structured data</h3></header>
          <StructuredTable />
          <dl className="output-takeaways">
            <div><dt>What do you get?</dt><dd>A refined table of information extracted from a paper collection.</dd></div>
            <div><dt>What can you do next?</dt><dd>Merge tables and export CSV for subsequent analysis or reporting.</dd></div>
          </dl>
        </article>
      </div>
      <details className="support-evidence">
        <summary>Evidence &amp; sources</summary>
        <p className="relationship-disclaimer">Source-based interpretation of supported outputs and activities, not a head-to-head evaluation or a claim of measured benefit. The diagrams show selected output forms, not all capabilities.</p>
        <div className="support-evidence-grid">{pair.map((paper) => <article key={paper.id}>
          <h4>{paper.title}</h4>
          <p>{result.cells[paper.id].text}</p>
          <a href={result.cells[paper.id].sourceUrl} target="_blank" rel="noopener noreferrer">{result.cells[paper.id].section} ↗<span className="sr-only"> (opens in a new tab)</span></a>
        </article>)}</div>
      </details>
    </>
  )
}
