import { useState } from 'react'
import TutorialFrame from './TutorialFrame'
import { synthSource } from './data/visualModels'
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
  return <TutorialFrame name="SciDaSynth" title="Shared example · crop data extraction" steps={steps} actions={actions} actionId={actionId} onAction={(id)=>{if(id==='evidence'){openEvidence()}else{onAction(id);setMessage('')}}} headingRef={headingRef}
    onReset={()=>{setRows(initialRows);setDraft('');setLabel('Orange-fleshed sweet potato');setMembers(['A','B']);setSnapshot(null);setMessage('');onAction('question')}}
    attribution={<><p>Workflow and interactions are adapted from <a href={synthSource} target="_blank" rel="noopener noreferrer">Wang et al., SciDaSynth (2025) ↗</a>, System: Workflow, Guided Data Validation, Standardization, and Iterative Table Editing (CC BY 3.0).</p><p>The article’s nutrition setting and crop-name variation motivate this scenario. Documents A–C, passages, field values, and grouping below are invented teaching fixtures. They are not actual extracted results, author quotations, or evidence about a crop.</p><p>The original system supports uploaded PDFs, LLM extraction, quality metrics, source inspection, semantic plots, and repeated database merges. This tutorial demonstrates a fixed table with local editing and export; no model is run. The source panel uses a button instead of a context menu; a single snapshot stands in for the database.</p></>}
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
}
