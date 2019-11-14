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
const CEIL_HUE = 360;
/** hsl's saturation and lightness; lab's luminance */
const CEIL_SL = 100;
const CEIL_RGB = 256;

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
      RADIUS * (s / CEIL_SL) * Math.cos(h * (Math.PI / 180)),
      l - CEIL_SL / 2,
      RADIUS * (s / CEIL_SL) * Math.sin(h * (Math.PI / 180)),
    ];
  },
  lab: ({ l, c, h }) => {
    return [
      RADIUS * (c / CEIL_CHROMA) * Math.cos(h * (Math.PI / 180)),
      l - CEIL_SL / 2,
      RADIUS * (c / CEIL_CHROMA) * Math.sin(h * (Math.PI / 180)),
    ];
  },
  rgb: ({ r, g, b }) => [r, g, b].map(d => rgbRescale(d)),
};

const getRandomlyDistributedColors = {
  hsl: n =>
    range(n).map(() => {
      const h = getRandomInt(CEIL_HUE);
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

const getUniformlyDistributedColors = {
  hsl: n => {
    const coords = [];

    const hueScale = scaleLinear()
      .domain([0, n * 2])
      .range([0, CEIL_HUE]);
    const sScale = scaleLinear()
      .domain([0, n / 2])
      .range([0, CEIL_SL]);
    const lScale = scaleLinear()
      .domain([0, n])
      .range([0, CEIL_SL]);

    range(0, n * 2 + 1).forEach(x => {
      range(0, n / 2 + 1).forEach(y => {
        range(0, n + 1).forEach(z => {
          const h = hueScale(x);
          const s = Math.round(sScale(y));
          const l = Math.round(lScale(z));

          coords.push({ color: `hsl(${h}, ${s}%, ${l}%)`, h, l, s });
        });
      });
    });

    return coords;
  },
  lab: n => {
    const coords = [];

    const lScale = scaleLinear()
      .domain([0, n])
      .range([0, CEIL_SL]);
    const abScale = scaleLinear()
      .domain([0, n])
      .range([-160, 160]);

    range(0, n + 1).forEach(x => {
      range(0, n + 1).forEach(y => {
        range(0, n + 1).forEach(z => {
          const l = lScale(x);
          const a = abScale(y);
          const b = abScale(z);

          const { c, h } = lch(lab(l, a, b));

          coords.push({
            a,
            b,
            c,
            color: `${color(lab(l, a, b)).formatRgb()}`,
            h,
            l,
          });
        });
      });
    });

    return coords;
  },
  rgb: n => {
    const coords = [];

    const rgbGridScale = scaleLinear()
      .domain([0, n])
      .range([0, 256]);

    range(0, n + 1).forEach(x => {
      range(0, n + 1).forEach(y => {
        range(0, n + 1).forEach(z => {
          /** r, g, b values must be integers */
          const r = Math.round(rgbGridScale(x));
          const g = Math.round(rgbGridScale(y));
          const b = Math.round(rgbGridScale(z));
          coords.push({
            b,
            color: `rgb(${r}, ${g}, ${b})`,
            g,
            r,
          });
        });
      });
    });

    return coords;
  },
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

export default function ColorSpace({ type, n = 10000, r = 2, uniform }) {
  const data = useMemo(() => {
    if (uniform) {
      return getUniformlyDistributedColors[type](n);
    } else {
      return getRandomlyDistributedColors[type](n);
    }
  }, [n, type, uniform]);
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
