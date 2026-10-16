import { Fragment, useState } from 'react'
import { scimPipelineNodes as nodes, scimPipelineCommit, scimPipelineRepository } from './data/scimPipeline'
import './ScholarPhiPipeline.css'
import './ScimPipeline.css'

function SourceLink({ source }) {
  return <a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗<span className="sr-only"> (opens in a new tab)</span></a>
}

function Node({ id, selected, onSelect, phase }) {
  const node = nodes[id]
  return <button type="button" className="pipeline-node" aria-pressed={selected === id} aria-controls={`scim-pipeline-detail-${phase}`} onClick={() => onSelect(id)}>
    <span className={`scp-basis ${node.difference ? 'scp-difference' : ''}`}>{node.basis}</span>
    <span className="pipeline-node-title">{node.title}</span>
    <span className="pipeline-node-summary">{node.short}</span>
    {node.pending && <span className="scp-pending-label">Data handoff needs verification</span>}
    <span className="pipeline-node-state">{selected === id ? 'Selected' : 'View input, processing & output'}</span>
  </button>
}

function Flow({ ids, labels, selected, onSelect, phase }) {
  return <div className="scp-flow" style={{ '--scp-columns': ids.length }}>{ids.map((id, index) => <Fragment key={id}>
    <div className="scp-flow-item"><Node id={id} selected={selected} onSelect={onSelect} phase={phase} /></div>
    {index < ids.length - 1 && <div className="scp-arrow"><span aria-hidden="true">→</span><small>{labels[index]}</small></div>}
  </Fragment>)}</div>
}

function Detail({ id, phase }) {
  const node = nodes[id]
  return <section className="pipeline-detail" id={`scim-pipeline-detail-${phase}`} aria-label={`${phase} node details`}>
    <header><span className="pipeline-detail-label">Selected node · {node.basis}</span><h5 aria-live="polite" aria-atomic="true">{node.title}</h5></header>
    <dl className="pipeline-io">{['input', 'processing', 'output'].map(key => <div key={key}><dt>{key}</dt><dd>{node[key]}</dd></div>)}</dl>
    <p className="pipeline-significance"><strong>When it runs</strong>{node.timing}</p>
    <p className="pipeline-significance"><strong>Why this matters</strong>{node.relevance}</p>
    {node.difference && <p className="scp-notice"><strong>Paper / code distinction</strong>{node.difference}</p>}
    {node.pending && <p className="scp-notice scp-unverified"><strong>Needs verification</strong>{node.pending}</p>}
    <div className="pipeline-code"><h6>Sources · paper sections and inspected code</h6><ul>{node.sources.map(source => <li key={source.url}><span className="scp-source-kind">{source.kind}</span><SourceLink source={source} /></li>)}</ul></div>
  </section>
}

function PhaseHeading({ number, label, title, id }) {
  return <header className="pipeline-phase-heading"><span className="pipeline-phase-number">{number}</span><div><p>{label}</p><h4 id={id}>{title}</h4></div></header>
}

