import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { sciDaSynthSources } from '../src/data/sciDaSynthSources.js'

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { default: Sources } = await server.ssrLoadModule('/src/SciDaSynthSources.jsx')
  const { default: Context } = await server.ssrLoadModule('/src/PaperContext.jsx')
  const { default: Visuals } = await server.ssrLoadModule('/src/PaperVisuals.jsx')
  const html = renderToStaticMarkup(createElement(Sources))
  assert.equal(sciDaSynthSources.length, 4)
  assert.equal(new Set(sciDaSynthSources.map(source => source.reference)).size, 4)
  for (const source of sciDaSynthSources) {
    assert.ok(html.includes(`id="synth-source-${source.id}"`))
    assert.ok(html.includes(`href="#synth-source-${source.id}"`))
    for (const field of ['authors', 'question', 'basis', 'locator', 'evidence', 'inclusion', 'limitation']) {
      assert.ok(source[field]?.length > 15, `${source.id}: missing ${field}`)
    }
    for (const link of [source.url, ...source.sources.map(item => item.url)]) {
      assert.equal(new URL(link).protocol, 'https:')
      assert.ok(html.includes(link.replaceAll('&', '&amp;')))
    }
    assert.ok(source.sources[0].url.includes('2404.13765v3#page='))
  }
  assert.equal((html.match(/<details class="paper-context-evidence"/g) || []).length, 4)
  assert.ok(html.includes('GPT-3 and Llama-2'))
  // Existing callers must still resolve ScholarPhi context IDs without new props.
  for (const contextId of ['wikipedia', 'guidelines', 'math', 'threddy', 'citesee', 'citeread']) {
    const legacy = renderToStaticMarkup(createElement(Context, { contextId, collapseEvidence: true }))
    assert.ok(legacy.includes('Evidence &amp; sources'))
    assert.ok(legacy.includes('paper-context-question'))
  }
  // Verify actual tab-panel integration and visibility without running model/demo code.
  for (const paperId of ['scholarphi', 'scim', 'scidasynth']) {
    const markup = renderToStaticMarkup(createElement(Visuals, { paperId, activeSection: 'sources', onSectionChange() {} }))
    if (paperId === 'scidasynth') {
      assert.match(markup, /id="paper-panel-sources" role="tabpanel" aria-labelledby="paper-tab-sources" tabindex="0"/)
    } else {
      assert.ok(!markup.includes('id="paper-panel-sources"'))
      assert.ok(markup.includes('id="paper-panel-pipeline"'))
    }
  }
  console.log('PASS: four complete evidence records, internal anchors, HTTPS source links, legacy context cards, and paper-specific tab panels.')
} finally {
  await server.close()
}
