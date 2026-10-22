# SciDaSynth Source Analysis

Implemented October 22, 2026. Open **Papers → SciDaSynth → Source Analysis**.

## Reference implementation audit

The checkout has no standalone ScholarPhi page named “Source Analysis.” Its implemented source-analysis pattern is distributed across:

- `PaperContext.jsx` / `PaperContext.css`: question, relationship, explanation, source links, optional native evidence disclosure, interpretation attribution.
- `PaperTutorial.jsx` and `ScholarPhiTutorial.jsx`: reference disclosures beside the relevant reading interaction (Page Previews and Hands-On Math).
- `PaperVisuals.jsx`: reference context for the error-recovery rationale.
- `ScholarPhiExtraWork.jsx`: related-paper entries using shared context cards and evaluation-page typography.
- `data/scholarPhiContexts.js`: curated paraphrases and claim-specific source links. The related-work page uses similarity selection, while tutorial/rationale entries select references for an explanatory role.

The new page follows the explanatory-role method. It reuses `PaperContext` and the evaluation-page styles, with a small scoped stylesheet for question navigation and evidence limits. Shared context now optionally accepts supplied context and evidence children; existing context-ID callers retain their behavior. No ScholarPhi research summaries are reused as SciDaSynth evidence.

## Evidence ledger

All SciDaSynth sections and reference numbers use [arXiv v3 PDF](https://arxiv.org/pdf/2404.13765v3), September 4, 2025. Its HTML omits the Introduction from numbering, so HTML section numbers are one lower. Each page entry contains the complete bibliographic authors, question, connection, evidence paraphrase, inclusion reason, limitations, and both SciDaSynth and original-evidence links. The canonical records live in `src/data/sciDaSynthSources.js`.

| Connection | SciDaSynth citation / PDF locator | Original evidence inspected |
| --- | --- | --- |
| PaperMage | [35], §4.2 p. 4; §2.1 p. 2 | [§3.1 and Figure 2, printed p. 497 / PDF p. 3](https://aclanthology.org/2023.emnlp-demo.45.pdf#page=3) |
| Dagdelen et al. | [11], §2.1 p. 2; compare §4.2 p. 4 | [Original published article, Figure 1 p. 2, approach before Results p. 3, abstract p. 1](https://perssongroup.lbl.gov/papers/dagdelen_structured_information_extraction_2024.pdf#page=2) |
| Lewis et al., RAG | [34], §1 p. 1; implementation §4.2 p. 4 | [Figure 1 / §2 p. 2 and §§2.1–2.4 pp. 3–4](https://arxiv.org/pdf/2005.11401#page=2) |
| RAGAs | [14] alongside [53], §4.2 p. 4; §4.3.2 pp. 5–6; §7.2 p. 10 | [§3, printed pp. 151–153 / PDF pp. 2–4](https://aclanthology.org/2024.eacl-demo.16.pdf#page=3) |

Selection covers four distinct mechanisms. It does not claim to explain the provenance of every SciDaSynth interaction or supply an exhaustive literature review. No quotations, reconstructed experimental data, or transferred performance claims are used.

**Citation discrepancy:** SciDaSynth §2.1 describes Dagdelen et al. as a GPT-4 example. The original article identifies fine-tuned GPT-3 and Llama-2. The new analysis explicitly follows the original. Publisher retrieval was blocked by a redirect; the full published article was inspected at the coauthor’s institutional research-group PDF above, with DOI and title checked against SciDaSynth’s reference.

The distinction between a cited conceptual foundation and an identical implementation is stated on each card. Quality metrics remain proxies; PDF representations do not prove semantic correctness; the fine-tuned extraction and RAG benchmark results are not SciDaSynth evaluation results. PDF fragments have page-level precision and depend on the reader application.

## Files and preservation

Added `SciDaSynthSources.jsx`, `SciDaSynthSources.css`, `data/sciDaSynthSources.js`, this record, and `scripts/check-source-analysis.mjs`. Updated `App.jsx` (one SciDaSynth tab), `PaperVisuals.jsx` (one paper-specific panel), `PaperContext.jsx` (optional supplied data/evidence), and README navigation documentation.

Existing Overview, How it works, rationale, System Pipeline panels, and Across Papers comparison remain in place. SciDaSynth did not previously have its own System Pipeline tab, and this change does not add one. Pre-existing working-tree edits in `SciDaSynthTutorial.jsx`, `SciDaSynthTutorial.css`, and `docs/SciDaSynth.md` are retained untouched.

## Validation

Validation commands use the existing Playwright-packaged Node executable because node/npm are absent from shell PATH. No dependency manifest or lockfile edits. Installed only the matching missing Windows packages under ignored `node_modules`: Rolldown binding 1.2.12 and Lightning CSS binding 1.33.0; existing dependencies contained Linux bindings.

- Production Vite build passed (59 modules).
- Automated source-analysis checks: see `scripts/check-source-analysis.mjs`; command `node scripts/check-source-analysis.mjs`.
- Whitespace check: `git diff --check`.
- Browser QA could not run: the computer-use provider returned no available browsers or apps. Responsive rules were reviewed in source, but no screenshot, keyboard interaction, or visual layout verification is claimed.

This is a local repository implementation, with no hosting registration, deployment, commit, or push.
