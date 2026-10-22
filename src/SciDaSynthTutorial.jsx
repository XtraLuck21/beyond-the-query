import { useRef, useState } from 'react'
import './SciDaSynthTutorial.css'

const paper = 'https://arxiv.org/pdf/2404.13765v3'
const question = 'Which crops were studied, and how were they processed?'
// Retained from the existing crop walkthrough; all passages and values are invented.
const initialRows = [
  { id: 'A', crop: 'OFSP', processing: 'Steamed', source: 'Orange-fleshed sweet potato (OFSP) roots were steamed before analysis.' },
  { id: 'B', crop: 'Orange-fleshed sweet potato', processing: '', source: 'Orange-fleshed sweet potato roots were boiled before analysis.' },
  { id: 'C', crop: 'Maize', processing: 'Milled', source: 'Maize grain was milled before analysis.' },
]
// A disjoint attribute avoids assuming a conflict-resolution rule for repeated columns.
const additionalRows = [{ id: 'B', nutrient: 'Beta-carotene' }, { id: 'C', nutrient: 'Iron' }, { id: 'D', nutrient: 'Zinc' }]
const steps = [
  { title: 'Ask', action: 'question', section: '4.3.1', page: 4, instruction: 'Ask a question about the included papers. Start extraction to open a prepared result.' },
  { title: 'Extract', action: 'table', section: '4.3.1', page: 5, instruction: 'Inspect Current Result. Each row stays associated with its document; Empty calls attention to a missing value.' },
  { title: 'Validate', action: 'evidence', section: '4.3.2', page: 6, instruction: 'Select a cell, inspect the teaching source alongside it, and apply a correction. Try Document B\'s missing Processing value.' },
  { title: 'Standardize', action: 'standardize', section: '4.3.3', page: 6, instruction: 'Inspect the crop-name variations, review the proposed group, and apply a shared label to selected records.' },
  { title: 'Accumulate & Export', action: 'export', section: '4.3.4', page: 6, instruction: 'Accept the reviewed table into DB. Add another prepared result to see a document-name merge, then download CSV.' },
]
const actionSteps = { question: 0, table: 1, check: 2, evidence: 2, compare: 3, standardize: 3, review: 4, export: 4 }
const features = [
  { id: 'extraction', title: 'Extraction and Structuring', step: 0, section: '4.3.1', page: 4,
    description: 'Turn a research question into a structured table with document associations.',
    actions: ['Enter a question or use the prepared request.', 'Start the prepared extraction and inspect Current Result.'],
    result: 'A summary and a table of crop and processing values, with missing entries marked Empty.' },
  { id: 'validation', title: 'Validation and Refinement', step: 2, section: '4.3.2', page: 6,
    description: 'Check an extracted value against its source and correct the record.',
    actions: ['Select a cell to inspect its associated teaching source.', 'Edit the value and apply the correction.'],
    result: 'The corrected value appears immediately in the same table and stays across feature switches.' },
  { id: 'standardization', title: 'Summarization and Standardization', step: 3, section: '4.3.3', page: 6,
    description: 'Inspect value variations and apply a reviewed label to a group of records.',
    actions: ['Review the crop overview and proposed group members.', 'Choose the records, edit the group label, and apply it.'],
    result: 'The selected records share a label; overview counts and group frequencies update with the table.' },
  { id: 'database', title: 'Database Construction and Export', step: 4, section: '4.3.4', page: 6,
    description: 'Accept reviewed results into an accumulated dataset and export CSV.',
    actions: ['Accept Current Result into DB.', 'Optionally add another prepared result and inspect the document-name merge.', 'Download the accepted dataset as CSV.'],
    result: 'An accumulated database retains unmatched documents and adds the new attribute to matching ones.' },
]

function FeaturePreview({ id }) {
  return <span className={`feature-preview sds-preview sds-preview-${id}`} aria-hidden="true">
    {id === 'extraction' && <><span>Which crops? How processed?</span><span className="sds-preview-row"><b>Document</b><b>Crop</b><b>Processing</b></span><span className="sds-preview-row"><span>A</span><span>OFSP</span><span>Steamed</span></span></>}
    {id === 'validation' && <><span>Document B: <mark>Empty</mark></span><span>Source: roots were boiled</span><span className="sds-preview-result">Apply correction: Boiled</span></>}
    {id === 'standardization' && <><span>OFSP + Orange-fleshed sweet potato</span><span className="sds-preview-result">One reviewed crop label</span><span>Unique labels: 3 → 2</span></>}
    {id === 'database' && <><span>Current Result + another table</span><span className="sds-preview-result">DB: A · B · C · D</span><span>Accepted records → CSV</span></>}
  </span>
}
function PaperLink({ page, children }) {
  return <a href={`${paper}#page=${page}`} target="_blank" rel="noopener noreferrer">{children} &#8599;<span className="sr-only"> (opens the paper PDF in a new tab)</span></a>
}

