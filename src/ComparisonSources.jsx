// Reuse the same locators in the map and all four comparison presentations.
export default function ComparisonSources({ cell }) {
  return <div className="comparison-source-links">
    {cell.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
      {source.label} ↗<span className="sr-only"> (opens in a new tab)</span>
    </a>)}
  </div>
}
