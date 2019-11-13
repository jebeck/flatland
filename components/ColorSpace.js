import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { range } from "d3-array";
import {
  extend,
  useFrame,
  useRender,
  useResource,
  useThree,
} from "react-three-fiber";

import { getRandomInt } from "../utils";

const CEIL_RGB = 256;

const baseCameraPosition = {
  rgb: [CEIL_RGB, CEIL_RGB, CEIL_RGB],
};

const baseFocalPoint = {
  rgb: [CEIL_RGB, 0, 0],
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

/** get position of color with the center of the color space at 0,0,0 instead of a vertex */
const getPosition = {
  rgb: (...coords) => coords.map(d => d - CEIL_RGB / 2),
};

function ColorSphere({ color, geometry, position }) {
  return (
    <mesh geometry={geometry} position={position}>
      <meshLambertMaterial attach="material" color={color} emissive={color} />
    </mesh>
  );
}

extend({ OrbitControls });

function CameraControls() {
  const { camera } = useThree();
  const controls = useRef();

  const [canvasEl] = useState(document.getElementsByTagName("canvas")[0]);

  useRender(() => controls.current && controls.current.update());

  return <orbitControls args={[camera, canvasEl]} autoRotate ref={controls} />;
}

function Spotlight({ type }) {
  const spotLightRef = useRef();
  const { camera } = useThree();
  useFrame(() => spotLightRef.current.position.copy(camera.position));

  return <spotLight position={baseCameraPosition[type]} ref={spotLightRef} />;
}

export default function ColorSpace({
  type,
  n = Math.pow(Math.floor(CEIL_RGB / 20), 3),
}) {
  const data = useMemo(() => getRandomColors[type](n), [n, type]);
  const [geometryRef, geometry] = useResource();
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...baseCameraPosition[type]);
    camera.lookAt(...baseFocalPoint[type]);
  }, [camera, type]);

  return (
    <>
      <CameraControls />
      <Spotlight type={type} />
      <sphereBufferGeometry args={[4, 25, 25]} ref={geometryRef} />
      {data.map((d, i) => (
        <ColorSphere
          color={d.color}
          geometry={geometry}
          key={`${i}-${d.color}`}
          position={getPosition[type](d.r, d.g, d.b)}
        />
      ))}
    </>
  );
}

ColorSpace.propTypes = {
  type: PropTypes.oneOf(["hsl", "lab", "rgb"]).isRequired,
};
