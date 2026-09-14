import { useState } from 'react';
import { motion } from 'framer-motion';
import type { MuscleGroup } from '../data/muscleGroups';
import { SYMPTOM_CATEGORIES_BY_GROUP, type SymptomCategoryId } from '../data/symptoms';
import { getDiagnosisMatches } from '../data/diagnoses';
import { DiagnosisResults } from './DiagnosisResults';
import './MuscleGroupDetail.css';

type MuscleGroupDetailProps = {
  group: MuscleGroup;
  onBack: () => void;
};

type Selections = Partial<Record<SymptomCategoryId, string[]>>;

export function MuscleGroupDetail({ group, onBack }: MuscleGroupDetailProps) {
  const categories = SYMPTOM_CATEGORIES_BY_GROUP[group.id] ?? [];
  const [selections, setSelections] = useState<Selections>({});
  const [showResults, setShowResults] = useState(false);

  function toggleOption(categoryId: SymptomCategoryId, optionId: string) {
    setSelections((current) => {
      const selected = current[categoryId] ?? [];
      const next = selected.includes(optionId)
        ? selected.filter((id) => id !== optionId)
        : [...selected, optionId];
      return { ...current, [categoryId]: next };
    });
  }

  const totalSelected = Object.values(selections).reduce((sum, ids) => sum + (ids?.length ?? 0), 0);

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

      {showResults ? (
        <DiagnosisResults
          groupName={group.name}
          matches={getDiagnosisMatches(group.id, selections)}
          onBackToSymptoms={() => setShowResults(false)}
        />
      ) : (
        <div className="symptom-panel">
          <p className="selection-label">Selected</p>
          <p className="selection-name">{group.name}</p>
          <p className="symptom-prompt">Answer what applies — you can pick more than one in each section.</p>

          {categories.map((category) => {
            const selected = selections[category.id] ?? [];
            return (
              <div className="symptom-category" key={category.id}>
                <p className="category-label">{category.label}</p>
                <div className="symptom-list" role="group" aria-label={category.label}>
                  {category.options.map((option) => {
                    const isSelected = selected.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={`symptom-chip${isSelected ? ' symptom-chip--selected' : ''}`}
                        aria-pressed={isSelected}
                        onClick={() => toggleOption(category.id, option.id)}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <button className="continue-button" disabled={totalSelected === 0} onClick={() => setShowResults(true)}>
            Continue
          </button>
        </div>
      )}
    </motion.div>
  );
}
