import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  extend,
  useFrame,
  useRender,
  useResource,
  useThree,
} from "react-three-fiber";

import getColorXYZPosition from "../utils/getColorXYZPosition";
import getRandomlyDistributedColors from "../utils/getRandomlyDistributedColors";
import getUniformlyDistributedColors from "../utils/getUniformlyDistributedColors";

const startingCameraPosition = [75, 75, 75];
const startingFocalPoint = [0, 0, 0];

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

export default function ColorSpace({
  n = 10000,
  r = 2,
  spaceRadius = 50,
  type,
  uniform,
}) {
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
          position={getColorXYZPosition[type](spaceRadius, d)}
        />
      ))}
    </>
  );
}

ColorSpace.propTypes = {
  type: PropTypes.oneOf(["hsl", "lab", "rgb"]).isRequired,
};
