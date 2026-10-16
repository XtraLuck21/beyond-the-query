import { useRef } from 'react'
import tooltipReferenceImage from './assets/ScholarPhi_reference/hovercards-alps-original.jpg'
import { steps, visualSource } from './data/paperVisuals'

const readingPaper = 'https://aclanthology.org/D18-1548/'
const readingPdf = 'https://aclanthology.org/D18-1548.pdf'
const tutorialActions = [
  { id: 'select', step: 0, role: 'user', thought: 'What does LISA mean here?', label: 'Notice the unfamiliar name', instruction: 'LISA is highlighted in the passage. Click it, or choose “Show definition”, to learn what it means.' },
  { id: 'definition', step: 0, role: 'system', label: 'Understand the term', instruction: 'The compact explanation identifies LISA. This is Step 1: a definition without leaving the passage.' },
  { id: 'inspect', step: 1, role: 'user', thought: 'I need more information. Where is this defined, and how is it used?', label: 'Ask for more than a definition', instruction: 'The definition remains open. Now choose its source or other usages to understand the model in context.' },
  { id: 'source', step: 1, role: 'system', label: 'Read the defining context', instruction: 'The source adds what the model learns and how its parts fit together. The same reading passage stays above.' },
  { id: 'usages', step: 1, role: 'system', label: 'See the model used elsewhere', instruction: 'These two source-linked examples show what LISA does beyond the short definition.' },
  { id: 'dismiss', step: 2, role: 'user', thought: 'That answers my question. I’ll close this and keep reading.', label: 'Finish the lookup', instruction: 'You have enough context. Use the highlighted close control to clear the definition.' },
  { id: 'resume', step: 2, role: 'system', label: 'Continue from the same passage', instruction: 'The assistance is closed. Continue reading, or click LISA to look it up again.' },
]

function ThoughtBubble({ text, align = 'left' }) {
  return <aside className={`reader-thought thought-${align}`} aria-label="Reader’s thought" role="status"><span>Reader’s thought · illustrative</span><p>{text}</p></aside>
}

