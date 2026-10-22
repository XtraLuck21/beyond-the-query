import { useId, useRef, useState } from 'react'
import {
  evaluationSource, studySetup, evaluationDatasets, evaluationConditions,
  evaluationMetrics, quantitativeFindings, userPerceptionFindings,
  failureCases, evaluationEvidence, reportingUncertainties,
} from './data/sciDaSynthEvaluation'
import './ScholarPhiEvaluation.css'
import './SciDaSynthEvaluation.css'

const methods = Object.fromEntries(evaluationConditions.map(item => [item.id, item]))
const metrics = Object.fromEntries(evaluationMetrics.map(item => [item.id, item]))
const uncertaintyById = Object.fromEntries(reportingUncertainties.map(item => [item.id, item]))
const views = [{ id: 'quality', label: 'Data Quality' }, { id: 'efficiency', label: 'Efficiency' }, { id: 'perceptions', label: 'User Perceptions' }]
const primaryRatingIds = ['rating-workflow', 'rating-mental', 'rating-physical', 'rating-willingness', 'rating-confidence', 'rating-learning']
const testNames = { 'paired-student-t': 'Paired Student’s t-test', 'mann-whitney-u': 'Mann–Whitney U test', 'wilcoxon-signed-rank': 'Wilcoxon signed-rank test' }
const printed = value => value?.reported ?? 'Not reported'

function Sources({ ids }) {
  const links = new Map()
  for (const id of new Set(ids)) {
    const source = evaluationEvidence[id]
    const figuresAndTables = [...source.figures.map(item => ({ ...item, type: 'Fig.' })), ...source.tables.map(item => ({ ...item, type: 'Table' }))]
    const targets = figuresAndTables.length
      ? figuresAndTables.map(item => ({ label: `${source.section.startsWith('Appendix') ? '' : `§${source.section} · `}${item.type} ${item.number} · p. ${item.pdfPage}`, page: item.pdfPage }))
      : source.pdfPages.map(page => ({ label: `§${source.section} · p. ${page}`, page }))
    for (const target of targets) links.set(`${target.label}|${target.page}`, { ...target, locator: source.locator })
  }
  return <span className="synth-eval-sources">{[...links.entries()].map(([key, link]) => <a key={key} href={`${evaluationSource.url}#page=${link.page}`} title={link.locator} target="_blank" rel="noopener noreferrer">{link.label} ↗<span className="sr-only"> (opens PDF in a new tab)</span></a>)}</span>
}

function Disclosure({ title, children }) {
  return <details className="eval-disclosure"><summary>{title}</summary><div className="eval-disclosure-body">{children}</div></details>
}

function UncertaintyLinks({ ids, prefix }) {
  const localNotes = { 'unc-participants': 'participants-note', 'unc-assignment': 'methods-note', 'unc-aggregation': 'methods-note', 'unc-statistics': 'methods-note', 'unc-baseline-b': 'baseline-b-note', 'unc-dimension-ties': 'quality-note', 'unc-questionnaire-wording': 'questionnaire-note' }
  return <ul className="synth-eval-uncertainty-links">{[...new Set(ids)].map(id => <li key={id}><a href={`#${prefix}-${localNotes[id]}`}>{uncertaintyById[id].title}</a></li>)}</ul>
}

function PValue({ test }) {
  return test?.pValue ? <>p {test.pValue.operator} {test.pValue.reported}</> : <>No comparison p-value reported</>
}

function MeanSD({ measurement }) {
  if (!measurement) return <>Not reported</>
  return <>{printed(measurement.mean)}{measurement.sd && <> (SD {printed(measurement.sd)})</>}</>
}

function FindingEvidence({ finding, prefix }) {
  return <Disclosure title="Comparison details & evidence">
    <p>{finding.condition}</p>
    {finding.test && <p>{testNames[finding.test.type] || finding.test.type}{finding.test.statistic && <> · {finding.test.statistic.symbol} = {finding.test.statistic.reported}</>} · <PValue test={finding.test} />{finding.test.missing.statistic && <>. {finding.test.missing.statistic}</>}</p>}
    {finding.measurements.map(item => <p key={item.methodId}><strong>{methods[item.methodId].label}:</strong> <MeanSD measurement={item} />{item.mean === null && <>. {item.missing.mean}</>}</p>)}
    <p><strong>Our interpretation:</strong> {finding.interpretation}</p>
    <Sources ids={finding.evidence} />
    <UncertaintyLinks ids={finding.uncertaintyIds} prefix={prefix} />
  </Disclosure>
}

