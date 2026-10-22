import { useEffect, useRef, useState } from 'react'
import TutorialFrame from './TutorialFrame'
import './SciDaSynthTutorial.css'

const synthSource = 'https://arxiv.org/pdf/2404.13765'
const capabilities = [
  {
    id: 'extraction', title: 'Extraction and structuring', section: '4.3.1', page: 4,
    question: 'How do my information needs become table columns?',
    description: 'Ask natural-language questions or specify attributes in a form. SciDaSynth uses text, tables, and figures to return a summary and structured records.',
    coverage: 'Here: a prepared request and table. Upload, retrieval, and LLM extraction are not demonstrated.',
  },
  {
    id: 'validation', title: 'Validation and refinement', section: '4.3.2', page: 4,
    question: 'Can I trust this extracted value?',
    description: 'Review missing values and quality signals, inspect retrieved contexts and original sources, then edit records. The paper describes answer relevancy, context relevancy, and faithfulness.',
    coverage: 'Here: inspect and edit one missing value. Quality metrics and original-PDF inspection are not demonstrated.',
  },
  {
    id: 'standardization', title: 'Summarization and standardization', section: '4.3.3', page: 6,
    question: 'Which variations should share a label?',
    description: 'Explore selected attributes through semantic grouping, scatter plots, and group statistics; revise groups and apply shared labels to the table.',
    coverage: 'Here: choose records and apply a shared crop label. Visual summaries, automatic grouping, and group creation are not demonstrated.',
  },
  {
    id: 'database', title: 'Database construction and export', section: '4.3.4', page: 6,
    question: 'How do reviewed tables become reusable data?',
    description: 'Add reviewed tables to a database, merge by document name using outer joins, repeat with new queries, and export the accumulated data as CSV.',
    coverage: 'Here: keep and download one snapshot. Repeated queries and database merges are not demonstrated.',
  },
]

function PaperLink({ page = 4, children }) {
  return <a className="pv-source" href={`${synthSource}#page=${page}`} target="_blank" rel="noopener noreferrer">{children} ↗<span className="sr-only"> (opens the source PDF in a new tab)</span></a>
}

function FeaturePreview({ id }) {
  return <span className={`feature-preview synth-preview synth-preview-${id}`} aria-hidden="true">
    {id === 'extraction' && <><span><mark>Crop</mark> + <mark>Processing</mark></span><span>↓ requested columns</span><span className="synth-preview-row"><span>Document</span><span>Crop</span><span>Processing</span></span><span className="synth-preview-row"><span>A</span><span>OFSP</span><span>Steamed</span></span></>}
    {id === 'validation' && <><span><mark>Empty</mark> → inspect source</span><span>“boiled” → check → edit</span><span>Missing value → reviewed value</span></>}
    {id === 'standardization' && <><span>OFSP · Orange-fleshed sweet potato</span><span>↓ review proposed group</span><mark>Apply one shared label</mark></>}
    {id === 'database' && <><span>Reviewed table + another table</span><span>↓ join by document</span><mark>Accumulated records → CSV</mark></>}
  </span>
}

function CapabilityOverview({ selected, onSelect }) {
  return <section className="synth-capabilities" aria-label="SciDaSynth feature selection">
    <div className="feature-overview">{capabilities.map(capability => <article key={capability.id} className="synth-feature-card" data-selected={selected === capability.id}>
      <div className="feature-choice-meta"><PaperLink page={capability.page}>§{capability.section} · p. {capability.page}</PaperLink><span>{capability.id === 'extraction' ? 'Interactive demo' : 'Dedicated demo pending'}</span></div>
      <button type="button" className="feature-choice" aria-pressed={selected === capability.id} aria-controls="synth-feature-demo" onClick={() => onSelect(capability.id)}>
        <strong>{capability.title}</strong><span className="feature-question">{capability.question}</span><FeaturePreview id={capability.id} />
        <span className="feature-description">{selected === capability.id ? 'Selected' : 'Explore feature'}</span>
      </button>
    </article>)}</div>
  </section>
}

