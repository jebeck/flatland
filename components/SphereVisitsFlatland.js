import React, { useEffect, useState } from 'react';

import { animated, useSpring } from 'react-spring/three';
import { config } from 'react-spring';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { useThree } from 'react-three-fiber';

import { bgColor } from './SVGContainer';
import { CameraControls, Spotlight } from './ColorSpace';

export const startingCameraPosition = [0, 0, -625];

export default function SphereVisitsFlatland() {
  const { camera } = useThree();
  const [step, setStep] = useState(0);

  const { meshPosition } = useSpring({
    config: config.molasses,
    from: { meshPosition: [0, 0, -300] },
    to: { meshPosition: [0, 0, 0] },
  });

  useEffect(() => {
    switch (step) {
      case 1: {
        const origPosition = [...startingCameraPosition];
        new TWEEN.Tween(origPosition)
          .to([0, -725, -725], 1500)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onUpdate(() => {
            camera.position.set(...origPosition);
          })
          .start();
      }
      default: {
        function animate() {
          requestAnimationFrame(animate);
          TWEEN.update();
        }
        animate();
      }
    }
  }, [step]);

  return (
    <group onClick={() => setStep(step + 1)}>
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
