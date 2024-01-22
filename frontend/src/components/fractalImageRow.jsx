'use client'

import Fractal from 'classes/fractal';
import ImageCanvas from 'classes/imageCanvas';
import FractalImageCell from 'components/fractalImageCell';

export default function FractalImageRow({ 
  row, numCols, getFractal, clickCell, cellWidth, cellHeight, grain }) {

  const cells = [];
  for (let j = 0; j < numCols; j++) {
    cells.push(<FractalImageCell 
        key={j} 
        row={row} 
        col={j} 
        getFractal={getFractal} 
        clickCell={clickCell}
        cellWidth={cellWidth} 
        cellHeight={cellHeight}
        grain={grain} />);
  }

  return (
    <div className="fractalImgRow">
    {cells}
    </div>
    );
}
