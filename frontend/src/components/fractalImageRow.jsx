'use client'

import Fractal from 'classes/fractal';
import ImageCanvas from 'classes/imageCanvas';
import FractalImageCell from 'components/fractalImageCell';

export default function FractalImageRow({ 
  row, numCols, getFractal, cellWidth, cellHeight }) {

  const cells = [];
  for (let j = 0; j < numCols; j++) {
    cells.push(<FractalImageCell 
        key={j} 
        row={row} 
        col={j} 
        getFractal={getFractal} 
        cellWidth={cellWidth} 
        cellHeight={cellHeight} />);
  }

  return (
    <div className="fractalImgRow">
    {cells}
    </div>
    );
}
