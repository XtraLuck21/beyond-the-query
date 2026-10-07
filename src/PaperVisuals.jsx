import { useRef, useState } from 'react'
import { papers } from './data/papers'
import { observations, problems, designs, visualNodes, rationalePaths, visualSource, getRelatedPaths } from './data/paperVisuals'
import PaperTutorial from './PaperTutorial'
import './PaperVisuals.css'

function Source({ section }) {
  return <a className="pv-source" href={visualSource} target="_blank" rel="noopener noreferrer">Source: {section} ↗<span className="sr-only"> (opens the article in a new tab)</span></a>
}

function MotivationMap({ onShowExample }) {
  const mapNodes = [
    ...observations.map((node, index) => ({ ...node, y: 90 + index * 170, height: 140 })),
    ...problems.map((node, index) => ({ ...node, y: 90 + index * 170, height: 140 })),
    ...designs.map((node, index) => ({ ...node, y: 90 + index * 295, height: 230 })),
  ]
  const [selectedId, setSelectedId] = useState(null)
  const buttons = useRef({})
  const selectedNode = visualNodes.find((node) => node.id === selectedId)
  const relatedPaths = getRelatedPaths(selectedId)
  const relatedIds = new Set(relatedPaths.flatMap((path) => [path.observation, path.problem, path.design]))
  const relatedObservations = observations.filter((node) => relatedIds.has(node.id))
  const relatedDesigns = designs.filter((node) => relatedIds.has(node.id))
  const edges = [...new Map(rationalePaths.flatMap((path) => [[path.observation, path.problem], [path.problem, path.design]]).map(([from, to]) => [`${from}-${to}`, { from, to }])).values()]
  const activeEdges = new Set(relatedPaths.flatMap((path) => [`${path.observation}-${path.problem}`, `${path.problem}-${path.design}`]))
  const closeDetails = () => { buttons.current[selectedId]?.focus(); setSelectedId(null) }
  const selectNode = (id) => setSelectedId(selectedId === id ? null : id)
  const selectedTitle = selectedId === 'tension' ? 'Enough context, without covering the paper' : selectedNode?.title

  return <section className="visual-section" aria-labelledby="motivation-heading">
    <header className="visual-section-header"><span className="visual-number">02</span><div><h3 id="motivation-heading">From observations to design</h3><p>Seven design motivations, connected to all four interface feature families.</p></div></header>
    <p className="map-guide">Select any observation, motivation, or design to highlight its related information and read the source-backed explanation below the map. Select it again to return to the full map.</p>
    <div className="map-coverage"><strong>All 7 motivations · all 4 feature families</strong><span>O1–O7 = our evidence summaries · M1–M7 = the paper’s design motivations · D1–D4 = its four feature families.</span><span>M7 draws on prior research about imperfect automation; it is not a pilot-study observation.</span></div>
    <div className="visual-scroll" role="region" aria-label="Observation problem design map" tabIndex={0}>
      <div className="motivation-canvas">
        <div className="map-column-title observations-title"><strong>01 / Observations & basis</strong><span>Reader feedback or prior research</span></div>
        <div className="map-column-title problems-title"><strong>02 / Design motivations</strong><span>Problems and needs · original M1–M7</span></div>
        <div className="map-column-title designs-title"><strong>03 / Design responses</strong><span>How the interface responds</span></div>
        <svg className="map-lines" viewBox="0 0 1050 1280" aria-hidden="true">
          <defs><marker id="motivation-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="context-stroke" /></marker></defs>
          {edges.map(({ from, to }) => {
            const a = mapNodes.find((node) => node.id === from)
            const b = mapNodes.find((node) => node.id === to)
            const x1 = a.type === 'observation' ? 290 : 660
            const x2 = b.type === 'problem' ? 385 : 755
            return <path key={`${from}-${to}`} className={selectedId && !activeEdges.has(`${from}-${to}`) ? 'unfocused-edge' : 'active-edge'} d={`M ${x1} ${a.y + a.height / 2} C ${x1 + 40} ${a.y + a.height / 2}, ${x2 - 40} ${b.y + b.height / 2}, ${x2} ${b.y + b.height / 2}`} />
          })}
        </svg>
        {mapNodes.map((node) => <div key={node.id} className={`map-node-wrapper wrapper-${node.type}`} style={{ top: node.y, height: node.height, left: node.type === 'observation' ? 20 : node.type === 'problem' ? 390 : 760 }}><button ref={(element) => { buttons.current[node.id] = element }} type="button" className={`map-node map-${node.type} ${selectedId ? relatedIds.has(node.id) ? 'is-related' : 'is-muted' : ''}`} aria-pressed={selectedId === node.id} aria-controls="motivation-detail" onClick={() => selectNode(node.id)}>
          <span className="node-meta">{node.code} · {node.group}</span>
          <strong>{node.title}</strong><span className="node-summary">{node.short}</span>
          {node.features && <span className="node-features">{node.features.map((feature) => <span key={feature}>{feature}</span>)}</span>}
        </button></div>)}
      </div>
    </div>
    <button type="button" className="tension-bridge" ref={(element) => { buttons.current.tension = element }} aria-pressed={selectedId === 'tension'} aria-controls="motivation-detail" onClick={() => selectNode('tension')}><span className="tension-label">Why not show all the context at once?</span><strong>M5 · Keep the paper visible <span aria-hidden="true">↔</span> M2 · Provide enough context</strong><span>Select to trace the shared design responses to these two needs.</span></button>
    <p className="visual-caption">Source-based synthesis of all seven design motivations and four feature families in §§3.3–4.4. Lines express design rationale, not independently measured causal effects. The observations and connections are paraphrased for this map.</p>
    <div id="motivation-detail">
      {selectedId && <section className="motivation-detail" aria-label="Selected design rationale">
        <header className="detail-heading"><div><p className="eyebrow">{selectedNode ? `${selectedNode.code} · ${selectedNode.type === 'problem' ? 'design motivation' : selectedNode.type}` : 'Design trade-off'}</p><h4>{selectedTitle}</h4></div><button type="button" className="matrix-action" onClick={closeDetails}>Back to overview</button></header>
        <p className="detail-intro">{selectedId === 'tension' ? 'The paper describes a balance: a compact initial definition leaves the reading area visible, while links and optional lists provide more context when the reader requests it. We connect these needs as a design trade-off, not as a measured causal relationship between problems.' : selectedNode.detail || selectedNode.short}</p>{selectedNode && <Source section={selectedNode.section} />}
        <div className="rationale-detail-columns">
          <div><h5>Observations and research basis</h5>{relatedObservations.map((node) => <article className="observation-record" key={node.id}><span>{node.code} · {node.group}</span><h6>{node.title}</h6><p>{node.detail}</p><Source section={node.section} /></article>)}</div>
          <div><h5>Why these designs are connected</h5><ul className="rationale-list">{relatedPaths.map((path) => <li key={`${path.problem}-${path.design}`}><strong>{problems.find((node) => node.id === path.problem).code} → {designs.find((node) => node.id === path.design).code}</strong><p>{path.reason}</p><Source section={path.section} /></li>)}</ul></div>
        </div>
        <div className="design-examples"><h5>Concrete interface mechanisms</h5>{relatedDesigns.map((node) => <article className="design-example" key={node.id}><strong>{node.code} · {node.title}</strong><p>{node.detail}</p><ul>{node.mechanisms.map((mechanism) => <li key={mechanism}>{mechanism}</li>)}</ul><Source section={node.section} />{node.tutorialAction && <p><button type="button" className="matrix-action" onClick={() => onShowExample(node.tutorialAction)}>See the tooltip in the shared tutorial ↑</button></p>}</article>)}</div>
      </section>}
    </div>
  </section>
}

export default function PaperVisuals() {
  const [tutorialAction, setTutorialAction] = useState('select')
  const tutorialHeading = useRef(null)
  const showExample = (action) => {
    setTutorialAction(action)
    tutorialHeading.current?.focus({ preventScroll: true })
    tutorialHeading.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
  }
  const paper = papers.find((item) => item.id === 'scholarphi')
  return <section className="paper-visuals" aria-labelledby="visuals-heading">
    <div className="visual-intro"><p className="eyebrow">Visual exploration · ScholarPhi</p><h2 id="visuals-heading">See how the paper fits together.</h2><p className="visual-paper-title">{paper.title}</p><p>Explore the reading experience, then trace the observations behind the design.</p></div>
    <PaperTutorial actionId={tutorialAction} onAction={setTutorialAction} headingRef={tutorialHeading} /><MotivationMap onShowExample={showExample} />
  </section>
}
