import { useRef, useState } from 'react'
import TutorialFrame from './TutorialFrame'
import { scimSource } from './data/visualModels'

const facets = ['Objective', 'Novelty', 'Method', 'Result']
const steps = [{title: 'Orient your reading'}, {title: 'Tune the highlights'}, {title: 'Return to context'}]
const actions = [
  {id:'orient',step:0,role:'user',label:'Choose what to look for',description:'Begin with the paper and a reading goal.',thought:'I want to understand the contribution and how this system works.',instruction:'The paper remains readable before assistance appears. Reveal the four content types to start skimming.'},
  {id:'highlight',step:0,role:'system',label:'Show four kinds of content',description:'Add Objective, Novelty, Method, and Result cues.',instruction:'Colors label the kind of content. The text stays in place; highlighted text is a cue to inspect, not a replacement for reading.'},
  {id:'adjust',step:1,role:'user',label:'Ask for a different balance',description:'Choose more methods or fewer results.',thought:'I need more detail on the method, and less emphasis on results for now.',instruction:'Try the Method slider or turn Result off. Highlight counts and passage colors update together. Step 3 shows the matching passage list.'},
  {id:'density',step:1,role:'system',label:'Update coverage and density',description:'Respond to global and paragraph-level controls.',instruction:'Move a facet slider, or use More / Fewer in a paragraph. The controls change the current example, not a second copy of it.'},
  {id:'browse',step:2,role:'user',label:'Find a passage worth reading',description:'Browse highlights grouped by section.',thought:'This method passage looks useful. What does the surrounding paragraph say?',instruction:'Select a passage in the highlight browser. You will return to its location in the shared paper above.'},
  {id:'context',step:2,role:'system',label:'Locate it in the paper',description:'Connect the selected highlight with surrounding text.',instruction:'The outlined sentence is the current reading location. Select another browser entry to change location; surrounding text is preserved.'},
]
const sentences = [
  {id:'s1',section:'Introduction',facet:'Objective',rank:1,text:'Scim aims to help readers skim scientific papers while keeping their familiar reading habits.'},
  {id:'s2',section:'Introduction',facet:'Novelty',rank:1,text:'Its interface combines faceted highlights with controls over their amount and a browser linked to source passages.'},
  {id:'s3',section:'Design and implementation',facet:'Method',rank:1,text:'The design draws on formative interviews and feedback from early prototypes.'},
  {id:'s4',section:'Design and implementation',facet:'Method',rank:2,text:'Sentence classification assigns content categories, and postprocessing helps choose and distribute highlights.'},
  {id:'s5',section:'Design and implementation',facet:'Novelty',rank:2,text:'Readers can change the density of an entire facet or request more highlights within a paragraph.'},
  {id:'s6',section:'Evaluation',facet:'Result',rank:1,text:'Diary-study feedback described highlights as useful for locating information in text-dense passages.'},
]
const initialDensity = {Objective:1, Novelty:1, Method:1, Result:1}
export default function ScimTutorial({actionId,onAction,headingRef}) {
  const [density,setDensity] = useState(initialDensity)
  const [local,setLocal] = useState({})
  const [focused,setFocused] = useState('s3')
  const sentenceRefs = useRef({})
  const show = actionId !== 'orient'
  const showControls = !['orient','highlight'].includes(actionId)
  const showBrowser = ['browse','context'].includes(actionId)
  const isHighlighted = (s) => show && density[s.facet] > 0 && s.rank <= Math.min(2, Math.max(0, density[s.facet] + (local[s.section] || 0)))
  const highlighted = sentences.filter(isHighlighted)
  const sections = [...new Set(sentences.map((s) => s.section))]
  function locate(id) {
    setFocused(id); onAction('context')
    requestAnimationFrame(() => { sentenceRefs.current[id]?.focus({preventScroll:true}); sentenceRefs.current[id]?.scrollIntoView({block:'nearest',behavior:'smooth'}) })
  }
  return <TutorialFrame name="Scim" title="Shared example · skimming the Scim paper" steps={steps} actions={actions} actionId={actionId} onAction={onAction} headingRef={headingRef}
    onReset={() => {setDensity(initialDensity); setLocal({});setFocused('s3');onAction('orient')}}
    attribution={<><p>Content above is our paraphrase of <a href={scimSource} target="_blank" rel="noopener noreferrer">Fok et al., Scim ↗</a>, §§3–5 and §7.2 (CC BY 4.0). These six sentences and their facet labels are curated for teaching, not classifier output or an excerpt of the original PDF.</p><p>Interactions follow §§4.2–4.5. Sliders use only three levels here; paragraph controls stay visible; the location strip replaces the original scrollbar annotations. Only six sample passages are represented.</p></>}
    note="Simplified interactive tutorial · curated passages and labels · no live classification.">
    {show && <div className="facet-legend" aria-label="Facet color legend">{facets.map((f)=><span key={f} className={`facet-tag facet-${f.toLowerCase()}`}>{f}</span>)}</div>}
    {showControls && <fieldset className="density-controls"><legend>Highlight density per facet</legend>{facets.map((f)=><label key={f}><span>{f}</span><input type="range" aria-label={`${f} density`} min="0" max="2" step="1" value={density[f]} onChange={(e)=>setDensity({...density,[f]:Number(e.target.value)})}/><span>{['Off','Some','More'][density[f]]}</span></label>)}</fieldset>}
    {show && <p className="demo-status" role="status">{highlighted.length} of {sentences.length} sample passages highlighted</p>}
    <div className="skim-document"><div className="skim-prose">{sections.map((section)=><section key={section} className="skim-section"><h5>{section}</h5><p>{sentences.filter(s=>s.section===section).map(s=><span key={s.id} ref={el=>{sentenceRefs.current[s.id]=el}} tabIndex={-1} className={`skim-sentence ${isHighlighted(s)?`facet-${s.facet.toLowerCase()}`:''} ${actionId==='context' && focused===s.id?'located-sentence':''}`}><span className="sr-only">{isHighlighted(s)?`${s.facet}: `:''}</span>{s.text}{' '}</span>)}</p>{showControls && <div className="paragraph-controls"><span>Paragraph highlights</span><button type="button" aria-label={`Fewer highlights in ${section}`} disabled={(local[section]||0)<=-2 || !sentences.some(s=>s.section===section && isHighlighted(s))} onClick={()=>setLocal({...local,[section]:(local[section]||0)-1})}>− Fewer</button><button type="button" aria-label={`More highlights in ${section}`} disabled={(local[section]||0)>=1 || !sentences.some(s=>s.section===section && density[s.facet]>0 && !isHighlighted(s))} onClick={()=>setLocal({...local,[section]:(local[section]||0)+1})}>+ More</button></div>}</section>)}</div>
    {show && <div className="location-strip" aria-label="Highlight locations in this example">{sentences.map(s=><span key={s.id} className={isHighlighted(s)?`facet-${s.facet.toLowerCase()}`:''} title={isHighlighted(s)?`${s.section} · ${s.facet}`:'Not highlighted'}/>)}</div>}</div>
    {actionId==='orient' && <button type="button" className="matrix-action" onClick={()=>onAction('highlight')}>Reveal facet highlights →</button>}
    {showBrowser && <section className="highlight-browser" aria-label="Highlight browser"><h5>Highlight browser</h5><p>Select a passage to find it in context above.</p>{!highlighted.length && <p>No highlighted passages. Increase a facet’s density or its paragraph’s coverage to bring entries back.</p>}{sections.filter(section=>highlighted.some(s=>s.section===section)).map(section=><div key={section}><h6>{section}</h6>{highlighted.filter(s=>s.section===section).map(s=><button type="button" key={s.id} aria-pressed={actionId==='context'&&focused===s.id} onClick={()=>locate(s.id)}><span className={`facet-tag facet-${s.facet.toLowerCase()}`}>{s.facet}</span><span>{s.text}</span></button>)}</div>)}</section>}
  </TutorialFrame>
}
