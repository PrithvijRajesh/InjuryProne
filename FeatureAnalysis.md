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

## Recovery & prevention tips (Milestone 4)

**What it does:** Clicking a diagnosis card in the results list opens a dedicated recovery screen for that specific diagnosis: concrete recovery steps (e.g. icing windows, gentle mobility progressions), what to avoid while healing, ongoing prevention habits, and a "see a doctor if" callout for red-flag symptoms. A "Back to diagnoses" action returns to the same ranked list.

**Why it matters:** This is PRD feature 4 and the actual payoff of the whole flow — a ranked diagnosis by itself doesn't help someone recover; they need to know what to *do*. Content is deliberately generic and self-care-level (RICE-style guidance, gradual return-to-activity, standard prevention habits) rather than a clinical treatment plan, and every entry's "seek help if" section funnels anything serious toward "see a doctor or physical therapist" — matching the PRD's explicit scope limit of generic recommendations only, no specific providers or treatment directives.

**How it's built:**
- `src/data/recoveryPlans.ts` — `RECOVERY_BY_DIAGNOSIS_ID`, keyed by the same diagnosis `id` used in `diagnoses.ts`. Each entry is a `RecoveryPlan` with 4 string-array fields (`recoverySteps`, `avoid`, `preventionTips`, `seekHelpIf`) authored per diagnosis rather than shared/generic text, so a rotator cuff strain and a meniscus tear get meaningfully different guidance instead of interchangeable boilerplate.
- `src/components/RecoveryPlan.tsx` + `.css` — renders the 4 sections as cards reusing the app's existing panel/list visual language; the "seek help if" card gets an accent border to visually separate "self-care" from "this needs a professional."
- `DiagnosisResults.tsx` — diagnosis cards became clickable (`<button>` instead of `<div>`) with a new `onSelectDiagnosis` callback prop, so selecting a diagnosis is a first-class interaction rather than a dead-end display.
- `MuscleGroupDetail.tsx` — the old boolean `showResults` toggle became a 3-state `view` (`symptoms` | `results` | `recovery`) plus a `selectedMatch` field, so the flow is symptoms → results → recovery with each "back" action returning exactly one step rather than all the way to the start.

**Verification note:** cross-checked every diagnosis id in `diagnoses.ts` against the keys in `recoveryPlans.ts` with a standalone script — all 48 diagnoses across the 15 muscle groups have a matching recovery entry, none missing or orphaned. `tsc --noEmit` and `oxlint` both clean. The Chrome browser extension wasn't connected this session, so the click-through wasn't driven automatically — confirmed the dev server serves the app correctly and opened it in the default browser for manual review instead.

**Update — concreteness pass:** the first draft leaned on vague verbs ("reduce," "light," "gentle") that don't tell a user what to actually do. Rewrote every one of the 48 entries so each bullet names a specific exercise or stretch with sets/reps/hold time, a specific rest duration in days rather than "take it easy," and a specific return-to-activity threshold (e.g. a percent-per-week mileage increase) rather than "ease back in gradually." The goal: a user should be able to read any single bullet and know exactly what to do today, without interpreting what "light" or "reduce" means for them.

**Update — severity-scaled rest:** a flat day count (e.g. "rest 7-10 days") worked against the app's own purpose — it treats someone with barely-there soreness the same as someone with a much more significant version of the same injury, and never gives the "catch it early, back off for a couple days" guidance that the whole self-report flow is supposed to enable. Rewrote the first recovery-steps bullet for the 36 diagnoses that had a flat count into a two-branch structure: a short, specific recovery window for mild presentations (usually 2-3 days, or cutting activity volume by about half for overuse-type injuries) versus the fuller 5-10 day window for presentations that are sharp, limit normal movement, or show bruising/swelling. Diagnoses that already avoided flat rest windows (back-pain conditions, which modern guidance already treats as "stay gently active," plus cramps and posture-driven issues) were left unchanged. The three true red-flag diagnoses (tendon rupture, meniscus tear, sports hernia) kept firm "stop and see a doctor" language rather than severity branching, with an added note that mild-feeling pain doesn't reliably rule out something structurally significant for those specific injuries — severity self-assessment is the wrong tool there, unlike for a garden-variety strain or early tendinitis.

**Update — plain-language activities:** grouped activity phrases like "jumping and landing activity" or "change-of-direction activity" read as clinical shorthand rather than something a user could picture doing. Reworded 13 of these across the 48 entries to name the actual movement (specific examples in parentheses where useful — "jumping (box jumps, jump rope)," "explosive knee-drive movements (high kicks, quick sprint starts)") so every instruction reads as a concrete action rather than a category label.

## Telltale signs (diagnosis disambiguation)

**What it does:** Every diagnosis card in the results list now shows a highlighted "Telltale sign" line — one concrete, self-checkable detail that distinguishes it from the other diagnoses it commonly gets confused with in the same muscle group. For example, in Knees, Osgood-Schlatter's telltale sign is "a tender, sometimes visibly swollen bump right below the kneecap, in a still-growing teenager," while Patellar Tendinitis's is "a tender spot right below the kneecap that hurts most on landing from a jump" — same general location, different specific tell.

**Why it matters:** The scoring system in Milestone 3 can legitimately put 2-4 diagnoses in the same confidence band for one symptom combination, since it's intentionally not trying to force a single "correct" answer out of a self-report tool. But that left users with a list of similar-sounding conditions and no way to judge which one actually matches what they're feeling. Rather than add a whole extra disambiguating-question step to the flow (a bigger UI/logic change), the user chose the simpler, more direct fix: give each diagnosis one distinguishing physical detail right where they're already looking, on the results card itself.

**How it's built:**
- `src/data/diagnoses.ts` — added a required `telltaleSign: string` field to the `Diagnosis` type and the `diagnosis()` helper's signature (positioned between `summary` and `indicators`), then wrote one for all 48 diagnoses. Each is a specific, checkable physical detail (a location, a trigger, a visual sign) rather than a restatement of the summary — the summary explains what the injury *is*, the telltale sign is what you'd notice to tell it apart from a neighbor.
- `src/components/DiagnosisResults.tsx` + `.css` — renders it as a highlighted callout (accent-colored left border, "Telltale sign:" label) between the summary and the matching-signs count on every diagnosis card.

**Verification note:** confirmed all 48 `diagnosis()` call sites compile against the new 5-argument function signature — a missing `telltaleSign` argument would shift `indicators` into the wrong parameter and fail `tsc --noEmit`, which stayed clean. `oxlint` clean as well.
