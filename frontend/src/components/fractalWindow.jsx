import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Fractal from 'classes/fractal';
import FractalStatus from 'components/fractalStatus';
import FractalImage from 'components/fractalImage';

export default function FractalWindow() {

  const ref = useRef(null);

  // Fractal parameters that we pass to the backend
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
    <div ref={ref} className="fractal">
      <FractalStatus fractal={fractal} />
      <FractalImage fractal={fractal} onZoom={handleZoom} />
    </div>
  );
}
