import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { scaleLinear } from "d3-scale";

import { color, lab, lch } from "d3-color";
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

const CEIL_CHROMA = 230;
const CEIL_HSL = 100;
const CEIL_RGB = 256;
const CEIL_L = 100;

/** for the cynlindrical spaces (hsl and CIELCH(ab)) */
const RADIUS = 50;

const rgbRescale = scaleLinear()
  .domain([0, CEIL_RGB])
  .range([-42.5, 42.5]);

const startingCameraPosition = [75, 75, 75];
const startingFocalPoint = [0, 0, 0];

/** get position of color with the center of the color space at 0,0,0 instead of a vertex */
const getPosition = {
  hsl: ({ h, s, l }) => {
    return [
      RADIUS * (s / CEIL_HSL) * Math.cos(h * (Math.PI / 180)),
      l - CEIL_L / 2,
      RADIUS * (s / CEIL_HSL) * Math.sin(h * (Math.PI / 180)),
    ];
  },
  lab: ({ l, c, h }) => {
    return [
      RADIUS * (c / CEIL_CHROMA) * Math.cos(h * (Math.PI / 180)),
      l - CEIL_L / 2,
      RADIUS * (c / CEIL_CHROMA) * Math.sin(h * (Math.PI / 180)),
    ];
  },
  rgb: ({ r, g, b }) => [r, g, b].map(d => rgbRescale(d)),
};

const getRandomColors = {
  hsl: n =>
    range(n).map(() => {
      const h = getRandomInt(360);
      const s = getRandomInt(100);
      const l = getRandomInt(100);

      return { color: `hsl(${h}, ${s}%, ${l}%)`, h, l, s };
    }),
  lab: n =>
    range(n).map(() => {
      const l = getRandomInt(101);
      const a = getRandomInt(321) - 160;
      const b = getRandomInt(321) - 160;

      const { c, h } = lch(lab(l, a, b));

      return { a, b, c, color: `${color(lab(l, a, b)).formatRgb()}`, h, l };
    }),
  rgb: n =>
    range(n).map(() => {
      const r = getRandomInt(CEIL_RGB);
      const g = getRandomInt(CEIL_RGB);
      const b = getRandomInt(CEIL_RGB);

      return { b, color: `rgb(${r}, ${g}, ${b})`, g, r };
    }),
};

function ColorSphere({ color, geometry, position }) {
  return (
    <mesh geometry={geometry} position={position}>
      <meshLambertMaterial
        attach="material"
        color={color}
        // emissive={color}
        // emissiveIntensity={0.5}
      />
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

  return <spotLight position={startingCameraPosition} ref={spotLightRef} />;
}

export default function ColorSpace({ type, n = 10000, r = 2 }) {
  const data = useMemo(() => getRandomColors[type](n), [n, type]);
  const [geometryRef, geometry] = useResource();
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...startingCameraPosition);
    camera.lookAt(...startingFocalPoint);
  }, [camera, type]);

  return (
    <>
      <CameraControls />
      <Spotlight type={type} />
      <sphereBufferGeometry args={[r, 25, 25]} ref={geometryRef} />
      {data.map((d, i) => (
        <ColorSphere
          color={d.color}
          geometry={geometry}
          key={`${i}-${d.color}`}
          position={getPosition[type](d)}
        />
      ))}
    </>
  );
}

ColorSpace.propTypes = {
  type: PropTypes.oneOf(["hsl", "lab", "rgb"]).isRequired,
};