function MethodTable({ measurements, caption, unit }) {
  return <table className="synth-eval-table"><caption>{caption} · {unit}</caption><thead><tr><th scope="col">Method</th><th scope="col">Mean</th><th scope="col">SD</th></tr></thead><tbody>{measurements.map(item => <tr key={item.methodId}><th scope="row">{methods[item.methodId].label}</th><td>{printed(item.mean)}</td><td>{printed(item.sd)}</td></tr>)}</tbody></table>
}

function qualityMeasurements(findings) {
  return [...new Map(findings.flatMap(item => item.measurements).map(item => [item.methodId, item])).values()]
}

function QualityBars({ dataset, measurements, scale }) {
  return <figure className="synth-eval-quality-chart">
    <figcaption>{dataset.label}<span>Mean expert-rated score · higher is better</span></figcaption>
    <ul>{measurements.map(item => <li key={item.methodId}>
      <div className="synth-eval-bar-label"><span>{methods[item.methodId].label}</span><strong>{printed(item.mean)} <small>/ {scale[1]}</small></strong></div>
      <div className="synth-eval-bar-track" aria-hidden="true"><span className={item.methodId === 'method-scidasynth' ? 'is-scidasynth' : ''} style={{ width: `${(item.mean.value - scale[0]) / (scale[1] - scale[0]) * 100}%` }} /></div>
    </li>)}</ul>
    <div className="synth-eval-bar-scale" aria-hidden="true"><span>{scale[0]}</span><span>{scale[1]} points</span></div>
  </figure>
}

