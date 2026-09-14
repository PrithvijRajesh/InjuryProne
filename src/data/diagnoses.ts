import type { SymptomCategoryId } from './symptoms';

export type Diagnosis = {
  id: string;
  name: string;
  summary: string;
  // A single, concrete, self-checkable sign that helps someone tell this
  // diagnosis apart from others that scored similarly for the same group
  // (e.g. "a tender bump right below the kneecap" for Osgood-Schlatter vs.
  // Patellar Tendinitis) -- shown on the results card alongside the summary.
  telltaleSign: string;
  // Category -> option ids that point toward this diagnosis. A diagnosis
  // doesn't need every indicator selected, and different combinations of
  // selected symptoms can point to the same diagnosis if they overlap here.
  indicators: Partial<Record<SymptomCategoryId, string[]>>;
};

function diagnosis(
  id: string,
  name: string,
  summary: string,
  telltaleSign: string,
  indicators: Partial<Record<SymptomCategoryId, string[]>>,
): Diagnosis {
  return { id, name, summary, telltaleSign, indicators };
}

export const DIAGNOSES_BY_GROUP: Record<string, Diagnosis[]> = {
  shoulders: [
    diagnosis(
      'rotator-cuff-strain',
      'Rotator Cuff Strain / Tendinitis',
      'Overuse or strain of the tendons that stabilize the shoulder joint.',
      'Pain specifically when reaching overhead or behind your back, plus a dull ache even when the arm is resting.',
      {
        location: ['front', 'outer'],
        painType: ['dull-ache', 'sharp-catch'],
        trigger: ['overhead', 'lifting-weight', 'lying-on-it'],
        activity: ['weightlifting', 'swimming', 'overhead-labor', 'throwing-sports'],
      },
    ),
    diagnosis(
      'shoulder-impingement',
      'Shoulder Impingement Syndrome',
      'Tendons getting pinched between bones during overhead motion.',
      'A pinching pain at the top of the shoulder in one specific arc as you raise your arm — better below and above that arc.',
      {
        location: ['outer', 'top'],
        painType: ['sharp-catch', 'stiff-tight'],
        trigger: ['overhead', 'behind-back'],
        activity: ['swimming', 'overhead-labor', 'racquet-sports'],
      },
    ),
    diagnosis(
      'labral-tear',
      'Labral Tear (SLAP Lesion)',
      'Tear of the cartilage ring that stabilizes the shoulder socket.',
      'A deep clicking, catching, or popping sensation inside the joint itself, not just surface soreness.',
      {
        location: ['deep-joint'],
        painType: ['shooting-arm', 'sharp-catch'],
        trigger: ['throwing', 'overhead'],
        activity: ['throwing-sports', 'weightlifting'],
      },
    ),
  ],
  chest: [
    diagnosis(
      'pectoral-strain',
      'Pectoral Muscle Strain / Tear',
      'Overstretched or torn chest muscle fibers, common with pressing motions.',
      'Pain and tightness right in the chest muscle itself, worse when pressing weight away from your body.',
      {
        location: ['center', 'shoulder-junction'],
        painType: ['sharp-tear', 'tight-pulling'],
        trigger: ['pressing', 'stretch-back'],
        activity: ['weightlifting-press', 'calisthenics', 'contact-sports'],
      },
    ),
    diagnosis(
      'costochondritis',
      'Costochondritis',
      'Inflammation where the ribs meet the breastbone cartilage.',
      'Tenderness you can pinpoint by pressing directly on the cartilage where your ribs meet your breastbone.',
      {
        location: ['center', 'upper'],
        painType: ['sharp-tear', 'sore-tender'],
        trigger: ['deep-breath', 'twisting-torso'],
        activity: ['contact-sports'],
      },
    ),
    diagnosis(
      'intercostal-strain',
      'Intercostal Muscle Strain',
      'Strain of the small muscles between the ribs, often from twisting.',
      'Sharp pain between two specific ribs that spikes with a deep breath or a twist, not with pressing on the breastbone.',
      {
        location: ['side'],
        painType: ['sharp-tear', 'sore-tender'],
        trigger: ['twisting-torso', 'deep-breath'],
        activity: ['throwing-sports', 'contact-sports'],
      },
    ),
  ],
  abs: [
    diagnosis(
      'rectus-abdominis-strain',
      'Abdominal Muscle Strain',
      'Strain of the central abdominal muscles from sit-up style movement.',
      'Pain down the center of the stomach that’s sharp when you sit up or tense your abs, calm otherwise.',
      {
        location: ['upper', 'lower'],
        painType: ['sharp-sudden', 'sore-tender'],
        trigger: ['crunching', 'cough-sneeze'],
        activity: ['weightlifting-core', 'calisthenics'],
      },
    ),
    diagnosis(
      'oblique-strain',
      'Oblique Strain',
      'Strain of the muscles along the side of the torso from twisting.',
      'Pain along one side of your waist that’s worse twisting or reaching overhead on that same side.',
      {
        location: ['side-obliques', 'one-side'],
        painType: ['sharp-sudden', 'dull-ache'],
        trigger: ['twisting', 'reach-overhead'],
        activity: ['rotational-sports', 'running-sprinting'],
      },
    ),
    diagnosis(
      'ab-muscle-spasm',
      'Abdominal Muscle Spasm / Cramp',
      'Cramping of the core muscles, often exercise-induced.',
      'A sudden, visible tightening or knotting of the ab muscles that eases within minutes once you stop and stretch.',
      {
        painType: ['spasm-cramp'],
        trigger: ['crunching', 'cough-sneeze'],
        activity: ['running-sprinting', 'calisthenics'],
      },
    ),
  ],
  biceps: [
    diagnosis(
      'biceps-tendon-rupture',
      'Biceps Tendon Rupture',
      'A tear of the tendon connecting the biceps to the shoulder or elbow.',
      'A sudden pop with the muscle bunching up toward the shoulder, leaving a visible dent or bulge in the upper arm.',
      {
        location: ['bulge-spot', 'near-elbow', 'near-shoulder'],
        painType: ['sudden-pop'],
        trigger: ['curling-lifting', 'carrying'],
        activity: ['weightlifting-curl', 'manual-labor'],
      },
    ),
    diagnosis(
      'biceps-tendinitis',
      'Biceps Tendinitis',
      'Inflammation of the biceps tendon from repetitive overhead or curling motion.',
      'An ache at the front of the shoulder that builds with repeated curling or reaching overhead, not a sudden pop.',
      {
        location: ['near-shoulder', 'front-upper-arm'],
        painType: ['sharp-with-use', 'dull-ache'],
        trigger: ['overhead-reach', 'curling-lifting'],
        activity: ['weightlifting-curl', 'throwing-sports', 'climbing'],
      },
    ),
    diagnosis(
      'biceps-strain',
      'Biceps Muscle Strain',
      'Overstretched biceps muscle fibers from carrying or pulling load.',
      'Soreness through the belly of the upper arm muscle, worse when carrying something with your palm facing up.',
      {
        location: ['front-upper-arm'],
        painType: ['dull-ache', 'sore-tender'],
        trigger: ['gripping-pulling', 'carrying'],
        activity: ['manual-labor', 'climbing'],
      },
    ),
  ],
  forearms: [
    diagnosis(
      'tennis-elbow',
      'Lateral Epicondylitis (Tennis Elbow)',
      'Overuse injury of the tendons on the outside of the elbow.',
      'Pain on the outside of the elbow that spikes when you grip something or lift with your palm facing down.',
      {
        location: ['top-near-elbow'],
        painType: ['sharp-with-grip', 'dull-ache'],
        trigger: ['gripping', 'swinging', 'wrist-bent-lift'],
        activity: ['racquet-sports', 'weightlifting-grip'],
      },
    ),
    diagnosis(
      'golfers-elbow',
      "Medial Epicondylitis (Golfer's Elbow)",
      'Overuse injury of the tendons on the inside of the elbow/forearm.',
      'Pain on the inside of the elbow that spikes when you grip something or lift with your palm facing up.',
      {
        location: ['inner-forearm', 'top-near-elbow'],
        painType: ['sharp-with-grip', 'dull-ache'],
        trigger: ['wrist-bent-lift', 'gripping'],
        activity: ['weightlifting-grip', 'climbing'],
      },
    ),
    diagnosis(
      'carpal-tunnel',
      'Carpal Tunnel / Wrist Nerve Irritation',
      'Nerve compression near the wrist from repetitive hand motion.',
      'Numbness or tingling in the thumb, index, and middle fingers specifically (not the pinky), often worse at night.',
      {
        location: ['near-wrist'],
        painType: ['numb-tingle', 'burning-tight'],
        trigger: ['repetitive-motion', 'gripping'],
        activity: ['desk-typing', 'climbing'],
      },
    ),
  ],
  quads: [
    diagnosis(
      'quad-strain',
      'Quadriceps Strain / Pull',
      'Torn or overstretched fibers in the front thigh muscle.',
      'A sudden, sharp pinch in the front of the thigh during a sprint or kick, at one specific spot you can point to.',
      {
        location: ['front-mid-thigh', 'one-spot'],
        painType: ['sharp-sudden', 'sore-tender'],
        trigger: ['sprinting-kicking', 'straighten-knee'],
        activity: ['running-sprinting', 'kicking-sports'],
      },
    ),
    diagnosis(
      'quad-tendinitis',
      'Quadriceps Tendinitis',
      'Inflammation of the tendon connecting the quad to the kneecap.',
      'An ache right where the thigh meets the kneecap, worse going down stairs or after sitting a long time.',
      {
        location: ['near-knee'],
        painType: ['dull-ache', 'sore-tender'],
        trigger: ['jumping-landing', 'stairs', 'straighten-knee'],
        activity: ['weightlifting-squats', 'kicking-sports'],
      },
    ),
    diagnosis(
      'hip-flexor-strain',
      'Hip Flexor Strain (Referred)',
      'Strain near the hip that can radiate pain into the front thigh.',
      'Pain at the front of the hip when lifting your knee toward your chest, calm when just standing or walking.',
      {
        location: ['near-hip'],
        painType: ['sharp-sudden', 'dull-ache'],
        trigger: ['sprinting-kicking', 'stairs'],
        activity: ['running-sprinting', 'cycling'],
      },
    ),
  ],
  groin: [
    diagnosis(
      'adductor-strain',
      'Adductor (Groin) Strain',
      'Strain of the inner-thigh muscles that pull the legs together.',
      'A sudden pinch or tightness in the inner thigh during a sprint, kick, or quick change of direction.',
      {
        location: ['upper-inner-thigh', 'mid-inner-thigh'],
        painType: ['sharp-sudden', 'tight-pulling'],
        trigger: ['legs-together', 'change-direction', 'wide-stance'],
        activity: ['kicking-sports', 'running-direction-changes', 'hockey-skating'],
      },
    ),
    diagnosis(
      'sports-hernia',
      'Sports Hernia (Athletic Pubalgia)',
      'Strain or tear of soft tissue in the lower abdomen/groin area.',
      'A deep, nagging ache in the lower belly/groin that gets worse with sit-ups or a hard cough, not one specific pinch.',
      {
        location: ['pubic-bone', 'one-side'],
        painType: ['dull-ache', 'sore-tender'],
        trigger: ['change-direction', 'kicking'],
        activity: ['kicking-sports', 'hockey-skating'],
      },
    ),
    diagnosis(
      'adductor-tendinopathy',
      'Hip Adductor Tendinopathy',
      'Chronic irritation of the groin tendons from repetitive loading.',
      'A gradual, nagging ache high in the inner thigh that builds with repeated wide-stance movement rather than one sudden moment.',
      {
        location: ['upper-inner-thigh'],
        painType: ['dull-ache', 'tight-pulling'],
        trigger: ['wide-stance', 'kicking'],
        activity: ['weightlifting-squats', 'hockey-skating'],
      },
    ),
  ],
  knees: [
    diagnosis(
      'patellofemoral-pain',
      "Patellofemoral Pain Syndrome (Runner's Knee)",
      'Irritation under the kneecap from tracking issues, common in runners.',
      'An ache around or behind the kneecap that’s worse going down stairs or after sitting with knees bent for a while.',
      {
        location: ['front-kneecap'],
        painType: ['dull-ache'],
        trigger: ['stairs', 'after-sitting', 'running-jumping'],
        activity: ['running', 'cycling'],
      },
    ),
    diagnosis(
      'patellar-tendinitis',
      "Patellar Tendinitis (Jumper's Knee)",
      'Inflammation of the tendon just below the kneecap from jumping/landing.',
      'A tender spot right below the kneecap that hurts most on landing from a jump.',
      {
        location: ['below-kneecap'],
        painType: ['dull-ache', 'sharp-sudden'],
        trigger: ['running-jumping', 'stairs'],
        activity: ['jumping-sports', 'running'],
      },
    ),
    diagnosis(
      'osgood-schlatter',
      'Osgood-Schlatter Disease',
      'Growth-plate irritation below the kneecap in growing teen athletes.',
      'A tender, sometimes visibly swollen bump right below the kneecap, in a still-growing teenager.',
      {
        location: ['below-kneecap'],
        painType: ['dull-ache', 'sharp-sudden'],
        trigger: ['bending', 'running-jumping'],
        activity: ['growing-teen-athlete', 'jumping-sports', 'running'],
      },
    ),
    diagnosis(
      'meniscus-tear',
      'Meniscus Tear',
      'Tear of the knee cartilage, often causing catching or locking.',
      'The knee catching, locking, or giving way, often with swelling that builds up over several hours after a twisting injury.',
      {
        location: ['inside-knee', 'outside-knee'],
        painType: ['catching-locking', 'swelling-puffy'],
        trigger: ['pivoting', 'bending'],
        activity: ['cutting-sports', 'jumping-sports'],
      },
    ),
    diagnosis(
      'it-band-syndrome',
      'IT Band Syndrome',
      'Irritation of the band of tissue running down the outside of the thigh to the knee.',
      'A sharp ache on the outside of the knee that shows up at a predictable point in a run and eases with rest.',
      {
        location: ['outside-knee'],
        painType: ['dull-ache'],
        trigger: ['running-jumping', 'stairs'],
        activity: ['running', 'cycling'],
      },
    ),
  ],
  traps: [
    diagnosis(
      'trapezius-strain',
      'Trapezius Muscle Strain',
      'Strain of the upper back/neck muscle from carrying or lifting load.',
      'A pulled, sore feeling across the top of the shoulder/neck that’s worse shrugging or carrying a bag on that side.',
      {
        location: ['top-of-shoulder', 'between-shoulder-blades'],
        painType: ['sharp-with-movement', 'dull-ache'],
        trigger: ['shrugging', 'carrying-bag'],
        activity: ['weightlifting-shrugs', 'carrying-heavy-loads', 'contact-sports'],
      },
    ),
    diagnosis(
      'trigger-points',
      'Tension Myalgia / Trigger Points',
      'Tight muscle "knots" from sustained posture or stress.',
      'A specific tight "knot" you can press on that reproduces the familiar ache, often after a day hunched at a desk.',
      {
        location: ['base-of-neck', 'top-of-shoulder'],
        painType: ['tight-knot', 'headache-linked'],
        trigger: ['desk-posture', 'turning-head'],
        activity: ['desk-work'],
      },
    ),
    diagnosis(
      'cervicogenic-headache',
      'Cervicogenic Tension Headache Referral',
      'Neck/shoulder tension referring pain up into a headache.',
      'A headache that starts at the base of the skull and spreads forward, tied to neck stiffness rather than light or sound sensitivity.',
      {
        location: ['base-of-neck'],
        painType: ['headache-linked', 'tight-knot'],
        trigger: ['turning-head', 'desk-posture'],
        activity: ['desk-work'],
      },
    ),
  ],
  'upper-back': [
    diagnosis(
      'rhomboid-strain',
      'Rhomboid Strain',
      'Strain of the muscles between the shoulder blades from rowing/lifting.',
      'A sharp pull between the shoulder blades right after a rowing or heavy lifting motion.',
      {
        location: ['between-shoulder-blades', 'one-side'],
        painType: ['sharp-sudden', 'sore-tender'],
        trigger: ['twisting-torso', 'overhead-lifting'],
        activity: ['weightlifting-rows', 'contact-sports'],
      },
    ),
    diagnosis(
      'postural-fatigue',
      'Postural Muscle Fatigue Syndrome',
      'Achy upper back muscles from sustained sitting posture.',
      'A dull, generalized ache across the upper back that builds through the day and eases once you stand and stretch.',
      {
        location: ['upper-spine-center', 'between-shoulder-blades'],
        painType: ['dull-ache'],
        trigger: ['prolonged-sitting'],
        activity: ['desk-posture'],
      },
    ),
    diagnosis(
      'thoracic-spasm',
      'Thoracic Muscle Spasm',
      'Muscle spasm in the upper back, often from twisting or breathing deeply.',
      'A sudden muscle spasm in the upper back/mid-spine that makes it hard to take a deep breath.',
      {
        location: ['one-side', 'upper-spine-center'],
        painType: ['spasm-cramp', 'sharp-sudden'],
        trigger: ['twisting-torso', 'deep-breath'],
        activity: ['rotational-sports', 'weightlifting-rows'],
      },
    ),
  ],
  'lower-back': [
    diagnosis(
      'lumbar-strain',
      'Lumbar Muscle Strain',
      'Strained lower-back muscles, commonly from bending or lifting.',
      'A dull to sharp ache across the lower back that’s worse bending or lifting, without pain running down the leg.',
      {
        location: ['center-lower-back', 'one-side'],
        painType: ['sharp-sudden', 'spasm-cramp'],
        trigger: ['bending-over', 'lifting'],
        activity: ['weightlifting-deadlift', 'manual-labor'],
      },
    ),
    diagnosis(
      'sciatica',
      'Sciatica (Nerve Compression)',
      'Compressed nerve causing pain that radiates down the leg.',
      'Pain that starts in the lower back or glute and radiates down the back of one leg, sometimes with tingling.',
      {
        location: ['radiates-leg'],
        painType: ['numb-tingle-leg', 'sharp-sudden'],
        trigger: ['bending-over', 'prolonged-sitting'],
        activity: ['desk-sitting', 'manual-labor'],
      },
    ),
    diagnosis(
      'disc-irritation',
      'Lumbar Disc Irritation',
      'Irritation of a spinal disc, often worse after rest or sitting.',
      'Back pain that’s worse sitting or bending forward and eases when you stand or lie down.',
      {
        location: ['center-lower-back', 'radiates-leg'],
        painType: ['dull-ache', 'numb-tingle-leg'],
        trigger: ['morning-stiffness', 'prolonged-sitting', 'lifting'],
        activity: ['desk-sitting', 'weightlifting-deadlift'],
      },
    ),
    diagnosis(
      'si-joint-dysfunction',
      'Sacroiliac (SI) Joint Dysfunction',
      'Irritation of the joint connecting the spine and pelvis.',
      'Pain focused on one side low near the tailbone/pelvis, worse standing on one leg or going up stairs.',
      {
        location: ['near-tailbone', 'one-side'],
        painType: ['dull-ache', 'sharp-sudden'],
        trigger: ['prolonged-sitting', 'bending-over'],
        activity: ['running', 'manual-labor'],
      },
    ),
  ],
  triceps: [
    diagnosis(
      'triceps-tendon-injury',
      'Triceps Tendon Strain / Rupture',
      'Injury to the tendon connecting the triceps to the elbow.',
      'A sudden pop or tear feeling at the back of the elbow with noticeable weakness straightening the arm.',
      {
        location: ['near-elbow', 'back-upper-arm'],
        painType: ['sudden-pop', 'sharp-with-use'],
        trigger: ['pushing-extending', 'landing-on-hand'],
        activity: ['weightlifting-press', 'calisthenics'],
      },
    ),
    diagnosis(
      'triceps-tendinitis',
      'Triceps Tendinitis',
      'Inflammation of the triceps tendon from repetitive pressing.',
      'An ache at the back of the elbow that builds gradually with repeated pressing, not a sudden pop.',
      {
        location: ['near-elbow'],
        painType: ['dull-ache', 'sore-tender'],
        trigger: ['overhead-press', 'pushing-extending'],
        activity: ['weightlifting-press', 'throwing-sports'],
      },
    ),
    diagnosis(
      'triceps-strain',
      'Triceps Muscle Strain',
      'Overstretched triceps muscle fibers from pushing movements.',
      'Soreness through the back of the upper arm that’s worse pushing something away from your body.',
      {
        location: ['back-upper-arm', 'near-shoulder'],
        painType: ['dull-ache', 'sore-tender'],
        trigger: ['pushing-extending'],
        activity: ['calisthenics', 'throwing-sports'],
      },
    ),
  ],
  glutes: [
    diagnosis(
      'glute-strain',
      'Gluteal Muscle Strain',
      'Strain of the glute muscle from sprinting or heavy squatting.',
      'A sudden pinch deep in the glute during a sprint or heavy squat, tender to the touch afterward.',
      {
        location: ['center-glute'],
        painType: ['sharp-sudden', 'tight-pulling'],
        trigger: ['running-sprinting', 'stairs-standing'],
        activity: ['running-sprinting', 'weightlifting-squats'],
      },
    ),
    diagnosis(
      'piriformis-syndrome',
      'Piriformis Syndrome',
      'A deep glute muscle irritating the sciatic nerve nearby.',
      'A deep ache in the glute that can shoot down the back of the leg, worse after sitting a long time.',
      {
        location: ['deep-sit-bone', 'radiates-leg'],
        painType: ['numb-tingle-leg', 'tight-pulling'],
        trigger: ['sitting', 'stretching'],
        activity: ['desk-sitting', 'cycling'],
      },
    ),
    diagnosis(
      'glute-medius-tendinopathy',
      'Gluteus Medius Tendinopathy (Hip Bursitis)',
      'Irritation of the tendon on the side of the hip.',
      'An ache on the side of the hip, worse standing on that leg alone or lying on that side at night.',
      {
        location: ['side-hip'],
        painType: ['dull-ache'],
        trigger: ['stairs-standing', 'sitting'],
        activity: ['running-sprinting', 'cycling'],
      },
    ),
  ],
  hamstrings: [
    diagnosis(
      'hamstring-strain',
      'Hamstring Strain / Pull',
      'Torn or overstretched fibers in the back of the thigh, often sudden.',
      'A sudden sharp pull in the back of the thigh during a sprint, sometimes with an audible pop and bruising.',
      {
        location: ['mid-back-thigh'],
        painType: ['sudden-pop', 'sharp-sudden'],
        trigger: ['sprinting', 'stretching-kicking'],
        activity: ['running-sprinting', 'kicking-sports'],
      },
    ),
    diagnosis(
      'proximal-hamstring-tendinopathy',
      'Proximal Hamstring Tendinopathy',
      'Chronic irritation of the hamstring tendon near the sit bone.',
      'A deep ache right at the sit bone that’s worse sitting on a hard surface or stretching, building gradually rather than sudden.',
      {
        location: ['near-sit-bone'],
        painType: ['dull-ache', 'tight-pulling'],
        trigger: ['stretching-kicking', 'bending-knee'],
        activity: ['dance-gymnastics', 'weightlifting-deadlift'],
      },
    ),
    diagnosis(
      'hamstring-tendinitis-knee',
      'Hamstring Tendinitis (Near Knee)',
      'Inflammation where the hamstring tendon crosses the back of the knee.',
      'An ache right behind the knee where the hamstring tendon crosses, worse bending the knee against resistance.',
      {
        location: ['near-back-knee'],
        painType: ['dull-ache', 'tight-pulling'],
        trigger: ['bending-knee'],
        activity: ['running-sprinting', 'weightlifting-deadlift'],
      },
    ),
  ],
  calves: [
    diagnosis(
      'calf-strain',
      'Calf Muscle Strain (Gastrocnemius Tear)',
      'Torn or overstretched calf muscle fibers, often sudden during sprinting.',
      'A sudden, sharp "pulled muscle" feeling in the calf during a sprint, sometimes described as being kicked from behind.',
      {
        location: ['upper-calf', 'mid-calf'],
        painType: ['sudden-pop', 'sharp-sudden'],
        trigger: ['push-off-running', 'sudden-sprint-stop'],
        activity: ['running-sprinting', 'jumping-sports', 'kicking-sports'],
      },
    ),
    diagnosis(
      'achilles-tendinitis',
      'Achilles Tendinitis',
      'Inflammation of the Achilles tendon from repetitive push-off.',
      'Stiffness and ache right above the heel that’s worst with the first few steps in the morning, easing as you warm up.',
      {
        location: ['lower-achilles'],
        painType: ['dull-ache', 'sharp-sudden'],
        trigger: ['calf-raise', 'first-steps', 'push-off-running'],
        activity: ['running-sprinting', 'weightlifting-calf-raises', 'jumping-sports'],
      },
    ),
    diagnosis(
      'calf-cramp',
      'Muscle Cramp',
      'Sudden involuntary calf cramping, often exercise-induced.',
      'A sudden, intense, visible tightening of the calf muscle that resolves within minutes of stretching it.',
      {
        painType: ['spasm-cramp'],
        trigger: ['push-off-running', 'sudden-sprint-stop'],
        activity: ['running-sprinting'],
      },
    ),
  ],
};

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export type DiagnosisMatch = {
  diagnosis: Diagnosis;
  matchedCount: number;
  totalIndicators: number;
  confidence: number;
  level: ConfidenceLevel;
};

