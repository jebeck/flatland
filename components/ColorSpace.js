import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { animated, useSprings } from "react-spring/three";

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
import { SPACES } from "../utils/constants";

const startingCameraPosition = [75, 75, 75];
const startingFocalPoint = [0, 0, 0];

function ColorSphere({ color, geometry, position }) {
  return (
    <animated.mesh geometry={geometry} position={position}>
      <meshLambertMaterial
        attach="material"
        color={color}
        // emissive={color}
        // emissiveIntensity={0.5}
      />
    </animated.mesh>
  );
}

ColorSphere.propTypes = {
  color: PropTypes.string.isRequired,
  /** because is a ref, will be undefined on first render */
  geometry: PropTypes.object,
  position: PropTypes.object.isRequired,
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

  const [positions, setPositions] = useSprings(data.length, i => {
    const { x, y, z } = getColorXYZPosition[space](spaceRadius, data[i]);
    return { meshPosition: [x, y, z] };
  });

  useEffect(() => {
    if (animateToSpace) {
      setPositions(i => {
        const { x, y, z } = getColorXYZInAnotherSpace({
          animateToSpace,
          d: data[i],
          spaceRadius,
        });
        return { meshPosition: [x, y, z] };
      });
    }
  }, [animateToSpace, data, setPositions, spaceRadius]);

  useEffect(() => {
    camera.position.set(...startingCameraPosition);
    camera.lookAt(...startingFocalPoint);
  }, [camera]);

  return (
    <group>
      <CameraControls autoRotate={!animateToSpace} />
      <Spotlight />
      <sphereBufferGeometry args={[sphereRadius, 25, 25]} ref={geometryRef} />
      {data.map((d, i) => {
        return (
          <ColorSphere
            color={d.color}
            geometry={geometry}
            key={`${i}-${d.color}`}
            position={positions[i].meshPosition}
          />
        );
      })}
    </group>
  );
}

ColorSpace.defaultProps = {
  spaceRadius: 50,
  sphereRadius: 2,
};

ColorSpace.propTypes = {
  animateToSpace: PropTypes.oneOf(SPACES),
  data: PropTypes.arrayOf(
    PropTypes.shape({ color: PropTypes.string.isRequired })
  ).isRequired,
  space: PropTypes.oneOf(SPACES).isRequired,
  spaceRadius: PropTypes.number.isRequired,
  sphereRadius: PropTypes.number,
};
