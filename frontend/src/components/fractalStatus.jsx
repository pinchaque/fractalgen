export default function FractalStatus({ fractal }) {
  return (
    <div className="status">
      <span className="coords">({fractal.min.x}, {fractal.min.y})</span>
      &nbsp;&mdash;&nbsp;
      <span className="coords">({fractal.max.x}, {fractal.max.y})</span>
    </div>
  );
}
