# Feature Analysis

## Interactive body model (Milestone 1)

**What it does:** User sees a front and back body diagram and clicks a muscle group (e.g. Hamstrings). The view zooms to a confirmation screen showing the selected group, ready to hand off to symptom questions.

**Why it matters:** This is the entry point to the whole app (PRD Core User Story). Every later step — symptoms, diagnosis, recovery guidance — depends on first getting a muscle-group selection here. Kept intentionally flat (one click, one confirmation) rather than adding a second "pick the exact muscle" step — simpler to use, and the symptom questions in the next feature can narrow things down instead.

**How it's built:**
- `src/data/muscleGroups.ts` — single source of truth. Each muscle group has a `view` (front/back) and an array of `shapes` (SVG polygons) that both draw its region on the body map and serve as its click target.
- The body isn't a photo — it's built entirely from polygons (`ShapeRenderer.tsx`), styled as one coherent faceted figure via a shared body-fill color and background-colored seams between facets. Adding a new group is a data change, not new artwork. The polygon coordinates are adapted from the open-source `react-body-highlighter` project (MIT License), which is why the body reads as a real anatomical diagram rather than a blocky placeholder.
- `App.tsx` swaps between the overview (`BodyMap`) and the confirmation view (`MuscleGroupDetail`) with a Framer Motion scale/fade transition — the "zoom into the muscle" effect from the original ask.

**History:** an earlier version of this feature zoomed into a second screen per group — a real anatomical reference image (Gray's Anatomy and similar public-domain atlases) with hand-placed hotspots for each individual muscle in the group, plus a "not sure / multiple areas" option. That was built out for all 13 groups, then removed after deciding it added a step without enough payoff for a "click where it hurts" flow — group-level selection is enough to hand off to symptom questions. The reference images (~6MB) and their hotspot data were deleted along with it rather than left unused.
