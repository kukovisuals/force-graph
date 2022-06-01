import {useState, useLayoutEffect} from 'react';

function useWindowSize() {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);

  const resize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return [width, height];
};


export default useWindowSize