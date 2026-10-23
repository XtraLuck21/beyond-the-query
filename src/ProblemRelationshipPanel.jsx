import ComparisonSources from './ComparisonSources'
import { papers } from './data/papers'
import { comparisonRows, getPairNote } from './data/comparison'
import './ProblemRelationshipPanel.css'

const motivation = comparisonRows.find((row) => row.id === 'motivation')

// Editorial summaries of the source-linked motivations, not participant quotes
// or experimentally established causal chains.
const chains = {
  scholarphi: [
    { label: 'Situation', title: 'Reading unfamiliar notation', detail: 'Trying to understand a term or symbol in the current passage.' },
    { label: 'Obstacle', title: 'The meaning is elsewhere', detail: 'Paper-specific definitions may be separated from where they are needed.' },
    { label: 'Burden', title: 'Look up, then resume', detail: 'Find the definition, connect it to the notation, and return to the passage.' },
  ],
  scim: [
    { label: 'Situation', title: 'Skimming a paper', detail: 'Trying to get an overview and decide where to read more closely.' },
    { label: 'Obstacle', title: 'Key passages need finding', detail: 'Salient content must be identified among many passages.' },
    { label: 'Burden', title: 'Judge where to focus', detail: 'Scan and assess passages to choose which deserve closer reading.' },
  ],
  scidasynth: [
    { label: 'Situation', title: 'Extracting across papers', detail: 'Trying to collect comparable information from a selected paper collection.' },
    { label: 'Obstacle', title: 'Scattered, inconsistent data', detail: 'Information appears across text, tables, and figures, with expressions that may differ between papers.' },
    { label: 'Burden', title: 'Extract, check, and standardize', detail: 'Locate target data, verify it against the sources, and reconcile inconsistent expressions.' },
  ],
}

export default function ProblemRelationshipPanel({ paperIds }) {
  const pair = papers.filter((paper) => paperIds.includes(paper.id))
  const note = getPairNote(motivation, pair.map((paper) => paper.id))
  return (
    <>
      <div className="support-shared"><span className="eyebrow">Shared</span><p>{note.shared}</p></div>
      <p className="problem-chain-note">Two difficulties in working with scientific literature, aligned by situation, obstacle, and burden. Arrows explain the motivation; they do not show measured causal effects or a required workflow.</p>
      <div className="problem-chains">
        {pair.map((paper) => <article className={`problem-chain problem-chain-${paper.id}`} key={paper.id} aria-labelledby={`problem-chain-${paper.id}-heading`}>
          <h3 id={`problem-chain-${paper.id}-heading`}>{paper.name}</h3>
          <ol>
            {chains[paper.id].map((stage, index) => <li className={index === 1 ? 'problem-stage problem-stage-obstacle' : 'problem-stage'} key={stage.label}>
              {index > 0 && <span className="problem-chain-arrow" aria-hidden="true">→</span>}
              <span className="problem-stage-label">{stage.label}</span>
              <h4>{stage.title}</h4>
              <p>{stage.detail}</p>
            </li>)}
          </ol>
        </article>)}
      </div>
      <details className="support-evidence">
        <summary>Evidence &amp; sources</summary>
        <p className="relationship-disclaimer">The chains are our source-based summaries of the authors’ motivations, not quotations or a head-to-head evaluation. The source notes below support each paper’s situation, obstacle, and burden.</p>
        <div className="support-evidence-grid">{pair.map((paper) => <article key={paper.id}>
          <h4>{paper.title}</h4>
          <p>{motivation.cells[paper.id].text}</p>
          <ComparisonSources cell={motivation.cells[paper.id]} />
        </article>)}</div>
      </details>
    </>
  )
}
