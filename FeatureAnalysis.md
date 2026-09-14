# Feature Analysis

## Interactive body model (Milestone 1)

**What it does:** User sees a front and back body diagram and clicks a muscle group (e.g. Hamstrings). The view zooms to a confirmation screen showing the selected group, ready to hand off to symptom questions.

**Why it matters:** This is the entry point to the whole app (PRD Core User Story). Every later step — symptoms, diagnosis, recovery guidance — depends on first getting a muscle-group selection here. Kept intentionally flat (one click, one confirmation) rather than adding a second "pick the exact muscle" step — simpler to use, and the symptom questions in the next feature can narrow things down instead.

**How it's built:**
- `src/data/muscleGroups.ts` — single source of truth. Each muscle group has a `view` (front/back) and an array of `shapes` (SVG polygons) that both draw its region on the body map and serve as its click target.
- The body isn't a photo — it's built entirely from polygons (`ShapeRenderer.tsx`), styled as one coherent faceted figure via a shared body-fill color and background-colored seams between facets. Adding a new group is a data change, not new artwork. The polygon coordinates are adapted from the open-source `react-body-highlighter` project (MIT License), which is why the body reads as a real anatomical diagram rather than a blocky placeholder.
- `App.tsx` swaps between the overview (`BodyMap`) and the confirmation view (`MuscleGroupDetail`) with a Framer Motion scale/fade transition — the "zoom into the muscle" effect from the original ask.

**History:** an earlier version of this feature zoomed into a second screen per group — a real anatomical reference image (Gray's Anatomy and similar public-domain atlases) with hand-placed hotspots for each individual muscle in the group, plus a "not sure / multiple areas" option. That was built out for all 13 groups, then removed after deciding it added a step without enough payoff for a "click where it hurts" flow — group-level selection is enough to hand off to symptom questions. The reference images (~6MB) and their hotspot data were deleted along with it rather than left unused.

## Symptom questions (Milestone 2)

**What it does:** After picking a muscle group, the user answers four categorized questions specific to that group — **where exactly** it hurts, **what it feels like**, **what makes it worse**, and **what activities** they do regularly — each with its own row of tappable chips, any number selectable per category. A "Continue" button stays disabled until at least one chip anywhere is picked.

**Why it matters:** This is PRD feature 2, and the bridge between "where does it hurt" and "what's the diagnosis" (feature 3). All four categories are tailored per muscle group (not shared lists) so the combination narrows toward an accurate diagnosis — e.g. for Knees, selecting "just below the kneecap" + "makes it worse: bending / running" + "activity: still a growing teen athlete" points specifically toward Osgood-Schlatter, something a flat, generic symptom checklist couldn't distinguish. The "activities you do" category exists specifically to capture that kind of context (sport/exercise pattern), not just the symptom itself. Language stays non-technical (e.g. "feels like it gives way" instead of "instability") so anyone can self-report without a medical background.

**How it's built:**
- `src/data/symptoms.ts` — `SYMPTOM_CATEGORIES_BY_GROUP`, keyed by the same muscle-group `id` used in `muscleGroups.ts`. Each group maps to 4 `SymptomCategory` entries (`location`, `painType`, `trigger`, `activity`), each with its own tailored `{ id, label }` option list.
- `MuscleGroupDetail.tsx` renders each category as a labeled section of toggle chips; selection state is `Record<categoryId, string[]>` so choices in different categories (and multiple choices within one category) are tracked independently. Continue is disabled only while every category is empty.
- Diagnosis logic isn't built yet — Continue currently just reveals a "coming in a later feature" placeholder, the same pattern used for the group-selection step before this one was built.

## Diagnosis with confidence (Milestone 3)

**What it does:** After answering symptom questions and clicking Continue, the user sees a ranked list of possible diagnoses for their muscle group, each with a High/Medium/Low confidence label, a one-line plain-language summary, and how many of that diagnosis's typical signs matched their answers. If nothing matches well, they see a fallback suggesting they see a doctor instead of a fabricated result.

**Why it matters:** This is PRD feature 3, and the payoff for the two features before it. The key design decision is scoring against **indicators** rather than authoring one diagnosis per exact combination of symptoms — with 4 categories and several options each, the number of possible combinations is far too large to enumerate by hand. Instead, each diagnosis lists the symptom options that point toward it, and any combination the user actually picks is scored against every diagnosis for that group by how many of its indicators were matched. This means: (1) every possible combination gets scored, not just ones someone thought to author in advance, and (2) two different combinations that both touch enough of the same indicators naturally land on the same diagnosis — e.g. for Knees, both "below the kneecap + bending + running/jumping + growing teen athlete" and a partial version of the same answers still point to Osgood-Schlatter, while swapping "growing teen athlete" for "running" shifts the top result to Patellar Tendinitis instead, without either combination being individually hard-coded.

Confidence is intentionally shown as a bucket (High/Medium/Low) rather than a precise percentage — this is a self-report tool built from a fixed set of hand-authored indicators, not a validated diagnostic test, so a number like "73%" would imply more precision than the underlying data supports.

**How it's built:**
- `src/data/diagnoses.ts` — `DIAGNOSES_BY_GROUP`, keyed by muscle-group id. Each diagnosis has an `indicators` map from `SymptomCategoryId` to the option ids (from `symptoms.ts`) that support it. `getDiagnosisMatches(groupId, selections)` scores every diagnosis in the group as `matchedIndicators / totalIndicators`, drops zero-match diagnoses, sorts by confidence (ties broken by raw matched count), and returns the top 4.
- `src/components/DiagnosisResults.tsx` + `.css` — renders the ranked cards, the confidence badge, the no-match fallback, and the disclaimer; reuses the app's existing panel/chip visual language.
- `MuscleGroupDetail.tsx` — Continue now computes matches from the current selections and swaps the symptom form for `DiagnosisResults`; "Back to symptoms" swaps back without clearing the selections, so revising answers doesn't force the user to start over.

**Verification note:** checked with a standalone script exercising the real scoring function against realistic symptom combinations (the Chrome browser extension wasn't available this session to click through the UI directly) — confirmed the Osgood-Schlatter vs. Patellar Tendinitis vs. Meniscus Tear cases above, plus that unmatched or empty selections correctly return no results.

## Body map sizing fix

**What it does:** The front and back body diagrams now render at the same physical size, and the "Body map adapted from..." credit line sits at the bottom of the screen instead of hugging the figures.

**Why it matters:** The back view's calves extend further down than any front-view content (data goes to y=2200 vs. front's ~1955 in the shared 1000-wide coordinate space), but both views shared a `viewBox` sized to only 2000 tall with `overflow: visible` — so the back figure's calves rendered outside the SVG's box, making the back figure look taller/longer than the front even though both used the same box.

**How it's built:**
- `src/data/muscleGroups.ts` — `OVERVIEW_VIEWBOX` height raised from 2000 to 2200 (the true max content height across both views), so nothing overflows and both figures occupy an identically-sized box.
- `BodyMap.css` — `.body-map-wrap` is a flex column with `justify-content: space-between` and a `min-height`, so the credit line is pushed toward the bottom of the screen instead of sitting immediately under the images.
