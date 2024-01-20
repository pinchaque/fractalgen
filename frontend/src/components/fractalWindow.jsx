'use client'
import { useEffect, useLayoutEffect, useState } from 'react';
import Fractal from 'classes/fractal';
import FractalStatus from 'components/fractalStatus';
import FractalImage from 'components/fractalImage';

export default function FractalWindow() {
  const [fractal, setFractal] = useState(new Fractal());
  const handleZoom = (f) => { setFractal(f); }

  return (
    <div className="fractal">
      <FractalStatus fractal={fractal} />
      <FractalImage fractal={fractal} onZoom={handleZoom} />
    </div>
  );
}
