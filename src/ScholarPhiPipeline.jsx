import { useEffect, useId, useRef, useState } from 'react'
import { pipelineNodes, pipelineCommit, pipelineRepository, pipelineSettingsSource, pipelineCitationsSource } from './data/scholarPhiPipeline'
import './ScholarPhiPipeline.css'

const branches = ['sentences', 'equations', 'symbols', 'definitions']
const dependencies = [['sentences', 'definitions'], ['equations', 'symbols'], ['symbols', 'definitions']]
const features = ['tooltips', 'declutter', 'diagrams', 'glossary']

function CodeLink({ source }) {
  return <a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗<span className="sr-only"> (opens source code in a new tab)</span></a>
}

function PipelineNode({ id, selected, onSelect, nodeRef }) {
  const node = pipelineNodes[id]
  return <button ref={nodeRef} type="button" className={`pipeline-node pipeline-node-${id}`} aria-pressed={selected === id} aria-controls={`pipeline-detail-${node.phase}`} onClick={() => onSelect(id)}>
    <span className="pipeline-node-title">{node.title}</span>
    <span className="pipeline-node-summary">{node.short}</span>
    <span className="pipeline-node-state">{selected === id ? 'Selected' : 'View inputs & outputs'}</span>
  </button>
}

function ExtractionBranch({ selected, onSelect, active }) {
  const canvas = useRef(null)
  const nodes = useRef({})
  const markerId = useId().replaceAll(':', '')
  const [paths, setPaths] = useState([])
  useEffect(() => {
    if (!active) return
    const element = canvas.current
    let frame
    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect()
        if (!bounds.width) return
        setPaths(dependencies.map(([from, to]) => {
          const a = nodes.current[from].getBoundingClientRect()
          const b = nodes.current[to].getBoundingClientRect()
          const x1 = a.right - bounds.left + 2
          const x2 = b.left - bounds.left - 5
          const y1 = a.top + a.height / 2 - bounds.top
          const y2 = b.top + b.height / 2 - bounds.top
          const middle = (x1 + x2) / 2
          return { from, to, d: `M ${x1} ${y1} C ${middle} ${y1}, ${middle} ${y2}, ${x2} ${y2}` }
        }))
      })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    Object.values(nodes.current).forEach(node => observer.observe(node))
    measure()
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [active])
  return <div className="pipeline-extraction">
    <div className="pipeline-group-heading"><strong>Extract information</strong><span>Arrows show required dependencies</span></div>
    <div ref={canvas} className="pipeline-branches">
      <svg className="pipeline-branch-lines" aria-hidden="true"><defs><marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#708571" /></marker></defs>
        {paths.map(path => <path key={`${path.from}-${path.to}`} d={path.d} markerEnd={`url(#${markerId})`} className={selected === path.from || selected === path.to ? 'is-emphasized' : ''} />)}
      </svg>
      {branches.map(id => <PipelineNode key={id} id={id} selected={selected} onSelect={onSelect} nodeRef={element => { nodes.current[id] = element }} />)}
    </div>
    <p className="pipeline-dependency-key">Sentences + symbols → definitions. Equations → symbols.</p>
    <div className="pipeline-shared-operation"><PipelineNode id="locate" selected={selected} onSelect={onSelect} /><p>Shared operation: locate and upload entities within their pipelines. This is not a single final pass.</p></div>
  </div>
}

function NodeDetail({ id }) {
  const node = pipelineNodes[id]
  return <section id={`pipeline-detail-${node.phase}`} className="pipeline-detail" aria-label={`${node.phase === 'preparation' ? 'Preparation' : 'Reading'} node details`}>
    <header><span className="pipeline-detail-label">Selected stage</span><h5 aria-live="polite" aria-atomic="true">{node.title}</h5></header>
    <dl className="pipeline-io"><div><dt>Input</dt><dd>{node.input}</dd></div><div><dt>Processing</dt><dd>{node.processing}</dd></div><div><dt>Output</dt><dd>{node.output}</dd></div></dl>
    <p className="pipeline-significance"><strong>Why this matters</strong>{node.significance}</p>
    {node.note && <p className="pipeline-detail-note">{node.note}</p>}
    <div className="pipeline-code"><h6>Code sources <span>· pinned to {pipelineCommit.slice(0, 7)}</span></h6><ul>{node.sources.map(source => <li key={source.url}><CodeLink source={source} /></li>)}</ul></div>
  </section>
}

