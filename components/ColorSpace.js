import React, { useEffect, useRef, useState } from "react";
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

ColorSphere.propTypes = {
  color: PropTypes.string.isRequired,
  /** because is a ref, will be undefined on first render */
  geometry: PropTypes.object,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

extend({ OrbitControls });

function CameraControls() {
  const { camera } = useThree();
  const controls = useRef();

  const [canvasEl] = useState(document.getElementsByTagName("canvas")[0]);

  useRender(() => controls.current && controls.current.update());

  return <orbitControls args={[camera, canvasEl]} autoRotate ref={controls} />;
}

function Spotlight() {
  const spotLightRef = useRef();
  const { camera } = useThree();
  useFrame(() => spotLightRef.current.position.copy(camera.position));

  return <spotLight position={startingCameraPosition} ref={spotLightRef} />;
}

export default function ColorSpace({ data, sphereRadius, spaceRadius, space }) {
  const [geometryRef, geometry] = useResource();
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...startingCameraPosition);
    camera.lookAt(...startingFocalPoint);
  }, [camera, space]);

  return (
    <>
      <CameraControls />
      <Spotlight />
      <sphereBufferGeometry args={[sphereRadius, 25, 25]} ref={geometryRef} />
      {data.map((d, i) => (
        <ColorSphere
          color={d.color}
          geometry={geometry}
          key={`${i}-${d.color}`}
          position={getColorXYZPosition[space](spaceRadius, d)}
        />
      ))}
    </>
  );
}

ColorSpace.defaultProps = {
  spaceRadius: 50,
  sphereRadius: 2,
};

ColorSpace.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ color: PropTypes.string.isRequired })
  ).isRequired,
  space: PropTypes.oneOf(["hsl", "lab", "rgb"]).isRequired,
  spaceRadius: PropTypes.number.isRequired,
  sphereRadius: PropTypes.number,
};