function QualityView({ prefix }) {
  const scale = metrics['metric-quality'].scale
  return <>
    <h5>Expert-rated data quality</h5><p>Score scale: {scale.join('–')}, higher is better. Scores include partial credit; they are not accuracy percentages.</p>
    <aside className="synth-eval-explainer" id={`${prefix}-quality-note`}><strong>What does this mean?</strong><p><b>Authors’ finding:</b> SciDaSynth had higher mean quality scores than both baselines in each dataset.</p><p><b>Our interpretation:</b> the overall scores favor SciDaSynth in these tasks, but do not show that every field improved. Some per-dimension fully correct percentages tie with human Baseline A.</p></aside>
    <div className="synth-eval-quality-charts">{evaluationDatasets.map(dataset => {
      const findings = quantitativeFindings.dataQuality.filter(item => item.datasetId === dataset.id)
      return <QualityBars key={dataset.id} dataset={dataset} measurements={qualityMeasurements(findings)} scale={scale} />
    })}</div>
    <Sources ids={['ev-measures', 'ev-quality']} />
    <Disclosure title="Statistical details">
      <p>Means and standard deviations (SD) describe the reported score distributions. The tests below compare methods; no per-dimension significance tests are reported.</p>
      {evaluationDatasets.map(dataset => {
        const findings = quantitativeFindings.dataQuality.filter(item => item.datasetId === dataset.id)
        return <article key={dataset.id}><h5>{dataset.label}</h5><MethodTable measurements={qualityMeasurements(findings)} caption="Reported aggregate quality" unit={`${scale.join('–')} points`} />
          <div className="synth-eval-stat-tests">{findings.map(finding => <section key={finding.id} aria-label={finding.measurements.map(item => methods[item.methodId].label).join(' vs ')}>
            <h6>{finding.measurements.map(item => methods[item.methodId].label).join(' vs ')}</h6><p>{finding.condition}. {testNames[finding.test.type]} · {finding.test.statistic.symbol} = {finding.test.statistic.reported} · <PValue test={finding.test} /></p><p><strong>Our interpretation:</strong> {finding.interpretation}</p>
          </section>)}</div><Sources ids={[...new Set(findings.flatMap(item => item.evidence))]} /><UncertaintyLinks ids={findings.flatMap(item => item.uncertaintyIds)} prefix={prefix} />
        </article>
      })}
    </Disclosure>
    <aside className="eval-context" id={`${prefix}-baseline-b-note`}><strong>Reporting note: Baseline B values conflict</strong>{quantitativeFindings.conflictingReports.map(alternate => {
      const dataset = evaluationDatasets.find(item => item.id === alternate.datasetId)
      const original = quantitativeFindings.dataQuality.find(item => item.datasetId === alternate.datasetId && item.measurements.some(value => value.methodId === alternate.methodId)).measurements.find(item => item.methodId === alternate.methodId)
      return <p key={alternate.id}>{dataset.label}: aggregate-results mean {printed(original.mean)}; case-analysis score {printed(alternate.reportedScore)}/{printed(alternate.scoreDenominator)} ({printed(alternate.reportedPercent)}% as labeled by the authors).</p>
    })}<p>The bars use the aggregate-results means from §6.1.1. The case-analysis values in §6.1.3 differ; the paper does not resolve this discrepancy. These reports remain separate; neither is treated as a correction.</p><Sources ids={['ev-quality', 'ev-failures']} /></aside>
    <Disclosure title="Per-dimension results and rater agreement">
      <p>Fully correct percentages are descriptive; no per-dimension significance tests are supplied. Expand a dataset for all category distributions.</p>
      {evaluationDatasets.map(dataset => <Disclosure key={dataset.id} title={dataset.label}>
        <table className="synth-eval-table"><caption>Reported percentages · correct / partial / incorrect</caption><thead><tr><th scope="col">Dimension</th>{evaluationConditions.map(method => <th scope="col" key={method.id}>{method.label}</th>)}</tr></thead><tbody>{quantitativeFindings.perDimension.filter(item => item.datasetId === dataset.id).map(item => <tr key={item.id}><th scope="row">{dataset.dimensions.find(dimension => dimension.id === item.dimensionId).label}</th>{item.measurements.map(value => <td key={value.methodId}>{printed(value.correct)} / {printed(value.partial)} / {printed(value.incorrect)}</td>)}</tr>)}</tbody></table>
        <Sources ids={[dataset.id === 'dataset-i' ? 'ev-table2' : 'ev-table3']} />
        <p>Rater agreement (Cohen κ): {quantitativeFindings.raterAgreement.filter(item => item.datasetId === dataset.id).map((item, index) => <span key={item.id}>{index > 0 && '; '}{methods[item.methodId].label}: {printed(item.coefficient)}</span>)}.</p><Sources ids={['ev-table4']} />
      </Disclosure>)}
      <UncertaintyLinks ids={['unc-dimension-ties', 'unc-aggregation']} prefix={prefix} />
    </Disclosure>
  </>
}

function EfficiencyView({ prefix }) {
  return <><h5>Time to complete extraction</h5><p>{metrics['metric-time'].definition} Lower is better. This comparison includes SciDaSynth and human Baseline A only.</p><aside className="synth-eval-explainer"><strong>What does this mean?</strong><p><b>Authors’ finding:</b> participants completed the extraction tasks in less time with SciDaSynth in both datasets.</p><p><b>Our interpretation:</b> this measures the whole task, rather than AI response speed or the effect of any one feature. It provides no timing comparison with automated Baseline B.</p></aside><div className="synth-eval-comparisons">{quantitativeFindings.efficiency.map(finding => <article key={finding.id}><h6>{evaluationDatasets.find(item => item.id === finding.datasetId).label}</h6><p className="synth-eval-reduction"><strong>{printed(finding.reportedReductionPercent)}%</strong> reported reduction versus Baseline A</p><MethodTable measurements={finding.measurements} caption="Reported task completion time" unit={finding.unit} /><p><PValue test={finding.test} /></p><FindingEvidence finding={finding} prefix={prefix} /></article>)}</div><Sources ids={['ev-efficiency']} /></>
}

