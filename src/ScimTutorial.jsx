import { useRef, useState } from 'react'
import { scimSource } from './data/visualModels'
import { examplePaper, excerptGroups, facets, paragraphs, sentences, initialDensity, isHighlighted, nextLocalLevel } from './data/scimExample'
import './ScimTutorial.css'

const features = [
  { id: 'highlight', title: 'Faceted highlights', section: '4.2', question: 'What kind of information am I reading?', description: 'Four colors distinguish objectives, novelty, methods, and results.', instruction: 'Select a highlighted sentence to inspect its category and provenance. Ordinary text stays visible around it.', thought: 'Which passages explain the goal, the contribution, the method, and the results?' },
  { id: 'density', title: 'Highlight controls', section: '4.3', question: 'How much help do I want, and where?', description: 'Tune a category across these excerpts, or change one paragraph.', instruction: 'Try Method → More, then use More / Fewer beside a single paragraph. Global controls affect the collection; local controls affect only that paragraph.', thought: 'I want more method details, but I do not need every paragraph highlighted.' },
  { id: 'distribution', title: 'Highlight distribution', section: '4.4', question: 'Where does each kind of content appear?', description: 'See which excerpt groups contain the current highlights.', instruction: 'Change a density slider and watch the labeled distribution overview update. Marks follow sentence order within each excerpt group; they are not PDF page coordinates.', thought: 'Where should I look for the method or results?' },
  { id: 'context', title: 'Highlight browser & context linking', section: '4.5', question: 'What does this passage mean in context?', description: 'Browse current highlights and return to their surrounding text.', instruction: 'Select a passage in the list to locate it in the shared document. The gold outline marks your reading location; facet colors retain their meaning.', thought: 'This sentence sounds useful. What comes before and after it?' },
]
const facetMeanings = {
  Objective: 'The task or goal the researchers aim to address.',
  Novelty: 'A contribution or distinction claimed by the authors, not our independent novelty assessment.',
  Method: 'How the work is carried out. Dataset construction and detection are different parts of this paper’s method.',
  Result: 'A reported outcome under the paper’s evaluation conditions, not a universal performance guarantee.',
}
const actionAliases = { orient: 'highlight', adjust: 'density', browse: 'context' }
function Link({ href, children }) {
  return <a href={href} target="_blank" rel="noopener noreferrer">{children} ↗<span className="sr-only"> (opens in a new tab)</span></a>
}