export default function SciDaSynthTutorial({ actionId = 'question', onAction, headingRef }) {
  const step = actionSteps[actionId] ?? 0
  const feature = features[step < 2 ? 0 : step - 1]
  const [request, setRequest] = useState(question)
  const [submittedRequest, setSubmittedRequest] = useState('')
  const [rows, setRows] = useState(() => initialRows.map(row => ({ ...row })))
  const [selected, setSelected] = useState({ id: 'B', field: 'processing' })
  const [draft, setDraft] = useState('')
  const [label, setLabel] = useState('Orange-fleshed sweet potato')
  const [members, setMembers] = useState(['A', 'B'])
  const [snapshot, setSnapshot] = useState(null)
  const [includeAdditional, setIncludeAdditional] = useState(false)
  const [resultView, setResultView] = useState('current')
  const [message, setMessage] = useState('')
  const cueRef = useRef(null)
  const editRef = useRef(null)
  const shown = Boolean(submittedRequest) || step > 0
  const missing = rows.filter(row => !row.processing.trim()).length
  const unique = new Set(rows.map(row => row.crop)).size
  const selectedRow = rows.find(row => row.id === selected.id)
  const stale = snapshot && JSON.stringify(snapshot) !== JSON.stringify(rows)
  const database = new Map((snapshot || []).map(row => [row.id, { id: row.id, crop: row.crop, processing: row.processing }]))
  if (snapshot && includeAdditional) for (const row of additionalRows) database.set(row.id, { ...database.get(row.id), ...row })
  const accumulated = [...database.values()]
  const variations = [...new Map(rows.slice(0, 2).map(row => [row.crop, rows.slice(0, 2).filter(item => item.crop === row.crop).length])).entries()]

  function go(next) {
    onAction(steps[next].action)
    setResultView('current')
    setMessage('')
    requestAnimationFrame(() => cueRef.current?.focus())
  }
  function extract(event) {
    event?.preventDefault()
    if (!request.trim()) return
    setSubmittedRequest(request.trim())
    go(1)
    setMessage('Prepared summary and three records opened. This is teaching data, not model-generated output. Existing edits are preserved.')
  }
  function inspect(row, field, focusEditor = false) {
    setSelected({ id: row.id, field })
    setDraft(row[field])
    if (focusEditor) requestAnimationFrame(() => editRef.current?.focus())
    setMessage(`Selected Document ${row.id} - ${field === 'crop' ? 'Crop' : 'Processing'}. Its teaching source is shown alongside the table.`)
  }
  function correct(event) {
    event.preventDefault()
    setRows(previous => previous.map(row => row.id === selected.id ? { ...row, [selected.field]: draft.trim() } : row))
    setMessage(`Document ${selected.id} updated in Current Result. ${draft.trim() ? 'The correction stays when you switch features.' : 'The cell is Empty again.'} ${snapshot ? 'Accept the revised table again before exporting.' : ''}`)
  }
  function standardize(event) {
    event.preventDefault()
    if (!members.length || !label.trim()) return
    setRows(previous => previous.map(row => members.includes(row.id) ? { ...row, crop: label.trim() } : row))
    if (selected.field === 'crop' && members.includes(selected.id)) setDraft(label.trim())
    setMessage(`Applied "${label.trim()}" to ${members.length} selected records. Current Result and overview counts updated. ${snapshot ? 'Accept the revised table again before exporting.' : ''}`)
  }
  function accept() {
    setSnapshot(rows.map(row => ({ ...row })))
    setResultView('database')
    setMessage('Accepted the current three records into DB. Later edits stay in Current Result until you accept them again.')
  }
  function download() {
    if (!snapshot || stale) return
    const columns = ['Document', 'Crop', 'Processing', ...(includeAdditional ? ['Nutrient'] : [])]
    const quote = value => `"${String(value ?? '').replaceAll('"', '""')}"`
    const csv = [columns, ...accumulated.map(row => [`Document ${row.id}`, row.crop, row.processing, ...(includeAdditional ? [row.nutrient] : [])])].map(row => row.map(quote).join(',')).join('\r\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'scidasynth-illustrative-records.csv'
    anchor.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    setMessage(`CSV download requested for ${accumulated.length} accepted teaching records.`)
  }
  function reset() {
    setRows(initialRows.map(row => ({ ...row })))
    setRequest(question)
    setSubmittedRequest('')
    setSelected({ id: 'B', field: 'processing' })
    setDraft('')
    setLabel('Orange-fleshed sweet potato')
    setMembers(['A', 'B'])
    setSnapshot(null)
    setIncludeAdditional(false)
    go(0)
    setMessage('Walkthrough reset. Corrections, groups, and accepted results have been cleared.')
  }

  return <section className="scidasynth-how-it-works" aria-labelledby="synth-workflow-heading">
    <header className="visual-section-header sds-heading"><span className="visual-number">01</span><div><h3 id="synth-workflow-heading" tabIndex={-1} ref={headingRef}>How it works</h3><p>Choose a feature to explore. Every demonstration uses the same shared teaching records; no sequence is required.</p></div></header>
    <div className="feature-overview sds-features" role="group" aria-label="SciDaSynth features">{features.map(item => <button type="button" key={item.id} className="feature-choice sds-feature-choice" aria-pressed={feature.id === item.id} aria-controls="sds-feature-demo" onClick={() => go(item.id === 'extraction' && submittedRequest ? 1 : item.step)}>
      <span className="feature-choice-meta">§{item.section}<span>{feature.id === item.id ? 'Selected' : 'Explore feature'}</span></span><strong>{item.title}</strong><span className="feature-description">{item.description}</span><FeaturePreview id={item.id} />
    </button>)}</div>
    <section id="sds-feature-demo" className="selected-feature" aria-labelledby="sds-feature-title">
    <header className="selected-feature-heading sds-feature-heading"><div><p className="eyebrow">Selected feature · educational simulation</p><h4 id="sds-feature-title" ref={cueRef} tabIndex={-1}>{feature.title}</h4><p>{feature.description}</p></div><PaperLink page={feature.page}>§{feature.section} · p. {feature.page}</PaperLink></header>
    <div className="sds-feature-guide"><div><h5>How to use it</h5><ol>{feature.actions.map(action => <li key={action}>{action}</li>)}</ol></div><div><h5>What you obtain</h5><p>{feature.result}</p></div></div>
    <p className="sds-notice"><strong>Prepared teaching data.</strong> Documents A-D, passages, values, and suggested groups are invented. No live PDF parsing or LLM processing runs here. Edits stay across features and page tabs until reset, a paper change, or reload.</p>
    <div className="sds-product" aria-label="Simulated SciDaSynth workspace">
      <header className="sds-product-header"><strong>SciDaSynth <span>Teaching workspace</span></strong><button type="button" onClick={reset}>Reset walkthrough</button></header>
      <div className={`sds-workspace sds-workspace-${feature.id}`}>
        {step < 2 && <aside className="sds-query" aria-label="Query panel">
          <h5>Paper list</h5><ul className="sds-documents">{initialRows.map(row => <li key={row.id}>Document {row.id}<small>Invented crop study</small></li>)}</ul>
          <h5>Query</h5>
          <form onSubmit={extract}>
            <label htmlFor="sds-question">Your research question</label><textarea id="sds-question" value={request} onChange={event => setRequest(event.target.value)} maxLength={500} rows={4} />
            <button type="button" className="sds-text-action" onClick={() => setRequest(question)}>Use the crop-processing question</button>
            <p className="sds-small">Any question opens this same prepared crop table. Your text is not sent to a model.</p>
            <button type="submit" className="sds-primary" disabled={!request.trim()}>Start extraction - prepared example</button>
          </form>
          {submittedRequest && <p className="sds-query-bubble"><strong>Last prepared request:</strong> {submittedRequest}</p>}
          {shown && <div className="sds-summary"><h5>Data Summary</h5><p>The current teaching table contains {rows.length} crop records, {unique} distinct crop label{unique === 1 ? '' : 's'}, and {missing} missing processing value{missing === 1 ? '' : 's'}.</p><small>Local summary of the current table.</small></div>}
        </aside>}
        <section className="sds-result" aria-label="Result workspace">
          {step === 4 ? <div className="sds-result-tabs" role="group" aria-label="Result view"><button type="button" aria-pressed={resultView === 'current'} onClick={() => setResultView('current')}>Current Result</button><button type="button" aria-pressed={resultView === 'database'} onClick={() => setResultView('database')}>DB - {accumulated.length}</button></div> : <h5>Current Result</h5>}
          {resultView === 'current' ? <>
            <div className="sds-result-toolbar"><span>{shown ? `${rows.length} records - ${missing} missing processing values` : 'Waiting for your question'}</span>{step === 4 && <button type="button" className="sds-primary" onClick={accept}>Add to DB - accept table</button>}</div>
            {shown ? <><div className="sds-table-scroll" role="region" aria-label="Current result table" tabIndex={0}><table className="sds-table"><caption>Current Result - prepared crop records{step === 2 ? ' - select a cell to inspect it' : ''}</caption><thead><tr><th scope="col">Document</th><th scope="col">Crop</th><th scope="col">Processing</th></tr></thead><tbody>{rows.map(row => <tr key={row.id} className={step === 3 && members.includes(row.id) ? 'sds-grouped' : ''}><th scope="row">Document {row.id}</th>{['crop', 'processing'].map(field => <td key={field} className={step === 2 && selected.id === row.id && selected.field === field ? 'sds-selected-cell' : ''}>{step === 2 ? <button type="button" className="sds-cell" aria-pressed={selected.id === row.id && selected.field === field} aria-label={`Inspect Document ${row.id} ${field}: ${row[field] || 'Empty'}`} aria-controls="sds-source-context" onClick={() => inspect(row, field)} onDoubleClick={() => inspect(row, field, true)} onContextMenu={event => { event.preventDefault(); inspect(row, field, true) }}>{row[field] || <span className="sds-empty">Empty</span>}</button> : row[field] || <span className="sds-empty">Empty</span>}</td>)}</tr>)}</tbody></table></div><p className="sds-small">Document names keep records associated with their sources. Empty marks a missing extraction; it does not prove the source lacks the information.</p></> : <div className="sds-empty-result"><h5>Your table will appear here</h5><p>Enter a question in Query, then start the prepared extraction.</p><span>Document - Crop - Processing</span></div>}
          </> : <><h5 className="sds-db-heading">Accumulated database</h5>{snapshot ? <><div className="sds-table-scroll" role="region" aria-label="Accumulated database table" tabIndex={0}><table className="sds-table"><caption>DB - accepted teaching records</caption><thead><tr><th scope="col">Document</th><th scope="col">Crop</th><th scope="col">Processing</th>{includeAdditional && <th scope="col">Nutrient</th>}</tr></thead><tbody>{accumulated.map(row => <tr key={row.id}><th scope="row">Document {row.id}</th><td>{row.crop || <span aria-label="No value">&mdash;</span>}</td><td>{row.processing || <span aria-label="No value">&mdash;</span>}</td>{includeAdditional && <td>{row.nutrient || <span aria-label="No value">&mdash;</span>}</td>}</tr>)}</tbody></table></div><p className="sds-small">A dash indicates a field absent from an accepted result. {stale && 'Current Result has newer edits; accept it again to update DB and re-enable export.'}</p></> : <p className="sds-empty-result">No accepted results yet. Accept your reviewed Current Result to add it to DB.</p>}</>}
        </section>
        {step >= 2 && <aside className="sds-inspector" aria-label={step === 2 ? 'Source context and correction' : step === 3 ? 'Data standardization' : 'Database tools'}>
          {step === 2 && <section id="sds-source-context"><h5>Relevant Contexts</h5><p className="sds-source-label">Document {selected.id} - invented source excerpt</p><blockquote>{selectedRow.source}</blockquote><form onSubmit={correct}><label htmlFor="sds-correction">{selected.field === 'crop' ? 'Crop' : 'Processing'} value - Document {selected.id}</label><input id="sds-correction" ref={editRef} value={draft} onChange={event => setDraft(event.target.value)} placeholder={selected.field === 'processing' && selected.id === 'B' ? 'Try Boiled' : 'Enter a supported value'} maxLength={100} /><button type="submit" className="sds-primary">Apply correction</button></form><p className="sds-small">In the product, a context menu opens evidence and double-click edits cells. Here, selecting a cell opens this keyboard-accessible editor. This passage stands in for source inspection; it is not an actual PDF excerpt.</p><PaperLink page={6}>&sect;4.3.2 - p. 6</PaperLink></section>}
          {step === 3 && <><h5>Data Standardization</h5><p className="sds-small">Selected attribute: Crop - prepared groups, not computed semantic clusters.</p><div className="sds-overview" aria-label="Crop overview"><span>Total values <strong>{rows.length}</strong></span><span>Unique values <strong>{unique}</strong></span></div>
            <div className="sds-group-card"><h6>Sweet potato variations</h6><p>{variations.length} unique label{variations.length === 1 ? '' : 's'} - 2 records</p>{variations.map(([value, count]) => <div key={value} className="sds-frequency"><span>{value || 'Empty'} <strong>&times; {count}</strong></span><progress value={count} max={rows.length} aria-label={`${value || 'Empty'}: ${count} records`} /></div>)}
              <fieldset><legend>Review group members</legend>{rows.slice(0, 2).map(row => <label key={row.id}><input type="checkbox" checked={members.includes(row.id)} onChange={event => setMembers(previous => event.target.checked ? [...previous, row.id] : previous.filter(id => id !== row.id))} />Document {row.id}: {row.crop || 'Empty'}</label>)}</fieldset>
              <p className="sds-small">Teaching sources: A explicitly expands OFSP to orange-fleshed sweet potato; B uses the expanded name. Keep Maize separate.</p>
              <form onSubmit={standardize}><label htmlFor="sds-group-label">Group label</label><input id="sds-group-label" value={label} onChange={event => setLabel(event.target.value)} maxLength={100} /><button type="submit" className="sds-primary" disabled={!members.length || !label.trim()}>Apply group label - {members.length} records</button></form>
            </div><div className="sds-separate-group">Separate group - Document C: {rows[2].crop || 'Empty'}</div><p className="sds-small">Figure 3 shows editable groups and applying group labels. Checkboxes replace moving or removing group entries in this teaching view; the counts update with the same table.</p><PaperLink page={6}>&sect;4.3.3 - Fig. 3 - p. 6</PaperLink></>}
          {step === 4 && <><h5>Build your dataset</h5><p>{missing ? `${missing} processing value is still missing. You may accept the gap or return to validation.` : 'No processing values are missing. Completeness alone does not certify correctness.'}</p><button type="button" className="sds-primary" onClick={accept}>{stale ? 'Accept revised table into DB' : 'Accept reviewed table into DB'}</button>
            <div className="sds-additional"><h6>Another prepared result</h6><p>Question: Which nutrient is reported?</p><ul>{additionalRows.map(row => <li key={row.id}>Document {row.id} - {row.nutrient}</li>)}</ul><button type="button" disabled={!snapshot || stale || includeAdditional} onClick={() => { setIncludeAdditional(true); setResultView('database'); setMessage('Merged by document name: B and C gain a Nutrient field, A remains, and unmatched Document D is added.') }}>{includeAdditional ? 'Additional result accepted' : 'Accept additional prepared result'}</button><p className="sds-small">Document D is an additional invented document. This fixed second result demonstrates the paper's document-name outer join without running another query.</p></div>
            <button type="button" className="sds-primary" disabled={!snapshot || stale} onClick={download}>Download CSV</button><p className="sds-small">{snapshot ? stale ? 'Edits made since acceptance. Accept the revised table before download.' : `${accumulated.length} accepted records ready for export.` : 'Accept Current Result to enable export.'} Reaccepting replaces this teaching table's earlier snapshot; the paper does not specify conflict handling for repeated edits.</p><PaperLink page={6}>&sect;4.3.4 - p. 6</PaperLink></>}
        </aside>}
      </div>
      <p className="sds-status" role="status" aria-live="polite">{message || 'Explore any feature; changes stay in the shared teaching dataset.'}</p>
    </div>
    <p className="sds-attribution">Adapted from <PaperLink page={5}>SciDaSynth &sect;4.3 - Figures 2-3 - pp. 4-6</PaperLink>. Layout, controls, and teaching data are simplified; this is not a product screenshot. No quality scores are simulated. Prepared groups require a human decision.</p>
    </section>
  </section>
}
