import ComparisonSources from './ComparisonSources'
import { papers } from './data/papers'
import { comparisonRows, getPairNote } from './data/comparison'
import './ReaderOutputComparison.css'

const result = comparisonRows.find((row) => row.id === 'result')

function ContextualDefinition() {
  return (
    <figure className="output-figure">
      <div className="output-definition-preview" role="img" aria-label="Schematic: a selected term or symbol in a paper is connected to its position-sensitive definition, with access to its source and other usages.">
        <div className="output-definition-page" aria-hidden="true">
          <span className="output-mini-label">Paper text</span>
          <div className="output-text-lines"><i /><i /></div>
          <span className="output-selected-term">Term / symbol</span>
          <div className="output-definition-connector" />
          <div className="output-definition-callout">
            <span className="output-mini-label">Contextual definition</span>
            <strong>Meaning at this location</strong>
            <span className="output-definition-references">Definition source · Other usages</span>
          </div>
          <div className="output-text-lines"><i /><i /></div>
        </div>
      </div>
      <figcaption>Definitions and usages stay connected to the reading context.</figcaption>
    </figure>
  )
}

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

const outputs = {
  scholarphi: {
    title: 'Clarification within the paper',
    illustration: <ContextualDefinition />,
    received: 'Position-sensitive definitions and usages connected to terms and symbols in the paper.',
    next: 'Inspect a definition or usage in context, then continue reading with clarification of the notation.',
  },
  scim: {
    title: 'A focused view of the paper',
    illustration: <HighlightedPaper />,
    received: 'The paper with adjustable highlights and a compact list of passages.',
    next: 'Locate relevant passages and read the surrounding text.',
  },
  scidasynth: {
    title: 'Reusable structured data',
    illustration: <StructuredTable />,
    received: 'A refined table of information extracted from a paper collection.',
    next: 'Merge tables and export CSV for subsequent analysis or reporting.',
  },
}

export default function ReaderOutputComparison({ paperIds }) {
  const pair = papers.filter((paper) => paperIds.includes(paper.id))
  const note = getPairNote(result, pair.map((paper) => paper.id))
  return (
    <>
      <div className="support-shared"><span className="eyebrow">Shared</span><p>{note.shared}</p></div>
      <p className="output-illustration-note"><strong>Output illustrations</strong> · Simplified diagrams, not screenshots or live tool results. Labels and entries are placeholders, not quotations or extracted data.</p>
      <div className="output-comparison-grid">
        {pair.map((paper) => <article key={paper.id} className={`output-card output-card-${paper.id}`} aria-labelledby={`output-${paper.id}-heading`}>
          <header><span className="eyebrow">{paper.name}</span><h3 id={`output-${paper.id}-heading`}>{outputs[paper.id].title}</h3></header>
          {outputs[paper.id].illustration}
          <dl className="output-takeaways">
            <div><dt>What do you get?</dt><dd>{outputs[paper.id].received}</dd></div>
            <div><dt>What can you do next?</dt><dd>{outputs[paper.id].next}</dd></div>
          </dl>
        </article>)}
      </div>
      <details className="support-evidence">
        <summary>Evidence &amp; sources</summary>
        <p className="relationship-disclaimer">Source-based interpretation of supported outputs and activities, not a head-to-head evaluation or a claim of measured benefit. The diagrams show selected output forms, not all capabilities.</p>
        <div className="support-evidence-grid">{pair.map((paper) => <article key={paper.id}>
          <h4>{paper.title}</h4>
          <p>{result.cells[paper.id].text}</p>
          <ComparisonSources cell={result.cells[paper.id]} />
        </article>)}</div>
      </details>
    </>
  )
}