function confidenceLevel(confidence: number): ConfidenceLevel {
  if (confidence >= 0.66) return 'high';
  if (confidence >= 0.35) return 'medium';
  return 'low';
}

// Scores every diagnosis for a muscle group against whatever combination of
// symptoms the user picked. This works for any combination without needing
// one to be authored per combination -- and different combinations that
// happen to overlap on the same indicators will naturally surface the same
// diagnosis, just possibly at different confidence levels.
export function getDiagnosisMatches(
  groupId: string,
  selections: Partial<Record<SymptomCategoryId, string[]>>,
): DiagnosisMatch[] {
  const candidates = DIAGNOSES_BY_GROUP[groupId] ?? [];

  const matches: DiagnosisMatch[] = candidates.map((diagnosis) => {
    let matchedCount = 0;
    let totalIndicators = 0;

    for (const [categoryId, indicatorIds] of Object.entries(diagnosis.indicators) as [
      SymptomCategoryId,
      string[],
    ][]) {
      totalIndicators += indicatorIds.length;
      const selected = selections[categoryId] ?? [];
      matchedCount += indicatorIds.filter((id) => selected.includes(id)).length;
    }

    const confidence = totalIndicators === 0 ? 0 : matchedCount / totalIndicators;

    return {
      diagnosis,
      matchedCount,
      totalIndicators,
      confidence,
      level: confidenceLevel(confidence),
    };
  });

  return matches
    .filter((match) => match.matchedCount > 0)
    .sort((a, b) => b.confidence - a.confidence || b.matchedCount - a.matchedCount)
    .slice(0, 4);
}
