import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function Fractal() {

  const ref = useRef(null);
  const [numbers, setNumbers] = useState([]);

  // Fractal parameters that we pass to the backend
  const [yMin, setYMin] = useState(-2.0);
  const [yMax, setYMax] = useState(2.0);
  const [xMin, setXMin] = useState(-2.0);
  const [xMax, setXMax] = useState(2.0);
  const [iterations, setIterations] = useState(200);
  const [escape, setEscape] = useState(2.0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

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
    console.log("X1 Updated fractal dims: " + width + ", " + height);
    console.log("X1 xmin:" + xMin);
    // if we have existing dimensions
    if ((width > 0) && (height > 0)) {
      recomputeCoords(
        width, height, 
        ref.current.clientWidth, ref.current.clientHeight);
    }
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  }

  // Handle initial layout
  useLayoutEffect(() => {
    handleWindowResize();
  }, [numbers]);

  // Handle window resizing
  useEffect(() => {
    let timeout = false;
    let delay = 250;

    function debouncedWindowResize() {
      clearTimeout(timeout);
      timeout = setTimeout(handleWindowResize, delay);
    }

    window.addEventListener('resize', debouncedWindowResize);

    return () => {
      window.removeEventListener('resize', debouncedWindowResize);
    };
  }, []);

  // URL to generate the fractal image
  function url() {
    const u = new URL("http://localhost:8000");
    u.searchParams.append("xmin", xMin);
    u.searchParams.append("xmax", xMax);
    u.searchParams.append("ymin", yMin);
    u.searchParams.append("ymax", yMax);
    u.searchParams.append("width", width);
    u.searchParams.append("height", height);
    u.searchParams.append("iterations", iterations);
    u.searchParams.append("escape", escape);
    console.log(u.href);
    return u.href
  }

  return (
    <div ref={ref} className="fractal">
      <img
        className="fractal"
        src={url()}
        alt="Fractal rendering"
      />
    </div>
  );
}
