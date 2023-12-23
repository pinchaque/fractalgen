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

/*
  function recomputeCoords(oldW, oldH, newW, newH) {
    if (!((oldW > 0) && (oldH > 0) && (newW > 0) && (newH > 0))) {
      return;
    }

    // aspect ratios: width/height
    const oldAspect = oldW / oldH;
    const newAspect = newW / newH;

    const ratioH = newH / oldH;
    const ratioW = newW / oldW;

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
  */

  // Set new fractal width and height based on current window size
  // If this is a resize (we have an existing width and height) then we
  // maintain the same aspect ratio.
  function handleWindowResize() {
    // if we have existing dimensions
    if ((canvas.width > 0) && (canvas.height > 0)) {
      /*
      recomputeCoords(
        canvas.width, canvas.height,
        ref.current.clientWidth, ref.current.clientHeight);
      */
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

  // set initial canvas to be window size before render
  useLayoutEffect(() => {
    setCanvas(new ImageCanvas(
        ref.current.offsetWidth, 
        ref.current.offsetHeight));
  }, []);


  // URL to generate the fractal image
  function url() {
    const u = new URL("http://localhost:8000");
    u.searchParams.append("xmin", fractal.min.x);
    u.searchParams.append("xmax", fractal.max.x);
    u.searchParams.append("ymin", fractal.min.y);
    u.searchParams.append("ymax", fractal.max.y);
    u.searchParams.append("width", canvas.width);
    u.searchParams.append("height", canvas.height);
    u.searchParams.append("iterations", fractal.iterations);
    u.searchParams.append("escape", fractal.escape);
    return u.href
  }

  return (
    <div ref={ref} className="fractalImg">
      <img
        className="fractal"
        src={url()}
        alt="Fractal rendering"
        onClick={handleClick}
      />
    </div>
  );
}