export default function ScholarPhiPipeline({ active }) {
  const [preparation, setPreparation] = useState('prepare')
  const [reading, setReading] = useState('api')
  return <section className="pipeline-page" aria-labelledby="pipeline-heading">
    <header className="pipeline-heading"><p className="eyebrow">From paper sources to reading support</p><h3 id="pipeline-heading">System Pipeline</h3><p>Prepare contextual data first. Load it when a paper opens, then use it to support reading.</p><a className="pipeline-version" href={pipelineRepository} target="_blank" rel="noopener noreferrer">ScholarPhi repository · {pipelineCommit.slice(0, 7)} ↗<span className="sr-only"> (opens in a new tab)</span></a></header>
    <p className="pipeline-guide">Select any node to inspect its input, processing, output, and source code below that phase.</p>

    <section className="pipeline-phase pipeline-preparation" aria-labelledby="pipeline-preparation-heading">
      <header className="pipeline-phase-heading"><span className="pipeline-phase-number">01</span><div><p>Before reading · data processing</p><h4 id="pipeline-preparation-heading">Prepare the paper’s contextual data</h4></div><span className="pipeline-timing">Preprocessing</span></header>
      <div className="pipeline-preparation-flow">
        <div className="pipeline-endpoint"><PipelineNode id="prepare" selected={preparation} onSelect={setPreparation} /></div>
        <div className="pipeline-flow-arrow" aria-hidden="true">→<span>prepared sources</span></div>
        <ExtractionBranch selected={preparation} onSelect={setPreparation} active={active} />
        <div className="pipeline-flow-arrow" aria-hidden="true">→<span>linked records</span></div>
        <div className="pipeline-endpoint"><PipelineNode id="store" selected={preparation} onSelect={setPreparation} /></div>
      </div>
      <NodeDetail id={preparation} />
    </section>

    <div className="pipeline-handoff"><span aria-hidden="true">↓</span><div><strong>Prepared data is the handoff</strong><p>The reader requests stored entities and locations. Ordinary reading clicks do not rerun the extraction pipeline.</p></div></div>

    <section className="pipeline-phase pipeline-reading" aria-labelledby="pipeline-reading-heading">
      <header className="pipeline-phase-heading"><span className="pipeline-phase-number">02</span><div><p>During reading · API and browser</p><h4 id="pipeline-reading-heading">Turn available data into reading assistance</h4></div><span className="pipeline-timing">At use time</span></header>
      <div className="pipeline-reading-flow">
        <div className="pipeline-reading-inputs"><span className="pipeline-group-label">When the paper opens</span><PipelineNode id="pdf" selected={reading} onSelect={setReading} /><PipelineNode id="api" selected={reading} onSelect={setReading} /></div>
        <div className="pipeline-flow-arrow" aria-hidden="true">→<span>pages + entity data</span></div>
        <div className="pipeline-feature-group"><span className="pipeline-group-label">Available features · when enabled</span><div className="pipeline-features">{features.map(id => <PipelineNode key={id} id={id} selected={reading} onSelect={setReading} />)}</div><p>These features share data. They are alternative reading actions, not a required sequence.</p></div>
      </div>
      <NodeDetail id={reading} />
    </section>

    <details className="pipeline-scope"><summary>What this map covers</summary><div><p>This is our code-based summary of the TeX processing and reading paths at the linked commit. Localization and storage are repeated within entity pipelines; the overview groups them to make their roles visible.</p><p>The repository includes later changes and is not necessarily the exact version used in the CHI 2021 study. We inspected the code without running the complete system. Availability of dependencies and external services has not been verified.</p><p>The four features are implemented capabilities, not all enabled by default. <CodeLink source={pipelineSettingsSource} /></p><p>Citation extraction is a separate branch, omitted from the core definition flow. <CodeLink source={pipelineCitationsSource} /></p><p>Other PDF-processing paths, deployment infrastructure, logging, and editing tools are outside this map. The visible priming glossary should not be confused with the separate external-glossary extractor.</p></div></details>
  </section>
}
