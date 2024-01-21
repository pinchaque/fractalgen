'use client'

import { useState } from 'react';
import Fractal from 'classes/fractal';
import ImageCanvas from 'classes/imageCanvas';

export default function FractalImageCell({ row, col, getFractal, clickCell, cellWidth, cellHeight }) {

  const [grain, setGrain] = useState(8);

  function f() {
    return getFractal(row, col);
  }

  const handleClick = (event) => {
    // location of click with respect to cell
    const localX = event.clientX - event.target.offsetLeft;
    const localY = event.clientY - event.target.offsetTop;
    clickCell(row, col, localX, localY);
  }

  // URL to generate the fractal image
  function url() {
    const u = new URL("http://localhost:8000");
    u.searchParams.append("x", f().center.x);
    u.searchParams.append("y", f().center.y);
    u.searchParams.append("xrange", f().width);
    u.searchParams.append("yrange", f().height);
    u.searchParams.append("width", cellWidth);
    u.searchParams.append("height", cellHeight);
    u.searchParams.append("iterations", f().iterations);
    u.searchParams.append("escape", f().escape);
    u.searchParams.append("grain", grain);
    return u.href
  }

  let delay = 2000;
  let timerId = setTimeout(function incGrain() {
    setGrain(2)
    /*
    if (grain == 2) {
      setGrain(1);
      clearTimeout(timerId)
    } else {
      setGrain(grain / 2)
      timerId = setTimeout(incGrain, delay)
    }
    */
  }, delay);

  return (
    <div className="fractalImgCell"
      onClick={handleClick}
      style={{backgroundImage: `url(${url()})`, width: cellWidth, height: cellHeight}}>&nbsp;
    </div>
  );
}
