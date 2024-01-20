'use client'

import Fractal from 'classes/fractal';
import ImageCanvas from 'classes/imageCanvas';

export default function FractalImageCell({ row, col, getFractal, cellWidth, cellHeight }) {

  function f() {
    return getFractal(row, col);
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
    return u.href
  }

  return (
    <td style={{backgroundImage: `url(${url()})`}}>&nbsp;
        ({f().min.x}, {f().min.y})&mdash;({f().max.x}, {f().max.y})
    </td>
  );
}