const extractionFields = [{ id: 'crop', label: 'Crop' }, { id: 'processing', label: 'Processing' }]

function ExtractionDemo({ rows, onOpenWalkthrough }) {
  const [fields, setFields] = useState(['crop', 'processing'])
  const [revealed, setRevealed] = useState(false)
  const selected = extractionFields.filter(field => fields.includes(field.id))
  function toggle(id) {
    setFields(previous => previous.includes(id) ? previous.filter(field => field !== id) : [...previous, id])
    setRevealed(false)
  }
  return <div className="synth-extraction-demo">
    <p className="fixture-notice">Educational simulation · Documents A–C and their values are invented. No PDF upload, retrieval, or LLM runs here.</p>
    <div className="synth-transform-stages" aria-label="Demonstration stages"><span>01 · Choose information</span><span aria-hidden="true">→</span><span>02 · Build columns</span><span aria-hidden="true">→</span><span>03 · Reveal prepared records</span></div>
    <div className="synth-extraction-workspace">
      <div className="synth-information-needs">
        <h5>Included collection</h5><div className="synth-document-chips">{rows.map(row => <span key={row.id}>Document {row.id}</span>)}</div>
        <fieldset><legend>Information to extract</legend>{extractionFields.map(field => <label key={field.id} className={`synth-field-option field-${field.id}`}><input type="checkbox" checked={fields.includes(field.id)} onChange={() => toggle(field.id)} />{field.label}</label>)}</fieldset>
        <div className="extraction-request"><span className="example-section">Your prepared request</span><p>{selected.length ? <>For each document, extract <strong>{selected.map(field => field.label.toLowerCase()).join(' and ')}</strong>.</> : 'Choose at least one field.'}</p></div>
        <button type="button" className="matrix-action synth-reveal" disabled={!selected.length} onClick={() => setRevealed(true)}>Show prepared records</button>
        <button type="button" className="matrix-action" onClick={() => { setFields(['crop', 'processing']); setRevealed(false) }}>Reset extraction view</button>
      </div>
      <section className="synth-structured-output" aria-label="Structured extraction result">
        <div className="synth-output-heading"><h5>{revealed ? 'Prepared records' : 'Table structure'}</h5><span>{selected.length} requested column{selected.length === 1 ? '' : 's'}</span></div>
        <table className="extraction-table synth-projection"><caption>{revealed ? 'Simulated result · values from the shared crop records' : 'Selected information becomes columns; values are not yet shown'}</caption>
          <thead><tr><th scope="col">Document</th>{selected.map(field => <th key={field.id} scope="col" className={`field-${field.id}`}>{field.label}</th>)}</tr></thead>
          <tbody>{rows.map(row => <tr key={row.id}><th scope="row">Example {row.id}</th>{selected.map(field => <td key={field.id} className={`field-${field.id} ${revealed ? 'is-revealed' : 'is-awaiting'}`}>{revealed ? row[field.id] || <span className="synth-empty">Empty</span> : <span className="synth-value-placeholder"><span className="sr-only">Prepared value hidden</span></span>}</td>)}</tr>)}</tbody>
        </table>
        <p className="demo-status" role="status">{!selected.length ? 'No fields selected. Choose Crop or Processing to build a result.' : revealed ? `${rows.length} prepared records shown with ${selected.length} requested column${selected.length === 1 ? '' : 's'}. This is predefined data, not extraction output from a model.` : 'Columns match your selection. Show prepared records to fill the cells.'}</p>
        {revealed && <button type="button" className="matrix-action" onClick={onOpenWalkthrough}>Inspect or edit in the existing crop walkthrough →</button>}
      </section>
    </div>
    <details className="synth-extraction-evidence"><summary>Paper evidence, original example, and simulation limits</summary>
      <p><PaperLink>§4.3.1 · Flexibly specify information needs; §4.2 · Data Extraction and Structuring · p. 4</PaperLink></p>
      <p>The paper accepts questions or attribute forms, infers column names and descriptions, then generates a table and summary from retrieved contexts. Our checkboxes make the need → column relationship explicit; they are teaching controls, not the original form.</p>
      <p><strong>Paper example:</strong> “What are the tasks and accuracy of different LMs?” Its inferred structure uses these keys:</p>
      <div className="synth-paper-schema">{['language_model_name', 'tasks_supported', 'accuracy_metric', 'accuracy_value', 'accuracy_source'].map(key => <code key={key}>{key}</code>)}</div>
      <p>This is the question and schema from §4.2, not extracted language-model records. The interactive crop values are separate invented fixtures. Revealing records only projects the current shared dataset; edits in the existing walkthrough remain visible here. Changing requested fields hides values until revealed again and does not delete data or invalidate an export snapshot.</p>
      <p>Source: arXiv:2404.13765v3, September 4, 2025. PDF links target pages, not exact paragraphs. Multimodal retrieval, model inference, and generated summaries are not simulated.</p>
    </details>
  </div>
}

