import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import * as color from "d3-color";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  extend,
  useFrame,
  useRender,
  useResource,
  useThree,
} from "react-three-fiber";

import { CEIL_SL } from "../utils/constants";
import getColorXYZPosition from "../utils/getColorXYZPosition";

const startingCameraPosition = [75, 75, 75];
const startingFocalPoint = [0, 0, 0];

function ColorSphere({ color, geometry, position: { x, y, z } }) {
  return (
    <mesh geometry={geometry} position={[x, y, z]}>
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
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    z: PropTypes.number.isRequired,
  }).isRequired,
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
  sphereRadius,
  spaceRadius,
  space,
}) {
  const [geometryRef, geometry] = useResource();
  const { camera } = useThree();
  const [positions, setPositions] = useState(
    data.map(d => getColorXYZPosition[space](spaceRadius, d))
  );

  useEffect(() => {
    setTimeout(() => {
      setPositions(
        data.map(d => {
          let newColor = color[animateToSpace](color.color(d.color));
          if (animateToSpace === "hsl") {
            newColor.s = newColor.s * CEIL_SL;
            newColor.l = newColor.l * CEIL_SL;
          } else if (animateToSpace === "rgb") {
            newColor = _.mapValues(newColor, Math.floor);
          } else if (animateToSpace === "lab") {
            newColor = color.lch(newColor);
          } else {
            throw new Error(
              `Color space to animate to not recognized: ${animateToSpace}!`
            );
          }
          return getColorXYZPosition[animateToSpace](spaceRadius, {
            color: d.color,
            ...newColor,
          });
        })
      );
    }, 2000);
  });

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
            color={d.color}
            geometry={geometry}
            key={`${i}-${d.color}`}
            position={positions[i]}
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
  data: PropTypes.arrayOf(
    PropTypes.shape({ color: PropTypes.string.isRequired })
  ).isRequired,
  space: PropTypes.oneOf(["hsl", "lab", "rgb"]).isRequired,
  spaceRadius: PropTypes.number.isRequired,
  sphereRadius: PropTypes.number,
};
