import { useState } from 'react'
import { papers } from './data/papers'
import './App.css'

function App() {
  const [selectedPaperId, setSelectedPaperId] = useState(papers[0].id)
  const selectedPaper = papers.find((paper) => paper.id === selectedPaperId)

  return (
    <div className="app-shell">
      <a className="skip-link" href="#paper-detail">Skip to selected paper</a>
      <header className="app-header">
        <a className="brand" href="./" aria-label="Beyond the Query home">
          <span className="brand-mark" aria-hidden="true">bq.</span>
          <span>Beyond the Query</span>
        </a>
        <span className="workspace-label">Research workspace</span>
      </header>

      <main className="workspace">
        <div className="workspace-heading">
          <p className="eyebrow">Your reading workspace</p>
          <h1>A closer look at the literature.</h1>
          <p className="intro">Explore the papers in your collection and open their original sources.</p>
        </div>

        <div className="workspace-layout">
          <aside className="collection" aria-labelledby="collection-heading">
            <div className="collection-heading">
              <h2 id="collection-heading">Papers</h2>
              <span className="paper-count">{papers.length}</span>
            </div>
            <p className="collection-hint">Select a paper to explore.</p>
            <ul className="paper-list">
              {papers.map((paper, index) => (
                <li key={paper.id}>
                  <button
                    type="button"
                    className="paper-choice"
                    aria-pressed={selectedPaperId === paper.id}
                    aria-controls="paper-detail"
                    onClick={() => setSelectedPaperId(paper.id)}
                  >
                    <span className="paper-number" aria-hidden="true">0{index + 1}</span>
                    <span className="paper-choice-text">
                      <span className="paper-name">{paper.title}</span>
                      <span className="paper-meta">{paper.venue} · {paper.year}</span>
                    </span>
                    <span className="selection-indicator" aria-hidden="true">
                      {selectedPaperId === paper.id ? '●' : '○'}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <section id="paper-detail" className="paper-detail" aria-labelledby="paper-heading" tabIndex={-1}>
            <div className="paper-heading-group" aria-live="polite" aria-atomic="true">
              <p className="eyebrow">Selected paper</p>
              <h2 id="paper-heading">{selectedPaper.title}</h2>
              <p className="publication">{selectedPaper.venue} · {selectedPaper.year}</p>
            </div>
            <section className="abstract-section" aria-labelledby="abstract-heading">
              <h3 id="abstract-heading">Abstract</h3>
              <div className="abstract-text">
                {selectedPaper.abstract.map((paragraph, index) => (
                  <p key={`${selectedPaper.id}-${index}`}>{paragraph}</p>
                ))}
              </div>
              <details className="abstract-attribution" key={selectedPaper.id}>
                <summary>Abstract source &amp; attribution</summary>
                <p>{selectedPaper.authors}</p>
                <p>
                  <a href={selectedPaper.abstractSourceUrl} target="_blank" rel="noopener noreferrer">
                    {selectedPaper.abstractSourceLabel}<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  {' · '}
                  <a href={selectedPaper.abstractLicenseUrl} target="_blank" rel="noopener noreferrer">
                    {selectedPaper.abstractLicense}<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
                <p>Author-written abstract. Wording unchanged; paragraph layout adjusted for readability.</p>
              </details>
            </section>
            <div className="source-section">
              <h3>Original sources</h3>
              <p>Read the paper or explore its accompanying code.</p>
              <div className="source-links">
                <a className="source-link primary-link" href={selectedPaper.paperUrl} target="_blank" rel="noopener noreferrer">
                  Read paper <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a className="source-link" href={selectedPaper.repositoryUrl} target="_blank" rel="noopener noreferrer">
                  View repository <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
