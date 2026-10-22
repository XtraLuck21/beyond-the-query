import { useEffect, useId, useRef, useState } from 'react'
import { sciDaSynthPipeline as model } from './data/sciDaSynthPipeline'
import './SciDaSynthPipeline.css'

// A curated view of existing edges, not a second dependency model.
// Every other edge remains available in the full connection list.
const visibleEdges = {
  preprocessing: ['documents-parse', 'parse-parsed', 'parsed-prepare', 'prepare-prepared', 'parsed-index', 'prepared-index', 'index-store'],
  generation: ['request-retrieve', 'request-schema', 'store-retrieve', 'retrieve-contexts', 'schema-structure', 'request-generate', 'contexts-generate', 'structure-generate', 'generate-table', 'generated-assess', 'assess-signals'],
  refinement: ['table-inspect', 'inspect-table', 'table-standardize', 'attributes-standardize', 'standardize-table', 'standardize-groups'],
  output: ['table-accumulate', 'database-accumulate', 'accumulate-database', 'accumulate-request', 'accumulate-csv'],
}
const edgeById = Object.fromEntries(model.edges.map(edge => [edge.id, edge]))
const endpoint = id => model.nodes[id] || model.artifacts[id]
const responsibility = { automated: 'Automated', 'human-directed': 'Human-directed' }

// Coordinates organize a diagram, not a runtime schedule. Every rendered arrow
// is an existing model edge; repeated artifacts are handoffs between phase views.
const layouts = {
  preprocessing: { documents: [1, 1], parse: [2, 1], parsed: [3, 1], prepare: [3, 2], prepared: [4, 2], index: [4, 1], 'retrieval-index': [5, 1] },
  generation: { 'retrieval-index': [1, 1], request: [1, 2], retrieve: [2, 1], contexts: [3, 1], schema: [2, 3], structure: [3, 3], generate: [4, 2], 'current-table': [5, 2], assess: [4, 3], signals: [5, 3] },
  refinement: { 'current-table': [2, 1], attributes: [3, 1], inspect: [1, 2], standardize: [3, 2], groups: [3, 3] },
  output: { request: [1, 1], 'current-table': [1, 2], accumulate: [2, 2], 'accumulated-database': [3, 1], csv: [3, 3] },
}

function PhaseDiagram({ group, selected, detailId, onSelect, registerNode, prefix }) {
  const canvas = useRef(null)
  const elements = useRef({})
  const [paths, setPaths] = useState([])
  const edges = visibleEdges[group.id].map(id => edgeById[id])
  const marker = `${prefix}-arrow-${group.id}`
  useEffect(() => {
    const diagram = canvas.current
    let frame
    let disposed = false
    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (disposed) return
        const bounds = diagram.getBoundingClientRect()
        if (!bounds.width || !bounds.height) return
        const next = visibleEdges[group.id].map(id => {
          const edge = edgeById[id]
          const a = elements.current[edge.from].getBoundingClientRect()
          const b = elements.current[edge.to].getBoundingClientRect()
          const dx = b.left + b.width / 2 - a.left - a.width / 2
          const dy = b.top + b.height / 2 - a.top - a.height / 2
          const paired = visibleEdges[group.id].some(other => edgeById[other].from === edge.to && edgeById[other].to === edge.from)
          let d
          if (Math.abs(dx) >= Math.abs(dy)) {
            const direction = dx >= 0 ? 1 : -1
            const lane = paired ? direction * 9 : 0
            const x1 = (direction > 0 ? a.right : a.left) - bounds.left
            const x2 = (direction > 0 ? b.left - 5 : b.right + 5) - bounds.left
            const y1 = a.top + a.height / 2 - bounds.top + lane
            const y2 = b.top + b.height / 2 - bounds.top + lane
            const bend = Math.max(20, Math.abs(x2 - x1) / 2)
            d = `M ${x1} ${y1} C ${x1 + direction * bend} ${y1}, ${x2 - direction * bend} ${y2}, ${x2} ${y2}`
          } else {
            const direction = dy >= 0 ? 1 : -1
            const lane = paired ? direction * 9 : 0
            const x1 = a.left + a.width / 2 - bounds.left + lane
            const x2 = b.left + b.width / 2 - bounds.left + lane
            const y1 = (direction > 0 ? a.bottom : a.top) - bounds.top
            const y2 = (direction > 0 ? b.top - 5 : b.bottom + 5) - bounds.top
            const bend = Math.max(20, Math.abs(y2 - y1) / 2)
            d = `M ${x1} ${y1} C ${x1} ${y1 + direction * bend}, ${x2} ${y2 - direction * bend}, ${x2} ${y2}`
          }
          return { id, d }
        })
        setPaths(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next)
      })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(diagram)
    Object.values(elements.current).forEach(element => observer.observe(element))
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(() => { if (!disposed) measure() })
    measure()
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [group.id])
  const neighboringArtifacts = new Set(edges.filter(edge => edge.from === selected || edge.to === selected).flatMap(edge => [edge.from, edge.to]))
  return <>
    <p className="synth-pipeline-diagram-caption" id={`${detailId}-guide`}>Arrows show model connections; dashed paths are conditional. Artifact boxes repeated across groups refer to the same data. Scroll the diagram horizontally on narrow screens.</p>
    <div className="synth-pipeline-diagram-scroll" role="region" aria-label={`${group.title} workflow diagram`} aria-describedby={`${detailId}-guide`} tabIndex={0}>
      <div className={`synth-pipeline-diagram diagram-${group.id}`} ref={canvas}>
        <svg className="synth-pipeline-arrows" aria-hidden="true"><defs><marker id={marker} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" /></marker></defs>
          {paths.map(({ id, d }) => {
            const edge = edgeById[id]
            const emphasized = edge.from === selected || edge.to === selected
            return <path key={id} data-edge-id={id} d={d} markerEnd={`url(#${marker})`} className={`${edge.optional ? 'is-conditional' : ''} ${emphasized ? 'is-emphasized' : ''}`}><title>{endpoint(edge.from).title} → {endpoint(edge.to).title}: {edge.label}{edge.condition ? `; ${edge.condition}` : ''}</title></path>
          })}
        </svg>
        {Object.entries(layouts[group.id]).map(([id, [column, row]]) => {
          const node = model.nodes[id]
          const ref = element => {
            elements.current[id] = element
            if (node) registerNode(id, element)
          }
          return node ? <button key={id} ref={ref} style={{ gridColumn: column, gridRow: row }} type="button" className="synth-pipeline-node" aria-pressed={selected === id} aria-controls={detailId} onClick={() => onSelect(id)}>
            <strong>{node.title}</strong><span>{responsibility[node.humanIntervention.responsibility]}</span><span className="synth-pipeline-node-state">{selected === id ? 'Selected · details below' : 'Inspect inputs and outputs'}</span>
          </button> : <div key={id} ref={ref} style={{ gridColumn: column, gridRow: row }} className={`synth-pipeline-diagram-artifact ${neighboringArtifacts.has(id) ? 'is-related' : ''}`}><Endpoint id={id} onSelect={onSelect} /></div>
        })}
      </div>
    </div>
    <details className="synth-pipeline-diagram-text"><summary>Text alternative: {edges.length} displayed connections</summary><ul>{edges.map(edge => <li key={edge.id}>{endpoint(edge.from).title} → {endpoint(edge.to).title}: {edge.label}{edge.optional && <> · Conditional: {edge.condition}</>}</li>)}</ul></details>
  </>
}

