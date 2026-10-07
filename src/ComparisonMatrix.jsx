import { useRef, useState } from 'react'
import { papers } from './data/papers'
import { comparisonRows, getPairNote, toggleCell } from './data/comparison'
import './ComparisonMatrix.css'

export default function ComparisonMatrix() {
  const [selection, setSelection] = useState({ rowId: null, paperIds: [] })
  const [notice, setNotice] = useState('')
  const dialogRef = useRef(null)
  const selectedRow = comparisonRows.find((row) => row.id === selection.rowId)
  const selectedPapers = papers.filter((paper) => selection.paperIds.includes(paper.id))
  const pairNote = selection.paperIds.length === 2 ? getPairNote(selectedRow, selection.paperIds) : null

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
    setNotice('')
  }

  return (
    <section className="comparison-view" aria-labelledby="comparison-heading">
      <div className="comparison-intro">
        <div>
          <p className="eyebrow">Broad comparison</p>
          <h2 id="comparison-heading">Three papers, four perspectives.</h2>
          <p>Read across a row, then select two cells to explore their relationship.</p>
        </div>
        <span className="reading-note-label">Curated reading notes</span>
      </div>
      <div className="selection-toolbar">
        <p role="status">
          {notice || (selectedRow
            ? `${selectedRow.label} · ${selection.paperIds.length} of 2 selected${selectedPapers.length ? `: ${selectedPapers.map((p) => p.name).join(' + ')}` : ''}`
            : 'Select two papers within the same row. You can clear your selection at any time.')}
        </p>
        <div className="selection-actions">
          <button type="button" className="matrix-action" disabled={!selectedRow} onClick={() => {
            setSelection({ rowId: null, paperIds: [] })
            setNotice('')
          }}>Clear selection</button>
          <button type="button" className="matrix-action primary-link" disabled={!pairNote} onClick={() => dialogRef.current.showModal()}>View relationship</button>
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
                  <a href={paper.paperUrl} target="_blank" rel="noopener noreferrer">{paper.title}<span className="sr-only"> (opens in a new tab)</span></a>
                  <span className="paper-meta">{paper.venue} · {paper.year}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.id}>
                <th scope="row"><span>{row.label}</span><small>{row.question}</small></th>
                {papers.map((paper) => {
                  const cell = row.cells[paper.id]
                  const isSelected = selection.rowId === row.id && selection.paperIds.includes(paper.id)
                  const unavailable = Boolean(selection.rowId && (selection.rowId !== row.id || (selection.paperIds.length === 2 && !isSelected)))
                  return (
                    <td key={paper.id} className={isSelected ? 'matrix-cell is-selected' : 'matrix-cell'}>
                      <button type="button" className="cell-select" aria-pressed={isSelected} aria-disabled={unavailable}
                        aria-label={`${isSelected ? 'Deselect' : 'Select'} ${paper.name}: ${row.label}`}
                        aria-describedby={`cell-${row.id}-${paper.id}`}
                        onClick={() => selectCell(row.id, paper.id)}>
                        <span className="cell-state">{isSelected ? '✓ Selected for comparison' : 'Select for comparison'}</span>
                        <span className="cell-copy" id={`cell-${row.id}-${paper.id}`}>{cell.text}</span>
                      </button>
                      <a className="cell-source" href={cell.sourceUrl} target="_blank" rel="noopener noreferrer">Source: {cell.section}<span className="sr-only"> (opens in a new tab)</span> ↗</a>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="matrix-footnote">Cells paraphrase the cited papers. Result &amp; Next Action describes supported activities, not a ranking or a claim of measured benefit.</p>
      <dialog ref={dialogRef} className="relationship-dialog" aria-labelledby="relationship-heading">
        {pairNote && <>
          <div className="relationship-heading">
            <div><p className="eyebrow">{selectedPapers.map((paper) => paper.name).join(' + ')}</p><h2 id="relationship-heading">{selectedRow.label}</h2></div>
            <button type="button" className="matrix-action" onClick={() => dialogRef.current.close()}>Close</button>
          </div>
          <p className="relationship-disclaimer">Curated interpretation of the cited sources; not a quotation or a head-to-head evaluation.</p>
          <dl className="relationship-notes">
            <div><dt>Similarities</dt><dd>{pairNote.shared}</dd></div>
            <div><dt>Differences</dt><dd>{pairNote.difference}</dd></div>
          </dl>
          <div className="relationship-evidence">
            <h3>Check the source context</h3>
            {selectedPapers.map((paper) => <div key={paper.id}>
              <h4>{paper.title}</h4>
              <p>{selectedRow.cells[paper.id].text}</p>
              <a href={selectedRow.cells[paper.id].sourceUrl} target="_blank" rel="noopener noreferrer">{selectedRow.cells[paper.id].section}<span className="sr-only"> (opens in a new tab)</span> ↗</a>
            </div>)}
          </div>
        </>}
      </dialog>
    </section>
  )
}