export default function ScimPipeline() {
  const [preparation, setPreparation] = useState('labels')
  const [processing, setProcessing] = useState('extract')
  const [reading, setReading] = useState('load')
  return <section className="pipeline-page scp-page" aria-labelledby="scim-pipeline-heading">
    <header className="pipeline-heading"><p className="eyebrow">From PDF content to interactive highlights</p><h3 id="scim-pipeline-heading">System Pipeline</h3><p>Prepare sentence data, combine model predictions with rules, then let readers control which highlights are shown.</p><a className="pipeline-version" href={scimPipelineRepository} target="_blank" rel="noopener noreferrer">Scim repository · {scimPipelineCommit.slice(0, 7)} ↗<span className="sr-only"> (opens in a new tab)</span></a></header>
    <p className="pipeline-guide">Select a node for its input, processing, output and sources. Arrows name the transferred data or action. The dashed handoff marks an unverified integration step.</p>
    <p className="scp-audit-note">Source-based explanation · static code inspection, not an executed reproduction. The paper and public repository are not assumed to be the same system version.</p>

    <section className="pipeline-phase scp-model" aria-labelledby="scp-model-heading">
      <PhaseHeading number="01" label="Model development · separate from reading" title="Prepare a reusable classifier" id="scp-model-heading" />
      <p className="scp-phase-summary">The paper reports training with labeled abstracts and additional weak supervision. The public inference path loads a saved checkpoint.</p>
      <details className="scp-model-details"><summary>Explore model preparation and the version difference</summary>
        <Flow ids={['labels', 'model']} labels={['training examples · paper account']} selected={preparation} onSelect={setPreparation} phase="preparation" />
        <Detail id={preparation} phase="preparation" />
      </details>
      <p className="scp-notice"><strong>Paper / code distinction</strong>The default code predictor has five label names; the reader uses rules to produce the four visible facets, including Novelty. The full training-to-checkpoint chain has not been verified.</p>
    </section>
    <div className="scp-connector"><span aria-hidden="true">↓</span><p><strong>Model dependency → Predict & apply rules</strong>A saved classifier is loaded for paper processing. Reading actions do not retrain it.</p></div>

    <section className="pipeline-phase pipeline-preparation" aria-labelledby="scp-processing-heading">
      <PhaseHeading number="02" label="Per-paper processing · before normal reading" title="Turn a PDF into prepared sentence data" id="scp-processing-heading" />
      <Flow ids={['extract', 'predict', 'export']} labels={['sentences + metadata', 'predictions + positions']} selected={processing} onSelect={setProcessing} phase="processing" />
      <Detail id={processing} phase="processing" />
    </section>
    <div className="scp-connector scp-gap"><span aria-hidden="true">⇣</span><p><strong>Data packaging / integration · needs verification</strong>Export files and bundled reader data were inspected separately. The complete conversion between their schemas has not been verified; this is not a confirmed end-to-end connection.</p></div>

    <section className="pipeline-phase pipeline-reading" aria-labelledby="scp-reading-heading">
      <PhaseHeading number="03" label="At use time · browser state and rendering" title="Choose, adjust and navigate highlights" id="scp-reading-heading" />
      <Flow ids={['load', 'initialize', 'select', 'render']} labels={['prepared records', 'candidate highlights', 'visible highlight set']} selected={reading} onSelect={setReading} phase="reading" />
      <div className="scp-interaction-paths">
        <div><p className="scp-path-label"><span aria-hidden="true">↺</span> Reader feedback loop · back to selection and rendering</p><Node id="controls" selected={reading} onSelect={setReading} phase="reading" /><p>Global settings reselect highlights. Local + / − actions update the visible set directly. Neither reruns the extraction model.</p></div>
        <div><p className="scp-path-label"><span aria-hidden="true">↳</span> From a displayed snippet or scrollbar marker</p><Node id="navigate" selected={reading} onSelect={setReading} phase="reading" /><p>Jump to the stored PDF location. Navigation changes reading position, not the model’s predictions.</p></div>
      </div>
      <Detail id={reading} phase="reading" />
    </section>
    <details className="pipeline-scope"><summary>Coverage, versions and verification limits</summary><div>
      <p>This map explains the core skimming path using Scim’s arXiv v3 paper and the pinned public repository. Node descriptions and stage groupings are our source-based synthesis. We read code without running the original system, downloading model weights, or testing external services.</p>
      <p>The training scheme is paper-reported; weak-label generation and checkpoint-loading code were inspected. Complete training reproducibility and the exported-data-to-reader conversion remain unverified. The repository describes its research implementation as no longer actively maintained.</p>
      <p>The UI imports bundled per-paper JSON. This map does not establish a working arbitrary-PDF upload service. Global quantities are saved in browser localStorage; other displayed highlight choices are managed in reading state. Broader infrastructure, logging, inherited ScholarPhi features and evaluation outcomes are outside this diagram.</p>
      <p><SourceLink source={{label:'Scim §5 · Implementation and Figure 4',url:'https://arxiv.org/html/2205.04561v3#S5'}} /> · <SourceLink source={{label:'Repository maintenance note',url:`https://github.com/rayfok/scim/blob/${scimPipelineCommit}/model/README.md`}} /></p>
    </div></details>
  </section>
}
