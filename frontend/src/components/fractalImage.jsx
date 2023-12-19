//import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function FractalImage({ fractal, canvas }) {

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
      />
    </div>
  );
}
