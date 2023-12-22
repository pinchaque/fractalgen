'use client'

import { useEffect, useState } from 'react';
import Point from 'classes/point';
import Fractal from 'classes/fractal';

export default function FractalImage({ fractal, canvas, onZoom }) {

  //const [globalMousePos, setGlobalMousePos] = useState({});
  //const [localMousePos, setLocalMousePos] = useState({});
  const zoomRatio = 0.5;
  const [clickPos, setClickPos] = useState({});

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
    const pointX = fractal.min.x + ((fractal.max.x - fractal.min.x) * percX);

    // y axis is inverted
    const localY = event.clientY - event.target.offsetTop;
    const percY = (canvas.height - localY - 1) / canvas.height;
    const pointY = fractal.min.y + ((fractal.max.y - fractal.min.y) * percY);

    return new Point(pointX, pointY);
  }

  const handleClick = (event) => {
    // new image center is where user clicked
    const c = getEventCoords(event);
    setClickPos(c);

    // zoom in/out based on shift key
    const zoomFactor = event.shiftKey ? (1.0 / zoomRatio) : zoomRatio;

    // new X and Y ranges based on zoom factor
    const xRange = fractal.getXRange() * zoomFactor;
    const yRange = fractal.getYRange() * zoomFactor;

    // create our new zoomed and recentered fractal
    const f = new Fractal();
    f.iterations = fractal.iterations;
    f.escape = fractal.escape;
    f.min = new Point(c.x - (xRange / 2.0), c.y - (yRange / 2.0));
    f.max = new Point(c.x + (xRange / 2.0), c.y + (yRange / 2.0));

    // tell parent to render the fractal
    onZoom(f);
  };

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
    console.log(u.href);
    return u.href
  }

  return (
    <div className="fractalImg">
      <img
        className="fractal"
        src={url()}
        alt="Fractal rendering"
        onClick={handleClick}
      />
      <p>Click: <b>({clickPos.x}, {clickPos.y})</b></p>
    </div>
  );
}
