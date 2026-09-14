export type SymptomOption = {
  id: string;
  label: string;
};

export type SymptomCategoryId = 'location' | 'painType' | 'trigger' | 'activity';

export type SymptomCategory = {
  id: SymptomCategoryId;
  label: string;
  options: SymptomOption[];
};

function opts(...pairs: [string, string][]): SymptomOption[] {
  return pairs.map(([id, label]) => ({ id, label }));
}

function categories(
  location: SymptomOption[],
  painType: SymptomOption[],
  trigger: SymptomOption[],
  activity: SymptomOption[],
): SymptomCategory[] {
  return [
    { id: 'location', label: 'Where exactly does it hurt?', options: location },
    { id: 'painType', label: 'What does it feel like?', options: painType },
    { id: 'trigger', label: 'What makes it worse?', options: trigger },
    { id: 'activity', label: 'What activities do you do regularly?', options: activity },
  ];
}

// Every category is tailored per muscle group (not shared) so the combination
// of answers narrows toward a specific, accurate diagnosis in a later feature
// -- e.g. knee + below the kneecap + pain when bending/running + still a
// growing teen athlete points toward Osgood-Schlatter specifically.
export const SYMPTOM_CATEGORIES_BY_GROUP: Record<string, SymptomCategory[]> = {
  shoulders: categories(
    opts(
      ['front', 'Front of the shoulder'],
      ['top', 'Top of the shoulder'],
      ['back', 'Back of the shoulder'],
      ['outer', 'Outer/side of the shoulder'],
      ['deep-joint', 'Deep inside the joint'],
    ),
    opts(
      ['sharp-catch', 'Sharp, catching pain'],
      ['dull-ache', 'Dull, achy pain'],
      ['burning', 'Burning sensation'],
      ['shooting-arm', 'Sharp pain shooting down the arm'],
      ['stiff-tight', 'Stiff and tight more than painful'],
    ),
    opts(
      ['overhead', 'Reaching overhead'],
      ['behind-back', 'Reaching behind your back'],
      ['lying-on-it', 'Lying on that shoulder at night'],
      ['lifting-weight', 'Lifting or pressing weight'],
      ['throwing', 'A throwing motion'],
    ),
    opts(
      ['weightlifting', 'Weightlifting (bench, overhead press)'],
      ['throwing-sports', 'Throwing sports (baseball, football)'],
      ['swimming', 'Swimming'],
      ['racquet-sports', 'Racquet sports or volleyball'],
      ['overhead-labor', 'Repetitive overhead work'],
    ),
  ),
  chest: categories(
    opts(
      ['center', 'Center of the chest (breastbone)'],
      ['upper', 'Upper chest, near the collarbone'],
      ['side', 'Side of the chest, near the armpit'],
      ['shoulder-junction', 'Where the chest meets the shoulder'],
    ),
    opts(
      ['sharp-tear', 'Sudden sharp pain, like something tore'],
      ['dull-ache', 'Dull, achy pain'],
      ['tight-pulling', 'Tight, pulling feeling'],
      ['sore-tender', 'Sore or tender to the touch'],
    ),
    opts(
      ['pressing', 'A pressing motion (bench press, push-up)'],
      ['stretch-back', 'Stretching your arms out or back'],
      ['deep-breath', 'Taking a deep breath'],
      ['twisting-torso', 'Twisting your torso'],
    ),
    opts(
      ['weightlifting-press', 'Weightlifting (bench/chest press)'],
      ['contact-sports', 'Contact sports (football, wrestling)'],
      ['calisthenics', 'Gymnastics / calisthenics (rings, dips)'],
      ['throwing-sports', 'Throwing sports'],
    ),
  ),
  abs: categories(
    opts(
      ['upper', 'Upper abs, near the ribs'],
      ['lower', 'Lower abs, near the hips'],
      ['side-obliques', 'Side of the torso (obliques)'],
      ['one-side', 'One side only'],
    ),
    opts(
      ['sharp-sudden', 'Sudden sharp pain'],
      ['spasm-cramp', 'Cramping or spasm'],
      ['dull-ache', 'Dull, achy pain'],
      ['sore-tender', 'Sore or tender to the touch'],
    ),
    opts(
      ['twisting', 'Twisting or rotating'],
      ['crunching', 'Sitting up or crunching'],
      ['cough-sneeze', 'Coughing, sneezing, or laughing'],
      ['reach-overhead', 'Reaching or stretching overhead'],
    ),
    opts(
      ['rotational-sports', 'Rotational sports (golf, baseball, tennis)'],
      ['weightlifting-core', 'Weightlifting / heavy lifting'],
      ['running-sprinting', 'Running or sprinting'],
      ['calisthenics', 'Gymnastics / calisthenics'],
    ),
  ),
  biceps: categories(
    opts(
      ['front-upper-arm', 'Front of the upper arm'],
      ['near-shoulder', 'Near the shoulder, top of the biceps'],
      ['near-elbow', 'Near the elbow'],
      ['bulge-spot', 'One spot with a bulge or dent'],
    ),
    opts(
      ['sudden-pop', 'A sudden pop or snap'],
      ['sharp-with-use', 'Sharp pain when using the arm'],
      ['dull-ache', 'Dull, achy pain'],
      ['sore-tender', 'Sore or tender to the touch'],
    ),
    opts(
      ['curling-lifting', 'Curling or lifting something'],
      ['carrying', 'Carrying a heavy object'],
      ['overhead-reach', 'Reaching overhead'],
      ['gripping-pulling', 'A pulling or gripping motion'],
    ),
    opts(
      ['weightlifting-curl', 'Weightlifting (curls, rows)'],
      ['climbing', 'Climbing'],
      ['throwing-sports', 'Throwing sports'],
      ['manual-labor', 'Manual labor / heavy carrying'],
    ),
  ),
  forearms: categories(
    opts(
      ['top-near-elbow', 'Top of the forearm, near the elbow'],
      ['inner-forearm', 'Inside of the forearm'],
      ['near-wrist', 'Near the wrist'],
      ['whole-forearm', 'A general ache through the whole forearm'],
    ),
    opts(
      ['sharp-with-grip', 'Sharp pain when gripping'],
      ['burning-tight', 'Burning or tight feeling'],
      ['dull-ache', 'Dull, achy pain'],
      ['numb-tingle', 'Numbness or tingling'],
    ),
    opts(
      ['gripping', 'Gripping or squeezing something'],
      ['repetitive-motion', 'Typing or repetitive hand motion'],
      ['wrist-bent-lift', 'Lifting with your wrist bent'],
      ['swinging', 'Swinging a racquet, club, or bat'],
    ),
    opts(
      ['racquet-sports', 'Racquet sports'],
      ['weightlifting-grip', 'Weightlifting (deadlifts, pull-ups)'],
      ['climbing', 'Climbing'],
      ['desk-typing', 'Desk work / lots of typing'],
    ),
  ),
  quads: categories(
    opts(
      ['front-mid-thigh', 'Front, middle of the thigh'],
      ['near-hip', 'Near the hip'],
      ['near-knee', 'Near the knee'],
      ['one-spot', 'One specific spot you can point to'],
    ),
    opts(
      ['sharp-sudden', 'Sudden sharp pain'],
      ['spasm-cramp', 'Cramping or spasm'],
      ['dull-ache', 'Dull, achy pain'],
      ['sore-tender', 'Sore or tender to the touch'],
    ),
    opts(
      ['sprinting-kicking', 'Sprinting or kicking'],
      ['jumping-landing', 'Jumping or landing'],
      ['stairs', 'Climbing stairs'],
      ['straighten-knee', 'Straightening your knee against resistance'],
    ),
    opts(
      ['running-sprinting', 'Running / sprinting'],
      ['kicking-sports', 'Soccer or other kicking sports'],
      ['weightlifting-squats', 'Weightlifting (squats, lunges)'],
      ['cycling', 'Cycling'],
    ),
  ),
  groin: categories(
    opts(
      ['upper-inner-thigh', 'Upper inner thigh, near the groin crease'],
      ['mid-inner-thigh', 'Middle of the inner thigh'],
      ['pubic-bone', 'Right at the pubic bone'],
      ['one-side', 'One side only'],
    ),
    opts(
      ['sharp-sudden', 'Sudden sharp pain'],
      ['dull-ache', 'Dull, achy pain'],
      ['tight-pulling', 'Tight, pulling feeling'],
      ['sore-tender', 'Sore or tender to the touch'],
    ),
    opts(
      ['legs-together', 'Bringing your legs together'],
      ['change-direction', 'Changing direction while running'],
      ['kicking', 'Kicking'],
      ['wide-stance', 'A wide stance or lunge position'],
    ),
    opts(
      ['kicking-sports', 'Soccer or other kicking sports'],
      ['running-direction-changes', 'Running with sharp direction changes'],
      ['hockey-skating', 'Hockey / skating'],
      ['weightlifting-squats', 'Weightlifting (squats, lunges)'],
    ),
  ),
  knees: categories(
    opts(
      ['front-kneecap', 'Front of the knee (kneecap)'],
      ['below-kneecap', 'Just below the kneecap'],
      ['inside-knee', 'Inside of the knee'],
      ['outside-knee', 'Outside of the knee'],
      ['back-knee', 'Back of the knee'],
    ),
    opts(
      ['sharp-sudden', 'Sudden sharp pain'],
      ['dull-ache', 'Dull, achy pain'],
      ['catching-locking', 'Catching or locking sensation'],
      ['swelling-puffy', 'Swollen or puffy feeling'],
    ),
    opts(
      ['bending', 'Bending the knee'],
      ['stairs', 'Going up or down stairs'],
      ['after-sitting', 'After sitting for a while'],
      ['running-jumping', 'Running or jumping'],
      ['pivoting', 'Pivoting or twisting on the knee'],
    ),
    opts(
      ['running', 'Running / distance running'],
      ['jumping-sports', 'Jumping sports (basketball, volleyball)'],
      ['cutting-sports', 'Soccer or other cutting/pivoting sports'],
      ['cycling', 'Cycling'],
      ['growing-teen-athlete', "You're a teen still growing and very active"],
    ),
  ),
  traps: categories(
    opts(
      ['base-of-neck', 'Base of the neck'],
      ['top-of-shoulder', 'Top of the shoulder blade area'],
      ['between-shoulder-blades', 'Between the shoulder blades'],
    ),
    opts(
      ['tight-knot', 'A tight knot you can feel'],
      ['dull-ache', 'Dull, achy pain'],
      ['sharp-with-movement', 'Sharp pain with certain movements'],
      ['headache-linked', 'Comes with a headache'],
    ),
    opts(
      ['shrugging', 'Shrugging your shoulders'],
      ['turning-head', 'Turning your head / looking over your shoulder'],
      ['carrying-bag', 'Carrying a heavy bag or backpack'],
      ['desk-posture', 'Sitting at a desk for a while'],
    ),
    opts(
      ['desk-work', 'Desk work / computer use'],
      ['weightlifting-shrugs', 'Weightlifting (shrugs, overhead press)'],
      ['contact-sports', 'Contact sports'],
      ['carrying-heavy-loads', 'Carrying heavy loads regularly'],
    ),
  ),
  'upper-back': categories(
    opts(
      ['between-shoulder-blades', 'Between the shoulder blades'],
      ['one-side', 'One side only'],
      ['upper-spine-center', 'Center, along the upper spine'],
    ),
    opts(
      ['sharp-sudden', 'Sudden sharp pain'],
      ['dull-ache', 'Dull, achy pain'],
      ['spasm-cramp', 'Muscle spasm'],
      ['sore-tender', 'Sore or tender to the touch'],
    ),
    opts(
      ['twisting-torso', 'Twisting your torso'],
      ['deep-breath', 'Taking a deep breath'],
      ['prolonged-sitting', 'Sitting for a long time'],
      ['overhead-lifting', 'Lifting something overhead'],
    ),
    opts(
      ['desk-posture', 'Desk work / poor posture'],
      ['weightlifting-rows', 'Weightlifting (rows, overhead lifts)'],
      ['rotational-sports', 'Rotational sports (golf, tennis)'],
      ['contact-sports', 'Contact sports'],
    ),
  ),
  'lower-back': categories(
    opts(
      ['center-lower-back', 'Center of the lower back'],
      ['one-side', 'One side only'],
      ['near-tailbone', 'Near the tailbone'],
      ['radiates-leg', 'Radiates down into the leg'],
    ),
    opts(
      ['sharp-sudden', 'Sudden sharp pain'],
      ['dull-ache', 'Dull, achy pain'],
      ['spasm-cramp', 'Muscle spasm'],
      ['numb-tingle-leg', 'Numbness or tingling down the leg'],
    ),
    opts(
      ['bending-over', 'Bending over'],
      ['lifting', 'Lifting something'],
      ['prolonged-sitting', 'Sitting for a long time'],
      ['morning-stiffness', 'Right after waking up'],
    ),
    opts(
      ['weightlifting-deadlift', 'Weightlifting (deadlifts, squats)'],
      ['desk-sitting', 'Desk work / lots of sitting'],
      ['running', 'Running'],
      ['manual-labor', 'Manual labor / repetitive lifting'],
    ),
  ),
  triceps: categories(
    opts(
      ['back-upper-arm', 'Back of the upper arm'],
      ['near-elbow', 'Near the elbow'],
      ['near-shoulder', 'Near the shoulder'],
    ),
    opts(
      ['sudden-pop', 'A sudden pop or snap'],
      ['sharp-with-use', 'Sharp pain when using the arm'],
      ['dull-ache', 'Dull, achy pain'],
      ['sore-tender', 'Sore or tender to the touch'],
    ),
    opts(
      ['pushing-extending', 'Pushing or straightening your arm'],
      ['overhead-press', 'An overhead pressing motion'],
      ['landing-on-hand', 'Landing on an outstretched hand'],
    ),
    opts(
      ['weightlifting-press', 'Weightlifting (bench/overhead press, dips)'],
      ['throwing-sports', 'Throwing sports'],
      ['calisthenics', 'Gymnastics / calisthenics'],
    ),
  ),
  glutes: categories(
    opts(
      ['center-glute', 'Center of the glute'],
      ['side-hip', 'Side of the hip'],
      ['deep-sit-bone', 'Deep inside, near the sit bone'],
      ['radiates-leg', 'Radiates down the back of the leg'],
    ),
    opts(
      ['sharp-sudden', 'Sudden sharp pain'],
      ['dull-ache', 'Dull, achy pain'],
      ['tight-pulling', 'Tight, pulling feeling'],
      ['numb-tingle-leg', 'Numbness or tingling down the leg'],
    ),
    opts(
      ['sitting', 'Sitting for a long time'],
      ['stairs-standing', 'Climbing stairs or standing up'],
      ['running-sprinting', 'Running or sprinting'],
      ['stretching', 'Stretching that area'],
    ),
    opts(
      ['running-sprinting', 'Running / sprinting'],
      ['weightlifting-squats', 'Weightlifting (squats, deadlifts, lunges)'],
      ['desk-sitting', 'Desk work / lots of sitting'],
      ['cycling', 'Cycling'],
    ),
  ),
  hamstrings: categories(
    opts(
      ['mid-back-thigh', 'Middle of the back of the thigh'],
      ['near-sit-bone', 'Near the sit bone, top of the hamstring'],
      ['near-back-knee', 'Near the back of the knee'],
    ),
    opts(
      ['sudden-pop', 'A sudden pop or snap'],
      ['sharp-sudden', 'Sudden sharp pain'],
      ['dull-ache', 'Dull, achy pain'],
      ['tight-pulling', 'Tight, pulling feeling'],
    ),
    opts(
      ['sprinting', 'Sprinting'],
      ['stretching-kicking', 'Stretching or kicking out your leg'],
      ['bending-knee', 'Bending your knee against resistance'],
    ),
    opts(
      ['running-sprinting', 'Running / sprinting'],
      ['kicking-sports', 'Soccer or other kicking sports'],
      ['weightlifting-deadlift', 'Weightlifting (deadlifts, hamstring curls)'],
      ['dance-gymnastics', 'Dance / gymnastics (high kicks, splits)'],
    ),
  ),
  calves: categories(
    opts(
      ['upper-calf', 'Upper calf, behind the knee area'],
      ['mid-calf', 'Middle of the calf'],
      ['lower-achilles', 'Lower calf, near the Achilles tendon'],
    ),
    opts(
      ['sudden-pop', 'A sudden pop or snap'],
      ['sharp-sudden', 'Sudden sharp pain'],
      ['spasm-cramp', 'Cramping'],
      ['dull-ache', 'Dull, achy pain'],
    ),
    opts(
      ['push-off-running', 'Pushing off while running'],
      ['calf-raise', 'Rising onto your toes'],
      ['sudden-sprint-stop', 'A sudden sprint or stop-and-go movement'],
      ['first-steps', 'The first steps after resting'],
    ),
    opts(
      ['running-sprinting', 'Running / sprinting'],
      ['jumping-sports', 'Jumping sports (basketball, volleyball)'],
      ['kicking-sports', 'Soccer'],
      ['weightlifting-calf-raises', 'Weightlifting (calf raises)'],
    ),
  ),
};
