import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BodyMap } from './components/BodyMap';
import { MuscleGroupDetail } from './components/MuscleGroupDetail';
import type { MuscleGroup } from './data/muscleGroups';
import './App.css';

function App() {
  const [selectedGroup, setSelectedGroup] = useState<MuscleGroup | null>(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          <span className="brand-mark" aria-hidden="true" />
          <span className="accent-letter">I</span>njury
          <span className="accent-letter">P</span>rone
        </h1>
        <p>Click where it hurts.</p>
      </header>

      <main className="app-main">
        <AnimatePresence mode="wait">
          {selectedGroup ? (
            <MuscleGroupDetail
              key={selectedGroup.id}
              group={selectedGroup}
              onBack={() => setSelectedGroup(null)}
            />
          ) : (
            <motion.div
              key="body-map"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <BodyMap onSelectGroup={setSelectedGroup} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
