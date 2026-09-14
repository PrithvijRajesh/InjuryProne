import { motion } from 'framer-motion';
import type { DiagnosisMatch } from '../data/diagnoses';
import './DiagnosisResults.css';

type DiagnosisResultsProps = {
  groupName: string;
  matches: DiagnosisMatch[];
  onBackToSymptoms: () => void;
  onSelectDiagnosis: (match: DiagnosisMatch) => void;
};

const LEVEL_LABEL: Record<DiagnosisMatch['level'], string> = {
  high: 'High confidence',
  medium: 'Medium confidence',
  low: 'Low confidence',
};

export function DiagnosisResults({
  groupName,
  matches,
  onBackToSymptoms,
  onSelectDiagnosis,
}: DiagnosisResultsProps) {
  return (
    <motion.div
      className="diagnosis-results"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <p className="results-label">Possible diagnoses for</p>
      <p className="results-group-name">{groupName}</p>

      {matches.length === 0 ? (
        <p className="results-no-match">
          Your answers don't clearly point to a specific diagnosis. Consider seeing a doctor or physical
          therapist for an accurate evaluation.
        </p>
      ) : (
        <div className="diagnosis-list">
          {matches.map((match) => (
            <button
              type="button"
              className={`diagnosis-card diagnosis-card--${match.level}`}
              key={match.diagnosis.id}
              onClick={() => onSelectDiagnosis(match)}
            >
              <div className="diagnosis-card-header">
                <p className="diagnosis-name">{match.diagnosis.name}</p>
                <span className={`confidence-badge confidence-badge--${match.level}`}>
                  {LEVEL_LABEL[match.level]}
                </span>
              </div>
              <p className="diagnosis-summary">{match.diagnosis.summary}</p>
              <p className="diagnosis-telltale">
                <span className="diagnosis-telltale-label">Telltale sign: </span>
                {match.diagnosis.telltaleSign}
              </p>
              <p className="diagnosis-match-detail">
                {match.matchedCount} of {match.totalIndicators} matching signs
              </p>
              <p className="diagnosis-card-cta">See recovery & prevention tips →</p>
            </button>
          ))}
        </div>
      )}

      <p className="results-disclaimer">
        This is not a medical diagnosis. For a proper evaluation, see a doctor or physical therapist.
      </p>

      <button className="back-button" onClick={onBackToSymptoms}>
        ← Back to symptoms
      </button>
    </motion.div>
  );
}