function TextList({ items }) {
  return <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>
}

function Evidence({ ids }) {
  return <ul className="synth-pipeline-evidence">{[...new Set(ids)].map(id => {
    const source = model.evidence[id]
    return <li key={id}><strong>§{source.section}</strong> · {source.locator}
      <span className="synth-pipeline-pages">{source.pdfPages.map(page => <a key={page} href={`${model.source.url}#page=${page}`} target="_blank" rel="noopener noreferrer">PDF p. {page} ↗<span className="sr-only"> (opens in a new tab)</span></a>)}</span>
    </li>
  })}</ul>
}

function Endpoint({ id, onSelect }) {
  const entity = endpoint(id)
  if (model.nodes[id]) return <button type="button" className="synth-pipeline-endpoint-link" onClick={() => onSelect(id, true)}>{entity.title}</button>
  return <span className={`synth-pipeline-artifact artifact-${entity.kind}`}><small>{entity.kind.replaceAll('-', ' ')}</small>{entity.title}</span>
}

function Connection({ edge, onSelect, detailed = false, highlighted = false }) {
  return <li className={`synth-pipeline-connection ${edge.optional ? 'is-optional' : ''} ${highlighted ? 'is-highlighted' : ''}`}>
    <div className="synth-pipeline-route"><Endpoint id={edge.from} onSelect={onSelect} /><span aria-hidden="true">→</span><span className="sr-only"> supplies or directs </span><Endpoint id={edge.to} onSelect={onSelect} /></div>
    <p><span className="synth-pipeline-kind">{edge.kind}{edge.optional ? ' · conditional' : ''}</span> {edge.label}</p>
    {edge.condition && <p className="synth-pipeline-condition">{edge.condition}</p>}
    {detailed && <Evidence ids={edge.evidence} />}
  </li>
}

function SourceRow({ ids }) {
  const citations = new Map()
  for (const id of new Set(ids)) {
    const source = model.evidence[id]
    for (const page of source.pdfPages) {
      const figures = source.figures.filter(figure => figure.pdfPage === page)
      const label = `${figures.length ? figures.map(figure => `Fig. ${figure.number}`).join(', ') : `§${source.section}`} · p.${page}`
      const href = `${model.source.url}#page=${page}`
      const key = `${label}|${href}`
      const citation = citations.get(key) || { label, href, descriptions: [] }
      citation.descriptions.push(source.locator)
      citations.set(key, citation)
    }
  }
  return <footer className="synth-pipeline-source-row"><span className="synth-pipeline-source-label">Source:</span>{[...citations.entries()].map(([key, citation], index) => <span key={key} className="synth-pipeline-citation">
    {index > 0 && <span className="synth-pipeline-citation-separator" aria-hidden="true">·</span>}
    <a href={citation.href} title={citation.descriptions.join('; ')} aria-label={`${citation.label}: ${citation.descriptions.join('; ')} (opens PDF in a new tab)`} target="_blank" rel="noopener noreferrer">{citation.label} ↗</a>
  </span>)}</footer>
}

