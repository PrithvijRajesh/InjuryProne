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

## Body map sizing fix

**What it does:** The front and back body diagrams now render at the same physical size, and the "Body map adapted from..." credit line sits at the bottom of the screen instead of hugging the figures.

**Why it matters:** The back view's calves extend further down than any front-view content (data goes to y=2200 vs. front's ~1955 in the shared 1000-wide coordinate space), but both views shared a `viewBox` sized to only 2000 tall with `overflow: visible` — so the back figure's calves rendered outside the SVG's box, making the back figure look taller/longer than the front even though both used the same box.

**How it's built:**
- `src/data/muscleGroups.ts` — `OVERVIEW_VIEWBOX` height raised from 2000 to 2200 (the true max content height across both views), so nothing overflows and both figures occupy an identically-sized box.
- `BodyMap.css` — `.body-map-wrap` is a flex column with `justify-content: space-between` and a `min-height`, so the credit line is pushed toward the bottom of the screen instead of sitting immediately under the images.
