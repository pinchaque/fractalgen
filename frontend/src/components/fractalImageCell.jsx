'use client'

import Fractal from 'classes/fractal';
import ImageCanvas from 'classes/imageCanvas';

export default function FractalImageCell({ fractal, canvas }) {

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
    <td style={{backgroundImage: `url(${url()})`}}>&nbsp;</td>
  );
}
