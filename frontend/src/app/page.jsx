'use client'

import {useEffect, useState, useRef} from 'react';
import Fractal from 'components/fractal';

export default function Home() {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  console.log("W: " + windowSize.innerWidth + " / H: " + windowSize.innerHeight);
  return (
    <Fractal width={windowSize.innerWidth} height={windowSize.innerHeight} />
  )
}

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}
