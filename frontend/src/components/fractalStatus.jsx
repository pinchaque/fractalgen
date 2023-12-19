//import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function FractalStatus({ fractal, canvas }) {

  // const ref = useRef(null);

  return (
    <div className="status">
      <span className="coords">({fractal.min.x}, {fractal.min.y})</span>
      &nbsp;&mdash;&nbsp;
      <span className="coords">({fractal.max.x}, {fractal.max.y})</span>
      &nbsp;/&nbsp;
      <span className="coords">{canvas.width}x{canvas.height} px</span>
    </div>
  );
}
