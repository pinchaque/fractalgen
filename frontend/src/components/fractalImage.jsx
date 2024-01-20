'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Point from 'classes/point';
import Fractal from 'classes/fractal';
import ImageCanvas from 'classes/imageCanvas';
import FractalImageRow from 'components/fractalImageRow';

export default function FractalImage({ fractal, onZoom }) {

  const ref = useRef(null);
  //const [globalMousePos, setGlobalMousePos] = useState({});
  //const [localMousePos, setLocalMousePos] = useState({});
  const zoomInRatio = 0.25;
  const zoomOutRatio = 2.0;
  const cellSize = 256;
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
    const f = fractal.clone();
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
    canvas.width = canvas.height = 512;
    fractal.center = new Point(-0.75, 0.00);
    fractal.width = fractal.height = 2.50;
    handleWindowResize();
  }


  // set initial canvas to be window size before render
  useLayoutEffect(() => {
    setInitialSizes();
  }, []);

  function numCols() {
    return Math.round(0.5 + (canvas.width / cellSize));
  }

  function numRows() {
    return Math.round(0.5 + (canvas.height / cellSize));
  }

  function cellWidth() {
    return Math.round((canvas.width / numCols()) - 0.5);
  }

  function cellHeight() {
    return Math.round((canvas.height / numRows()) - 0.5);
  }

  function getCellFractal(row, col) {
    // how much fractal is in each cell 
    const fracW = fractal.width / numCols();
    const fracH = fractal.height / numRows();

    // center of the cell
    const x = (col + 0.5) * fracW;
    const y = (numRows() - row - 1 + 0.5) * fracH;

    const f = fractal.clone();
    f.center = new Point(x, y);
    f.width = fracW;
    f.height = fracH;
    return f;
  }

  const rows = [];
  for (let i = 0; i < numRows(); i++) {
    rows.push(<FractalImageRow key={i} row={i} numCols={numCols()} getFractal={getCellFractal} cellWidth={cellWidth()} cellHeight={cellHeight()} />);
  }

  return (
    <div ref={ref} className="fractalImg" onClick={handleClick}>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}
