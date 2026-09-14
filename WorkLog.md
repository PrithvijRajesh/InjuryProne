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

## 2026-09-14 — Recovery & prevention tips (Milestone 4)

Added the payoff step after a diagnosis: clicking any diagnosis card now opens actionable recovery and prevention guidance instead of ending at the ranked list.

- Added `src/data/recoveryPlans.ts`: `RECOVERY_BY_DIAGNOSIS_ID`, one entry per diagnosis id (all 48 across the 15 muscle groups), each with 4 sections — `recoverySteps`, `avoid` (what to stay away from while healing), `preventionTips` (ongoing habits), and `seekHelpIf` (red flags pointing to a doctor/PT visit, kept generic per the PRD's scope limits — no specific providers or clinical directives).
- Added `src/components/RecoveryPlan.tsx` + `.css`: renders the four sections as labeled cards, with the "seek help if" section visually flagged (accent border), plus the existing medical disclaimer and a "Back to diagnoses" action.
- Updated `DiagnosisResults.tsx`: diagnosis cards are now clickable buttons with a "See recovery & prevention tips →" call to action, wired through a new `onSelectDiagnosis` prop.
- Updated `MuscleGroupDetail.tsx`: replaced the two-state symptoms/results toggle with a three-state view (`symptoms` → `results` → `recovery`), tracking which diagnosis was selected so "Back to diagnoses" returns to the same ranked list rather than resetting symptoms.
- Verified data integrity with a standalone script cross-checking every `diagnoses.ts` id against `recoveryPlans.ts` keys — all 48 match with no missing or orphaned entries. `tsc --noEmit` and `oxlint` both clean. Chrome browser extension wasn't connected this session, so the click-through was verified by running the dev server and confirming it serves correctly; opened `localhost:5173` in the default browser for manual review.

### Update — made every tip concrete and actionable

Feedback: several tips were too vague to actually follow — "lower running volume" didn't say whether that meant stopping entirely or just cutting mileage, and "light movements" didn't name an actual movement. Rewrote all 48 recovery entries so every bullet is something a user can do without guessing: named exercises/stretches with sets, reps, and hold times (e.g. "eccentric calf raises off a step, 3 sets of 15" instead of "gentle calf exercises"), specific day counts for rest ("stop sprinting for 7-10 days" instead of "reduce activity"), and specific reintroduction thresholds ("increase running mileage by no more than 10% per week" instead of "ease back in gradually"). Re-verified all 48 ids still match `diagnoses.ts` and `tsc`/`oxlint` are clean.

### Update — severity-scaled rest instead of one fixed day count

Feedback: a flat "rest for 7-10 days" doesn't fit the app's own purpose — someone with only slight, early pain should be able to catch a problem and back off for a couple days, not be told the same recovery timeline as someone with a more serious version of the same injury; a fixed number either overtreats mild cases or undertreats serious ones. Rewrote the first recovery-steps bullet for the 36 diagnoses that had a flat day count (everywhere a rest period was actually about severity — cramps, posture-related issues, and back-pain diagnoses that already avoided prescribing bed rest were left as-is):

- **Acute strains** (quad strain, hamstring strain, oblique strain, etc.): "if it's mild and you can [do some baseline normal movement] without pain, 2-3 days off is usually enough; if it's sharp / limits movement / there's bruising, stop entirely for 7-10 days" — mild and serious versions of the same injury now get different guidance instead of one number.
- **Overuse/tendinitis-type injuries** (tennis elbow, patellar tendinitis, Achilles tendinitis, etc.): reframed around catching it early — "if it's mild and only shows up after activity, cut volume by about half for a week rather than stopping outright; if it's painful during the activity itself, stop entirely for 7-10 days" — directly supports the app's goal of letting someone address a niggle before it becomes a bigger injury, rather than only offering guidance once it's already serious.
- **Serious/red-flag diagnoses** (tendon rupture, meniscus tear, sports hernia): kept the "stop and see a doctor" framing, but added an explicit note that mild-feeling pain doesn't reliably rule out a significant injury for these specific ones, since severity scaling would be the wrong signal to give here.

Verified none of the 36 edited entries still contain an unqualified "stop/cut X for N days" line (checked with a regex sweep), all 48 diagnosis ids still match `recoveryPlans.ts`, and `tsc --noEmit`/`oxlint` are clean.

### Update — plain-language activity names + telltale signs to tell diagnoses apart

Feedback: two issues. First, some grouped activity phrases were still jargon-y placeholders rather than real actions — "jumping and landing activity" didn't say what that actually looked like. Reworded 13 phrases across `recoveryPlans.ts` (deep-breathing-intensive activity, change-of-direction activity, jumping/stair/landing/overhead/bending-knee/push-off/calf-raise/downhill/high-knee-drive activity or movements) to name the actual movement, e.g. "jumping and landing hard from jumps (basketball, volleyball, box jumps)" instead of "jumping and landing activity."

Second, when a symptom combination scores multiple diagnoses at similar confidence, the results list didn't help someone tell them apart — just separate summaries of each condition, no cue for "which one am I actually looking at." Asked the user whether to solve this with a distinguishing-signs field per diagnosis or an extra disambiguating question; they picked the distinguishing-signs approach as simpler and more direct. Added a `telltaleSign` field to every one of the 48 diagnoses in `diagnoses.ts` — one concrete, self-checkable sign that separates it from its usual neighbors in the same muscle group (e.g. Osgood-Schlatter: "a tender, sometimes visibly swollen bump right below the kneecap, in a still-growing teenager" vs. Patellar Tendinitis: "a tender spot right below the kneecap that hurts most on landing from a jump"). Rendered as a highlighted "Telltale sign:" line on each diagnosis card in `DiagnosisResults.tsx`/`.css`, between the summary and the matching-signs count.

Verified all 48 `diagnosis()` calls compile against the new 5-argument signature (`tsc --noEmit` clean — a missing argument would have been a type error), `oxlint` clean, and confirmed no diagnosis was left without a `telltaleSign` by counting call sites.
