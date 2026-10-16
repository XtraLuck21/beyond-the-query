import PaperContext from './PaperContext'
import { useRef, useState } from 'react'
import PaperTutorial from './PaperTutorial'
import mathSelectionImage from './assets/ScholarPhi_reference/hands-on-math-figure13.png'
import { visualSource } from './data/paperVisuals'
import { lisaPdf, lisaArticle, lisaExcerpts, lisaSymbols, lisaGlossary, parseContext } from './data/scholarPhiExamples'

const features = [
  { id: 'tooltips', action: 'select', title: 'Definition tooltips', question: 'What does this term mean here?', description: 'Open a definition beside a term, then inspect its source or other usages.', section: '4.1', outcome: 'Understand one term without losing your reading position.' },
  { id: 'declutter', action: 'declutter', title: 'Declutter', question: 'Where else is this term used?', description: 'Keep matching sentences visible and fade the rest of the paper in place.', section: '4.2', outcome: 'Find related passages while keeping the document’s layout.' },
  { id: 'equations', action: 'equations', title: 'Equation diagrams', question: 'What do these symbols mean together?', description: 'Reveal several definitions around an equation and connect each label to its symbol.', section: '4.3', outcome: 'Read several symbol definitions together, instead of looking them up one by one.' },
  { id: 'glossary', action: 'glossary', title: 'Priming glossary', question: 'Which terms will I encounter?', description: 'Consult terms and symbols while reading, or preview them before starting.', section: '4.4', outcome: 'Get oriented before reading and revisit unfamiliar vocabulary as needed.' },
]

function LisaSymbol({ id, transpose = false }) {
  if (id === 'S_previous') return <span className="lisa-symbol">S<sup>(i−1)</sup></span>
  if (id === 'P_oracle') return <span className="lisa-symbol">𝒫</span>
  if (!id.includes('_')) return <span>{id}</span>
  const [base, subscript] = id.split('_')
  return <span className="lisa-symbol">{base}<span className="lisa-script"><sup>{transpose ? 'T' : '\u00a0'}</sup><sub>{subscript}</sub></span></span>
}

function LisaText({ text, onSelect, selectable = [], selected }) {
  return text.split(/(A_parse|K_parse|Q_parse|V_parse|U_heads|S_previous|P_oracle)/g).map((part, index) => {
    if (!/^(A_parse|K_parse|Q_parse|V_parse|U_heads|S_previous|P_oracle)$/.test(part)) return part
    return onSelect && selectable.includes(part)
      ? <button type="button" key={index} className="tutorial-term" aria-label={`Locate ${part.replace('_', ' ')} in this example`} aria-pressed={selected === part} onClick={() => onSelect(part)}><LisaSymbol id={part} /></button>
      : <LisaSymbol key={index} id={part} />
  })
}

function LisaSource({ page = 4, label = '§2.2 · p. 5030' }) {
  return <a className="pv-source" href={`${lisaPdf}#page=${page}`} target="_blank" rel="noopener noreferrer">LISA · {label} ↗<span className="sr-only"> (opens the source PDF in a new tab)</span></a>
}

function SourceNote({ children }) {
  return <div className="lisa-source-note"><strong>Reading example · LISA (Strubell et al., EMNLP 2018)</strong><p>{children}</p><a href={lisaArticle} target="_blank" rel="noopener noreferrer">Paper &amp; attribution ↗</a>{' · '}<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a></div>
}

function ReaderNeed({ children }) {
  return <aside className="reader-thought"><span>Reader’s thought · illustrative</span><p>{children}</p></aside>
}

const declutterSentences = lisaExcerpts.flatMap((excerpt) => excerpt.sentences.map((text, index) => ({ id: `${excerpt.id}-${index}`, text, label: excerpt.label })))
const matchingSentences = declutterSentences.filter((sentence) => sentence.text.includes('A_parse'))

