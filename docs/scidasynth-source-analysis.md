# SciDaSynth Related Work: Reference Selection and Evidence Ledger

Updated: October 22, 2026. Open **Papers → SciDaSynth → Related Work**. The filename retains the earlier Source Analysis name.

## Current selection and presentation

The current page displays **three** cited foundations with distinct explanatory roles:

| Displayed source | Understanding need and reason for inclusion | Boundary |
| --- | --- | --- |
| PaperMage | Explain how a PDF becomes a representation connecting text and visual structure | Representation does not establish correct parsing or extraction. |
| Lewis et al., RAG | Explain why a question retrieves source material before generating an answer | A conceptual foundation; citation does not establish an identical retrieval/model implementation. |
| RAGAs | Explain why quality guidance separates faithfulness, answer relevance, and context relevance | These are proxy signals, not proof that an extraction is correct; SciDaSynth also cites another source for quality evaluation. |

This is explanatory-role selection from SciDaSynth's references, not a similarity ranking, exhaustive bibliography screen, or validated optimal set. Each entry shows the original contribution, its connection to SciDaSynth, and links. **Evidence and connection details** expands the original-source paraphrase, exact locator, focal-paper citation, relationship, inclusion reason, and limits.

Dagdelen et al. is retained as a **fourth data record**, but is not displayed by the current component. Its source discrepancy remains in the ledger below; it must not be described as a fourth visible contextual card.

The current component uses evaluation-page styling and its own evidence disclosures. The initial Source Analysis increment used four shared `PaperContext` cards; that presentation is historical. The teammate's original evidence checks are preserved below without claiming they were all repeated in this documentation audit.

## Evidence ledger

SciDaSynth section and reference numbers follow [arXiv v3 PDF](https://arxiv.org/pdf/2404.13765v3), September 4, 2025. Generated HTML section numbers differ. PDF links have page-level precision and depend on the viewer. Canonical evidence records remain in [sciDaSynthSources.js](../src/data/sciDaSynthSources.js).

| Connection / status | SciDaSynth citation and PDF locator | Original evidence recorded |
| --- | --- | --- |
| PaperMage — displayed | [35], §4.2 p. 4; §2.1 p. 2 | [§3.1 and Figure 2, printed p. 497 / PDF p. 3](https://aclanthology.org/2023.emnlp-demo.45.pdf#page=3) |
| Dagdelen et al. — retained, not displayed | [11], §2.1 p. 2; compare §4.2 p. 4 | [Figure 1 p. 2, approach before Results p. 3, abstract p. 1](https://perssongroup.lbl.gov/papers/dagdelen_structured_information_extraction_2024.pdf#page=2) |
| Lewis et al., RAG — displayed | [34], §1 p. 1; implementation §4.2 p. 4 | [Figure 1 / §2 p. 2 and §§2.1–2.4 pp. 3–4](https://arxiv.org/pdf/2005.11401#page=2) |
| RAGAs — displayed | [14] alongside [53], §4.2 p. 4; §4.3.2 starts p. 4 and continues p. 6; §7.2 p. 10 | [§3, printed pp. 151–153 / PDF pp. 2–4](https://aclanthology.org/2024.eacl-demo.16.pdf#page=3) |

The §4.3.2 locator above corrects the earlier documentation's “pp. 5–6”: p. 5 contains figures, while the section starts on p. 4 and continues on p. 6. This does not change application code.

**Retained citation discrepancy:** SciDaSynth §2.1 characterizes Dagdelen et al. as a GPT-4 example; the original article identifies fine-tuned GPT-3 and Llama-2. The earlier audit followed the original article at the coauthor's institutional PDF after publisher retrieval failed. That discrepancy is research context in the retained record, not currently visible UI content.

No source's extraction benchmark or performance result is transferred to SciDaSynth. These connections do not establish shared code, complete mechanism provenance, or a benefit of displaying the references in Beyond the Query.

## Files and current review boundary

- [SciDaSynthSources.jsx](../src/SciDaSynthSources.jsx) selects the three displayed records and renders their summaries/disclosures.
- [SciDaSynthSources.css](../src/SciDaSynthSources.css) and shared evaluation styles handle presentation.
- [sciDaSynthSources.js](../src/data/sciDaSynthSources.js) retains all four evidence records.
- [SciDaSynth.md](SciDaSynth.md) is the authoritative current six-tab record; SciDaSynth now has its own System Pipeline and Evaluation & Findings tabs.
- `scripts/check-source-analysis.mjs` is a **legacy check**: it requires four visible entries, old internal links, and old disclosure markup. It is not valid as a current Related Work acceptance test. Updating it is outside this documentation-only wrap-up; do not claim that it passes for the current UI.

The October 22 wrap-up reconciles these records with the current source. It does not independently re-audit every original publication or rerun the original system. The notes below refer only to the initial Source Analysis increment.

## Historical validation of the Source Analysis increment

Validation commands use the existing Playwright-packaged Node executable because node/npm are absent from shell PATH. No dependency manifest or lockfile edits. Installed only the matching missing Windows packages under ignored `node_modules`: Rolldown binding 1.2.12 and Lightning CSS binding 1.33.0; existing dependencies contained Linux bindings.

- Production Vite build passed (59 modules).
- Automated source-analysis checks: see `scripts/check-source-analysis.mjs`; command `node scripts/check-source-analysis.mjs`.
- Whitespace check: `git diff --check`.
- Browser QA could not run: the computer-use provider returned no available browsers or apps. Responsive rules were reviewed in source, but no screenshot, keyboard interaction, or visual layout verification is claimed.

This is a local repository implementation, with no hosting registration, deployment, commit, or push.
