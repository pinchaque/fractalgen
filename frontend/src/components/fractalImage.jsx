'use client'
import { useEffect, useState } from 'react';

export default function FractalImage({ fractal, canvas }) {

  const [globalMousePos, setGlobalMousePos] = useState({});
  const [localMousePos, setLocalMousePos] = useState({});

  const handleLocalMouseMove = (event) => {
    const localX = event.clientX - event.target.offsetLeft;
    const localY = event.clientY - event.target.offsetTop;

    setLocalMousePos({ x: localX, y: localY });
  };

  useEffect(() => {
    const handleGlobalMouseMove = (event) => {
      setGlobalMousePos({ x: event.clientX, y: event.clientY, });
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleGlobalMouseMove
      );
    };
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
    console.log(u.href);
    return u.href
  }

  return (
    <div className="fractalImg">
      <img
        className="fractal"
        src={url()}
        alt="Fractal rendering"
        onMouseMove={handleLocalMouseMove}
      />
      <p>Global: <b>({globalMousePos.x}, {globalMousePos.y})</b></p>
      <p>Local: <b>({localMousePos.x}, {localMousePos.y})</b></p>
    </div>
  );
}
