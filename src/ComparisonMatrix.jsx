import { useRef, useState } from 'react'
import { papers } from './data/papers'
import { comparisonRows, getPairNote, toggleCell } from './data/comparison'
import './ComparisonMatrix.css'
import PaperRelationshipMap from './PaperRelationshipMap'
import { comparisonSummaries, supportComparisons, problemHeadings } from './data/comparisonSummaries'
import SupportRelationshipPanel from './SupportRelationshipPanel'
import ReaderOutputComparison from './ReaderOutputComparison'
import ProblemRelationshipPanel from './ProblemRelationshipPanel'

export default function ComparisonMatrix() {
  const [selection, setSelection] = useState({ rowId: null, paperIds: [] })
  const [notice, setNotice] = useState('')
  const panelRef = useRef(null)
  const toolbarRef = useRef(null)
  const selectedCellRef = useRef(null)
  const panelHeadingRef = useRef(null)
  const compareButtonRef = useRef(null)
  const [showRelationship, setShowRelationship] = useState(false)
  const selectedRow = comparisonRows.find((row) => row.id === selection.rowId)
  const selectedPapers = papers.filter((paper) => selection.paperIds.includes(paper.id))
  const pairNote = selection.paperIds.length === 2 ? getPairNote(selectedRow, selection.paperIds) : null
  const isSupportComparison = selection.rowId === 'support' && selection.paperIds.length === 2
  const pairKey = selectedPapers.map((paper) => paper.id).join('|')
  const isProblemComparison = selection.rowId === 'motivation' && selection.paperIds.length === 2
  const isOutputComparison = selection.rowId === 'result' && selection.paperIds.length === 2

  function compareSelected() {
    setShowRelationship(true)
    requestAnimationFrame(() => {
      panelHeadingRef.current?.focus({ preventScroll: true })
      if (panelRef.current) {
        panelRef.current.style.scrollMarginTop = `${(toolbarRef.current?.offsetHeight || 0) + 32}px`
        panelRef.current.scrollIntoView({ block: 'start', behavior: 'instant' })
      }
    })
  }

  function backToSelection() {
    const target = selectedCellRef.current || compareButtonRef.current
    target?.focus({ preventScroll: true })
    target?.scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'instant' })
  }

  function selectCell(rowId, paperId) {
    if (selection.rowId && selection.rowId !== rowId) {
      setNotice('Clear the current selection before choosing another row.')
      return
    }
    if (selection.paperIds.length === 2 && !selection.paperIds.includes(paperId)) {
      setNotice('Two cells are selected. Deselect one to choose a different paper.')
      return
    }
    setSelection(toggleCell(selection, rowId, paperId))
    setShowRelationship(false)
    setNotice('')
  }

  return (
    <section className="comparison-view" aria-labelledby="comparison-heading">
      <PaperRelationshipMap />
      <div className="comparison-intro">
        <div>
          <p className="eyebrow">Broad comparison</p>
          <h2 id="comparison-heading">Three papers, four perspectives.</h2>
          <p>Read across a row, then select two cells to explore their relationship.</p>
        </div>
        <span className="reading-note-label">Curated reading notes</span>
      </div>
      <div className="selection-toolbar" ref={toolbarRef}>
        <p role="status">
          {notice || (selectedRow
            ? `${selectedRow.label} · ${selection.paperIds.length} of 2 selected${selectedPapers.length ? `: ${selectedPapers.map((p) => p.name).join(' + ')}` : ''}`
            : 'Select two papers within the same row. You can clear your selection at any time.')}
        </p>
        <div className="selection-actions">
          <button type="button" className="matrix-action" disabled={!selectedRow} onClick={() => {
            setSelection({ rowId: null, paperIds: [] })
            setShowRelationship(false)
            setNotice('')
          }}>Clear selection</button>
          <button ref={compareButtonRef} type="button" className="matrix-action primary-link" disabled={!pairNote} onClick={compareSelected}>Compare selected</button>
        </div>
      </div>
      <div className="matrix-scroll" role="region" aria-label="Paper comparison matrix" tabIndex={0}>
        <table className="comparison-table">
          <caption className="sr-only">Four contextual dimensions across three papers. Select two cells in the same row to view a curated relationship note.</caption>
          <thead>
            <tr>
              <th scope="col" className="dimension-column">Information dimension</th>
              {papers.map((paper, index) => (
                <th scope="col" key={paper.id}>
                  <span className="matrix-paper-number">Paper 0{index + 1}</span>
                  <span className="matrix-paper-name">{paper.name}</span>
                  <span className="paper-meta">{paper.venue} · {paper.year}</span>
                  <details className="matrix-paper-title"><summary>Paper title &amp; link</summary><a href={paper.paperUrl} target="_blank" rel="noopener noreferrer">{paper.title}<span className="sr-only"> (opens in a new tab)</span> ↗</a></details>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.id}>
                <th scope="row"><span>{comparisonSummaries[row.id].label}</span><small>{row.question}</small></th>
                {papers.map((paper) => {
                  const cell = row.cells[paper.id]
                  const [headline, description] = comparisonSummaries[row.id][paper.id]
                  const isSelected = selection.rowId === row.id && selection.paperIds.includes(paper.id)
                  const unavailable = Boolean(selection.rowId && (selection.rowId !== row.id || (selection.paperIds.length === 2 && !isSelected)))
                  return (
                    <td key={paper.id} className={isSelected ? 'matrix-cell is-selected' : 'matrix-cell'}>
                      <button type="button" className="cell-select" aria-pressed={isSelected} aria-disabled={unavailable}
                        ref={isSelected && paper.id === selectedPapers[0]?.id ? selectedCellRef : null}
                        aria-label={`${isSelected ? 'Deselect' : 'Select'} ${paper.name}: ${row.label}`}
                        aria-describedby={`cell-${row.id}-${paper.id}`}
                        onClick={() => selectCell(row.id, paper.id)}>
                        <span className="cell-state" aria-hidden="true">{isSelected ? '✓ Selected' : '○'}</span>
                        <span className="cell-copy" id={`cell-${row.id}-${paper.id}`}><strong>{headline}</strong><span>{description}</span></span>
                      </button>
                      <a className="cell-source" href={cell.sourceUrl} title={cell.section} target="_blank" rel="noopener noreferrer">Source ↗<span className="sr-only">: {paper.name}, {cell.section} (opens in a new tab)</span></a>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="matrix-footnote">Source-based summaries of selected focuses, not exhaustive capability lists. Reader output describes supported activities, not measured benefit.</p>
      {showRelationship && pairNote && <section ref={panelRef} className="support-relationship" aria-labelledby="relationship-heading">
        <header className="relationship-heading">
          <div>
            <p className="eyebrow">{selectedPapers.map((paper) => paper.name).join(' × ')} · {comparisonSummaries[selectedRow.id].label}</p>
            <h2 id="relationship-heading" ref={panelHeadingRef} tabIndex={-1}>{isProblemComparison ? problemHeadings[pairKey] : isSupportComparison ? supportComparisons[pairKey].heading : isOutputComparison ? 'What do readers take away?' : selectedRow.label}</h2>
          </div>
          <button type="button" className="matrix-action" onClick={backToSelection}>Back to selection</button>
        </header>
        {isProblemComparison ? <ProblemRelationshipPanel key={pairKey} paperIds={selection.paperIds} /> : isSupportComparison ? <SupportRelationshipPanel key={pairKey} paperIds={selection.paperIds} /> : isOutputComparison ? <ReaderOutputComparison key={pairKey} paperIds={selection.paperIds} /> : <>
          <dl className="relationship-notes">
            <div><dt>Similarities</dt><dd>{pairNote.shared}</dd></div>
            <div><dt>Differences</dt><dd>{pairNote.difference}</dd></div>
          </dl>
          <details className="support-evidence" key={`${selectedRow.id}-${selectedPapers.map((paper) => paper.id).join('-')}`}>
            <summary>Evidence &amp; sources</summary>
            <p className="relationship-disclaimer">Curated interpretation of the cited sources; not a quotation or a head-to-head evaluation.</p>
            <div className="support-evidence-grid">{selectedPapers.map((paper) => <article key={paper.id}>
              <h4>{paper.title}</h4>
              <p>{selectedRow.cells[paper.id].text}</p>
              <a href={selectedRow.cells[paper.id].sourceUrl} target="_blank" rel="noopener noreferrer">{selectedRow.cells[paper.id].section}<span className="sr-only"> (opens in a new tab)</span> ↗</a>
            </article>)}</div>
          </details>
        </>}
      </section>}
    </section>
  )
}