function VerificationExample() {
  return <section className="synth-verification-example" aria-labelledby="synth-verification-heading">
    <p className="eyebrow">Paper-grounded example · automated GPT baseline (Baseline B)</p>
    <h3 id="synth-verification-heading">Why a filled field still needs checking</h3>
    <p>The authors report <em>missing associations between different parts of papers</em>: an extraction can return content from a table while missing the information needed to interpret it elsewhere.</p>
    <dl className="synth-case-facts">
      <div><dt>Requested information</dt><dd>Which crops are in a paper.</dd></div>
      <div><dt>Reported automated output</dt><dd>Crop variety numbers from a table, rather than crop names.</dd></div>
      <div><dt>Evidence elsewhere</dt><dd>The method sections contained mappings between crop names and variety numbers.</dd></div>
    </dl>
    <p><strong>Our reading lesson:</strong> a non-empty answer may still be the wrong kind of information. Compare the returned identifiers with the method-section mappings before treating them as crop names; checking only for <em>Empty</em> would miss this mismatch.</p>
    <p className="synth-case-boundary">This is an author-reported failure of the automated baseline, not a documented correction by a SciDaSynth user. The case passage does not identify the underlying paper, actual variety numbers, or a corrected row. We do not reconstruct them or add them to the simulated table.</p>
    <details className="synth-case-evidence"><summary>Evidence and connection to SciDaSynth’s validation tools</summary>
      <p><PaperLink page={8}>Case Analyses of Automated LLM Baseline · third reason, crop example · p. 8</PaperLink></p>
      <p><PaperLink page={6}>§4.3.2 · Guided data validation and refinement, continued · p. 6; Figure 2 on p. 5</PaperLink> describes inspecting retrieved contexts, opening original PDF content or parsed figures and tables, and editing cells. Applying that checking process to this baseline case is our educational connection, not a reported outcome.</p>
      <p>Source-based paraphrases of Wang et al., SciDaSynth, arXiv v3 (2025). The reading lesson and this layout are ours. PDF links target pages rather than individual paragraphs.</p>
    </details>
  </section>
}

