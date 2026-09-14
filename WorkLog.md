# Work Log

## 2026-09-11 — Interactive body model (Milestone 1)

Built the clickable body-map feature: side-by-side front/back muscle-group diagrams, zoom into a muscle group, and (for Hamstrings) a detailed anatomical sub-view with individual muscle hotspots plus a "not sure / multiple areas" option.

- Scaffolded the app (Vite + React + TypeScript), dark theme, Bebas Neue + Inter fonts.
- Built the front/back overview body map with 12 clickable muscle-group regions.
- Built the zoom-in detail flow with Framer Motion transitions.
- Built out **Hamstrings** as the fully detailed exemplar group: real anatomical reference image (Gray's Anatomy, 1918, public domain), cropped to the thigh, with 3 clickable muscle hotspots (biceps femoris, semitendinosus, semimembranosus) plus the "not sure / multiple" option.
- Other 11 groups are clickable and hoverable on the overview but show a "coming soon" placeholder when opened — detailed art for those groups isn't built yet.
- Verified the full click path in-browser: hover, zoom transition, muscle selection, change-selection, back-to-body, and the coming-soon fallback.

### Update — body map visual overhaul

Feedback: the hand-built rounded-rectangle body map looked too blocky, not like a real body diagram. Replaced it with real anatomical polygon data (front/back, faceted muscle-shaped regions) adapted from the open-source `react-body-highlighter` project (MIT License). Same 13 groups, same click/hover/zoom behavior — only the shape data and coordinate space changed. Verified in-browser: overview now reads as an actual muscular figure, hover/click/zoom into Hamstrings still works.

### Update — bigger, brighter body map + all 12 remaining groups built out

Feedback: make the body map bigger and brighter so it pops against the dark background, then build out the rest of the muscle groups. Bumped the figure size and switched the body color from dark slate to a bright near-white (red hover still pops on top). Then sourced real anatomical reference images (mostly Gray's Anatomy 1918, a couple from other public-domain atlases where no clean Gray's plate existed) and defined muscle-level hotspots for all 12 remaining groups: Shoulders, Chest, Abs, Biceps, Forearms, Triceps, Quads, Glutes, Calves, Traps, Upper Back, Lower Back. All 13 muscle groups (including Hamstrings) now have a fully working zoomed detail view with individually clickable muscles and a "not sure / multiple areas" option — the "coming soon" placeholder no longer applies to any group. Verified Shoulders and Quads detail views in-browser after integration; typecheck and production build both clean.

### Update — simplified: dropped the per-muscle picker, credit spacing fixed

Feedback: the sub-muscle picker (zoomed anatomical image + individual muscle hotspots) added a step that wasn't worth it — cleaner and more user-friendly to go straight from "click a muscle group" to symptom questions. Removed the whole picker: clicking a group now shows an immediate "Selected: <Group>" confirmation (still with the zoom-transition animation) instead of a zoomed image with sub-hotspots. Also removed the now-unused anatomical reference images (~6MB) and the `hasDetail`/`detail` data fields — nothing left half-wired. Also fixed the "Body map adapted from..." credit line sitting too close under the figures (more spacing now). Verified in-browser: click any group → immediate confirmation screen, no image/sub-picker step.

### Update — added Knees and Groin/Inner Thigh as clickable groups

Feedback: the diagram had no way to select knee pain or groin/inner-thigh strains — both very common athletic injuries (ACL/meniscus/patellar tendon, groin pulls) — because those regions existed in the body art only as non-clickable filler. Promoted both to real clickable muscle groups (front view) using the polygon shapes that were already sitting there as decoration. Quads (front thigh) and Hamstrings (back thigh) already covered "thigh" more generally. Verified in-browser: hovering highlights both knees/both groin regions together (matches how paired left/right groups already behave elsewhere), clicking Knees shows the confirmation screen correctly.

## 2026-09-12 — Symptom questions (Milestone 2)

Built the symptom-selection step: clicking a muscle group now leads straight into a tailored, multi-select symptom picker instead of the "coming in a later feature" placeholder.

- Added `src/data/symptoms.ts` with a plain-language symptom list per muscle group (all 13 groups covered), written so someone without medical background can self-report — e.g. Knees asks about locking/catching and giving way, Chest asks about pain on a deep breath, Hamstrings asks about a pop/snap felt at the time of injury.
- Updated `MuscleGroupDetail.tsx` to render the group's symptoms as toggle chips; any number can be selected at once, and a "Continue" button stays disabled until at least one is picked.
- Verified in-browser: Chest and Knees each show their own distinct symptom set, multiple chips can be selected/deselected together, Continue enables/disables correctly, and Back to body resets the selection. Typecheck (`tsc -b`) clean.

### Update — split symptoms into 4 tailored categories, fixed body map sizing

Feedback: a flat symptom list wasn't specific enough to lead to an accurate diagnosis — needed separate categories for location within the group, pain type, what triggers/worsens it, and what activities the user does regularly (e.g. knee + below the kneecap + worse when bending/running + still a growing teen athlete should point toward Osgood-Schlatter specifically). Also asked to fix the body map: front/back figures should be the same size (back looked longer since it includes the calves), and the credit line should sit lower, near the bottom of the screen, instead of right under the images.

- Rewrote `src/data/symptoms.ts`: replaced the flat per-group list with `SYMPTOM_CATEGORIES_BY_GROUP`, 4 fully tailored categories per group (location, pain type, trigger, activities) — nothing shared across groups.
- Updated `MuscleGroupDetail.tsx` to render each category as its own labeled chip section, with selections tracked per-category so choices across categories combine independently.
- Fixed the body map: raised `OVERVIEW_VIEWBOX` height from 2000 to 2200 (the back view's calves actually extend to y=2200 in the shared coordinate space, so the old 2000 box let them overflow past the SVG's edge, making the back figure look taller than the front). Pushed the credit line toward the bottom of the screen via a `justify-content: space-between` flex layout on the body-map wrapper.
- Verified in-browser: Quads shows its own 4-category layout, selections across different categories (location + trigger + activity) track independently, Continue enables correctly, front/back figures now render at the same size with no calf overflow, and the credit line sits near the bottom of the page. Typecheck clean.

## 2026-09-13 — Diagnosis with confidence (Milestone 3)

Replaced the "coming in a later feature" placeholder after Continue with a real ranked diagnosis screen.

- Added `src/data/diagnoses.ts`: 2-5 candidate diagnoses per muscle group (all 15 groups covered), each defined by which symptom-category options are its "indicators" rather than one fixed combination — so any combination of selected symptoms scores against every diagnosis in that group, and different combinations that share enough indicators can surface the same diagnosis.
- Scoring: confidence = (matched indicators / total indicators for that diagnosis), bucketed into High/Medium/Low rather than shown as a precise percentage (this is a self-report tool, not a real test — implying false precision would be misleading). Diagnoses with zero matches are dropped; results are sorted by confidence, capped at the top 4.
- Added `src/components/DiagnosisResults.tsx` + `.css`: ranked diagnosis cards (name, confidence badge, one-line summary, "N of M matching signs"), a graceful no-match fallback suggesting the user see a doctor, a "not a medical diagnosis" disclaimer, and a "Back to symptoms" action that preserves the existing selections.
- Wired into `MuscleGroupDetail.tsx`: Continue now shows the results screen instead of a placeholder; "Back to symptoms" returns to the same chip selections to revise them.
- Verified logic with a standalone script exercising real symptom combinations (not the browser — no Chrome extension available this session): confirmed Osgood-Schlatter ranks first for a "below the kneecap + growing teen athlete" combo but drops in favor of Patellar Tendinitis/IT Band/PFPS when the same location is paired with an adult-runner combo instead, confirmed a meniscus-leaning combo (catching/locking + pivoting) surfaces Meniscus Tear correctly, and confirmed unmatched or empty selections return no results rather than a false match. `tsc -b` and `vite build` both clean.