function RatingsTable({ findings, prefix }) {
  return <table className="synth-eval-table synth-eval-ratings"><caption>Subjective questionnaire ratings · mean (SD), not extraction scores</caption><thead><tr><th scope="col">Measure / direction</th><th scope="col">Reported ratings</th><th scope="col">Comparison</th></tr></thead><tbody>{findings.map(finding => <tr key={finding.id}><th scope="row">{finding.label}<small className="synth-eval-direction">{finding.direction === 'lower' ? 'Lower is better' : 'Higher is better'}</small></th><td>{evaluationConditions.filter(item => item.humanOperated).map(method => <p key={method.id}><strong>{method.label}:</strong> <MeanSD measurement={finding.measurements.find(item => item.methodId === method.id)} /></p>)}</td><td><PValue test={finding.test} />{['rating-confidence', 'rating-learning'].includes(finding.id) && <p>No significant difference reported.</p>}<FindingEvidence finding={finding} prefix={prefix} /></td></tr>)}</tbody></table>
}

function PerceptionsView({ prefix }) {
  const scale = metrics['metric-rating'].scale
  return <><h5>What participants reported</h5><p>Item scale: {scale.join('–')}. Results are subjective, and the prose does not establish their dataset attribution. Missing values remain “Not reported.”</p><aside className="synth-eval-explainer"><strong>What does this mean?</strong><p><b>Authors’ finding:</b> participants reported simpler workflows and lower mental and physical workload with SciDaSynth. Confidence and learning difficulty did not differ significantly.</p><p><b>Our interpretation:</b> these ratings describe participants’ experience. They do not independently measure extraction correctness, and nonsignificant results do not establish equivalence.</p></aside><RatingsTable findings={userPerceptionFindings.filter(item => primaryRatingIds.includes(item.id))} prefix={prefix} />
    <aside className="eval-context" id={`${prefix}-questionnaire-note`}><strong>Questionnaire wording needs care</strong><p>{uncertaintyById['unc-questionnaire-wording'].description}</p><Sources ids={['ev-standardization', 'ev-validation', 'ev-figure6']} /></aside>
    <Disclosure title="Additional utility and standardization ratings"><RatingsTable findings={userPerceptionFindings.filter(item => !primaryRatingIds.includes(item.id))} prefix={prefix} /></Disclosure>
    <p className="eval-note">No values were estimated from chart heights. Nonsignificant comparisons do not establish equivalence.</p>
  </>
}

