'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Point from 'classes/point';
import Fractal from 'classes/fractal';
import ImageCanvas from 'classes/imageCanvas';

export default function FractalImage({ fractal, onZoom }) {

  const ref = useRef(null);
  //const [globalMousePos, setGlobalMousePos] = useState({});
  //const [localMousePos, setLocalMousePos] = useState({});
  const zoomInRatio = 0.25;
  const zoomOutRatio = 2.0;
  const [clickPos, setClickPos] = useState({});
  const [canvas, setCanvas] = useState(new ImageCanvas(1, 1));


  /*(
  const handleLocalMouseMove = (event) => {
    const localX = event.clientX - event.target.offsetLeft;
    const localY = event.clientY - event.target.offsetTop;
    setLocalMousePos({ x: localX, y: localY });
  };
  */

  // converts canvas event coordinates into fractal coordinates
  function getEventCoords(e) {
    // x axis is not inverted. Runs from 0 to (canvas.width-1)
    const localX = event.clientX - event.target.offsetLeft;
    const percX = (localX + 1) / canvas.width;
    const pointX = fractal.min.x + (fractal.width * percX);

    // y axis is inverted
    const localY = event.clientY - event.target.offsetTop;
    const percY = (canvas.height - localY - 1) / canvas.height;
    const pointY = fractal.min.y + (fractal.height * percY);

    return new Point(pointX, pointY);
  }

  const handleClick = (event) => {
    // new image center is where user clicked
    const c = getEventCoords(event);
    setClickPos(c);

    // zoom in/out based on shift key
    const zoomFactor = event.shiftKey ? zoomOutRatio : zoomInRatio;

    // create our new zoomed and recentered fractal
    const f = new Fractal();
    f.iterations = fractal.iterations;
    f.escape = fractal.escape;
    f.center = c;
    f.width = fractal.width * zoomFactor;
    f.height = fractal.height * zoomFactor;

    // tell parent to render the fractal
    onZoom(f);
  };

  // Set new fractal width and height based on current window size
  // If this is a resize (we have an existing width and height) then we
  // maintain the same aspect ratio.
  function handleWindowResize() {
    if ((canvas.width > 1)
      && (canvas.height > 1)
      && ref.current.offsetWidth > 0
      && ref.current.offsetHeight > 0) {

      let scaleFactorWidth = ref.current.offsetWidth / canvas.width;
      let scaleFactorHeight = ref.current.offsetHeight / canvas.height;

      // boost the scale factors so we always show at least the same amount
      // of fractal
      if (scaleFactorWidth < 1.0) {
        scaleFactorHeight *= (1.0 / scaleFactorWidth)
        scaleFactorWidth = 1.0;
      }

      if (scaleFactorHeight < 1.0) {
        scaleFactorWidth *= (1.0 / scaleFactorHeight)
        scaleFactorHeight = 1.0;
      }

      // scale fractal ranges to match canvas changes
      const f = new Fractal();
      f.iterations = fractal.iterations;
      f.escape = fractal.escape;
      f.center = fractal.center;
      f.width = fractal.width * scaleFactorWidth;
      f.height = fractal.height * scaleFactorHeight;
      onZoom(f);
    }
    setCanvas(new ImageCanvas(
        ref.current.offsetWidth, 
        ref.current.offsetHeight));
  }

  // Handle window resizing after initial render
  useEffect(() => {
    let timeout = false;
    let delay = 500;

    function debouncedWindowResize() {
      clearTimeout(timeout);
      timeout = setTimeout(handleWindowResize, delay);
    }

    window.addEventListener('resize', debouncedWindowResize);

    return () => {
      window.removeEventListener('resize', debouncedWindowResize);
    };
  }, []);
  
  function setInitialSizes() {
    const f = new Fractal();
    f.iterations = 200;
    f.escape = 2.0;
    f.center = new Point(-0.75, 0.00);
    f.width = f.height = 2.50;
    onZoom(f);
    setCanvas(new ImageCanvas(512, 512));
    handleWindowResize();
  }


  // set initial canvas to be window size before render
  useLayoutEffect(() => {
    setInitialSizes();
  }, []);


  // URL to generate the fractal image
  function url() {
    const u = new URL("http://localhost:8000");
    u.searchParams.append("x", fractal.center.x);
    u.searchParams.append("y", fractal.center.y);
    u.searchParams.append("xrange", fractal.width);
    u.searchParams.append("yrange", fractal.height);
    u.searchParams.append("width", canvas.width);
    u.searchParams.append("height", canvas.height);
    u.searchParams.append("iterations", fractal.iterations);
    u.searchParams.append("escape", fractal.escape);
    return u.href
  }

  return (
    <div 
        ref={ref} 
        className="fractalImg" 
        style={{backgroundImage: `url(${url()})`}}
        onClick={handleClick}>
    </div>
  );
}
