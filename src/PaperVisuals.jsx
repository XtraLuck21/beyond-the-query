import PaperContext from './PaperContext'
import { useEffect, useRef, useState } from 'react'
import { visualModels } from './data/visualModels'
import ScimTutorial from './ScimTutorial'
import SciDaSynthTutorial from './SciDaSynthTutorial'
import SciDaSynthSources from './SciDaSynthSources'
import SciDaSynthPipeline from './SciDaSynthPipeline'
import SciDaSynthEvaluation from './SciDaSynthEvaluation'
import ScholarPhiTutorial from './ScholarPhiTutorial'
import ScholarPhiEvaluation from './ScholarPhiEvaluation'
import ScholarPhiPipeline from './ScholarPhiPipeline'
import ScimPipeline from './ScimPipeline'
import ScimEvaluation from './ScimEvaluation'
import ScholarPhiExtraWork from './ScholarPhiExtraWork'
import ScimRelatedWork from './ScimRelatedWork'
import './PaperVisuals.css'
import { ScimRationaleOverview, ScimReferencePanels } from './ScimRationale'

function Source({ section, href }) {
  return <a className="pv-source" href={href} target="_blank" rel="noopener noreferrer">Source: {section} ↗<span className="sr-only"> (opens the article in a new tab)</span></a>
}

function RationaleSources({ item, model }) {
  if (!item.sources) return <Source href={model.source} section={item.section} />
  return <div className="rationale-sources">{item.sources.map(source => <Source key={`${source.href}-${source.section}`} href={source.href} section={source.section} />)}</div>
}