const steps = [{title:'Specify the information'}, {title:'Validate a record'}, {title:'Standardize variations'}, {title:'Keep and export'}]
const actions = [
  {id:'question',step:0,role:'user',label:'Specify the fields to extract',description:'Start with an included PDF collection.',thought:'For each included study, which crop was tested and how was it processed?',instruction:'The three example documents are already included. Use the prepared request to reveal the illustrative extraction table.'},
  {id:'table',step:0,role:'system',label:'Return structured records',description:'Organize the requested fields into a table.',instruction:'Read the same three records throughout this tutorial. Notice the missing processing value and the two names for a crop.'},
  {id:'check',step:1,role:'user',label:'Question a missing value',description:'Inspect the record before trusting the table.',thought:'Why is processing empty for Document B? I should check its source.',instruction:'Select the processing cell for Document B to inspect its example source and edit the value.'},
  {id:'evidence',step:1,role:'system',label:'Expose the supporting context',description:'Bring the value and its source together.',instruction:'The example source describes boiling. Enter a supported value and save it; the table and missing-value count will update.'},
  {id:'compare',step:2,role:'user',label:'Investigate two crop labels',description:'Decide whether these values belong together.',thought:'Does OFSP mean the same crop as orange-fleshed sweet potato in these records?',instruction:'Compare the two source notes below. Grouping is a proposal; the reader decides whether to apply it.'},
  {id:'standardize',step:2,role:'system',label:'Apply a consistent label',description:'Update a chosen group of records together.',instruction:'Choose the records to standardize, edit their shared label, and apply it. The table and unique-value count change together.'},
  {id:'review',step:3,role:'user',label:'Review the current result',description:'Decide which table is ready to keep.',thought:'Have I resolved the missing value and the naming difference before using these records?',instruction:'Review the current table. You can revisit any earlier step without losing your edits.'},
  {id:'export',step:3,role:'system',label:'Keep a table and export CSV',description:'Make the reviewed records reusable.',instruction:'Keep a snapshot, then download it as CSV. Revising the table invalidates the snapshot so an outdated version is not exported.'},
]
const initialRows = [
  {id:'A',crop:'OFSP',processing:'Steamed',source:'Orange-fleshed sweet potato (OFSP) roots were steamed before analysis.'},
  {id:'B',crop:'Orange-fleshed sweet potato',processing:'',source:'Orange-fleshed sweet potato roots were boiled before analysis.'},
  {id:'C',crop:'Maize',processing:'Milled',source:'Maize grain was milled before analysis.'},
]
export default function SciDaSynthTutorial({actionId,onAction,headingRef}) {
  const [selectedFeature, setSelectedFeature] = useState('extraction')
  const legacyRef = useRef(null)
  useEffect(() => { if (actionId !== 'question') legacyRef.current.open = true }, [actionId])
  const feature = capabilities.find(item => item.id === selectedFeature)
  function openWalkthrough() {
    legacyRef.current.open = true
    legacyRef.current.querySelector('summary').focus()
    legacyRef.current.scrollIntoView({ block: 'start' })
  }
  const [rows,setRows] = useState(initialRows)
  const [draft,setDraft] = useState('')
  const [label,setLabel] = useState('Orange-fleshed sweet potato')
  const [members,setMembers] = useState(['A','B'])
  const [snapshot,setSnapshot] = useState(null)
  const [message,setMessage] = useState('')
  const missing = rows.filter(r=>!r.processing.trim()).length
  const unique = new Set(rows.map(r=>r.crop)).size
  const show = actionId !== 'question'
  const evidence = actionId === 'evidence'
  const groups = ['compare','standardize'].includes(actionId)
  const output = ['review','export'].includes(actionId)
  function updateRows(next,notice) {setRows(next);setSnapshot(null);setMessage(notice)}
  function openEvidence() {setDraft(rows.find(r=>r.id==='B').processing);onAction('evidence');setMessage('')}
  function download() {
    const safe = (value) => `"${String(value).replaceAll('"','""')}"`
    const csv = [['Document','Crop','Processing'],...snapshot.map(r=>[`Example ${r.id}`,r.crop,r.processing])].map(row=>row.map(safe).join(',')).join('\r\n')
    const url = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}))
    const a = document.createElement('a');a.href=url;a.download='scidasynth-illustrative-records.csv';a.click()
    setTimeout(()=>URL.revokeObjectURL(url),1000);setMessage('CSV download requested for the kept snapshot. These are illustrative records, not research data.')
  }
  return <div className="scidasynth-how-it-works">
    <header className="visual-section-header synth-workflow-heading"><span className="visual-number">01</span><div><h3 id="synth-workflow-heading" tabIndex={-1} ref={headingRef}>How it works</h3><p>Choose a capability. Extraction is interactive; the other dedicated demonstrations are pending.</p></div></header>
    <CapabilityOverview selected={selectedFeature} onSelect={setSelectedFeature} />
    <section id="synth-feature-demo" className="selected-feature" aria-labelledby="synth-selected-feature-heading">
      <header className="selected-feature-heading"><div><p className="eyebrow">{selectedFeature === 'extraction' ? 'Selected feature · educational simulation' : 'Selected feature · dedicated demonstration pending'}</p><h4 id="synth-selected-feature-heading">{feature.title}</h4><p>{feature.question}</p></div><PaperLink page={feature.page}>§{feature.section} · p. {feature.page}</PaperLink></header>
      <div hidden={selectedFeature !== 'extraction'}><ExtractionDemo rows={rows} onOpenWalkthrough={openWalkthrough} /></div>
      {selectedFeature !== 'extraction' && <div className="synth-pending-feature"><p>{feature.description}</p><p>This dedicated demonstration is not implemented yet. The existing crop walkthrough remains available below.</p><button type="button" className="matrix-action" onClick={openWalkthrough}>Open existing crop walkthrough</button><details><summary>Current coverage and source location</summary><p>{feature.coverage}</p><p>§{feature.section} · PDF p. {feature.page}{selectedFeature === 'validation' && <>; context inspection and editing continue on <PaperLink page={6}>p. 6</PaperLink></>}. The cards’ previews are illustrative schematics, not additional working demonstrations.</p></details></div>}
    </section>
    <details className="synth-existing-case"><summary>Paper example · why a filled field still needs checking</summary><VerificationExample /></details>
    <details className="synth-legacy-walkthrough" ref={legacyRef}><summary>Existing crop walkthrough · editing, standardization, and CSV export</summary>
    <TutorialFrame name="SciDaSynth" title="Shared example · crop data extraction" steps={steps} actions={actions} actionId={actionId} onAction={(id)=>{if(id==='evidence'){openEvidence()}else{onAction(id);setMessage('')}}}
    onReset={()=>{setRows(initialRows);setDraft('');setLabel('Orange-fleshed sweet potato');setMembers(['A','B']);setSnapshot(null);setMessage('');onAction('question')}}
    attribution={<><p>Workflow and interactions are adapted from <a href={`${synthSource}#page=4`} target="_blank" rel="noopener noreferrer">Wang et al., SciDaSynth, arXiv v3 (2025) ↗</a>, §§4.1–4.3.4, PDF pp. 4–6.</p><p>The article’s nutrition setting and crop-name variation motivate this scenario. Documents A–C, passages, field values, and grouping below are invented teaching fixtures. They are not actual extracted results, author quotations, or evidence about a crop.</p><p>The original system supports uploaded PDFs, LLM extraction, quality metrics, source inspection, semantic plots, and repeated database merges. This tutorial demonstrates a fixed table with local editing and export; no model is run. The source panel uses a button instead of a context menu; a single snapshot stands in for the database.</p></>}
    note="Illustrative records and source passages · invented for this tutorial · edits stay in this browser view until you change paper or reload.">
    <p className="fixture-notice">Teaching example · Documents A–C and their source passages are invented.</p>
    <div className="extraction-request"><span className="example-section">Included collection · 3 example documents</span><p>Extract the <strong>crop</strong> and <strong>processing method</strong> for each document.</p><span className="field-chip">Crop</span><span className="field-chip">Processing</span>{!show&&<p><button type="button" className="matrix-action" onClick={()=>onAction('table')}>Show example extraction →</button></p>}</div>
    {show && <>
      <div className="table-metrics" aria-live="polite"><span><strong>{rows.length}</strong> records</span><span><strong>{missing}</strong> missing values</span><span><strong>{unique}</strong> unique crop labels</span></div>
      <table className="extraction-table"><caption>Current result · editable demonstration</caption><thead><tr><th scope="col">Document</th><th scope="col">Crop</th><th scope="col">Processing</th></tr></thead><tbody>{rows.map(r=><tr key={r.id} className={groups&&members.includes(r.id)?'grouped-record':''}><th scope="row">Example {r.id}</th><td>{r.crop}</td><td>{r.id==='B'?<button type="button" className={`cell-inspect ${!r.processing?'missing-value':''}`} aria-label={`Inspect Document B processing: ${r.processing||'Empty'}`} onClick={openEvidence}>{r.processing||'Empty'} <span aria-hidden="true">↗</span></button>:r.processing}</td></tr>)}</tbody></table>
      {missing>0 && <p className="validation-note">Empty marks a missing extraction, not proof that the original document omits the information.</p>}
      {actionId==='check'&&<button type="button" className="matrix-action" onClick={openEvidence}>Inspect Document B’s source →</button>}
      {evidence&&<section className="source-editor" aria-label="Document B source and correction"><span className="example-section">Example B · invented source passage</span><blockquote>Orange-fleshed sweet potato roots were <mark>boiled</mark> before analysis.</blockquote><form onSubmit={e=>{e.preventDefault();updateRows(rows.map(r=>r.id==='B'?{...r,processing:draft.trim()}:r),draft.trim()?'Document B updated. Review the new value in the table.':'Value cleared; Document B is marked Empty again.')}}><label htmlFor="processing-value">Processing value for Document B</label><div className="inline-edit"><input id="processing-value" value={draft} maxLength={100} placeholder="e.g., Boiled" onChange={e=>setDraft(e.target.value)}/><button type="submit" className="matrix-action">Save value</button></div></form><p>The source is the basis for the correction. A quality alert alone would not tell us the right value.</p></section>}
      {groups&&<section className="standardization-panel" aria-label="Crop standardization"><h5>Proposed group · crop names</h5><p>Read the example evidence, then choose which records share a label.</p><div className="group-evidence">{initialRows.slice(0,2).map(r=><p key={r.id}><strong>Example {r.id}</strong> · {r.source}</p>)}</div><fieldset><legend>Records to standardize</legend>{rows.slice(0,2).map(r=><label key={r.id}><input type="checkbox" checked={members.includes(r.id)} onChange={e=>setMembers(e.target.checked?[...members,r.id]:members.filter(id=>id!==r.id))}/>Example {r.id}: {r.crop}</label>)}</fieldset><p className="separate-group">Separate group: Example C · Maize</p><form onSubmit={e=>{e.preventDefault();updateRows(rows.map(r=>members.includes(r.id)?{...r,crop:label.trim()}:r),`Applied the shared label to ${members.length} selected record${members.length===1?'':'s'}.`)}}><label htmlFor="crop-label">Shared label</label><div className="inline-edit"><input id="crop-label" value={label} maxLength={100} onChange={e=>setLabel(e.target.value)}/><button type="submit" className="matrix-action" disabled={!members.length||!label.trim()}>Apply to {members.length} records</button></div></form></section>}
      {output&&<section className="export-panel" aria-label="Keep and export table"><h5>Review → keep → export</h5><p>{missing?`${missing} value is still missing. You can return to validation or keep a table with that gap.`:'No empty processing cells remain. This only checks completeness, not correctness.'}</p><p>Current crop labels: {unique}. Check whether the distinctions are intentional before exporting.</p><div className="example-options"><button type="button" onClick={openEvidence}>Revisit validation</button><button type="button" onClick={()=>onAction('standardize')}>Revisit crop labels</button></div><div className="example-options"><button type="button" onClick={()=>{setSnapshot(rows.map(r=>({...r})));setMessage('Kept a snapshot of all three current records in this tutorial.')}}>Keep current table</button><button type="button" disabled={!snapshot} onClick={download}>Download CSV</button></div><p className="demo-status">{snapshot?'Snapshot ready · 3 records.':'Keep the current table to enable download.'}</p></section>}
    </>}
    <p className="demo-status" role="status">{message}</p>
  </TutorialFrame>
    </details>
  </div>
}
