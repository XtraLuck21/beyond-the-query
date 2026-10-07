export default function TutorialFrame({ name, title, steps, actions, actionId, onAction, onReset, headingRef, attribution, note, children }) {
  const index = actions.findIndex((item) => item.id === actionId)
  const action = actions[index]
  return <section className="visual-section tutorial-section" aria-labelledby="workflow-heading">
    <header className="visual-section-header"><span className="visual-number">01</span><div><h3 id="workflow-heading" tabIndex={-1} ref={headingRef}>How it works</h3><p>{steps.length} steps, one shared example. Select a User or System action to explore what changes.</p></div></header>
    <div className="tutorial-layout">
      <ol className="tutorial-steps">{steps.map((step, i) => <li key={step.title} className={`tutorial-step ${action.step === i ? 'is-current' : ''}`}>
        <div className="tutorial-step-heading"><span className="tutorial-step-number" aria-hidden="true">{i + 1}</span><h4>Step {i + 1} · {step.title}</h4></div>
        <div className="tutorial-role-actions">{['user','system'].map((role) => { const target = actions.find((a) => a.step === i && a.role === role); return <button type="button" key={role} className={`tutorial-action ${role}`} aria-pressed={actionId === target.id} aria-controls="shared-paper-example" onClick={() => onAction(target.id)}><span className="role-label">{role === 'user' ? 'User' : `${name} · System`}</span><strong>{target.label}</strong><span>{target.description}</span></button> })}</div>
      </li>)}</ol>
      <div className="shared-example" id="shared-paper-example" role="region" aria-label={`${name} shared example`}>
        <header className="shared-example-header"><span>{title}</span><button type="button" onClick={onReset}>Restart</button></header>
        <div className="tutorial-cue" role="status"><span>Step {action.step + 1} · {action.role === 'user' ? 'User action' : 'System response'}</span><h4>{action.label}</h4><p>{action.instruction}</p></div>
        <div className={`tutorial-paper ${name.toLowerCase()}-scene`}>
          {action.thought && <aside className="reader-thought" aria-label="Reader’s thought"><span>Reader’s thought · illustrative</span><p>{action.thought}</p></aside>}
          {children}
        </div>
        <nav className="tutorial-navigation" aria-label={`${name} tutorial actions`}><button type="button" disabled={index === 0} onClick={() => onAction(actions[index - 1].id)}>← Previous action</button><span>{index + 1} / {actions.length}</span><button type="button" disabled={index === actions.length - 1} onClick={() => onAction(actions[index + 1].id)}>Next action →</button></nav>
        <details className="tutorial-attribution"><summary>Where does this example come from?</summary>{attribution}</details><p className="tutorial-source-note">{note}</p>
      </div>
    </div>
  </section>
}