export default function PaperTutorial({ actionId, onAction }) {
  const actionIndex = tutorialActions.findIndex((item) => item.id === actionId)
  const action = tutorialActions[actionIndex]
  const open = !['select', 'resume'].includes(actionId)
  const showContext = ['source', 'usages'].includes(actionId)
  const termRef = useRef(null)
  const change = (id) => onAction(id)

  return <section className="tooltip-walkthrough" aria-label="Definition tooltip walkthrough">
    <p className="feature-walkthrough-intro">One lookup, three steps. Source context and usage lists extend this tooltip; the other three core features have their own demonstrations above.</p>
    <div className="tutorial-layout">
      <ol className="tutorial-steps">
        {steps.map((step, index) => <li key={step.id} className={`tutorial-step ${action.step === index ? 'is-current' : ''}`}>
          <div className="tutorial-step-heading"><span className="tutorial-step-number" aria-hidden="true">{index + 1}</span><h4>Step {index + 1} · {step.title}</h4></div>
          <div className="tutorial-role-actions">{['user', 'system'].map((role) => {
            const target = role === 'user' ? ['select', 'inspect', 'dismiss'][index] : ['definition', 'source', 'resume'][index]
            return <button key={role} type="button" className={`tutorial-action ${role}`} aria-pressed={action.step === index && action.role === role} aria-controls="shared-reading-example" onClick={() => change(target)}><span className="role-label">{role === 'user' ? 'User' : 'ScholarPhi · System'}</span><strong>{role === 'user' ? step.user : step.support}</strong><span>{role === 'user' ? step.action : step.response}</span></button>
          })}</div>
        </li>)}
      </ol>
      <div className="shared-example" id="shared-reading-example" role="region" aria-label="Shared LISA reading example">
        <header className="shared-example-header"><span>Shared example · LISA</span><button type="button" onClick={() => change('select')}>Restart</button></header>
        <div className="tutorial-cue" role="status"><span>Step {action.step + 1} · {action.role === 'user' ? 'User action' : 'System response'}</span><h4>{action.label}</h4><p>{action.instruction}</p></div>
        <div className={`tutorial-paper scene-${actionId} ${actionId === 'resume' ? 'reading-resumed' : ''}`}>
          <p className="example-section">Reading passage · adapted from §2 Model</p>
          {actionId === 'select' && <ThoughtBubble text={action.thought} />}
          <p className="tutorial-passage"><button type="button" ref={termRef} className={`tutorial-term ${actionId === 'select' ? 'term-highlight' : ''}`} aria-label="Show definition of LISA" aria-expanded={open} aria-controls="lisa-definition" onClick={() => change('definition')}>LISA</button> combines an attention mechanism trained to identify syntactic dependencies with joint learning of several language tasks. One attention head learns which word is each token’s syntactic parent.</p>
          {actionId === 'dismiss' && <ThoughtBubble text={action.thought} align="right" />}
          <div id="lisa-definition" hidden={!open} className="tutorial-definition">
            <div className="definition-heading"><div><span className="role-label">Definition · abstract</span><h5>Linguistically-informed self-attention</h5></div><button type="button" className={`example-close ${actionId === 'dismiss' ? 'close-highlight' : ''}`} aria-label="Close LISA definition" onClick={() => { change('resume'); termRef.current.focus() }}>×</button></div>
            <p>A neural model that uses self-attention and shared learning across parsing, word-class tagging, predicate detection, and semantic role labeling.</p>
            {actionId === 'inspect' && <ThoughtBubble text={action.thought} />}
            <div className={`example-options ${action.step === 1 ? 'options-highlight' : ''}`}><button type="button" aria-pressed={actionId === 'source'} onClick={() => change('source')}>Source passage</button><button type="button" aria-pressed={actionId === 'usages'} onClick={() => change('usages')}>Other usages</button></div>
          </div>
          {actionId === 'select' && <button type="button" className="matrix-action tutorial-primary" onClick={() => change('definition')}>Show definition →</button>}
          {showContext && <div className="tutorial-context" aria-label="Additional reading context">
            {actionId === 'source' ? <><span className="example-section">Source context · paraphrase</span><h5>How the model is defined</h5><p>LISA learns to identify word classes and predicates, parse sentences, attend to syntactic parents, and assign semantic roles. A sentence is encoded once for these tasks.</p><a href={`${readingPdf}#page=2`} target="_blank" rel="noopener noreferrer">§1 Introduction · p. 5028 ↗<span className="sr-only"> (opens in a new tab)</span></a></> : <><span className="example-section">Other usages · paraphrases</span><h5>Two places that add context</h5><ul><li><strong>Architecture</strong><p>A designated attention head learns the parent relation between words.</p><a href={`${readingPdf}#page=2`} target="_blank" rel="noopener noreferrer">§2 Model · p. 5028 ↗<span className="sr-only"> (opens in a new tab)</span></a></li><li><strong>Using an external parse</strong><p>A supplied syntactic parse can replace the model’s predicted parse at test time, without retraining.</p><a href={`${readingPdf}#page=1`} target="_blank" rel="noopener noreferrer">Abstract · p. 5027 ↗<span className="sr-only"> (opens in a new tab)</span></a></li></ul></>}
          </div>}
          {actionId === 'resume' && <p className="reading-complete">✓ Definition closed. Your place in the passage is preserved.</p>}
        </div>
        <nav className="tutorial-navigation" aria-label="Reading tutorial actions"><button type="button" disabled={actionIndex === 0} onClick={() => change(tutorialActions[actionIndex - 1].id)}>← Previous action</button><span>{actionIndex + 1} / {tutorialActions.length}</span><button type="button" disabled={actionIndex === tutorialActions.length - 1} onClick={() => change(tutorialActions[actionIndex + 1].id)}>Next action →</button></nav>
        <details className="tutorial-attribution"><summary>Where does this example come from?</summary><p><strong>Term and content:</strong> LISA is from Strubell et al., <a href={readingPaper} target="_blank" rel="noopener noreferrer">Linguistically-Informed Self-Attention for Semantic Role Labeling (EMNLP 2018) ↗</a>. Passage, definition, and usages above are curated paraphrases, not quotations or automatically extracted text.</p><p><strong>Interaction:</strong> adapted from <a href={visualSource} target="_blank" rel="noopener noreferrer">ScholarPhi §4.1 ↗</a>, which uses the LISA paper in its examples. This is our simplified tutorial, not a screenshot or a live ScholarPhi instance. Source context appears inline here; ScholarPhi navigates to the source and opens usage lists in a sidebar.</p></details>
        <p className="tutorial-source-note">LISA · Strubell et al., 2018. Source-based paraphrases; interface adapted for this tutorial.</p>
      </div>
    </div>
    <details className="equation-reference-disclosure">
      <summary>Reference</summary>
      <div className="equation-reference">
        <p>Related interaction: <a href="https://www.mediawiki.org/wiki/Page_Previews" target="_blank" rel="noopener noreferrer">Wikipedia’s Page Previews [68]<span className="sr-only"> (opens in a new tab)</span></a>, which display linked-page previews on hover.</p>
        <figure className="reference-figure reference-figure--preview">
          <a href={tooltipReferenceImage} target="_blank" rel="noopener noreferrer" aria-label="Open the full-size Wikipedia Page Previews image in a new tab">
            <img src={tooltipReferenceImage} width="1169" height="608" alt="Wikipedia’s Alps article: the Mont Blanc link opens a nearby preview containing a photograph and a short description, while the original article remains visible." loading="lazy" />
          </a>
          <figcaption>
            <strong>Mont Blanc preview within the Alps article.</strong> The linked term remains above the preview, keeping the explanation beside the reading passage. Original screenshot by Parkywiki (2016), reproduced without edits.{' '}
            <a href="https://commons.wikimedia.org/wiki/File:Hovercards_-_Alps_Mont_Blanc.jpg" target="_blank" rel="noopener noreferrer">Image source &amp; attribution ↗</a>{' · '}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0 ↗</a>
          </figcaption>
          <a className="pv-source" href={tooltipReferenceImage} target="_blank" rel="noopener noreferrer">Open full-size image ↗<span className="sr-only"> (opens in a new tab)</span></a>
        </figure>
      </div>
    </details>
  </section>
}
