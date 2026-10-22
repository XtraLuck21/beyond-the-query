import { useState } from 'react'
import { papers } from './data/papers'
import { comparisonRows, getPairNote } from './data/comparison'
import './PaperRelationshipMap.css'

// Editorial entry points into the existing, source-linked comparison notes.
// Positions and connections are not a similarity score or a workflow sequence.
const focuses = {
  scholarphi: { verb: 'Understand', label: 'Terms & symbols', question: 'What does this mean here?' },
  scim: { verb: 'Skim', label: 'Salient passages', question: 'Where should I focus my reading?' },
  scidasynth: { verb: 'Structure', label: 'Extracted records', question: 'How can I organize and check this information?' },
}
const connections = [
  { id: 'reading', papers: ['scholarphi', 'scim'], label: 'Support reading', question: 'Understanding a passage or deciding what to read?', row: 'context', path: 'M 350 90 Q 110 155 140 370' },
  { id: 'context', papers: ['scholarphi', 'scidasynth'], label: 'Return to context', question: 'The same route to a source, but for what purpose?', row: 'support', path: 'M 350 90 Q 590 155 560 370' },
  { id: 'information', papers: ['scim', 'scidasynth'], label: 'Focus information', question: 'Highlight original passages or structure extracted values?', row: 'result', path: 'M 140 370 Q 350 410 560 370' },
]
const rowById = Object.fromEntries(comparisonRows.map(row => [row.id, row]))

function Evidence({ paperIds, rowId, label = 'Evidence & sources' }) {
  const row = rowById[rowId]
  return <details className="relationship-map-evidence">
    <summary>{label}</summary>
    <p>Source-based reading notes. The relationships and grouping are our interpretation, not a head-to-head evaluation.</p>
    {paperIds.map(id => {
      const paper = papers.find(item => item.id === id)
      const cell = row.cells[id]
      return <div key={id}>
        <strong>{paper.name}</strong>
        <p>{cell.text}</p>
        <a href={cell.sourceUrl} target="_blank" rel="noopener noreferrer">{cell.section} ↗<span className="sr-only"> (opens in a new tab)</span></a>
      </div>
    })}
  </details>
}

export default function PaperRelationshipMap() {
  const [selected, setSelected] = useState('all')
  const connection = connections.find(item => item.id === selected)
  const paper = papers.find(item => item.id === selected)
  const activeIds = connection?.papers || (paper ? [paper.id] : papers.map(item => item.id))
  const pairNote = connection ? getPairNote(rowById[connection.row], connection.papers) : null
  const selectedNames = activeIds.map(id => papers.find(item => item.id === id).name).join(' + ')

  function select(id) {
    setSelected(id)
  }

  return <section className="relationship-map" aria-labelledby="relationship-map-heading">
    <header className="relationship-map-heading">
      <p className="eyebrow">Start with a connection</p>
      <h2 id="relationship-map-heading">Three systems. Different kinds of support.</h2>
      <p>Choose a paper to see its focus, or a connection to explore what two papers share and where they differ.</p>
    </header>
    <div className="relationship-map-layout">
      <div className="relationship-map-canvas">
        <div className="relationship-map-diagram" role="group" aria-label="Explore three papers and their relationships">
          <svg viewBox="0 0 700 480" preserveAspectRatio="none" aria-hidden="true" className="relationship-map-lines">
            {connections.map(item => <path key={item.id} d={item.path} className={connection?.id === item.id ? 'is-active' : ''} />)}
          </svg>
          {papers.map(item => <button type="button" key={item.id}
            className={`relationship-map-paper map-${item.id} ${activeIds.includes(item.id) ? 'is-related' : ''}`}
            aria-label={`Explore ${item.name}: ${focuses[item.id].label}`}
            aria-pressed={selected === item.id} aria-controls="relationship-map-detail"
            onClick={() => select(item.id)}>
            <span className="relationship-map-verb">{focuses[item.id].verb}</span>
            <strong>{item.name}</strong>
            <span>{focuses[item.id].label}</span>
          </button>)}
          {connections.map(item => <button type="button" key={item.id}
            className={`relationship-map-connection map-${item.id}`}
            aria-label={`${item.papers.map(id => papers.find(p => p.id === id).name).join(' and ')}: ${item.label}`}
            aria-pressed={selected === item.id} aria-controls="relationship-map-detail"
            onClick={() => select(item.id)}><span><small className="relationship-map-pair-names">{item.papers.map(id => papers.find(p => p.id === id).name).join(' + ')}</small>{item.label}</span><span aria-hidden="true">↗</span></button>)}
          <button type="button" className="relationship-map-common" aria-pressed={selected === 'all'}
            aria-controls="relationship-map-detail" onClick={() => select('all')}>
            <span>All three</span><strong>Working with<br />scientific papers</strong>
          </button>
        </div>
        <p className="relationship-map-key">Connections show selected relationships. Position, distance, and circle size do not encode similarity or a required reading order.</p>
      </div>
      <div className="relationship-map-detail" id="relationship-map-detail" role="region" aria-labelledby="relationship-map-detail-heading">
        <p className="relationship-map-selection" role="status">{paper ? 'Paper focus' : connection ? 'Selected connection' : 'Shared starting point'} · {selectedNames}</p>
        {connection ? <>
          <h3 id="relationship-map-detail-heading">{connection.question}</h3>
          <dl className="relationship-map-notes">
            <div><dt>What they share</dt><dd>{pairNote.shared}</dd></div>
            <div><dt>Where they differ</dt><dd>{pairNote.difference}</dd></div>
          </dl>
          <Evidence key={selected} paperIds={activeIds} rowId={connection.row} />
        </> : paper ? <>
          <h3 id="relationship-map-detail-heading">{focuses[paper.id].question}</h3>
          <p className="relationship-map-full-title">{paper.title}</p>
          <dl className="relationship-map-notes">
            <div><dt>Primary focus</dt><dd>{rowById.motivation.cells[paper.id].text}</dd></div>
            <div><dt>What the reader gets</dt><dd>{rowById.result.cells[paper.id].text}</dd></div>
          </dl>
          <p className="relationship-map-hint">Select a connection to compare this focus with another paper. These labels describe emphasis, not exclusive capabilities.</p>
          <Evidence key={`${selected}-motivation`} paperIds={activeIds} rowId="motivation" label="Problem & motivation sources" />
          <Evidence key={`${selected}-result`} paperIds={activeIds} rowId="result" label="Result & next action sources" />
        </> : <>
          <h3 id="relationship-map-detail-heading">A shared setting, different reading needs.</h3>
          <p>All three support research work with scientific literature. Their emphasis differs:</p>
          <ul className="relationship-map-overview">{papers.map(item => <li key={item.id} className={`map-${item.id}`}><strong>{item.name}</strong><span>{focuses[item.id].question}</span></li>)}</ul>
          <p className="relationship-map-hint">Explore a connection to see a specific similarity and difference, with supporting sources.</p>
          <Evidence key="all" paperIds={activeIds} rowId="motivation" />
        </>}
      </div>
    </div>
  </section>
}
