import type { Shape } from '../data/muscleGroups';

type ShapeRendererProps = {
  shapes: Shape[];
  className?: string;
};

export function ShapeRenderer({ shapes, className }: ShapeRendererProps) {
  return (
    <>
      {shapes.map((shape, i) => (
        <polygon key={`${className ?? 'shape'}-${i}`} className={className} points={shape.points} />
      ))}
    </>
  );
}
