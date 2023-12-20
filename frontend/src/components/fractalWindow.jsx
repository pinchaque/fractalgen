import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Fractal from 'classes/fractal';
import ImageCanvas from 'classes/imageCanvas';
import FractalStatus from 'components/fractalStatus';
import FractalImage from 'components/fractalImage';

export default function FractalWindow() {

  const ref = useRef(null);
  //const [numbers, setNumbers] = useState([]);

  // Fractal parameters that we pass to the backend
  const [fractal, setFractal] = useState(new Fractal());
  const [canvas, setCanvas] = useState(new ImageCanvas(512, 512));

  function handleZoom(f) {
    setFractal(f);
  }

/*************8
  function recomputeCoords(oldW, oldH, newW, newH) {
    if (!((oldW > 0) && (oldH > 0) && (newW > 0) && (newH > 0))) {
      return;
    }

    // aspect ratios: width/height
    const oldAspect = oldW / oldH;
    const newAspect = newW / newH;

    const ratioH = newH / oldH;
    const ratioW = newW / oldW;

    console.log("(" + oldW + ", " + oldH + ") -> (" + newW + ", " + newH + ")");
    console.log("ratioH: " + ratioH);
    console.log("ratioW: " + ratioW);
    console.log("oldAspect: " + oldAspect);
    console.log("newAspect: " + newAspect);

    // New window is wider. That means we keep the same height and expand
    // the image coordinates horizontally.
    if (oldAspect < newAspect) {
        // how much to expand? 

    }
    // New window is taller. That means we keep the same width and expand
    // the image coordinates vertically.
    else if (oldAspect > newAspect) {
    }
  }

  // Set new fractal width and height based on current window size
  // If this is a resize (we have an existing width and height) then we
  // maintain the same aspect ratio.
  function handleWindowResize() {
    console.log("handleWindowResize()");
    console.log("X1 Updated fractal dims: " + imgWidth + ", " + imgHeight);
    console.log("X1 xmin:" + xMin);
    console.log("X1 imgWidth:" + imgWidth);
    console.log("X1 imgHeight:" + imgHeight);
    // if we have existing dimensions
    if ((imgWidth > 0) && (imgHeight > 0)) {
      recomputeCoords(
        imgWidth, imgHeight, 
        ref.current.clientWidth, ref.current.clientHeight);
    }
    setImgWidth(ref.current.clientWidth);
    setImgHeight(ref.current.clientHeight);
    console.log("X2 imgWidth:" + imgWidth);
    console.log("X2 imgHeight:" + imgHeight);
  }


  // Handle initial layout
  useLayoutEffect(() => {
    console.log("useLayoutEffect()");
    handleWindowResize();
  }, [numbers]);

  // Handle window resizing
  useEffect(() => {
    let timeout = false;
    let delay = 250;
    console.log("useEffect()");

    function debouncedWindowResize() {
      console.log("deboucedWindowResize()");
      clearTimeout(timeout);
      timeout = setTimeout(handleWindowResize, delay);
    }

    window.addEventListener('resize', debouncedWindowResize);

    return () => {
      window.removeEventListener('resize', debouncedWindowResize);
    };
  }, []);
  *************/

  return (
    <div ref={ref} className="fractal">
      <FractalStatus fractal={fractal} canvas={canvas} />
      <FractalImage fractal={fractal} canvas={canvas} onZoom={handleZoom} />
    </div>
  );
}
