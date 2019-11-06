import React, { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { range } from "d3-array";
import { useThree } from "react-three-fiber";

import { getRandomInt } from "../utils";

const CEIL_RGB = 256;

const baseCameraPosition = {
  rgb: [CEIL_RGB * 1.33333, CEIL_RGB * 1.33333, CEIL_RGB * 1.33333],
};

const baseFocalPoint = {
  rgb: [0, 0, 0],
};

const getRandomColors = {
  hsl: n =>
    range(n).map(() => {
      const h = getRandomInt(360);
      const s = getRandomInt(100);
      const l = getRandomInt(100);

      return { color: `hsl(${h}, ${s}%, ${l}%)`, h, l, s };
    }),
  rgb: n =>
    range(n).map(() => {
      const r = getRandomInt(CEIL_RGB);
      const g = getRandomInt(CEIL_RGB);
      const b = getRandomInt(CEIL_RGB);

      return { b, color: `rgb(${r}, ${g}, ${b})`, g, r };
    }),
};

function ColorSphere({ color, position }) {
  const ref = useRef();

  return (
    <mesh position={position} ref={ref}>
      <sphereBufferGeometry attach="geometry" args={[3, 25, 25]} />
      <meshLambertMaterial
        attach="material"
        color={color}
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

export default function ColorSpace({ type, n = 10000 }) {
  const data = useMemo(() => getRandomColors[type](n), [n, type]);

  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...baseCameraPosition[type]);
    camera.lookAt(...baseFocalPoint[type]);
  }, [camera, type]);

  return (
    <>
      <spotLight position={baseCameraPosition[type]} />
      {data.map((d, i) => (
        <ColorSphere
          color={d.color}
          key={`${i}-${d.color}`}
          position={[d.r, d.g, d.b]}
        />
      ))}
    </>
  );
}

ColorSpace.propTypes = {
  type: PropTypes.oneOf(["hsl", "lab", "rgb"]).isRequired,
};