function MotivationMap({ model, onShowExample }) {
  const { observations, problems, designs, visualNodes, rationalePaths, mapEdges } = model
  const mapColumns = [
    { title: '01 / Observations & basis', subtitle: 'Reader feedback or prior research', nodes: observations },
    { title: '02 / Design motivations', subtitle: model.goalSubtitle, nodes: problems },
    { title: '03 / Design responses', subtitle: 'How the interface responds', nodes: designs },
  ]
  const canvasRef = useRef(null)
  const [lines, setLines] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const buttons = useRef({})
  useEffect(() => {
    const canvas = canvasRef.current
    let frame
    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const bounds = canvas.getBoundingClientRect()
        if (!bounds.width) return
        const next = mapEdges.map(({ from, to, provenance }) => {
          const a = buttons.current[from].getBoundingClientRect()
          const b = buttons.current[to].getBoundingClientRect()
          const x1 = a.right - bounds.left
          const x2 = b.left - bounds.left
          const y1 = a.top + a.height / 2 - bounds.top
          const y2 = b.top + b.height / 2 - bounds.top
          const bend = (x2 - x1) / 2
          return { id: `${from}-${to}`, provenance, d: `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}` }
        })
        setLines((previous) => JSON.stringify(previous) === JSON.stringify(next) ? previous : next)
      })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(canvas)
    visualNodes.forEach((node) => observer.observe(buttons.current[node.id]))
    measure()
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [mapEdges, visualNodes])
  const selectedNode = visualNodes.find((node) => node.id === selectedId)
  const relatedPaths = !selectedId ? rationalePaths : rationalePaths.filter((path) => selectedId === 'tension' ? ['p2', 'p5'].includes(path.problem) : [path.observation, path.problem, path.design].includes(selectedId))
  const relatedIds = new Set(relatedPaths.flatMap((path) => [path.observation, path.problem, path.design]))
  const relatedObservations = observations.filter((node) => relatedIds.has(node.id))
  const relatedDesigns = designs.filter((node) => relatedIds.has(node.id))

  const activeEdges = new Set(relatedPaths.flatMap((path) => [`${path.observation}-${path.problem}`, `${path.problem}-${path.design}`]))
  const closeDetails = () => { buttons.current[selectedId]?.focus(); setSelectedId(null) }
  const selectNode = (id) => setSelectedId(selectedId === id ? null : id)
  const selectedTitle = selectedId === 'tension' ? 'Enough context, without covering the paper' : selectedNode?.title

  return <section className={`visual-section ${model.hasRationaleEvidence ? 'scim-rationale' : ''}`} aria-labelledby="motivation-heading">
    <header className="visual-section-header"><span className="visual-number">02</span><div><h3 id="motivation-heading" tabIndex={-1}>Design rationale</h3><p>{model.introduction}</p></div></header>
    {model.hasRationaleEvidence && <ScimRationaleOverview />}
    <p className="map-guide">Select any observation, motivation, or design to highlight its related information and read the source-backed explanation below the map. Select it again to return to the full map.</p>
    <div className="map-coverage"><strong>{model.coverage}</strong><span>{model.legend}</span><span>{model.qualification}</span></div>
    {model.hasRationaleEvidence && <div className="scim-edge-legend"><span><i className="scim-line-key" aria-hidden="true" />Reported observation basis / author-explicit goal–feature link</span><span><i className="scim-line-key inferred" aria-hidden="true" />Our inferred goal–feature link</span></div>}
    <div className="visual-scroll" role="region" aria-label="Observation problem design map" tabIndex={0}>
      <div className="motivation-canvas" ref={canvasRef}>
        <svg className="map-lines" aria-hidden="true">
          <defs><marker id="motivation-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="context-stroke" /></marker></defs>
          {lines.map((line) => <path key={line.id} className={`${selectedId && !activeEdges.has(line.id) ? 'unfocused-edge' : 'active-edge'} ${line.provenance === 'inferred' ? 'relationship-inferred' : ''}`} d={line.d} />)}
        </svg>
        {mapColumns.map((column) => <div className="map-column" key={column.title}>
          <div className="map-column-title"><strong>{column.title}</strong><span>{column.subtitle}</span></div>
          <div className="map-column-nodes">{column.nodes.map((node) => <button key={node.id} ref={(element) => { buttons.current[node.id] = element }} type="button" className={`map-node map-${node.type} ${selectedId ? relatedIds.has(node.id) ? 'is-related' : 'is-muted' : ''}`} aria-pressed={selectedId === node.id} aria-controls="motivation-detail" onClick={() => selectNode(node.id)}>
            <span className="node-meta">{node.code} · {node.group}</span>
            <strong>{node.title}</strong><span className="node-summary">{node.short}</span>
            {node.features && <span className="node-features">{node.features.map((feature) => <span key={feature}>{feature}</span>)}</span>}
            <span className="compact-connections">Connected to: {mapEdges.filter((edge) => edge.from === node.id || edge.to === node.id).map((edge) => `${visualNodes.find((item) => item.id === (edge.from === node.id ? edge.to : edge.from)).code}${edge.provenance === 'inferred' ? ' (our interpretation)' : ''}`).join(', ')}</span>
          </button>)}</div>
        </div>)}
      </div>
    </div>
    {model.tension && <button type="button" className="tension-bridge" ref={(element) => { buttons.current.tension = element }} aria-pressed={selectedId === 'tension'} aria-controls="motivation-detail" onClick={() => selectNode('tension')}><span className="tension-label">Why not show all the context at once?</span><strong>M5 · Keep the paper visible <span aria-hidden="true">↔</span> M2 · Provide enough context</strong><span>Select to trace the shared design responses to these two needs.</span></button>}
    <p className="visual-caption">{model.caption} <Source href={model.source} section="Read the source paper" /></p>
    <div id="motivation-detail">
      {selectedId && <section className="motivation-detail" aria-label="Selected design rationale">
        <header className="detail-heading"><div><p className="eyebrow">{selectedNode ? `${selectedNode.code} · ${selectedNode.type === 'problem' ? 'design motivation' : selectedNode.type}` : 'Design trade-off'}</p><h4>{selectedTitle}</h4></div><button type="button" className="matrix-action" onClick={closeDetails}>Back to overview</button></header>
        <p className="detail-intro">{selectedId === 'tension' ? 'The paper describes a balance: a compact initial definition leaves the reading area visible, while links and optional lists provide more context when the reader requests it. We connect these needs as a design trade-off, not as a measured causal relationship between problems.' : selectedNode.detail || selectedNode.short}</p>{selectedNode && <RationaleSources item={selectedNode} model={model} />}
        {model.name === 'ScholarPhi' && ['o7', 'p7'].includes(selectedId) && <details className="equation-reference-disclosure">
          <summary>Reference · Human–AI Interaction Guidelines</summary>
          <div className="equation-reference"><PaperContext contextId="guidelines" /></div>
        </details>}
        {model.hasRationaleEvidence && <ScimReferencePanels key={selectedId} selectedId={selectedId} />}
        <div className="rationale-detail-columns">
          <div><h5>Observations and research basis</h5>{relatedObservations.map((node) => <article className="observation-record" key={node.id}><span>{node.code} · {node.group}</span><h6>{node.title}</h6><p>{node.detail}</p>{node.evidenceNote && <details className="scim-evidence-note"><summary>Evidence context</summary><p>{node.evidenceNote}</p><p className="scim-evidence-locator">{node.locator}</p></details>}<RationaleSources item={node} model={model} /></article>)}</div>
          <div><h5>Why these designs are connected</h5><ul className="rationale-list">{relatedPaths.map((path) => <li key={`${path.observation}-${path.problem}-${path.design}`}><strong>{problems.find((node) => node.id === path.problem).code} → {designs.find((node) => node.id === path.design).code}</strong>{path.provenance && <span className={`scim-provenance ${path.provenance}`}>{path.provenance === 'explicit' ? 'Author-explicit relationship' : 'Our interpretation'}</span>}<p>{path.reason}</p>{path.evidence && <p className="scim-evidence-note">{path.evidence}</p>}<RationaleSources item={path} model={model} /></li>)}</ul></div>
        </div>
        <div className="design-examples"><h5>Concrete interface mechanisms</h5>{relatedDesigns.map((node) => <article className="design-example" key={node.id}><strong>{node.code} · {node.title}</strong><p>{node.detail}</p><ul>{node.mechanisms.map((mechanism) => <li key={mechanism}>{mechanism}</li>)}</ul><RationaleSources item={node} model={model} />{node.tutorialAction && <p><button type="button" className="matrix-action" onClick={() => onShowExample(node.tutorialAction)}>Open interactive example</button></p>}</article>)}</div>
      </section>}
    </div>
  </section>
}