export default function ScimTutorial({ actionId, onAction, headingRef }) {
  const feature = features.find(item => item.id === (actionAliases[actionId] || actionId)) || features[0]
  const [density, setDensity] = useState(initialDensity)
  const [local, setLocal] = useState({})
  const [focused, setFocused] = useState(null)
  const [message, setMessage] = useState('Select a feature above. All demonstrations use the same excerpts.')
  const sentenceRefs = useRef({})
  const selected = sentences.find(sentence => sentence.id === focused)
  const highlighted = sentences.filter(sentence => isHighlighted(sentence, density, local))
  const controlsVisible = ['density', 'distribution'].includes(feature.id)

  function chooseFeature(id) {
    onAction(id)
    setMessage('Feature changed. Your highlight settings and reading location are preserved.')
  }
  function locate(sentence, scroll = true) {
    setFocused(sentence.id)
    setMessage(`Located ${sentence.facet || 'context'} sentence in ${sentence.locator}.`)
    if (scroll) requestAnimationFrame(() => {
      sentenceRefs.current[sentence.id]?.focus({ preventScroll: true })
      sentenceRefs.current[sentence.id]?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    })
  }
  function changeDensity(facet, level) {
    setDensity(previous => ({ ...previous, [facet]: level }))
    setMessage(`${facet}: ${['Off', 'Some', 'More'][level]}. Local paragraph adjustments remain in effect.`)
  }
  function changeParagraph(paragraph, direction) {
    const next = nextLocalLevel(paragraph.id, direction, density, local)
    if (next === null) return
    setLocal(previous => ({ ...previous, [paragraph.id]: next }))
    setMessage(`${direction > 0 ? 'Added' : 'Removed'} highlights only in ${paragraph.locator}, paragraph ${paragraphs.indexOf(paragraph) + 1}.`)
  }
  function reset() {
    setDensity(initialDensity); setLocal({}); setFocused(null)
    onAction('highlight')
    setMessage('Example reset: default density, no local adjustments, and no selected sentence.')
  }
  return <section className="visual-section scim-feature-section" aria-labelledby="workflow-heading">
    <header className="visual-section-header"><span className="visual-number">01</span><div>
      <h3 id="workflow-heading" tabIndex={-1} ref={headingRef}>How it works</h3>
      <p>Four core feature groups, one real reading example. Explore them in any order.</p>
    </div></header>
    <div className="feature-overview" role="group" aria-label="Scim core features">
      {features.map(item => <button type="button" className="feature-choice" key={item.id} aria-pressed={feature.id === item.id} aria-controls="scim-feature-demo" onClick={() => chooseFeature(item.id)}>
        <span className="feature-choice-meta">§{item.section}<span>{feature.id === item.id ? 'Selected' : 'View demonstration'}</span></span>
        <strong>{item.title}</strong><span className="feature-question">{item.question}</span><span className="feature-description">{item.description}</span>
      </button>)}
    </div>
    <section id="scim-feature-demo" className="selected-feature" aria-labelledby="scim-feature-title">
      <header className="selected-feature-heading"><div><p className="eyebrow">Selected feature · simplified demonstration</p><h4 id="scim-feature-title">{feature.title}</h4><p>{feature.instruction}</p></div><Link href={`${scimSource}#S4.SS${feature.section.split('.')[1]}`}>Read §{feature.section}</Link></header>
      <aside className="reader-thought scim-thought"><span>Reader’s thought · illustrative</span><p>{feature.thought}</p></aside>
      <div className="scim-source-banner">
        <strong>Shared reading example · Wu et al., NAACL 2022</strong>
        <p><Link href={examplePaper.url}>{examplePaper.title}</Link></p>
        <p>Quoted selections, not a continuous or complete paper. Scim uses this paper in Figure 3. Additional labels and display priorities here are manually curated; no live classification.</p>
        <Link href="https://arxiv.org/pdf/2205.04561v3#page=6">Scim Figure 3</Link>{' · '}<Link href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</Link>
      </div>
      <div className="scim-demo-toolbar"><div className="facet-legend" aria-label="Facet color legend">{facets.map(facet => <span key={facet} className={`facet-tag facet-${facet.toLowerCase()}`}>{facet}</span>)}</div><button type="button" className="matrix-action" onClick={reset}>Reset example</button></div>
      <p className="demo-status" role="status">{highlighted.length} of {sentences.length} excerpt sentences highlighted. {message}</p>
      <div className={`scim-workspace mode-${feature.id}`}>
        <article className="scim-reading" aria-label="Shared real-paper excerpts">
          <header><h5>Read the selected passages</h5><p>Background color = content category. Gold outline = selected reading location. Select any highlighted sentence to inspect it.</p></header>
          {excerptGroups.map((group, groupIndex) => <section className="scim-excerpt-group" key={group.id} aria-labelledby={`scim-group-${group.id}`}>
            {groupIndex > 0 && <p className="scim-excerpt-gap">Other paper content omitted between excerpt groups</p>}
            <h5 id={`scim-group-${group.id}`}>{group.title}</h5>
            {group.paragraphs.map(paragraph => <div className={`scim-paragraph ${local[paragraph.id] ? 'is-adjusted' : ''}`} key={paragraph.id}>
              <div className="scim-paragraph-meta"><span>Excerpt {paragraphs.indexOf(paragraph) + 1} · quoted text</span><Link href={`${examplePaper.pdf}#page=${paragraph.page}`}>{paragraph.locator}</Link></div>
              <p className="scim-quoted">{paragraph.sentences.map(sentence => {
                const record = sentences.find(item => item.id === sentence.id)
                const active = isHighlighted(record, density, local)
                return <span key={sentence.id}>{sentence.gapBefore && <span className="scim-omission" aria-label="Intervening sentences omitted"> […] </span>}{active ? <button type="button" ref={element => { sentenceRefs.current[sentence.id] = element }} className={`scim-sentence facet-${sentence.facet.toLowerCase()} ${focused === sentence.id ? 'is-located' : ''}`} aria-pressed={focused === sentence.id} aria-label={`${sentence.facet}: ${sentence.text}`} onClick={() => locate(record, false)}>{sentence.text}</button> : <span tabIndex={-1} ref={element => { sentenceRefs.current[sentence.id] = element }} className={focused === sentence.id ? 'is-located' : ''}>{sentence.text}</span>}{' '}</span>
              })}</p>
              {paragraph.omission && <p className="scim-excerpt-note">Selection note: {paragraph.omission}</p>}
              {feature.id === 'density' && <div className="paragraph-controls"><span>This paragraph only</span>{[-1, 1].map(direction => <button type="button" key={direction} disabled={nextLocalLevel(paragraph.id, direction, density, local) === null} aria-label={`${direction > 0 ? 'More' : 'Fewer'} highlights in excerpt ${paragraphs.indexOf(paragraph) + 1}`} onClick={() => changeParagraph(paragraph, direction)}>{direction > 0 ? '+ More' : '− Fewer'}</button>)}{local[paragraph.id] !== undefined && <button type="button" onClick={() => { setLocal(previous => { const next = { ...previous }; delete next[paragraph.id]; return next }); setMessage('This paragraph follows the global density settings again.') }}>Use global setting</button>}</div>}
              {selected?.paragraphId === paragraph.id && <aside className="scim-selection-detail" aria-label="Selected sentence explanation">
                <strong>{selected.facet} · {selected.figure3 ? 'Corresponding example in Scim Figure 3' : 'Our teaching label'}</strong><p>{facetMeanings[selected.facet]}</p>
                {selected.id === 'g-method' && <p>This sentence describes generating the evaluation data, not detecting misinformation.</p>}
                {selected.id === 'a-result' && <p>“Up to” is the authors’ maximum reported improvement. See §6.3 and Table 3 for individual datasets and baselines.</p>}
                <p>{selected.figure3 ? 'The category follows Scim’s example; the wording here follows Wu et al.’s published PDF.' : 'The sentence is original paper text. Its category and display priority were selected by us, not produced by Scim.'}</p>
                <button type="button" className="matrix-action" onClick={() => { setFocused(null); sentenceRefs.current[selected.id]?.focus() }}>Clear selection</button>
              </aside>}
            </div>)}
          </section>)}
        </article>
        <aside className="scim-tools" aria-label="Controls and linked reading support">
          {controlsVisible && <div className="scim-tool-panel"><fieldset className="density-controls"><legend>Across all selected excerpts</legend>{facets.map(facet => <label key={facet}><span>{facet}<small>{highlighted.filter(sentence => sentence.facet === facet).length} highlighted</small></span><input type="range" aria-label={`${facet} density`} min="0" max="2" step="1" value={density[facet]} aria-valuetext={['Off', 'Some', 'More'][density[facet]]} onChange={event => changeDensity(facet, Number(event.target.value))} /><span>{['Off', 'Some', 'More'][density[facet]]}</span></label>)}</fieldset><p>Three teaching levels. Off hides a category even with local adjustments. More shows additional eligible sentences, not every sentence.</p></div>}
          {feature.id === 'highlight' && <div className="scim-tool-panel"><h5>Read the categories</h5>{facets.map(facet => <p key={facet}><span className={`facet-tag facet-${facet.toLowerCase()}`}>{facet}</span><br />{facetMeanings[facet]}</p>)}<p>Select a colored sentence for its source and labeling basis. Plain text remains available for context.</p></div>}
          <div className={`scim-tool-panel scim-distribution ${feature.id === 'distribution' ? 'is-emphasized' : ''}`}>
            <h5>Distribution in these excerpts</h5><p>Sentence order within each labeled group. Gray marks are not highlighted. This is not a whole-paper map.</p>
            {excerptGroups.map(group => <div className="scim-map-group" key={group.id}><strong>{group.title}</strong><ol aria-label={`${group.title} sentence highlights`}>{group.paragraphs.flatMap(paragraph => paragraph.sentences).map(sentence => { const record = sentences.find(item => item.id === sentence.id); const active = isHighlighted(record, density, local); return <li key={sentence.id} className={active ? `facet-${sentence.facet.toLowerCase()}` : ''} title={`${record.locator}: ${active ? sentence.facet : 'Not highlighted'}`}><span className="sr-only">{active ? sentence.facet : 'Not highlighted'}</span></li> })}</ol><span>{highlighted.filter(sentence => group.paragraphs.some(paragraph => paragraph.id === sentence.paragraphId)).length} highlighted</span></div>)}
          </div>
          {feature.id === 'context' && <div className="scim-tool-panel scim-browser"><h5>Highlight browser</h5><p>Select a passage to find it in the reading area.</p>{highlighted.length === 0 && <p>No highlights to browse. Choose Highlight controls to turn a category on.</p>}{excerptGroups.map(group => { const entries = highlighted.filter(sentence => group.paragraphs.some(paragraph => paragraph.id === sentence.paragraphId)); return entries.length > 0 && <div key={group.id}><h6>{group.title}</h6>{entries.map(sentence => <button type="button" key={sentence.id} aria-pressed={focused === sentence.id} onClick={() => locate(sentence)}><span className={`facet-tag facet-${sentence.facet.toLowerCase()}`}>{sentence.facet}</span><span>{sentence.text}</span></button>)}</div> })}</div>}
        </aside>
      </div>
      <details className="tutorial-attribution"><summary>Sources, coverage, and teaching adaptations</summary>
        <p><strong>Text:</strong> {examplePaper.authors}, <Link href={examplePaper.url}>{examplePaper.title}</Link>, NAACL 2022, pp. 543–558, © ACL, <Link href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</Link>. Quoted selections retain source wording; line wrapping and hyphenation are normalized. Omissions and page links are marked per excerpt. Figures, tables, equations, and most of the paper are not reproduced.</p>
        <p><strong>Categories:</strong> four sentences correspond to the examples in <Link href="https://arxiv.org/pdf/2205.04561v3#page=6">Scim Figure 3</Link>. Their wording follows the source PDF rather than the figure’s lightly adapted wording. Other facet labels and all display priorities are our teaching annotations, not model predictions or a complete annotation of the paper.</p>
        <p><strong>Interaction:</strong> adapted from <Link href={`${scimSource}#S4`}>Fok et al., Scim §§4.2–4.5</Link>. The three-level sliders, persistent paragraph buttons, sentence explanation panels, feature chooser, thought bubbles, and labeled excerpt map are teaching adaptations. The map replaces PDF scrollbar marks; the text is reflowed. Clicking a colored sentence to inspect its category is our added explanation interaction.</p>
        <p><strong>Fixed simulation:</strong> controls reveal predefined candidates using two manually chosen priority levels. Local controls affect one excerpt paragraph; categories switched off stay off. The browser lists only current highlights. This demonstrates interaction, not extraction accuracy, live AI, full-document coverage, or the original Scim scoring algorithm.</p>
      </details>
    </section>
  </section>
}
