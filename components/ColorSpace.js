import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { animated, useSpring } from "react-spring/three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  extend,
  useFrame,
  useRender,
  useResource,
  useThree,
} from "react-three-fiber";

import getColorXYZPosition from "../utils/getColorXYZPosition";
import getColorXYZInAnotherSpace from "../utils/getColorXYZInAnotherSpace";

const startingCameraPosition = [75, 75, 75];
const startingFocalPoint = [0, 0, 0];

function ColorSphere({ animateToSpace, d, geometry, space, spaceRadius }) {
  const [position, setPosition] = useState(() => {
    const { x, y, z } = getColorXYZPosition[space](spaceRadius, d);
    return [x, y, z];
  });
  const { meshPosition } = useSpring({ meshPosition: position });

  useEffect(() => {
    setTimeout(() => {
      const { x, y, z } = getColorXYZInAnotherSpace({
        animateToSpace,
        d,
        spaceRadius,
      });
      setPosition([x, y, z]);
    }, 1000);
  });

  return (
    <animated.mesh geometry={geometry} position={meshPosition}>
      <meshLambertMaterial
        attach="material"
        color={d.color}
        // emissive={color}
        // emissiveIntensity={0.5}
      />
    </animated.mesh>
  );
}

ColorSphere.propTypes = {
  animateToSpace: PropTypes.oneOf(["hsl", "lab", "rgb"]),
  d: PropTypes.shape({ color: PropTypes.string.isRequired }).isRequired,
  /** because is a ref, will be undefined on first render */
  geometry: PropTypes.object,
  space: PropTypes.oneOf(["hsl", "lab", "rgb"]).isRequired,
  spaceRadius: PropTypes.number.isRequired,
};

extend({ OrbitControls });

function CameraControls({ autoRotate }) {
  const { camera } = useThree();
  const controls = useRef();

  const [canvasEl] = useState(document.getElementsByTagName("canvas")[0]);

  useRender(() => controls.current && controls.current.update());

  return (
    <orbitControls
      args={[camera, canvasEl]}
      autoRotate={autoRotate}
      ref={controls}
    />
  );
}

CameraControls.propTypes = {
  autoRotate: PropTypes.bool.isRequired,
};

function Spotlight() {
  const spotLightRef = useRef();
  const { camera } = useThree();
  useFrame(() => spotLightRef.current.position.copy(camera.position));

  return <spotLight position={startingCameraPosition} ref={spotLightRef} />;
}

export default function ColorSpace({
  animateToSpace,
  data,
  space,
  spaceRadius,
  sphereRadius,
}) {
  const [geometryRef, geometry] = useResource();
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...startingCameraPosition);
    camera.lookAt(...startingFocalPoint);
  }, [camera]);

  return (
    <>
      <CameraControls autoRotate={!animateToSpace} />
      <Spotlight />
      <sphereBufferGeometry args={[sphereRadius, 25, 25]} ref={geometryRef} />
      {data.map((d, i) => {
        return (
          <ColorSphere
            animateToSpace={animateToSpace}
            d={d}
            geometry={geometry}
            key={`${i}-${d.color}`}
            space={space}
            spaceRadius={spaceRadius}
          />
        );
      })}
    </>
  );
}

ColorSpace.defaultProps = {
  spaceRadius: 50,
  sphereRadius: 2,
};

ColorSpace.propTypes = {
  animateToSpace: PropTypes.oneOf(["hsl", "lab", "rgb"]),
  data: PropTypes.arrayOf(
    PropTypes.shape({ color: PropTypes.string.isRequired })
  ).isRequired,
  space: PropTypes.oneOf(["hsl", "lab", "rgb"]).isRequired,
  spaceRadius: PropTypes.number.isRequired,
  sphereRadius: PropTypes.number,
};
