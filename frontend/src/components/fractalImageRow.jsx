'use client'

import Fractal from 'classes/fractal';
import ImageCanvas from 'classes/imageCanvas';
import FractalImageCell from 'components/fractalImageCell';

export default function FractalImageRow({ fractal, canvas }) {

  return (
    <tr>
      <FractalImageCell fractal={fractal} canvas={canvas} />
    </tr>
  );
}