function NodeDetails({ node, id }) {
  return <section className="synth-pipeline-detail" id={id} aria-labelledby={`${id}-title`}>
    <header><span className="synth-pipeline-label">Selected architecture element · paper-grounded</span><h5 id={`${id}-title`} aria-live="polite" aria-atomic="true">{node.title}</h5></header>
    <dl className="synth-pipeline-io">{[['Inputs', node.inputs], ['Processing mechanism', node.processing], ['Outputs', node.outputs]].map(([label, items]) => <div key={label}><dt>{label}</dt><dd><TextList items={items} /></dd></div>)}</dl>
    <div className="synth-pipeline-detail-columns">
      <section><h6>Human intervention</h6><p>{responsibility[node.humanIntervention.responsibility] || node.humanIntervention.responsibility}</p>{node.humanIntervention.actions.length ? <TextList items={node.humanIntervention.actions} /> : <p>No human action is specified for this element in the model.</p>}</section>
      <section><h6>Limitations and unspecified details</h6><TextList items={node.limitations} /></section>
    </div>
    <SourceRow ids={node.evidence} />
  </section>
}

export default function SciDaSynthPipeline() {
  const prefix = `synth-pipeline-${useId().replaceAll(':', '')}`
  const buttons = useRef({})
  const [selection, setSelection] = useState(() => Object.fromEntries(model.groups.map(group => [group.id, group.nodeIds[0]])))
  function selectNode(id, focus = false) {
    const node = model.nodes[id]
    setSelection(previous => ({ ...previous, [node.group]: id }))
    if (focus) buttons.current[id]?.focus()
  }
  return <section className="synth-pipeline" aria-labelledby={`${prefix}-heading`}>
    <header className="synth-pipeline-heading"><p className="eyebrow">From document content to structured knowledge</p><h3 id={`${prefix}-heading`}>System Pipeline</h3><p>Explore the technical architecture: select an element to inspect its data, dependencies, evidence, and limits.</p><a className="synth-pipeline-version" href={model.source.url} target="_blank" rel="noopener noreferrer">SciDaSynth · arXiv {model.source.version} · {model.source.date} ↗<span className="sr-only"> (opens in a new tab)</span></a></header>
    <aside className="synth-pipeline-scope-note"><strong>Four explanatory groups, ten architecture elements</strong><p>Grouping and placement are our explanatory organization. Connections describe information flow, not a mandatory sequence or runtime scheduling. This is a paper-based architecture map.</p></aside>
    <div className="synth-pipeline-stores" aria-label="Distinct data stores">{['retrieval-index', 'accumulated-database'].map(id => <div key={id}><Endpoint id={id} onSelect={selectNode} /></div>)}</div>
    <p className="synth-pipeline-guide">Select a node with a click, Enter, or Space to highlight its connections. Each group keeps its own selection; all {model.edges.length} model connections remain available below.</p>
    <div className="synth-pipeline-legend"><span><i aria-hidden="true" />Data and artifact flow</span><span><i className="conditional" aria-hidden="true" />Conditional interaction / feedback / iteration</span></div>
    {model.groups.map((group, index) => {
      const selected = selection[group.id]
      const node = model.nodes[selected]
      const detailId = `${prefix}-detail-${group.id}`
      return <section key={group.id} className={`synth-pipeline-phase phase-${group.id}`} aria-labelledby={`${prefix}-${group.id}`}>
        <header className="synth-pipeline-phase-heading"><span className="synth-pipeline-number" aria-hidden="true">0{index + 1}</span><div><p>Explanatory group · {group.nodeIds.length} element{group.nodeIds.length === 1 ? '' : 's'}</p><h4 id={`${prefix}-${group.id}`}>{group.title}</h4></div></header>
        <PhaseDiagram group={group} selected={selected} detailId={detailId} onSelect={selectNode} registerNode={(id, element) => { buttons.current[id] = element }} prefix={prefix} />
        <NodeDetails node={node} id={detailId} />
      </section>
    })}
    <details className="synth-pipeline-disclosure synth-pipeline-ledger"><summary>All architecture connections ({model.edges.length}) · conditions and evidence</summary><p>This list includes connections omitted from the compact overview. Node names can be selected to locate their inspector.</p><ul className="synth-pipeline-connections">{model.edges.map(edge => <Connection key={edge.id} edge={edge} onSelect={selectNode} detailed />)}</ul></details>
    <details className="synth-pipeline-disclosure"><summary>Interpretation and coverage boundaries</summary><TextList items={model.boundaries} /><p>PDF pages are one-based; HTML section numbering differs. Source links target individual PDF pages. No SciDaSynth code audit is represented.</p></details>
  </section>
}
