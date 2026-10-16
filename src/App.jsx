import { useRef, useState } from 'react'
import { papers } from './data/papers'
import ComparisonMatrix from './ComparisonMatrix'
import PaperVisuals from './PaperVisuals'
import './App.css'

const views = [{ id: 'papers', label: 'Papers' }, { id: 'across', label: 'Across Papers' }]
const sections = [{ id: 'overview', label: 'Overview' }, { id: 'workflow', label: 'How it works' }, { id: 'rationale', label: 'Design rationale' }]

function navigateTabs(event, index, items, select, refs) {
  let nextIndex
  if (event.key === 'ArrowRight') nextIndex = (index + 1) % items.length
  else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + items.length) % items.length
  else if (event.key === 'Home') nextIndex = 0
  else if (event.key === 'End') nextIndex = items.length - 1
  else return
  event.preventDefault()
  select(items[nextIndex].id)
  refs.current[nextIndex].focus()
}

function App() {
  const [activeView, setActiveView] = useState('papers')
  const [activeSection, setActiveSection] = useState('overview')
  const [collectionCollapsed, setCollectionCollapsed] = useState(false)
  const [selectedPaperId, setSelectedPaperId] = useState(papers[0].id)
  const tabRefs = useRef([])
  const sectionTabRefs = useRef([])
  const selectedPaper = papers.find((paper) => paper.id === selectedPaperId)
  const paperSections = selectedPaperId === 'scholarphi'
    ? [sections[0], sections[1], { id: 'pipeline', label: 'System Pipeline' }, sections[2], { id: 'evaluation', label: 'Evaluation & Findings' }, { id: 'extra-work', label: 'Related work' }]
    : selectedPaperId === 'scim'
      ? [sections[0], sections[1], { id: 'pipeline', label: 'System Pipeline' }, sections[2], { id: 'evaluation', label: 'Evaluation & Findings' }]
      : sections

  function selectPaper(id) {
    if (id === selectedPaperId) return
    setSelectedPaperId(id)
    setActiveSection('overview')
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href={`#panel-${activeView}`}>Skip to workspace content</a>
      <header className="app-header">
        <a className="brand" href="./" aria-label="Beyond the Query home">
          <span className="brand-mark" aria-hidden="true">bq.</span><span>Beyond the Query</span>
        </a>
        <span className="workspace-label">Research workspace</span>
      </header>
      <main className="workspace">
        <div className="workspace-heading">
          <p className="eyebrow">Your reading workspace</p>
          <h1>A closer look at the literature.</h1>
          <p className="intro">Explore the papers in your collection and open their original sources.</p>
        </div>
        <div className="workspace-tabs" role="tablist" aria-label="Workspace views">
          {views.map((view, index) => <button key={view.id} id={`tab-${view.id}`} type="button" role="tab"
            ref={(element) => { tabRefs.current[index] = element }}
            aria-selected={activeView === view.id} aria-controls={`panel-${view.id}`}
            tabIndex={activeView === view.id ? 0 : -1}
            onClick={() => setActiveView(view.id)} onKeyDown={(event) => navigateTabs(event, index, views, setActiveView, tabRefs)}>{view.label}</button>)}
        </div>
        <div id="panel-papers" role="tabpanel" aria-labelledby="tab-papers" hidden={activeView !== 'papers'} tabIndex={0}>
          <section className="collection" aria-labelledby="collection-heading">
            <div className="collection-heading">
              <div className="collection-label">
                <h2 id="collection-heading">{collectionCollapsed ? 'Current paper' : 'Choose a paper'}</h2>
                {!collectionCollapsed && <span className="paper-count">{papers.length}</span>}
                {collectionCollapsed && <p className="collection-current-title">{selectedPaper.title}</p>}
              </div>
              <button type="button" className="collection-toggle" aria-expanded={!collectionCollapsed} aria-controls="paper-list" onClick={() => setCollectionCollapsed(!collectionCollapsed)}>{collectionCollapsed ? 'Change paper' : 'Hide list'}</button>
            </div>
            <ul id="paper-list" className="paper-list" hidden={collectionCollapsed}>
              {papers.map((paper, index) => <li key={paper.id}>
                <button type="button" className="paper-choice" aria-pressed={selectedPaperId === paper.id} aria-controls="paper-detail" onClick={() => selectPaper(paper.id)}>
                  <span className="paper-number" aria-hidden="true">0{index + 1}</span>
                  <span className="paper-name">{paper.title}</span>
                  <span className="paper-meta">{paper.venue} · {paper.year}</span>
                  <span className="selection-indicator" aria-hidden="true">{selectedPaperId === paper.id ? '●' : '○'}</span>
                </button>
              </li>)}
            </ul>
          </section>
          <section id="paper-detail" className="paper-detail" aria-labelledby="paper-heading" tabIndex={-1}>
            <div className="paper-heading-group" aria-live="polite" aria-atomic="true">
              <p className="eyebrow">Selected paper</p>
              <h2 id="paper-heading">{selectedPaper.title}</h2>
              <p className="publication">{selectedPaper.venue} · {selectedPaper.year}</p>
            </div>
            <div className="paper-section-tabs" role="tablist" aria-label="Selected paper views">
              {paperSections.map((section, index) => <button key={section.id} id={`paper-tab-${section.id}`} type="button" role="tab"
                ref={(element) => { sectionTabRefs.current[index] = element }}
                aria-selected={activeSection === section.id} aria-controls={`paper-panel-${section.id}`}
                tabIndex={activeSection === section.id ? 0 : -1}
                onClick={() => setActiveSection(section.id)} onKeyDown={(event) => navigateTabs(event, index, paperSections, setActiveSection, sectionTabRefs)}>{section.label}</button>)}
            </div>
            <div id="paper-panel-overview" role="tabpanel" aria-labelledby="paper-tab-overview" hidden={activeSection !== 'overview'} tabIndex={0}>
              <section className="abstract-section" aria-labelledby="abstract-heading">
                <h3 id="abstract-heading">Abstract</h3>
                <div className="abstract-text">{selectedPaper.abstract.map((paragraph, index) => <p key={`${selectedPaper.id}-${index}`}>{paragraph}</p>)}</div>
                <details className="abstract-attribution" key={selectedPaper.id}>
                  <summary>Abstract source &amp; attribution</summary>
                  <p>{selectedPaper.authors}</p>
                  <p><a href={selectedPaper.abstractSourceUrl} target="_blank" rel="noopener noreferrer">{selectedPaper.abstractSourceLabel}<span className="sr-only"> (opens in a new tab)</span></a>{' · '}<a href={selectedPaper.abstractLicenseUrl} target="_blank" rel="noopener noreferrer">{selectedPaper.abstractLicense}<span className="sr-only"> (opens in a new tab)</span></a></p>
                  <p>Author-written abstract. Wording unchanged; paragraph layout adjusted for readability.</p>
                </details>
              </section>
              <div className="source-section">
                <h3>Original sources</h3><p>Read the paper or explore its accompanying code.</p>
                <div className="source-links">
                  <a className="source-link primary-link" href={selectedPaper.paperUrl} target="_blank" rel="noopener noreferrer">Read paper <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
                  <a className="source-link" href={selectedPaper.repositoryUrl} target="_blank" rel="noopener noreferrer">View repository <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a>
                </div>
              </div>
            </div>
            <PaperVisuals key={selectedPaper.id} paperId={selectedPaper.id} activeSection={activeSection} onSectionChange={setActiveSection} />
          </section>
        </div>
        <div id="panel-across" role="tabpanel" aria-labelledby="tab-across" hidden={activeView !== 'across'} tabIndex={0}><ComparisonMatrix /></div>
      </main>
    </div>
  )
}

export default App
