import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function Fractal() {

  const ref = useRef(null);
  const [numbers, setNumbers] = useState([]);

  useLayoutEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
    console.log("Updated fractal dims: " + width + ", " + height);
  }, [numbers]);

  useEffect(() => {
    let timeout = false;
    let delay = 250;

    function handleWindowResize() {
      setWidth(ref.current.clientWidth);
      setHeight(ref.current.clientHeight);
    }

    function debouncedWindowResize() {
      console.log("XX called debouncedWR timeout:" + timeout + " delay:" + delay)
      clearTimeout(timeout);
      timeout = setTimeout(handleWindowResize, delay);
    }

    window.addEventListener('resize', debouncedWindowResize);

    return () => {
      window.removeEventListener('resize', debouncedWindowResize);
    };
  }, []);

  const [yMin, setYMin] = useState(-2.0);
  const [yMax, setYMax] = useState(2.0);
  const [xMin, setXMin] = useState(-2.0);
  const [xMax, setXMax] = useState(2.0);
  const [iterations, setIterations] = useState(200);
  const [escape, setEscape] = useState(2.0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  function url() {
    const u = new URL("http://localhost:8000");
    u.searchParams.append("xmin", xMin);
    u.searchParams.append("xmax", xMax);
    u.searchParams.append("ymin", yMin);
    u.searchParams.append("ymax", yMax);
    u.searchParams.append("width", width);
    u.searchParams.append("height", height);
    u.searchParams.append("iterations", iterations);
    u.searchParams.append("escape", escape);
    console.log(u.href);
    return u.href
  }

  return (
    <div ref={ref} className="fractal">
      <img
        className="fractal"
        src={url()}
        alt="Fractal rendering"
      />
    </div>
  );
}
