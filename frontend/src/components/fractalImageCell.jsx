'use client'

import Fractal from 'classes/fractal';
import ImageCanvas from 'classes/imageCanvas';

export default function FractalImageCell({ row, col, getFractal, clickCell, cellWidth, cellHeight, grain }) {

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

  return (
    <div className="fractalImgCell"
      onClick={handleClick}
      style={{backgroundImage: `url(${url()})`, width: cellWidth, height: cellHeight}}>&nbsp;
    </div>
  );
}