function DeclutterDemo() {
  const [enabled, setEnabled] = useState(false)
  const [match, setMatch] = useState(0)
  const passageRefs = useRef({})
  const selectMatch = (index) => { setEnabled(true); setMatch(index) }
  const changeMatch = (direction) => {
    const next = (match + direction + matchingSentences.length) % matchingSentences.length
    setMatch(next)
    passageRefs.current[matchingSentences[next].id]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
  return <div className="feature-demo-body">
    <ReaderNeed>I know these are parse attention weights. How does the paper use them?</ReaderNeed>
    <SourceNote>Three excerpts from §2.2, in source order. Prose is quoted; line breaks and mathematical typography are adapted, and a footnote marker is omitted. Gaps are marked. Navigation labels are ours.</SourceNote>
    <div className="feature-demo-controls">
      <button type="button" className="matrix-action" aria-pressed={enabled} onClick={() => enabled ? setEnabled(false) : selectMatch(0)}>{enabled ? 'Restore excerpt text' : <>Select <LisaSymbol id="A_parse" /> &amp; declutter</>}</button>
      <button type="button" className="matrix-action" disabled={!enabled} onClick={() => changeMatch(-1)}>← Previous match</button>
      <button type="button" className="matrix-action" disabled={!enabled} onClick={() => changeMatch(1)}>Next match →</button>
    </div>
    <p className="demo-status" role="status">{enabled ? `Matching sentence ${match + 1} of ${matchingSentences.length} in these excerpts · ${matchingSentences[match].label}.` : 'Select A_parse in a passage or use the button above. Matching sentences stay visible; other sentences fade.'} Counts cover these excerpts only, not the full paper.</p>
    <div className={`declutter-document ${enabled ? 'is-decluttered' : ''}`}>
      <h5>§2.2 Syntactically-informed self-attention</h5>
      {lisaExcerpts.map((excerpt, excerptIndex) => <section key={excerpt.id} aria-label={`Excerpt ${excerptIndex + 1}: ${excerpt.label}`}>
        {excerptIndex > 0 && <p className="excerpt-gap">[…] Intervening material omitted</p>}
        <h6 className="excerpt-heading">Excerpt {excerptIndex + 1} · {excerpt.label}</h6>
        <blockquote className="lisa-quotation">{excerpt.sentences.map((text, index) => {
          const id = `${excerpt.id}-${index}`
          const matchIndex = matchingSentences.findIndex((sentence) => sentence.id === id)
          return <p key={id} ref={(element) => { passageRefs.current[id] = element }} className={`declutter-sentence ${matchIndex >= 0 ? 'has-match' : 'no-match'} ${enabled && matchIndex === match ? 'current-match' : ''}`}><LisaText text={text} selectable={['A_parse']} onSelect={() => selectMatch(matchIndex)} /></p>
        })}</blockquote>
      </section>)}
      <LisaSource />
    </div>
    <p className="feature-takeaway">Follow the same symbol from its definition to parent selection and external parse injection. The excerpt layout stays fixed as sentences fade. ScholarPhi applies this interaction within the original PDF; this tutorial reflows selected passages.</p>
  </div>
}

function EquationReference() {
  return <section className="equation-reference" aria-labelledby="equation-reference-heading">
    <p className="eyebrow">Related work · Hands-On Math (UIST 2010)</p>
    <h5 id="equation-reference-heading">Related technique: selecting parts of an equation</h5>
    <PaperContext contextId="math" />
    <figure className="reference-figure reference-figure--math">
      <a href={mathSelectionImage} target="_blank" rel="noopener noreferrer" aria-label="Open the full-size Hands-On Math Figure 13 in a new tab">
        <img src={mathSelectionImage} width="1125" height="327" alt="Figure 13: five fingertip selection examples for 2x + 3yz − w. Red symbols show selections ranging from one symbol to a longer span." />
      </a>
      <figcaption><strong>Figure 13 · Fingertip area selection.</strong> Red symbols indicate the selected part of the expression; hand positions show the corresponding contact areas. Zeleznik, Bragdon, Adeputra, and Ko, <em>Hands-On Math</em>, UIST 2010, p. 22 (PDF p. 6). Figure extracted from the author-hosted PDF; surrounding page text omitted.{' '}<a href="https://www.andrewbragdon.com/papers/hands-on-math.pdf#page=6" target="_blank" rel="noopener noreferrer">Source figure ↗</a></figcaption>
      <a className="pv-source" href={mathSelectionImage} target="_blank" rel="noopener noreferrer">Open full-size figure ↗<span className="sr-only"> (opens in a new tab)</span></a>
    </figure>
    <ol className="equation-selection-cases" type="a" aria-label="Selection examples in Figure 13">
      <li><strong>One symbol:</strong> touch a single symbol.</li>
      <li><strong>Two symbols:</strong> touch both symbols together.</li>
      <li><strong>A term:</strong> touch its operator to select the term.</li>
      <li><strong>Neighboring terms:</strong> overlap part of a term and an operator.</li>
      <li><strong>A longer span:</strong> use two contacts to select a wider portion of the expression.</li>
    </ol>
  </section>
}

function EquationDemo() {
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(null)
  const [selected, setSelected] = useState(null)
  const [context, setContext] = useState(false)
  const selectedSymbol = lisaSymbols.find((symbol) => symbol.id === selected)
  const labelRefs = useRef({})
  const close = () => { setOpen(false); setHighlighted(null); setSelected(null); setContext(false) }
  const active = (id) => highlighted === id || selected === id ? 'symbol-highlight' : ''
  return <div className="feature-demo-body">
    <ReaderNeed>How are the parse attention weights calculated, and what does each symbol represent?</ReaderNeed>
    <SourceNote>Equation (4) is reproduced from LISA §2.2. Labels are paraphrases of its surrounding explanations. Select a label to check the quoted defining context.</SourceNote>
    <div className="equation-source-heading"><span>Equation (4) · Syntactically-informed self-attention</span><LisaSource /></div>
    <p className="feature-instruction">{open ? 'Four labels explain the paper-specific symbols together. Hover or focus a label to locate its symbol; select it to inspect the definition and source.' : 'Select the equation to reveal its symbol definitions together.'}</p>
    <div className={`equation-scene ${open ? 'has-labels' : ''}`}>
      {open && <svg className="equation-leaders" viewBox="0 0 600 300" preserveAspectRatio="none" aria-hidden="true">{lisaSymbols.map((symbol) => <line key={symbol.id} x1={symbol.labelX} y1={symbol.labelY} x2={symbol.x} y2={symbol.labelY < 150 ? 131 : 169} className={highlighted === symbol.id || selected === symbol.id ? 'is-highlighted' : ''} />)}</svg>}
      <button type="button" className="equation-expression lisa-equation" aria-label="Show definitions for LISA Equation 4: A parse equals softmax of Q parse U heads K parse transpose" aria-expanded={open} aria-controls="equation-labels" onClick={() => setOpen(true)}>
        <span className={active('A_parse')}><LisaSymbol id="A_parse" /></span><span>=</span><span>softmax</span><span>(</span><span className={active('Q_parse')}><LisaSymbol id="Q_parse" /></span><span className={active('U_heads')}><LisaSymbol id="U_heads" /></span><span className={active('K_parse')}><LisaSymbol id="K_parse" transpose /></span><span>)</span>
      </button>
      <div id="equation-labels" hidden={!open}>{lisaSymbols.map((symbol) => <button type="button" key={symbol.id} ref={(element) => { labelRefs.current[symbol.id] = element }} className={`equation-label ${symbol.slot}`} aria-label={`${symbol.id.replace('_', ' ')}: ${symbol.label}`} aria-pressed={selected === symbol.id} aria-controls="equation-definition" onMouseEnter={() => setHighlighted(symbol.id)} onMouseLeave={() => setHighlighted(null)} onFocus={() => setHighlighted(symbol.id)} onBlur={() => setHighlighted(null)} onClick={() => { setSelected(symbol.id); setContext(false) }}><strong><LisaSymbol id={symbol.id} /></strong><span>{symbol.label}</span></button>)}</div>
    </div>
    <p className="equation-notation-note">Notation guide: softmax normalizes the scores into attention weights; superscript T denotes matrix transpose. The four interactive labels focus on symbols specific to this model.</p>
    <div id="equation-definition" aria-live="polite">
      {selectedSymbol && <div className="tutorial-definition">
        <div className="definition-heading"><h5><LisaSymbol id={selectedSymbol.id} /> · {selectedSymbol.label}</h5><button type="button" className="example-close" aria-label="Close symbol definition" onClick={() => { labelRefs.current[selected].focus(); setSelected(null); setContext(false) }}>×</button></div>
        <span className="role-label">Definition · source-based paraphrase</span>
        <p><LisaText text={selectedSymbol.definition} /></p>
        <div className="example-options"><button type="button" aria-expanded={context} aria-controls="equation-source-context" onClick={() => setContext(!context)}>{context ? 'Hide defining context' : 'Show defining context'}</button></div>
        <div id="equation-source-context" hidden={!context} className="tutorial-context"><span className="example-section">LISA §2.2 · quoted defining context</span><blockquote className="lisa-quotation"><p><LisaText text={selectedSymbol.context} /></p></blockquote>{selected === 'A_parse' && <p>The probability interpretation is given in Equation (5), on the same page.</p>}<LisaSource /></div>
      </div>}
    </div>
    {open && <button type="button" className="matrix-action feature-reset" onClick={close}>Hide diagram / restart</button>}
    <p className="feature-takeaway">Read the meanings together, then check a particular symbol in its defining passage. The formula is from LISA; the interactive labels and their arrangement are our adaptation of ScholarPhi’s equation diagrams.</p>
    <details className="equation-reference-disclosure">
      <summary>Reference · Hands-On Math</summary>
      <EquationReference />
    </details>
  </div>
}

function GlossaryDemo() {
  const [reading, setReading] = useState(true)
  const [selected, setSelected] = useState(null)
  const entryRefs = useRef({})
  const selectEntry = (id) => {
    setSelected(id)
    entryRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
  return <div className="feature-demo-body">
    <ReaderNeed>{reading ? 'What do these symbols mean? I’ll check the glossary as I read the method.' : 'Before I read LISA, which abbreviations and symbols will I encounter?'}</ReaderNeed>
    <SourceNote>A selected glossary manually curated from LISA, not a glossary supplied by its authors or an automatic extraction. Definitions are source-based paraphrases. Entries follow reading order across the abstract, prose, and figure captions; diagram-only labels are not used for ordering.</SourceNote>
    <div className="feature-demo-controls" aria-label="Glossary tutorial views">
      <button type="button" className="matrix-action" aria-pressed={!reading} onClick={() => { setReading(false); setSelected(null) }}>Preview terminology</button>
      <button type="button" className="matrix-action" aria-pressed={reading} onClick={() => setReading(true)}>Read with glossary</button>
    </div>
    <p className="demo-status" role="status">{reading ? 'Select a marked symbol in the real §2.2 passage to locate its glossary entry.' : 'Eight selected entries, not an exhaustive glossary of LISA. Open a source link to inspect the definition in context.'}</p>
    <div className={`glossary-scene ${reading ? 'alongside' : ''}`}>
      {reading && <section className="glossary-reading" aria-label="Reading with a glossary"><span className="example-section">LISA §2.2 · quoted passages</span><blockquote className="lisa-quotation"><p className="tutorial-passage"><LisaText text="Let A_parse be the parse attention weights, at layer i. Its input is the matrix of token representations S_previous." selectable={['A_parse']} selected={selected} onSelect={selectEntry} /></p><p className="tutorial-passage"><LisaText text={parseContext} selectable={['K_parse', 'Q_parse', 'V_parse']} selected={selected} onSelect={selectEntry} /></p></blockquote><LisaSource /><p className="demo-status" role="status">{selected ? `Glossary entry selected: ${selected.replace('_', ' ')}` : 'Try A parse, K parse, Q parse, or V parse to locate its definition.'}</p></section>}
      <section className="glossary-sheet" aria-label="Selected LISA glossary">
        <h5>Terms &amp; symbols in LISA</h5><p>Selected entries · reading order</p>
        <dl>{lisaGlossary.map((entry, index) => <div key={entry.id} ref={(element) => { entryRefs.current[entry.id] = element }} className={selected === entry.id ? 'glossary-entry is-located' : 'glossary-entry'}><dt><span>{index + 1}</span><LisaSymbol id={entry.id} /></dt><dd>{entry.meaning}<small>Definition source: <LisaSource page={entry.page} label={entry.section} /></small></dd></div>)}</dl>
      </section>
    </div>
    <p className="feature-takeaway">ScholarPhi places a glossary before the paper and describes printing it as a side-by-side reference. The view switch and linked highlights here are teaching aids in our tutorial, not reported ScholarPhi glossary controls.</p>
  </div>
}

function FeaturePreview({ id }) {
  return <span className={`feature-preview preview-${id}`} aria-hidden="true">
    {id === 'tooltips' && <><span>Read <mark>LISA</mark> in context</span><span className="preview-tooltip">↳ definition nearby</span></>}
    {id === 'declutter' && <><span className="preview-faded">Surrounding sentences</span><mark>Let <LisaSymbol id="A_parse" /> be the parse attention weights…</mark><span className="preview-faded">Surrounding sentences</span></>}
    {id === 'equations' && <><span className="preview-equation"><LisaSymbol id="A_parse" /> = softmax(…)</span><span>LISA · Equation (4)</span></>}
    {id === 'glossary' && <><span>SRL · semantic role labeling</span><span>LISA · model name</span><span><LisaSymbol id="A_parse" /> · parse attention weights</span></>}
  </span>
}

export default function ScholarPhiTutorial({ actionId, onAction, headingRef }) {
  const feature = features.find((item) => item.id === actionId) || features[0]
  const Demo = { declutter: DeclutterDemo, equations: EquationDemo, glossary: GlossaryDemo }[feature.id]
  return <section className="visual-section scholar-feature-section" aria-labelledby="workflow-heading">
    <header className="visual-section-header"><span className="visual-number">01</span><div><h3 id="workflow-heading" tabIndex={-1} ref={headingRef}>How it works</h3><p>Four core features, one source paper: LISA. Choose a reading need to explore; these are capabilities, not a required sequence.</p></div></header>
    <div className="feature-overview" role="group" aria-label="ScholarPhi core features">
      {features.map((item) => <button type="button" key={item.id} className="feature-choice" aria-pressed={feature.id === item.id} aria-controls="scholar-feature-demo" onClick={() => onAction(item.action)}>
        <span className="feature-choice-meta">§{item.section}<span>{feature.id === item.id ? 'Selected' : 'View demonstration'}</span></span>
        <strong>{item.title}</strong><span className="feature-question">{item.question}</span><FeaturePreview id={item.id} /><span className="feature-description">{item.description}</span>
      </button>)}
    </div>
    <section id="scholar-feature-demo" className="selected-feature" aria-labelledby="selected-feature-title">
      <header className="selected-feature-heading"><div><p className="eyebrow">Selected feature · simplified demonstration</p><h4 id="selected-feature-title">{feature.title}</h4><p>{feature.outcome}</p></div><a className="pv-source" href={`${visualSource}#S4.SS${feature.section.split('.')[1]}`} target="_blank" rel="noopener noreferrer">Read §{feature.section} ↗<span className="sr-only"> (opens in a new tab)</span></a></header>
      {Demo ? <Demo key={feature.id} /> : <PaperTutorial actionId={actionId} onAction={onAction} />}
      {Demo && <p className="feature-attribution">Interaction adapted from Head et al., ScholarPhi (CHI 2021), §{feature.section}, CC BY-SA 4.0. This is a simplified teaching demonstration, not the original interface or automatic paper processing.{feature.id === 'equations' && ' Symbol labels use a fixed layout; defining context opens inline here.'}</p>}
    </section>
  </section>
}
