import { motion } from 'framer-motion';
import type { MuscleGroup } from '../data/muscleGroups';
import './MuscleGroupDetail.css';

type MuscleGroupDetailProps = {
  group: MuscleGroup;
  onBack: () => void;
};

export function MuscleGroupDetail({ group, onBack }: MuscleGroupDetailProps) {
  return (
    <motion.div
      className="detail-view"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <button className="back-button" onClick={onBack}>
        ← Back to body
      </button>

      <div className="symptom-panel">
        <p className="selection-label">Selected</p>
        <p className="selection-name">{group.name}</p>
        <p className="selection-next">Symptom questions are coming in a later feature.</p>
      </div>
    </motion.div>
  );
}