export default function SciDaSynthEvaluation() {
  const prefix = `synth-evaluation-${useId().replaceAll(':', '')}`
  const [view, setView] = useState('quality')
  const tabRefs = useRef([])
  const findingsHeading = useRef(null)
  function openFinding(id) {
    setView(id)
    findingsHeading.current?.focus()
    findingsHeading.current?.scrollIntoView({ block: 'start' })
  }
  function navigate(event, index) {
    const next = event.key === 'ArrowRight' ? (index + 1) % views.length : event.key === 'ArrowLeft' ? (index - 1 + views.length) % views.length : event.key === 'Home' ? 0 : event.key === 'End' ? views.length - 1 : null
    if (next === null) return
    event.preventDefault()
    setView(views[next].id)
    tabRefs.current[next]?.focus()
  }
  return <section className="eval-page synth-evaluation" aria-labelledby={`${prefix}-heading`}>
    <header className="eval-heading"><p className="eyebrow">Evidence behind SciDaSynth</p><h3 id={`${prefix}-heading`}>Evaluation &amp; Findings</h3><p>What the study measured, what changed, and where the evidence remains uncertain.</p></header>
    <section className="eval-section" aria-labelledby={`${prefix}-setup`}><div className="eval-section-heading"><h4 id={`${prefix}-setup`}>Study Setup</h4><Sources ids={['ev-questions', 'ev-measures']} /></div>
      <dl className="eval-facts"><div><dt>Participants</dt><dd><strong>{printed(studySetup.participants.reportedTotal)} reported</strong>Group counts differ; see note below.</dd></div><div><dt>Design</dt><dd><strong>{studySetup.design.type}</strong>Human-operated system comparison</dd></div><div><dt>Collections</dt><dd><strong>{evaluationDatasets.map(item => item.paperCount.reported).join(' + ')} papers</strong>Nutrition and language models</dd></div><div><dt>Session</dt><dd><strong>≈ {printed(studySetup.procedure.durationHours)} hours</strong>Remote tasks, surveys, exploration, interview</dd></div></dl>
      <p className="synth-eval-reporting-note" id={`${prefix}-participants-note`}>Reporting note: {printed(studySetup.participants.reportedTotal)} participants stated; listed groups contain {studySetup.participants.groups.map(item => item.size.reported).join(' + ')}. The paper does not resolve this participant-count discrepancy; no exclusions or missing assignments are inferred. <Sources ids={['ev-participants']} /></p>
      <div className="synth-eval-study-overview">
        <h5>The experiment at a glance</h5>
        <dl>
          <div><dt>Who?</dt><dd>Participants from nutrition science and NLP/ML worked with papers in their domain. The reported headcount and listed groups differ, as noted above.</dd></div>
          <div><dt>What task?</dt><dd>Extract structured information from research papers: crop and nutrient details, or language-model specifications.</dd></div>
          <div><dt>Compared with what?</dt><dd>Each participant used SciDaSynth and Baseline A, which supports manual extraction with PDF tools. Automated GPT Baseline B was run separately.</dd></div>
          <div><dt>What was measured?</dt><dd>Expert-rated data quality, task completion time, and participants’ questionnaire ratings and feedback.</dd></div>
        </dl>
        <p><strong>Within-subjects, in plain language:</strong> the same person tried both human-operated methods. This does not mean everyone extracted the same papers twice; the study counterbalanced system and paper-split orders, but the exact assignment is not fully clear.</p>
        <Sources ids={['ev-participants', 'ev-tasks', 'ev-baselines', 'ev-measures']} />
      </div>
      <div className="synth-eval-methods" aria-label="Comparison methods">{evaluationConditions.map(method => <article className="synth-eval-method-card" key={method.id}>
        <h5>{method.label.replace(' · ', ': ')}</h5><p>{method.definition}</p>{!method.humanOperated && <p className="synth-eval-method-note">Separately run; not a third participant-operated condition.</p>}<Sources ids={method.evidence} />
      </article>)}</div>
      <p className="synth-eval-reporting-note" id={`${prefix}-methods-note`}>Method reporting: exact participant/system/split assignments, score aggregation, and automated sampling are incompletely specified. Degrees of freedom, confidence intervals, effect sizes, and multiplicity adjustments are not reported; p-value inequalities are retained as published. Questionnaire values are not explicitly assigned to a dataset. <Sources ids={['ev-tasks', 'ev-baselines', 'ev-measures']} /></p>
      <div className="eval-setup-details">
        <Disclosure title="Research questions, datasets, and tasks"><ul>{studySetup.researchQuestions.map(item => <li key={item.id}>{item.question}</li>)}</ul>{evaluationDatasets.map(dataset => <article key={dataset.id}><h5>{dataset.label}</h5><p>{dataset.collection} {dataset.paperCount.reported} papers; split sizes {dataset.splitPaperCounts.map(item => item.reported).join(' + ')}.</p><p><strong>Extracted dimensions:</strong> {dataset.dimensions.map(item => item.label).join(', ')}.</p><p>{dataset.sampling}</p><Sources ids={dataset.evidence} /></article>)}</Disclosure>
        <Disclosure title="Procedure, assignment, and measurement"><p>{studySetup.procedure.mode} {studySetup.design.counterbalancing}</p><ol>{studySetup.procedure.steps.map(step => <li key={step.id}>{step.label}{step.minutes && <> · {printed(step.minutes)} minutes</>}{step.minutesPerSystem && <> · {printed(step.minutesPerSystem)} minutes per system</>}</li>)}</ol><p>{studySetup.scoring.reference} {studySetup.scoring.ratersPerDataset.reported} blinded raters per dataset; record scores: {studySetup.scoring.recordRatings.map(item => `${item.value} (${item.label})`).join(', ')}. {studySetup.scoring.disagreementResolution}</p>{evaluationMetrics.filter(item => ['metric-quality', 'metric-time', 'metric-rating'].includes(item.id)).map(metric => <p key={metric.id}><strong>{metric.label}:</strong> {metric.methods.join('; ')}.</p>)}<Sources ids={['ev-procedure', 'ev-measures']} /><UncertaintyLinks ids={['unc-assignment', 'unc-aggregation', 'unc-statistics']} prefix={prefix} /></Disclosure>
      </div>
    </section>
    <section className="eval-section" aria-labelledby={`${prefix}-key`}><h4 id={`${prefix}-key`}>Key Findings</h4><p>Author-reported results from these two paper collections.</p><div className="synth-eval-key-findings">{quantitativeFindings.efficiency.map(finding => <button type="button" key={finding.id} onClick={() => openFinding('efficiency')} aria-controls={`${prefix}-panel-efficiency`}><span>{evaluationDatasets.find(item => item.id === finding.datasetId).label}</span><strong>{printed(finding.reportedReductionPercent)}% less task time</strong><span>Participants finished extraction faster with SciDaSynth than with human Baseline A in this collection.</span><span>Inspect the time comparison →</span></button>)}<button type="button" onClick={() => openFinding('quality')} aria-controls={`${prefix}-panel-quality`}><span>Expert-rated quality</span><strong>Higher mean quality than both baselines</strong><span>This held for both datasets’ overall scores; individual fields sometimes tied with human Baseline A.</span><span>Inspect the scores and reporting notes →</span></button></div><Sources ids={['ev-quality', 'ev-efficiency']} /></section>
    <section className="eval-section" aria-labelledby={`${prefix}-findings`}><h4 id={`${prefix}-findings`} tabIndex={-1} ref={findingsHeading}>Interactive Findings</h4><div className="synth-eval-tabs" role="tablist" aria-label="Evaluation findings views">{views.map((item, index) => <button type="button" role="tab" key={item.id} ref={element => { tabRefs.current[index] = element }} id={`${prefix}-tab-${item.id}`} aria-controls={`${prefix}-panel-${item.id}`} aria-selected={view === item.id} tabIndex={view === item.id ? 0 : -1} onClick={() => setView(item.id)} onKeyDown={event => navigate(event, index)}>{item.label}</button>)}</div>
      <div id={`${prefix}-panel-quality`} role="tabpanel" aria-labelledby={`${prefix}-tab-quality`} hidden={view !== 'quality'} tabIndex={0}><QualityView prefix={prefix} /></div>
      <div id={`${prefix}-panel-efficiency`} role="tabpanel" aria-labelledby={`${prefix}-tab-efficiency`} hidden={view !== 'efficiency'} tabIndex={0}><EfficiencyView prefix={prefix} /></div>
      <div id={`${prefix}-panel-perceptions`} role="tabpanel" aria-labelledby={`${prefix}-tab-perceptions`} hidden={view !== 'perceptions'} tabIndex={0}><PerceptionsView prefix={prefix} /></div>
    </section>
    <section className="eval-section" aria-labelledby={`${prefix}-limits`}><h4 id={`${prefix}-limits`}>Failure Cases and Limitations</h4><p>These failure examples concern the separately run automated Baseline B.</p><div className="synth-eval-failures">{failureCases.filter(item => item.kind === 'automated-baseline-failure').map(item => <Disclosure key={item.id} title={<><strong>{item.title}</strong><span>Author-reported · Baseline B</span></>}><ul>{item.examples.map(example => <li key={example}>{example}</li>)}</ul><p>{item.missing.frequency}</p><p><strong>Our interpretation:</strong> {item.interpretation}</p><Sources ids={item.evidence} /></Disclosure>)}</div>
      <Disclosure title="Generalization and technical limitations">{failureCases.filter(item => item.kind !== 'automated-baseline-failure').map(item => <article key={item.id}><h5>{item.title}</h5><p><strong>Author-stated:</strong> {item.description}</p><p><strong>Our interpretation:</strong> {item.interpretation}</p><Sources ids={item.evidence} /></article>)}</Disclosure>
    </section>
    <footer className="eval-attribution"><a href={evaluationSource.url} target="_blank" rel="noopener noreferrer">Read SciDaSynth’s pinned {evaluationSource.version} PDF ↗<span className="sr-only"> (opens in a new tab)</span></a></footer>
  </section>
}
