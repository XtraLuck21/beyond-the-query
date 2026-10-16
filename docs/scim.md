# Scim: Content and Development Record

## Related work: contextual reference selection

Date: October 16, 2026. Status: first bounded implementation, pending user review.

This record applies Section 6 of [general_standards.md](general_standards.md) to the new Related work tab. It is not a retrospective claim that the whole bibliography was systematically screened.

### Purpose and scope

The user preferred references that help explain Scim over selection by Connected Papers similarity. The existing core page determines what contextual explanation is useful. This pass addresses two questions: what information-type categories add to salience highlighting, and why support reading inside the source document rather than provide only a summary.

The focal source is [Scim, arXiv:2205.04561v3](https://arxiv.org/html/2205.04561v3), especially §§2.2.2–2.2.4 and §§4.2–4.3. Candidates were nominated from these discussions; this is not an exhaustive search or a similarity ranking. The two initial candidates were already proposed before this screening procedure was written. The procedure makes the inclusion decisions auditable; it does not establish an independently reproduced selection.

### Repeatable screening procedure

1. Freeze the focal paper version and snapshot the existing UI content. Write each remaining question before choosing a new reference. Record its destination tab and why the existing explanation is insufficient.
2. Inspect the focal section discussing that question and list its directly cited candidates. Record title, bibliographic identity, and citation location. For a future complete screening pass, record every candidate in the declared sections, including exclusions. No such completeness is claimed here.
3. Apply the following gates to each candidate. Use Pass, Fail, or Pending with a locator and a short explanation. Any Pending source check prevents implementation of the affected claim.

| Gate | Observable inclusion requirement |
| --- | --- |
| G1: Question fit | Name the exact reader question and identify the mechanism/output in the source that answers it. General topical similarity is insufficient. |
| G2: Traceable relationship | Locate the citation in Scim and classify the relation as precedent, contrast, definition, design basis, or other supported relation. Do not infer code reuse from citation. |
| G3: Primary evidence | Inspect the original source and record a section/page/figure supporting the displayed claim. Secondary characterization alone remains pending for precise claims. |
| G4: Incremental value | State what the candidate adds beyond content already present, including Design rationale. Prefer linking to existing explanations over duplication. |
| G5: Bounded interpretation | Separate source description from our comparison; keep task, output, and evaluation qualifications. A reference cannot establish superiority without appropriate comparative evidence. |

4. For this first implementation, retain one passing example per question. If multiple candidates pass, prefer the one directly discussed for that mechanism in the focal section, then the one with a clearer locatable primary example; if still tied, document the team's judgment rather than invent a numerical ranking. This remains a qualitative editorial rule.
5. Record accepted, deferred, and already-covered candidates. Revisit the selection if the core page or questions change. Preserve the date, version, and reason for that revision.

### Included records

| Candidate | Gap and relation | Primary evidence | Decision |
| --- | --- | --- | --- |
| [HiText: Text Reading with Dynamic Salience Marking](https://archives.iw3c2.org/www2017/proceedings/companion/p311.pdf) | G1/G2: earlier highlighting approach, cited in Scim §2.2.2; explains the distinction between salience and information-type grouping. | G3: HiText §4.2 and Figure 2, pp. 314–315; compare with Scim §§4.2–4.3. | G4/G5: adds an interaction-level contrast to the existing feature inventory. Include, with no claim of implementation inheritance or comparative performance. |
| [TLDR: Extreme Summarization of Scientific Documents](https://aclanthology.org/2020.findings-emnlp.428/) | G1/G2: alternative output format, cited in Scim §2.2.4; explains the difference between compression and document exploration. | G3: TLDR §1 and Figure 1, p. 4766; Scim §2.2.4. | G4/G5: adds a distinct output-format contrast. Include; do not attribute general summarization concerns to a measured TLDR failure. |

The actual UI summaries and source locators are maintained in `src/data/scimRelatedWork.js` to avoid divergent copies of the content. Cross-system explanations are our source-based synthesis, not quotations. Only selected mechanisms are covered, not the whole external papers or their evaluations.

### Considered alternatives and boundaries

| Candidate | Current disposition | Reason / next condition |
| --- | --- | --- |
| ScholarPhi | Already covered; no new entry | The lowlighting design context is already in Scim Design rationale. |
| Cohan et al. (2019), Teufel et al. (2009) | Already covered; no new entry | Category provenance is already in Design rationale. |
| ScentHighlights | Deferred candidate | A query-guided reading question could justify it. No full original-source mechanism audit is claimed in this pass. |
| Connected Papers recommendations | Outside this selection route | Similarity discovery answers a different question. No similarity scores or top-three claim are used for these entries. |

Other references in the declared sections have not been exhaustively screened. HiText and TLDR are a small approved starting set, not proven optimal choices. Independent reviewers can follow the evidence and gates, but may nominate other eligible works; document such differences.

### UI decisions

- Add Related work to Scim's existing single-paper tabs; preserve ScholarPhi's separate content and selection route.
- Lead each entry with the reader question, full title, publication, and relationship type.
- Place the external mechanism beside Scim's mechanism, stacking the pair on narrow screens.
- Keep the inclusion reason and material qualification visible. Put claim-level source notes and the selection procedure behind native, keyboard-accessible disclosures.
- Use concise paraphrases without copied figures or simulated external systems. No live retrieval, automatic selection, or backend is introduced.

### Implementation and checks

Content: `src/data/scimRelatedWork.js`. View: `src/ScimRelatedWork.jsx` and its stylesheet. Integration: `src/App.jsx` and `src/PaperVisuals.jsx`.

Validation results are recorded in the development log after implementation checks. Source verification and UI checks do not establish comprehension benefit; that remains a study question.
