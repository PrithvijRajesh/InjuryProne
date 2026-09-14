import { useState } from 'react';
import { motion } from 'framer-motion';
import type { MuscleGroup } from '../data/muscleGroups';
import { SYMPTOM_CATEGORIES_BY_GROUP, type SymptomCategoryId } from '../data/symptoms';
import { getDiagnosisMatches, type DiagnosisMatch } from '../data/diagnoses';
import { DiagnosisResults } from './DiagnosisResults';
import { RecoveryPlan } from './RecoveryPlan';
import './MuscleGroupDetail.css';

type MuscleGroupDetailProps = {
  group: MuscleGroup;
  onBack: () => void;
};

type Selections = Partial<Record<SymptomCategoryId, string[]>>;
type View = 'symptoms' | 'results' | 'recovery';

export function MuscleGroupDetail({ group, onBack }: MuscleGroupDetailProps) {
  const categories = SYMPTOM_CATEGORIES_BY_GROUP[group.id] ?? [];
  const [selections, setSelections] = useState<Selections>({});
  const [view, setView] = useState<View>('symptoms');
  const [selectedMatch, setSelectedMatch] = useState<DiagnosisMatch | null>(null);

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
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <button className="back-button" onClick={onBack}>
        ← Back to body
      </button>

      {view === 'recovery' && selectedMatch ? (
        <RecoveryPlan diagnosis={selectedMatch.diagnosis} onBackToResults={() => setView('results')} />
      ) : view === 'results' ? (
        <DiagnosisResults
          groupName={group.name}
          matches={getDiagnosisMatches(group.id, selections)}
          onBackToSymptoms={() => setView('symptoms')}
          onSelectDiagnosis={(match) => {
            setSelectedMatch(match);
            setView('recovery');
          }}
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

          <button className="continue-button" disabled={totalSelected === 0} onClick={() => setView('results')}>
            Continue
          </button>
        </div>
      )}
    </motion.div>
  );
}
