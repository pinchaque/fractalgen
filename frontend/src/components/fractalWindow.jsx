import { useEffect, useLayoutEffect, useState } from 'react';
import Fractal from 'classes/fractal';
import FractalStatus from 'components/fractalStatus';
import FractalImage from 'components/fractalImage';

export default function FractalWindow() {

  // Fractal parameters that control what we're showing
  const [fractal, setFractal] = useState(new Fractal());

  const handleZoom = (f) => { setFractal(f); }

/*************8
  //const [numbers, setNumbers] = useState([]);
  // Handle initial layout
  useLayoutEffect(() => {
    console.log("useLayoutEffect()");
    handleWindowResize();
  }, [numbers]);
  *************/

  return (
    <div className="fractal">
      <FractalStatus fractal={fractal} />
      <FractalImage fractal={fractal} onZoom={handleZoom} />
    </div>
  );
}
