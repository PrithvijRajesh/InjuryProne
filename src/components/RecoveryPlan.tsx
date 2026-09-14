import { motion } from 'framer-motion';
import type { Diagnosis } from '../data/diagnoses';
import { RECOVERY_BY_DIAGNOSIS_ID } from '../data/recoveryPlans';
import './RecoveryPlan.css';

type RecoveryPlanProps = {
  diagnosis: Diagnosis;
  onBackToResults: () => void;
};

export function RecoveryPlan({ diagnosis, onBackToResults }: RecoveryPlanProps) {
  const plan = RECOVERY_BY_DIAGNOSIS_ID[diagnosis.id];

  return (
    <motion.div
      className="recovery-plan"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <p className="results-label">Recovery & prevention for</p>
      <p className="results-group-name">{diagnosis.name}</p>

      {!plan ? (
        <p className="results-no-match">
          Specific guidance isn't available yet for this diagnosis. See a doctor or physical therapist for
          an accurate recovery plan.
        </p>
      ) : (
        <div className="recovery-sections">
          <section className="recovery-section">
            <h3 className="recovery-section-title">Recovery steps</h3>
            <ul className="recovery-list">
              {plan.recoverySteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </section>

          <section className="recovery-section">
            <h3 className="recovery-section-title">Avoid while healing</h3>
            <ul className="recovery-list">
              {plan.avoid.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="recovery-section">
            <h3 className="recovery-section-title">Prevention tips</h3>
            <ul className="recovery-list">
              {plan.preventionTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </section>

          <section className="recovery-section recovery-section--warning">
            <h3 className="recovery-section-title">See a doctor if</h3>
            <ul className="recovery-list">
              {plan.seekHelpIf.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      )}

      <p className="results-disclaimer">
        This is not a medical diagnosis or treatment plan. For a proper evaluation, see a doctor or physical
        therapist.
      </p>

      <button className="back-button" onClick={onBackToResults}>
        ← Back to diagnoses
      </button>
    </motion.div>
  );
}
