import React, { useEffect, useState } from 'react';

import { animated, useSpring } from 'react-spring/three';
import { config } from 'react-spring';
import * as THREE from 'three';
import { useResource, useThree } from 'react-three-fiber';

import { bgColor } from './SVGContainer';
import { CameraControls, Spotlight, startingFocalPoint } from './ColorSpace';

export const startingCameraPosition = [0, 0, -625];
const endingCameraPosition = [0, -625, -625];

export default function SphereVisitsFlatland() {
  const { meshPosition } = useSpring({
    config: config.molasses,
    from: { meshPosition: [0, 0, -300] },
    to: { meshPosition: [0, 0, 0] },
  });

  return (
    <group>
      <CameraControls autoRotate={false} />
      <Spotlight />
      <mesh>
        <boxBufferGeometry args={[1312, 802, 20]} attach="geometry" />
        <meshLambertMaterial
          attach="material"
          color={bgColor}
          emissive={bgColor}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[500, 250, -11]}>
        <planeBufferGeometry args={[100, 100]} attach="geometry" />
        <meshBasicMaterial
          attach="material"
          color="black"
          side={THREE.DoubleSide}
        />
      </mesh>
      <animated.mesh position={meshPosition}>
        <sphereBufferGeometry args={[100, 100, 100]} attach="geometry" />
        <meshLambertMaterial color="blue" attach="material" />
      </animated.mesh>
    </group>
  );
}
