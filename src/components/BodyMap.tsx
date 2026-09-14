import { DECORATIVE_SHAPES, MUSCLE_GROUPS, VIEWBOX, type MuscleGroup } from '../data/muscleGroups';
import { ShapeRenderer } from './ShapeRenderer';
import './BodyMap.css';

type BodyMapProps = {
  onSelectGroup: (group: MuscleGroup) => void;
};

function Figure({ view, onSelectGroup }: { view: 'front' | 'back'; onSelectGroup: (g: MuscleGroup) => void }) {
  const groups = MUSCLE_GROUPS.filter((g) => g.view === view);

  const viewBox = VIEWBOX[view];

  return (
    <figure className="body-figure">
      <svg
        viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
        role="group"
        aria-label={`${view} view of body`}
      >
        <ShapeRenderer shapes={DECORATIVE_SHAPES[view]} className="body-decorative" />
        {groups.map((group) => (
          <g
            key={group.id}
            className="body-hotspot"
            role="button"
            tabIndex={0}
            aria-label={group.name}
            onClick={() => onSelectGroup(group)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectGroup(group);
              }
            }}
          >
            <ShapeRenderer shapes={group.shapes} />
          </g>
        ))}
      </svg>
      <figcaption>{view === 'front' ? 'Front' : 'Back'}</figcaption>
    </figure>
  );
}

export function BodyMap({ onSelectGroup }: BodyMapProps) {
  return (
    <div className="body-map-wrap">
      <div className="body-map">
        <span className="frame-corner frame-corner--tl" aria-hidden="true" />
        <span className="frame-corner frame-corner--tr" aria-hidden="true" />
        <span className="frame-corner frame-corner--bl" aria-hidden="true" />
        <span className="frame-corner frame-corner--br" aria-hidden="true" />
        <Figure view="front" onSelectGroup={onSelectGroup} />
        <Figure view="back" onSelectGroup={onSelectGroup} />
      </div>
      <p className="body-map-credit">
        Body map adapted from{' '}
        <a href="https://github.com/giavinh79/react-body-highlighter" target="_blank" rel="noreferrer">
          react-body-highlighter
        </a>{' '}
        (MIT License)
      </p>
    </div>
  );
}