export default function PaperVisuals({ paperId, activeSection, onSectionChange }) {
  const model = visualModels[paperId]
  const Tutorial = { scholarphi: ScholarPhiTutorial, scim: ScimTutorial, scidasynth: SciDaSynthTutorial }[paperId]
  const [tutorialAction, setTutorialAction] = useState(model.initialAction)
  const tutorialHeading = useRef(null)
  const showExample = (action) => {
    setTutorialAction(action)
    onSectionChange('workflow')
    requestAnimationFrame(() => tutorialHeading.current?.focus())
  }
  return <div className="paper-visuals">
    {paperId === 'scidasynth' && <div id="paper-panel-sources" role="tabpanel" aria-labelledby="paper-tab-sources" hidden={activeSection !== 'sources'} tabIndex={0}>
      <SciDaSynthSources />
    </div>}
    <div id="paper-panel-workflow" role="tabpanel" aria-labelledby="paper-tab-workflow" hidden={activeSection !== 'workflow'} tabIndex={0}>
      <Tutorial actionId={tutorialAction} onAction={setTutorialAction} headingRef={tutorialHeading} />
    </div>
    {['scholarphi', 'scim', 'scidasynth'].includes(paperId) && <div id="paper-panel-pipeline" role="tabpanel" aria-labelledby="paper-tab-pipeline" hidden={activeSection !== 'pipeline'} tabIndex={0}>
      {paperId === 'scidasynth' ? <SciDaSynthPipeline /> : paperId === 'scim' ? <ScimPipeline /> : <ScholarPhiPipeline active={activeSection === 'pipeline'} />}
    </div>}
    <div id="paper-panel-rationale" role="tabpanel" aria-labelledby="paper-tab-rationale" hidden={activeSection !== 'rationale'} tabIndex={0}>
      <MotivationMap model={model} onShowExample={showExample} />
    </div>
    {['scholarphi', 'scim', 'scidasynth'].includes(paperId) && <div id="paper-panel-evaluation" role="tabpanel" aria-labelledby="paper-tab-evaluation" hidden={activeSection !== 'evaluation'} tabIndex={0}>
      {paperId === 'scidasynth' ? <SciDaSynthEvaluation /> : paperId === 'scim' ? <ScimEvaluation /> : <ScholarPhiEvaluation onShowExample={showExample} />}
    </div>}
    {['scholarphi', 'scim'].includes(paperId) && <div id="paper-panel-extra-work" role="tabpanel" aria-labelledby="paper-tab-extra-work" hidden={activeSection !== 'extra-work'} tabIndex={0}>
      {paperId === 'scim' ? <ScimRelatedWork /> : <ScholarPhiExtraWork />}
    </div>}
  </div>
}
