export type RecoveryPlan = {
  recoverySteps: string[];
  avoid: string[];
  preventionTips: string[];
  seekHelpIf: string[];
};

function plan(
  recoverySteps: string[],
  avoid: string[],
  preventionTips: string[],
  seekHelpIf: string[],
): RecoveryPlan {
  return { recoverySteps, avoid, preventionTips, seekHelpIf };
}

// Generic, non-prescriptive self-care guidance per diagnosis id (see
// diagnoses.ts). Every item names a concrete action, duration, or set/rep
// count instead of vague phrasing like "reduce activity" or "light
// exercise" -- the point is something a user can actually do today without
// having to guess what it means. Always defers to a doctor or physical
// therapist for an actual treatment plan -- no specific providers or
// clinical directives, per the PRD's scope limits.
export const RECOVERY_BY_DIAGNOSIS_ID: Record<string, RecoveryPlan> = {
  // shoulders
  'rotator-cuff-strain': plan(
    [
      'If it’s mild soreness that doesn’t stop you from lifting the arm normally, cut back overhead lifting and pressing for 2-3 days and reassess rather than stopping outright. If it’s painful to lift the arm to shoulder height or hurts during normal use, stop overhead lifting and pressing entirely for 7-10 days before easing back in.',
      'Ice for 15-20 minutes, 3-4 times a day, for the first 48-72 hours.',
      'Do pendulum swings: lean forward, let the arm hang, swing it in small circles for 1-2 minutes, 2-3 times a day.',
      'Once pain-free at rest, add band external rotations (elbow at your side, rotate outward), 2 sets of 15, every other day, before progressing to overhead work.',
    ],
    [
      'Skip overhead presses, pull-ups, and throwing until you can do 15 pain-free band external rotations.',
      "Don't sleep on the affected shoulder — sleep on your back or the other side.",
    ],
    [
      'Do 2 sets of 15 band external/internal rotations, 2-3 times a week, as a standing warm-up before upper-body training.',
      "Keep pressing and pulling volume roughly balanced week to week (don't do 3 press days for every 1 pull day).",
    ],
    [
      "You can't lift the arm away from your side at all, not just painfully.",
      'Pain hasn’t improved after 3 weeks of rest and the exercises above.',
      'You felt or heard a pop followed by sudden weakness.',
    ],
  ),
  'shoulder-impingement': plan(
    [
      'If it’s mild and only shows up at the extremes of overhead motion, cut back overhead reaching (swimming, throwing, racquet sports) for 3-4 days rather than stopping completely. If it’s painful through a normal range of motion, stop overhead reaching entirely for 7-10 days before easing back in.',
      'Ice for 15-20 minutes after any activity that leaves the shoulder sore.',
      'Do wall slides: back against a wall, slide arms overhead and back down, 2 sets of 10, daily.',
      'Add scapular squeezes (pull shoulder blades together, hold 5 seconds), 2 sets of 15, daily.',
    ],
    [
      'Skip overhead sports and lifting above shoulder height until wall slides are pain-free.',
      'Avoid slouching for long stretches — it closes up the space the tendons need.',
    ],
    [
      'Do 2 sets of 12 band rows and 2 sets of 15 band pull-aparts, 2-3 times a week.',
      'Spend 5 minutes on shoulder mobility (wall slides, arm circles) before any overhead sport.',
    ],
    [
      'Numbness or tingling down the arm.',
      'No improvement after 2 weeks of the steps above.',
      'Pain that wakes you up most nights.',
    ],
  ),
  'labral-tear': plan(
    [
      'Stop throwing and overhead lifting completely until the sharp or catching pain settles — with a suspected labral tear, how mild the pain feels isn’t a reliable guide to how serious it is, so treat any catching/locking sensation as a reason to get it checked rather than waiting it out.',
      'Ice for 15-20 minutes after any activity that provokes symptoms.',
      'Once sharp pain eases, do pendulum swings and passive range-of-motion (use your other arm to gently lift the injured one) for 1-2 minutes, twice a day.',
      'Add scapular squeezes and band rows, 2 sets of 12, before attempting any overhead loading again.',
    ],
    [
      'Stop throwing, overhead pressing, or any movement that causes catching or a feeling the shoulder will slip out.',
      "Don't push through instability — this needs a proper evaluation before you keep loading it.",
    ],
    [
      'Keep rotator cuff and scapular strength work (band external rotations, rows) in your routine year-round, not just after injury.',
      "Always throw a full warm-up progression (easy tosses building to full speed) before throwing hard.",
    ],
    [
      'A catching, locking, or slipping feeling in the joint.',
      "Persistent deep joint pain that doesn't ease with rest.",
      'Any sense the shoulder is loose or unstable.',
    ],
  ),

  // chest
  'pectoral-strain': plan(
    [
      'If it’s mild soreness and you have full, pain-free range of motion, 2-3 days off pressing is usually enough. If it’s sharp, limits your reach, or you saw bruising, stop pressing entirely for 7-10 days before easing back in.',
      'Ice for 15-20 minutes, 3-4 times a day, for the first 48-72 hours.',
      'Once pain eases, do a doorway chest stretch: forearm on the doorframe, step forward gently, hold 20-30 seconds, 3 times, once a day.',
      'Reintroduce pressing with knee push-ups or resistance bands, 2 sets of 10, before returning to barbell/dumbbell pressing.',
    ],
    [
      'Skip bench press, push-ups, and dips until you can do knee push-ups pain-free.',
      "Don't stretch into pain — mild tension only, never sharp pain, while it's healing.",
    ],
    [
      'Do 1-2 light warm-up sets at about half your working weight before every press session.',
      'Increase bench/press weight by no more than 5-10 lbs per week.',
    ],
    [
      'A pop, visible bruising, or a dent/bulge in the chest muscle.',
      "You can't press even light weight without significant weakness.",
      "Pain hasn't improved after 2 weeks of rest.",
    ],
  ),
  costochondritis: plan(
    [
      'If it’s mild and only noticeable with deep breaths or twisting, easing off for 2-3 days is often enough. If it’s sharp or constant, stop twisting your torso and skip heavy exertion (heavy lifting, sprinting, contact drills) for a full week before resuming.',
      'Ice for the first 2-3 days (15-20 minutes), then switch to a warm compress if that feels better.',
      'Over-the-counter ibuprofen or naproxen can help with pain and inflammation — follow the label dosing.',
      'Once tenderness fades, do a doorway chest stretch, held 20-30 seconds, 3 times, once a day.',
    ],
    [
      'Skip contact sports and heavy pressing that jars the chest wall.',
      'Avoid repetitive twisting (golf swings, throwing) until tenderness is gone.',
    ],
    [
      'Sit upright during desk work — a slumped chest compresses the rib cartilage.',
      'Build up contact-sport contact drills gradually rather than going full-intensity right after time off.',
    ],
    [
      'Chest pain with shortness of breath, dizziness, or pain radiating into the arm — treat this as urgent.',
      'Pain that keeps getting worse instead of gradually easing.',
      "Any chest pain you're not fully sure is muscular.",
    ],
  ),
  'intercostal-strain': plan(
    [
      'If it’s mild and you can take a full breath without pain, 2-3 days off twisting sports is usually enough. If breathing deeply or twisting is sharply painful, stop twisting sports and heavy exertion for 5-7 days before easing back in.',
      'Ice for 15-20 minutes, 3 times a day, for the first 48 hours.',
      'Practice slow belly breathing (4 seconds in, 4 seconds out) instead of shallow, guarded breaths.',
      'Once breathing is pain-free, add seated trunk rotations, 10 each direction, once a day.',
    ],
    [
      "Skip golf, throwing, and racquet sports until you can rotate your torso fully without pain.",
      "Don't brace so hard against the pain that you hold your breath.",
    ],
    [
      'Do 10 trunk rotations each direction as part of your warm-up before rotational sports.',
      'Build core/oblique strength with planks (2 sets of 30 seconds) and side planks, 2-3 times a week.',
    ],
    [
      "Sharp pain with every breath that isn't easing after a few days.",
      'Pain following a direct hit to the ribs — possible fracture.',
      'Symptoms still present after 3 weeks.',
    ],
  ),

  // abs
  'rectus-abdominis-strain': plan(
    [
      'If it’s mild soreness and you can tense your core without pain, 2-3 days off crunches and heavy core lifts is usually enough. If it’s sharp or tensing your core hurts, stop crunches, sit-ups, and heavy core lifts entirely for 7-10 days before easing back in.',
      'Ice for 15-20 minutes, 3 times a day, for the first 48-72 hours.',
      "Once tenderness eases, hold a plank for 15-20 seconds, 2-3 sets, and stop if it's sharp rather than just tight.",
      'Add 5-10 seconds to your plank hold every few days as long as it stays pain-free.',
    ],
    [
      'Skip sit-ups, crunches, and loaded core exercises (weighted carries, cable crunches) until planks are pain-free.',
      'Brace gently, not forcefully, if you cough or sneeze.',
    ],
    [
      'Build core work into training 2-3 times a week (planks, dead bugs) rather than only occasional heavy ab days.',
      'Do 1-2 easy warm-up sets before any heavy core session.',
    ],
    [
      'A visible bulge or sudden severe pain.',
      "You can't tense your core at all without pain.",
      'No improvement after 2 weeks of rest.',
    ],
  ),
  'oblique-strain': plan(
    [
      'If it’s mild and doesn’t limit your twisting range, 2-3 days off twisting/throwing/swinging is usually enough. If it’s sharp or limits your rotation, stop those movements entirely for 7-10 days before easing back in.',
      'Ice for 15-20 minutes, 3 times a day, for the first 48-72 hours.',
      'Once acute soreness fades, do seated trunk rotations, 10 each side, once a day.',
      'Reintroduce rotational sport movement at half speed for a week before going back to full intensity.',
    ],
    [
      'Skip sprinting, throwing, and swinging sports until trunk rotations are pain-free.',
      'Skip loaded twisting exercises (Russian twists, woodchoppers) during recovery.',
    ],
    [
      'Do 10 trunk rotations each direction as a warm-up before rotational sports.',
      'Once fully healed, add 2 sets of 10 Pallof presses or woodchoppers, 2 times a week.',
    ],
    [
      'Pain that limits normal breathing or basic twisting.',
      'No improvement after 2 weeks of rest and the steps above.',
    ],
  ),
  'ab-muscle-spasm': plan(
    [
      'Stop the activity right away and gently lean back to stretch the core for 20-30 seconds when a cramp hits.',
      'Apply light heat and massage the area for a few minutes to help it release.',
      'Drink water with electrolytes (or a sports drink) immediately and over the next hour.',
      'Sit out the rest of that session if cramping returns after you resume.',
    ],
    [
      "Don't push through repeated cramping — stop and address hydration and fatigue instead.",
      "Don't go straight into sprinting or max effort without a proper warm-up.",
    ],
    [
      'Drink water throughout the day, not just during exercise, especially in heat.',
      'Do a 5-10 minute gradual warm-up (light jog, dynamic stretches) before intense exercise.',
    ],
    [
      'Cramping that keeps recurring across multiple sessions despite hydrating well.',
      'Pain that feels sharper or different from a normal cramp.',
    ],
  ),

  // biceps
  'biceps-tendon-rupture': plan(
    [
      'Stop using the arm for lifting or carrying entirely and see a doctor within the next few days — a rupture can feel surprisingly mild at first (especially a partial tear), so don’t rely on pain level alone to decide whether it needs evaluation.',
      'Ice for 15-20 minutes, 3-4 times a day, to control swelling in the meantime.',
      'Support the arm in a sling or against your side if movement is painful.',
      'Follow the specific rehab program your doctor or physical therapist gives you once evaluated.',
    ],
    [
      'Skip curling, carrying, or lifting anything with the affected arm.',
      "Don't wait and see — this needs a professional evaluation, not home rest alone.",
    ],
    [
      'Warm up with 2 sets of 12 light curls before heavy biceps work.',
      'Increase curling weight by no more than 5 lbs per week.',
    ],
    [
      'A visible bulge in the upper arm or an audible pop — see a doctor promptly, ideally within a few days.',
      'Sudden sharp pain with immediate weakness curling or carrying.',
    ],
  ),
  'biceps-tendinitis': plan(
    [
      'If it’s mild soreness after activity that fades by the next day, cut your curling/overhead volume by about half for a week rather than stopping outright — catching it early tends to keep this from becoming a bigger problem. If it’s painful during the activity itself or lingers overnight, stop curling and overhead reaching entirely for 7-10 days before easing back in.',
      'Ice for 15-20 minutes after any activity that irritates it.',
      'Once acute soreness eases, do a standing biceps stretch: arm straight behind you, palm forward, hold 20-30 seconds, 3 times, once a day.',
      'Reintroduce curls with light resistance bands, 2 sets of 12, before going back to dumbbells.',
    ],
    [
      'Skip heavy curling and repetitive overhead reaching until band curls are pain-free.',
      "Don't jump climbing or throwing volume back up quickly after time off.",
    ],
    [
      'Do 1-2 light warm-up sets before heavy curling or overhead work.',
      'Increase curling or climbing volume by no more than about 10% per week.',
    ],
    [
      'No improvement after 3 weeks of rest and the steps above.',
      'A sudden sharp pain or pop suggesting a tear rather than tendinitis.',
    ],
  ),
  'biceps-strain': plan(
    [
      'If it’s mild soreness and carrying light objects doesn’t hurt, 2-3 days off is usually enough. If it’s sharp or carrying anything hurts, stop carrying, pulling, and curling entirely for 5-7 days before easing back in.',
      'Ice for 15-20 minutes, 3 times a day, for the first 48-72 hours.',
      'Once pain eases, do the standing biceps stretch, held 20-30 seconds, 3 times, once a day.',
      'Rebuild strength with light resistance-band curls, 2 sets of 12, before returning to full carrying/lifting load.',
    ],
    [
      'Skip heavy carrying and gripping tasks until band curls are pain-free.',
      'Skip climbing or pulling activities that reproduce the pain.',
    ],
    [
      'Build grip and pulling strength progressively with 2 sets of 10-12 rows or pull-ups, 2 times a week.',
      'Warm up before manual labor or climbing sessions with light carries or easy pulls.',
    ],
    [
      'Significant weakness carrying or lifting objects that were previously easy.',
      'Pain lasting beyond 2 weeks despite rest.',
    ],
  ),

  // forearms
  'tennis-elbow': plan(
    [
      'If it’s mild and only shows up after a long session, cut your gripping/racquet volume by about half for a week rather than stopping outright — addressing it early often prevents it from becoming chronic. If gripping or swinging is painful during the activity, stop entirely for 7-10 days before easing back in.',
      'Ice the outer elbow for 15-20 minutes after any activity.',
      'Do a wrist extensor stretch: arm out, palm down, gently pull fingers down with the other hand, hold 20-30 seconds, 3 times, twice a day.',
      'Once that’s pain-free, add eccentric wrist extensions: hold a light 1-2 lb weight, slowly lower your hand over 3-4 seconds, 3 sets of 10, once a day.',
    ],
    [
      'Skip repetitive gripping and racquet swings until eccentric wrist extensions are pain-free.',
      "Don't play through elbow pain during a match or session — it tends to become chronic.",
    ],
    [
      'Get your racquet grip size and string tension checked — too small a grip or too-tight strings increase strain.',
      'Keep doing 2 sets of 10 eccentric wrist extensions, 2 times a week, even after symptoms resolve.',
      'Take a 5-minute break every 30-45 minutes during repetitive gripping tasks.',
    ],
    [
      'No improvement after 4-6 weeks of the steps above.',
      'Numbness or tingling into the hand along with the elbow pain.',
    ],
  ),
  'golfers-elbow': plan(
    [
      'If it’s mild and only shows up after a long session, cut your gripping volume by about half for a week rather than stopping outright — addressing it early often prevents it from becoming chronic. If gripping or wrist-flexed lifting is painful during the activity, stop entirely for 7-10 days before easing back in.',
      'Ice the inner elbow/forearm for 15-20 minutes after any activity.',
      'Do a wrist flexor stretch: arm out, palm up, gently pull fingers back with the other hand, hold 20-30 seconds, 3 times, twice a day.',
      'Once that’s pain-free, add eccentric wrist flexions: hold a light weight, slowly lower your hand over 3-4 seconds, 3 sets of 10, once a day.',
    ],
    [
      'Skip heavy gripping and wrist-flexed lifting until eccentric wrist flexions are pain-free.',
      'Skip climbing or swinging activities that reproduce sharp pain.',
    ],
    [
      'Keep doing 2 sets of 10 eccentric wrist flexions, 2 times a week, even after symptoms resolve.',
      'Warm up the wrist and forearm with light grip squeezes before grip-heavy activity.',
    ],
    [
      'No improvement after 4-6 weeks of the steps above.',
      'Numbness or tingling into the hand along with the elbow pain.',
    ],
  ),
  'carpal-tunnel': plan(
    [
      'Cut typing/gripping time and take a break as soon as tingling starts.',
      'Wear a neutral-position wrist splint at night for 1-2 weeks.',
      'Do wrist flexor and extensor stretches, held 20-30 seconds each, 3 times, twice a day.',
      'Add nerve glides: straighten the wrist and fingers, then gently bend the wrist back and forth 10 times, once or twice a day.',
    ],
    [
      'Avoid typing or gripping with the wrist bent up or down for long stretches — keep it flat and neutral.',
      'Skip repetitive gripping activities that reproduce numbness or tingling.',
    ],
    [
      'Set your keyboard and mouse height so your wrists stay flat and straight while typing.',
      'Take a 1-2 minute wrist-stretch break every hour during repetitive hand-intensive work.',
    ],
    [
      "Numbness, tingling, or weakness that doesn't improve after 2 weeks of splinting/stretching.",
      'Symptoms that wake you up at night or affect fine motor tasks (buttoning, typing) regularly.',
    ],
  ),

  // quads
  'quad-strain': plan(
    [
      'If it’s mild and you can walk normally without pain, 2-3 days off sprinting and kicking is usually enough. If it’s sharp, you’re limping, or there’s bruising, stop entirely for 7-10 days before easing back in.',
      'Ice for 15-20 minutes, 3-4 times a day, for the first 48-72 hours.',
      'Once acute pain eases, do a standing quad stretch: pull heel to glute, hold 20-30 seconds, 3 times, once a day.',
      'Rebuild strength with bodyweight squats, 2 sets of 12, before returning to sprinting.',
    ],
    [
      'Skip sprinting, kicking, and sudden accelerations until bodyweight squats are pain-free.',
      "Don't stretch into sharp pain while it's healing — mild tension only.",
    ],
    [
      'Spend 5-10 minutes on dynamic quad stretches (leg swings, walking lunges) before sprinting or kicking sports.',
      'Increase sprint volume by no more than about 10% per week.',
    ],
    [
      "A pop, significant bruising, or you can't put weight on the leg.",
      'No improvement after 2 weeks of rest.',
    ],
  ),
  'quad-tendinitis': plan(
    [
      'If it’s mild and only shows up after jumping or using stairs, cut that volume by about half for a week rather than stopping outright. If it’s painful during the movement itself, stop jumping (box jumps, jump rope) and stair use entirely for 7-10 days before easing back in.',
      'Ice near the knee for 15-20 minutes after activity.',
      'Once acute soreness eases, do a standing quad stretch, held 20-30 seconds, 3 times, once a day.',
      'Add straight-leg raises, 3 sets of 12, progressing to bodyweight squats once those are pain-free.',
    ],
    [
      'Skip jumping, heavy squatting, and stair-heavy sports until straight-leg raises are pain-free.',
      "Don't jump your training volume back up quickly after time off.",
    ],
    [
      'Do 3 sets of 12 straight-leg raises, 2 times a week, as ongoing maintenance.',
      "Use a proper landing technique (bent knees, soft landing) for jumping sports — have a coach check it if you're unsure.",
    ],
    [
      'No improvement after 3 weeks of activity modification.',
      "Swelling or you can't fully straighten the knee.",
    ],
  ),
  'hip-flexor-strain': plan(
    [
      'If it’s mild and walking/normal hip movement doesn’t hurt, 2-3 days off sprinting is usually enough. If it’s sharp or lifting the leg hurts, stop sprinting and explosive knee-drive movements (high kicks, quick sprint starts) entirely for 7-10 days before easing back in.',
      'Ice the front of the hip for 15-20 minutes, 3 times a day, for the first 48-72 hours.',
      'Once acute pain eases, do a kneeling hip flexor stretch: back knee down, push hips forward, hold 20-30 seconds, 3 times, once a day.',
      'Add standing marches (lift knee to hip height), 2 sets of 10 each leg, before returning to sprinting.',
    ],
    [
      'Skip sprinting and explosive knee-drive movements (high kicks, quick sprint starts) until standing marches are pain-free.',
      "Don't sit for long stretches with hips flexed while it's healing — stand and stretch every hour.",
    ],
    [
      'Do the kneeling hip flexor stretch 2-3 times a week as ongoing maintenance, especially if you sit a lot.',
      'Balance hip flexor work with glute bridges (2 sets of 12) so one side doesn’t overpower the other.',
    ],
    [
      'A pop or significant weakness lifting the leg.',
      'No improvement after 2 weeks of rest.',
    ],
  ),

  // groin
  'adductor-strain': plan(
    [
      'If it’s mild and walking normally doesn’t hurt, 2-3 days off sprinting/cutting is usually enough. If it’s sharp or there’s bruising, stop those movements entirely for 7-10 days before easing back in.',
      'Ice the inner thigh for 15-20 minutes, 3 times a day, for the first 48-72 hours.',
      'Once acute pain eases, do a seated butterfly stretch: soles of feet together, gently press knees down, hold 20-30 seconds, 3 times, once a day.',
      'Add side-lying leg lifts, 2 sets of 12 each side, before returning to sprinting/cutting.',
    ],
    [
      'Skip sprinting, quick direction changes, and wide stances until side-lying leg lifts are pain-free.',
      "Don't stretch into sharp pain while it's healing.",
    ],
    [
      'Once fully healed, do 2-3 sets of 8-10 Copenhagen planks (or a modified version), 2 times a week.',
      'Spend 5 minutes on dynamic groin/hip mobility (lateral lunges, leg swings) before sport.',
    ],
    [
      "A pop, significant bruising, or you can't put weight on the leg.",
      'No improvement after 2 weeks of rest.',
    ],
  ),
  'sports-hernia': plan(
    [
      'Stop kicking and any quick side-to-side or cutting movements, and see a doctor for an evaluation within the next 1-2 weeks — this injury can feel mild at first and still need professional evaluation, so don’t use how it feels as the only guide to how serious it is.',
      'Ice the lower abdomen/groin area for 15-20 minutes if it feels irritated.',
      "Rest from the aggravating sport while you wait for evaluation — don't try to train through it.",
      'Follow the specific rehab program your doctor or physical therapist gives you once diagnosed.',
    ],
    [
      'Skip kicking, sprinting, and twisting movements until evaluated.',
      "Don't push through persistent groin/lower-abdomen pain hoping it resolves on its own.",
    ],
    [
      'Build balanced core and hip strength (planks, side-lying leg lifts, Copenhagen planks) 2 times a week.',
      'Address any adductor tightness early with regular stretching rather than playing through it.',
    ],
    [
      "Pain that doesn't improve with rest over 2 weeks.",
      'Groin/lower-abdomen pain that worsens with coughing or sudden movement.',
    ],
  ),
  'adductor-tendinopathy': plan(
    [
      'If it’s mild and only shows up after wide-stance/kicking activity, cut that volume by about half for a week rather than stopping outright. If it’s painful during the activity itself, stop entirely for 7-10 days before easing back in.',
      'Ice the area for 15-20 minutes after activity if it feels irritated.',
      'Once acute soreness eases, do the seated butterfly stretch, held 20-30 seconds, 3 times, once a day.',
      'Add isometric adductor squeezes (squeeze a pillow/ball between your knees, hold 10 seconds), 8 reps, once a day, before progressing to side-lying leg lifts.',
    ],
    [
      'Skip heavy wide-stance lifts (sumo squats) and kicking sports until isometric squeezes are pain-free.',
      "Don't jump your training volume back up quickly after time off.",
    ],
    [
      'Do 2-3 sets of 8-10 Copenhagen planks (or a modified version), 2 times a week.',
      'Warm up thoroughly with dynamic groin mobility before wide-stance lifting or skating sports.',
    ],
    [
      'No improvement after 3-4 weeks of activity modification.',
      'Pain that’s sharp or sudden rather than a gradual ache.',
    ],
  ),

  // knees
  'patellofemoral-pain': plan(
    [
      'If it’s mild and only shows up after running or using stairs, cut that volume by about half for a week rather than stopping outright. If it’s painful during the movement itself, stop running, jumping, and stair use entirely for 7-10 days before easing back in.',
      'Ice the front of the knee for 15-20 minutes after activity if it feels irritated.',
      'Do straight-leg raises, 3 sets of 12, and clamshells, 2 sets of 15 each side, daily.',
      'Reintroduce running at half your normal distance for a week, then increase by no more than 10% per week.',
    ],
    [
      'Skip deep squats, lunges, and long stair sessions while irritated.',
      "Don't jump your running mileage back up quickly.",
    ],
    [
      'Keep doing 2 sets of 15 clamshells and 3 sets of 12 straight-leg raises, 2 times a week, as maintenance.',
      'Increase running mileage by no more than about 10% per week.',
    ],
    [
      'Swelling, locking, or the knee giving way.',
      'No improvement after 3-4 weeks of the steps above.',
    ],
  ),
  'patellar-tendinitis': plan(
    [
      'If it’s mild and only shows up after jumping, cut that volume by about half for a week rather than stopping outright. If it’s painful during the movement itself, stop jumping and landing hard from jumps (basketball, volleyball, box jumps) entirely for 7-10 days before easing back in.',
      'Ice below the kneecap for 15-20 minutes after activity.',
      'Once acute soreness eases, do a standing quad stretch, held 20-30 seconds, 3 times, once a day.',
      'Add slow eccentric squats (lower down over 4-5 seconds, push back up normally), 3 sets of 10, once a day.',
    ],
    [
      'Skip jumping, sprinting, and deep squats until eccentric squats are pain-free.',
      "Don't jump your jump-training volume back up quickly after time off.",
    ],
    [
      'Keep doing 3 sets of 10 eccentric squats, 2 times a week, as maintenance.',
      'Warm up with 5-10 minutes of light jogging and dynamic stretching before jumping sports.',
    ],
    [
      'No improvement after 3-4 weeks of activity modification.',
      "Significant swelling or you can't fully straighten the knee.",
    ],
  ),
  'osgood-schlatter': plan(
    [
      'Cut back running/jumping to a level that stays below mild soreness during activity — you don’t need to stop completely.',
      'Ice below the kneecap for 15-20 minutes after activity.',
      'Do gentle quad and hamstring stretches, held 20-30 seconds, 3 times, once a day.',
      'Keep activity at a steady, moderate level day to day rather than alternating full rest with hard days — this tends to settle it faster.',
    ],
    [
      'Avoid pushing through significant pain during running/jumping sports — mild soreness is okay, sharp pain is the line.',
      'Avoid sudden jumps in training intensity, especially during growth spurts.',
    ],
    [
      'Keep up quad and hamstring stretching 3-4 times a week during growth spurts.',
      'Watch training load carefully (avoid sudden mileage/intensity jumps) while still growing.',
    ],
    [
      "Pain severe enough to cause a limp that doesn't ease with reduced activity.",
      "Any concern about a growth-plate injury — worth a doctor's check for young athletes.",
    ],
  ),
  'meniscus-tear': plan(
    [
      'Stop pivoting and deep bending and see a doctor for an evaluation, especially with catching or locking — a meniscus tear can be mildly painful yet still mechanically significant, so treat any catching/locking as a reason to get checked rather than waiting to see if it worsens.',
      'Ice the knee for 15-20 minutes, 3-4 times a day, to reduce swelling.',
      'Use crutches or avoid full weight-bearing if putting weight on it is painful, until evaluated.',
      'Follow the specific rehab program your doctor or physical therapist gives you once a treatment approach is set.',
    ],
    [
      'Skip pivoting, twisting, and deep squatting until evaluated.',
      "Don't keep playing on a knee that catches or locks.",
    ],
    [
      'Build balanced quad and hamstring strength (straight-leg raises, hamstring curls) 2 times a week.',
      "Use proper landing and pivoting technique in cutting sports — have a coach check it if you're unsure.",
    ],
    [
      'The knee catching, locking, or giving way.',
      'Significant swelling within a few hours of an injury.',
    ],
  ),
  'it-band-syndrome': plan(
    [
      'If it’s mild and only shows up late in a run, cut your running volume by about half for a week rather than stopping outright. If it’s painful early in a run or during normal walking, stop running entirely, including downhill routes, for 7-10 days before easing back in.',
      'Ice the outside of the knee for 15-20 minutes after activity if it feels irritated.',
      'Foam roll the outer thigh for 1-2 minutes, once a day, once acute soreness eases.',
      'Add side-lying leg lifts, 2 sets of 15 each side, to strengthen the hip.',
    ],
    [
      'Avoid running on cambered roads or heavy downhill running while irritated.',
      "Don't jump your running mileage back up quickly.",
    ],
    [
      'Keep doing 2 sets of 15 side-lying leg lifts, 2 times a week, as maintenance.',
      'Increase running mileage by no more than about 10% per week and vary running surfaces.',
    ],
    [
      'No improvement after 3-4 weeks of activity modification.',
      'Sharp pain that changes your running gait.',
    ],
  ),

  // traps
  'trapezius-strain': plan(
    [
      'If it’s mild and normal shoulder movement doesn’t hurt, 2-3 days off heavy carrying/shrugging is usually enough. If it’s sharp or limits your neck/shoulder movement, stop entirely for 5-7 days before easing back in.',
      'Apply heat or ice, whichever feels more soothing, for 15-20 minutes, a few times a day.',
      'Do a neck side-bend stretch: ear to shoulder, hold 20-30 seconds each side, 3 times, once a day.',
      'Rebuild strength with light shrugs (2 sets of 15 at low weight) before returning to heavy carrying/lifting.',
    ],
    [
      'Skip heavy shrugs and heavy carrying until light shrugs are pain-free.',
      'Avoid slouched posture for long stretches — it keeps the muscle tight.',
    ],
    [
      'Take a 1-2 minute shoulder/neck stretch break every hour during desk work.',
      'Warm up with light shrugs before carrying or lifting heavy loads.',
    ],
    [
      'No improvement after 2 weeks of rest.',
      'Numbness or tingling radiating down the arm.',
    ],
  ),
  'trigger-points': plan(
    [
      'Apply heat for 15-20 minutes and gently massage the tight spot for a few minutes, once or twice a day.',
      'Do an upper-trap stretch: ear to shoulder, hold 20-30 seconds each side, 3 times, once a day.',
      'Raise your screen to eye level and check your chair height today, not just when it flares up.',
      'Set a timer to stand and move for 1-2 minutes every hour.',
    ],
    [
      'Avoid staying in the same hunched posture (phone, laptop) for more than 45-60 minutes at a stretch.',
      "Don't ignore building tension — address it daily rather than only when it's already a knot.",
    ],
    [
      'Keep your screen at eye level and elbows supported while working.',
      "Do the upper-trap stretch daily, even on days it doesn't hurt.",
    ],
    [
      'No improvement after 2 weeks of stretching, heat, and posture changes.',
      'Headaches that become frequent or severe.',
    ],
  ),
  'cervicogenic-headache': plan(
    [
      'Take regular breaks from any posture that juts your head forward (phone, laptop).',
      'Apply heat to the base of the neck/shoulders for 15-20 minutes, once or twice a day.',
      'Do gentle neck rotations (look side to side) and chin tucks, 10 reps each, once a day.',
      'Raise your screen to eye level to reduce sustained neck strain.',
    ],
    [
      'Avoid looking down at your phone for long stretches — bring it up to eye level instead.',
      "Don't ignore recurring headaches tied to neck tension — address the posture cause directly.",
    ],
    [
      'Keep your screen at eye level and take a 1-2 minute neck-stretch break every hour.',
      'Do chin tucks (10 reps) daily to build neck postural endurance.',
    ],
    [
      'Headaches that are severe, sudden, or different from your usual pattern.',
      'Headaches with vision changes, numbness, or weakness — treat this as urgent.',
    ],
  ),

  // upper-back
  'rhomboid-strain': plan(
    [
      'If it’s mild and normal shoulder blade movement doesn’t hurt, 2-3 days off rowing/overhead lifting is usually enough. If it’s sharp, stop entirely for 5-7 days before easing back in.',
      'Apply heat or ice, whichever feels more soothing, for 15-20 minutes.',
      'Do a doorway chest stretch combined with shoulder blade squeezes, 2 sets of 15, once a day.',
      'Rebuild strength with light band rows, 2 sets of 15, before returning to heavy rowing/lifting.',
    ],
    [
      'Skip heavy rowing and overhead lifting until band rows are pain-free.',
      "Avoid slouched posture for long stretches while it's healing.",
    ],
    [
      'Keep doing 2 sets of 15 band rows or pull-aparts, 2 times a week, as ongoing maintenance.',
      'Warm up the upper back with light rows before heavier rowing/lifting sessions.',
    ],
    [
      'No improvement after 2 weeks of rest.',
      'Sharp pain with breathing rather than movement-related soreness.',
    ],
  ),
  'postural-fatigue': plan(
    [
      'Stand up and move for 2-3 minutes every 30-45 minutes during the day.',
      'Apply heat for 15-20 minutes and gently massage achy areas, once a day.',
      'Do a doorway chest stretch, held 20-30 seconds, 3 times, once a day.',
      'Add band rows, 2 sets of 15, 2-3 times a week, to build postural strength.',
    ],
    [
      'Avoid sitting in the same slouched position for more than 45 minutes without standing up.',
      "Don't wait for it to hurt before taking breaks — build the habit in regardless.",
    ],
    [
      'Set your chair and monitor height so your ears are over your shoulders when sitting.',
      'Set a recurring timer to stand and stretch every 30-45 minutes.',
      'Keep doing 2 sets of 15 band rows, 2-3 times a week.',
    ],
    [
      'No improvement after 2-3 weeks of posture changes and movement breaks.',
      'Pain that starts radiating or turns sharp instead of a dull ache.',
    ],
  ),
  'thoracic-spasm': plan(
    [
      'If it’s mild and you can twist normally without pain, 2-3 days off twisting/heavy lifting is usually enough. If it’s sharp or limits your twisting range, stop entirely for 5-7 days before easing back in.',
      'Apply heat for 15-20 minutes and gently massage the area, once or twice a day.',
      'Practice slow belly breathing (4 seconds in, 4 seconds out) for 2-3 minutes to ease guarding.',
      'Once acute pain eases, do seated trunk rotations, 10 each direction, once a day.',
    ],
    [
      'Skip twisting sports and heavy rowing until trunk rotations are pain-free.',
      "Don't hold your breath or brace hard against the spasm — breathe through it.",
    ],
    [
      'Do 10 trunk rotations each direction and some core work (planks, 2 sets of 30 seconds), 2 times a week.',
      'Warm up with light rotational movement before rotational sports or heavy lifting.',
    ],
    [
      'No improvement after a week of rest and gentle movement.',
      'Numbness, tingling, or weakness accompanying the spasm.',
    ],
  ),

  // lower-back
  'lumbar-strain': plan(
    [
      'Keep moving with short walks (10-15 minutes, a few times a day) rather than staying in bed.',
      'Ice for the first 48-72 hours (15-20 minutes, a few times a day), then switch to heat if that feels better.',
      'Once pain eases, do knee-to-chest stretches, held 20-30 seconds each leg, 3 times, once a day.',
      'Rebuild core strength with bird dogs (2 sets of 10 each side) before returning to lifting.',
    ],
    [
      'Skip heavy lifting or bending under load until bird dogs are pain-free.',
      "Don't stay completely inactive — a couple of short walks a day helps more than bed rest.",
    ],
    [
      'Hinge at the hips and brace your core when lifting anything heavy, rather than rounding your back.',
      'Keep doing 2 sets of 10 bird dogs and planks, 2-3 times a week, as ongoing core maintenance.',
    ],
    [
      'Numbness, tingling, or weakness in the legs.',
      'Loss of bladder or bowel control — seek emergency care immediately.',
      'No improvement after 1-2 weeks of care.',
    ],
  ),
  sciatica: plan(
    [
      'Take short walks (10-15 minutes, a few times a day) rather than staying in bed.',
      'Apply heat or ice, whichever eases discomfort more, for 15-20 minutes.',
      'Do a seated piriformis stretch: ankle on opposite knee, lean forward gently, hold 20-30 seconds each side, 3 times, once a day.',
      "See a doctor or physical therapist for a tailored evaluation if the leg pain doesn't ease within a week.",
    ],
    [
      'Avoid sitting for more than 30-45 minutes at a stretch — stand and move instead.',
      'Skip heavy lifting or bending under load until symptoms ease.',
    ],
    [
      'Stand up and move every 30-45 minutes during the day.',
      'Keep doing 2 sets of 10 bird dogs and hip stretches, 2-3 times a week.',
    ],
    [
      "Numbness, tingling, or weakness that's getting worse.",
      'Loss of bladder or bowel control — seek emergency care immediately.',
      'No improvement after 1-2 weeks of care.',
    ],
  ),
  'disc-irritation': plan(
    [
      'Take short walks (10-15 minutes, a few times a day) rather than staying in bed.',
      'Alternate ice and heat (15-20 minutes each), whichever eases discomfort more.',
      'Avoid forward bending and prolonged sitting, which tend to worsen this specific injury.',
      'See a doctor or physical therapist within 1-2 weeks for an evaluation and a tailored exercise plan.',
    ],
    [
      'Skip heavy lifting, especially with a rounded back, until evaluated.',
      'Avoid sitting for more than 30 minutes at a stretch without standing up.',
    ],
    [
      'Hinge at the hips and brace your core when lifting, rather than rounding your back.',
      'Take a standing/walking break every 30 minutes during desk work.',
    ],
    [
      'Numbness, tingling, or weakness in the legs.',
      'Loss of bladder or bowel control — seek emergency care immediately.',
      "Symptoms that worsen or don't improve over 1-2 weeks.",
    ],
  ),
  'si-joint-dysfunction': plan(
    [
      'If it’s mild and standing/walking doesn’t hurt, 2-3 days off high-impact activity (running, jumping) is usually enough. If it’s sharp or limits normal walking, stop entirely for 5-7 days before easing back in.',
      'Apply heat or ice, whichever eases discomfort more, for 15-20 minutes.',
      'Do a piriformis/glute stretch, held 20-30 seconds each side, 3 times, once a day.',
      'Add glute bridges, 2 sets of 12, before returning to running or high-impact training.',
    ],
    [
      'Avoid standing on one leg for long periods and crossing your legs while sitting.',
      'Skip running/high-impact activity until glute bridges are pain-free.',
    ],
    [
      'Keep doing 2 sets of 12 glute bridges and side-lying leg lifts, 2 times a week.',
      'Increase running/impact training volume by no more than about 10% per week.',
    ],
    [
      'No improvement after 3-4 weeks of care.',
      'Numbness, tingling, or weakness radiating down the leg.',
    ],
  ),

  // triceps
  'triceps-tendon-injury': plan(
    [
      'Stop pushing/pressing movements entirely and see a doctor promptly, especially with a pop or sudden weakness — a tendon tear can feel surprisingly mild at first, so don’t rely on pain level alone to decide whether it needs evaluation.',
      'Ice the back of the elbow for 15-20 minutes, 3-4 times a day, to control swelling.',
      'Support the arm and avoid straightening it against resistance until evaluated.',
      'Follow the specific rehab program your doctor or physical therapist gives you once a treatment plan is set.',
    ],
    [
      'Skip any pressing, pushing, or weight-bearing on a straightened arm.',
      "Don't try to work through it — get this looked at rather than self-treating.",
    ],
    [
      'Warm up with 2 sets of 12 light triceps pushdowns before heavy pressing.',
      'Increase pressing weight by no more than 5-10 lbs per week.',
    ],
    [
      'A pop, significant weakness straightening the elbow, or visible swelling/deformity.',
      "You can't straighten the arm against resistance at all.",
    ],
  ),
  'triceps-tendinitis': plan(
    [
      'If it’s mild and only shows up after pressing, cut that volume by about half for a week rather than stopping outright. If it’s painful during the movement itself, stop bench/overhead pressing and dips entirely for 7-10 days before easing back in.',
      'Ice near the elbow for 15-20 minutes after activity.',
      'Once acute soreness eases, do a triceps stretch: arm overhead, bend elbow, gently pull with the other hand, hold 20-30 seconds, 3 times, once a day.',
      'Add light triceps pushdowns or bench dips, 2 sets of 12, before returning to heavy pressing.',
    ],
    [
      'Skip heavy pressing and repetitive overhead extension until light pushdowns are pain-free.',
      "Don't jump your pressing volume back up quickly after time off.",
    ],
    [
      'Do 1-2 light warm-up sets before heavy pressing sessions.',
      'Increase pressing volume by no more than about 10% per week.',
    ],
    [
      'No improvement after 3 weeks of activity modification.',
      'A sudden sharp pain or pop suggesting a tear rather than tendinitis.',
    ],
  ),
  'triceps-strain': plan(
    [
      'If it’s mild and pushing lightly doesn’t hurt, 2-3 days off pushing movements is usually enough. If it’s sharp, stop pushing movements entirely for 5-7 days before easing back in.',
      'Ice the back of the upper arm for 15-20 minutes, 3 times a day, for the first 48-72 hours.',
      'Once pain eases, do the overhead triceps stretch, held 20-30 seconds, 3 times, once a day.',
      'Rebuild strength with bench dips or light pushdowns, 2 sets of 12, before returning to full pushing load.',
    ],
    [
      'Skip push-ups, presses, and throwing until bench dips are pain-free.',
      "Don't stretch into sharp pain while it's healing.",
    ],
    [
      'Warm up thoroughly with light pushing sets before pushing-heavy training or throwing sports.',
      'Increase pressing volume by no more than about 10% per week.',
    ],
    [
      'Significant weakness pushing or extending the arm.',
      'Pain lasting beyond 1-2 weeks despite rest.',
    ],
  ),

  // glutes
  'glute-strain': plan(
    [
      'If it’s mild and walking normally doesn’t hurt, 2-3 days off sprinting/heavy squatting is usually enough. If it’s sharp or you’re limping, stop entirely for 7-10 days before easing back in.',
      'Ice the glute for 15-20 minutes, 3 times a day, for the first 48-72 hours.',
      'Once acute pain eases, do a seated figure-4 glute stretch, held 20-30 seconds each side, 3 times, once a day.',
      'Add glute bridges, 2 sets of 12, before returning to sprinting/squatting.',
    ],
    [
      'Skip sprinting and heavy squatting until glute bridges are pain-free.',
      "Don't stretch into sharp pain while it's healing.",
    ],
    [
      'Do 5-10 minutes of dynamic glute activation (bridges, lateral band walks) before sprinting or squatting.',
      'Increase sprint/squat load by no more than about 10% per week.',
    ],
    [
      "A pop, significant bruising, or you can't put weight on the leg.",
      'No improvement after 2 weeks of rest.',
    ],
  ),
  'piriformis-syndrome': plan(
    [
      'Stand and move every 30-45 minutes instead of sitting for long stretches.',
      'Apply heat for 15-20 minutes and gently massage the deep glute area, once a day.',
      'Do a seated figure-4 stretch, held 20-30 seconds each side, 3 times, once a day.',
      'Add side-lying leg lifts, 2 sets of 15 each side, to strengthen the hips.',
    ],
    [
      'Avoid sitting for long periods, especially on hard surfaces or with a wallet in your back pocket.',
      "Don't stretch into sharp nerve pain — mild tension only.",
    ],
    [
      'Take a 1-2 minute standing/walking break every 30-45 minutes during desk work or long drives.',
      'Keep doing 2 sets of 15 side-lying leg lifts, 2 times a week.',
    ],
    [
      "Numbness, tingling, or weakness radiating down the leg that's getting worse.",
      'No improvement after 2 weeks of care.',
    ],
  ),
  'glute-medius-tendinopathy': plan(
    [
      'If it’s mild and only shows up after standing or using stairs for a while, cut that time by about half for a week rather than stopping outright. If it’s painful during normal standing or walking, avoid standing for long stretches and using stairs entirely for 7-10 days before easing back in.',
      'Ice the side of the hip for 15-20 minutes after activity if it feels irritated.',
      'Once acute soreness eases, do a seated figure-4 stretch, held 20-30 seconds each side, 3 times, once a day.',
      'Add side-lying leg lifts, 2 sets of 15 each side, progressing to standing band walks as they become pain-free.',
    ],
    [
      'Avoid standing on one leg for long periods or crossing your legs while sitting.',
      "Don't jump your running or stair-training volume back up quickly.",
    ],
    [
      'Keep doing 2 sets of 15 side-lying leg lifts or band walks, 2 times a week.',
      'Warm up with hip mobility work before running or cycling sessions.',
    ],
    [
      'No improvement after 3-4 weeks of activity modification.',
      'Pain that starts waking you up at night regularly.',
    ],
  ),

  // hamstrings
  'hamstring-strain': plan(
    [
      'If it’s mild and walking normally doesn’t hurt, 2-3 days off sprinting and kicking is usually enough. If it’s sharp, you’re limping, or there’s bruising, stop entirely for 7-10 days before easing back in.',
      'Ice the back of the thigh for 15-20 minutes, 3-4 times a day, for the first 48-72 hours.',
      'Once acute pain eases, do a seated hamstring stretch: leg extended, reach toward your toes, hold 20-30 seconds, 3 times, once a day.',
      'Rebuild strength with glute bridges progressing to slow, bodyweight single-leg deadlifts, 2 sets of 10, before returning to sprinting.',
    ],
    [
      'Skip sprinting, kicking, and sudden accelerations until single-leg deadlifts are pain-free.',
      "Don't stretch into sharp pain while it's healing.",
    ],
    [
      'Do 5-10 minutes of dynamic hamstring stretches (leg swings, walking lunges) before sprinting or kicking sports.',
      'Once fully healed, add 2 sets of 10 Nordic curls or slow eccentric hamstring exercises, 1-2 times a week.',
    ],
    [
      "A pop, significant bruising, or you can't put weight on the leg.",
      'No improvement after 2 weeks of rest.',
    ],
  ),
  'proximal-hamstring-tendinopathy': plan(
    [
      "If it’s mild and only shows up after running, cut your running volume by about half for a week rather than stopping outright — but skip deep stretching regardless of severity, since stretching can aggravate this specific injury early on. If it’s painful to sit or during the activity itself, stop running entirely for 7-10 days before easing back in.",
      'Ice near the sit bone for 15-20 minutes after activity if it feels irritated.',
      'Do isometric hamstring holds: lie face down, bend the knee to 90 degrees, hold against light resistance for 20-30 seconds, 5 reps, once a day.',
      'Progress to slow glute bridges, 2 sets of 12, once isometric holds are pain-free.',
    ],
    [
      'Skip deep hamstring stretches and lunges until isometric holds are pain-free.',
      "Don't jump your running or deadlifting volume back up quickly.",
    ],
    [
      'Build hamstring strength gradually with controlled, slow-tempo exercises (bridges, Romanian deadlifts) rather than deep static stretching.',
      'Warm up thoroughly with light dynamic movement before running or heavy hip-hinge lifts.',
    ],
    [
      'No improvement after 3-4 weeks of activity modification.',
      "Sitting pain that's severe or getting worse.",
    ],
  ),
  'hamstring-tendinitis-knee': plan(
    [
      'If it’s mild and only shows up after running, cut that volume by about half for a week rather than stopping outright. If it’s painful during the movement itself, stop running and any deep knee-bending (squats, lunges, deadlifts) entirely for 7-10 days before easing back in.',
      'Ice behind the knee for 15-20 minutes after activity if it feels irritated.',
      'Once acute soreness eases, do the seated hamstring stretch, held 20-30 seconds, 3 times, once a day.',
      'Add light hamstring curls or glute bridges, 2 sets of 12, before returning to running/deadlifting.',
    ],
    [
      'Skip sprinting and heavy deadlifting until hamstring curls are pain-free.',
      "Don't jump your training volume back up quickly.",
    ],
    [
      'Keep doing 2 sets of 12 hamstring curls or bridges, 2 times a week.',
      'Warm up thoroughly with dynamic stretching before running or heavy hip-hinge lifts.',
    ],
    [
      'No improvement after 3-4 weeks of activity modification.',
      'Swelling or a locking sensation behind the knee.',
    ],
  ),

  // calves
  'calf-strain': plan(
    [
      'If it’s mild and walking normally doesn’t hurt, 2-3 days off sprinting is usually enough. If it’s sharp, you’re limping, or there’s bruising, stop sprinting and any explosive push-off from your toes (jumping, quick starts) entirely for 7-10 days before easing back in.',
      'Ice the calf for 15-20 minutes, 3-4 times a day, for the first 48-72 hours.',
      'Once acute pain eases, do a standing calf stretch against a wall, held 20-30 seconds, 3 times, once a day.',
      'Rebuild strength with double-leg calf raises, 2 sets of 15, progressing to single-leg, before returning to sprinting.',
    ],
    [
      'Skip sprinting and sudden accelerations until single-leg calf raises are pain-free.',
      "Don't stretch into sharp pain while it's healing.",
    ],
    [
      'Do 5-10 minutes of dynamic calf activation (ankle circles, light hops) before sprinting or jumping sports.',
      'Keep doing 2-3 sets of 15 calf raises, 2 times a week, as ongoing maintenance.',
    ],
    [
      "A pop, significant bruising, or you can't put weight on the leg or rise onto your toes.",
      'No improvement after 2 weeks of rest.',
    ],
  ),
  'achilles-tendinitis': plan(
    [
      'If it’s mild and only shows up after running, cut your running volume by about half for a week rather than stopping outright. If it’s painful during the run itself or first thing in the morning, stop running and any calf raises entirely for 7-10 days before easing back in.',
      'Ice the lower Achilles for 15-20 minutes after activity.',
      'Once acute soreness eases, do the standing calf stretch against a wall, held 20-30 seconds, 3 times, once a day.',
      'Add slow eccentric calf raises off a step (rise on both feet, lower on the injured leg alone over 4-5 seconds), 3 sets of 15, once or twice a day.',
    ],
    [
      'Skip sprinting, jumping, and heavy calf raises until eccentric calf raises are pain-free.',
      "Don't jump your running volume back up quickly or add hill training right after time off.",
    ],
    [
      'Keep doing 3 sets of 15 eccentric calf raises, 2-3 times a week, even after symptoms resolve — this is a well-established maintenance routine for this tendon.',
      'Increase running volume by no more than about 10% per week.',
    ],
    [
      'No improvement after 3-4 weeks of activity modification.',
      'A sudden snap, pop, or inability to push off/rise onto your toes — possible rupture, seek care immediately.',
    ],
  ),
  'calf-cramp': plan(
    [
      'Stop and stretch the calf immediately: straighten the leg, pull your toes toward you, hold 20-30 seconds.',
      'Apply light heat and massage the muscle for a few minutes to help it release.',
      'Drink water with electrolytes (or a sports drink) immediately and over the next hour.',
      'Sit out the rest of that session if cramping returns after you resume.',
    ],
    [
      "Don't push through repeated cramping — stop and address hydration and fatigue instead.",
      "Don't go straight into sprinting or max effort without warming up.",
    ],
    [
      'Drink water throughout the day, not just during exercise, especially in heat.',
      'Do 5-10 minutes of dynamic calf warm-up (ankle circles, light jogging) before sprinting.',
    ],
    [
      'Cramping that keeps recurring across multiple sessions despite hydrating well.',
      'Severe pain that feels different from a typical cramp.',
    ],
  ),
};
