import React, { useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { animated, useSprings } from "react-spring/three"
import { range } from "d3-array"
import { scaleLinear } from "d3-scale"

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { extend, useResource, useThree } from "react-three-fiber"

import { CameraControls, Spotlight } from "./ColorSpace"
import getColorXYZPosition from "../utils/getColorXYZPosition"
import { SPACES } from "../utils/constants"

extend({ OrbitControls })

const startingCameraPosition = [0, 0, 125]
const startingFocalPoint = [0, 0, 0]

function ColorSphere({ color, geometry, position }) {
  return (
    <animated.mesh geometry={geometry} position={position}>
      <meshLambertMaterial
        attach="material"
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </animated.mesh>
  )
}

ColorSphere.propTypes = {
  color: PropTypes.string.isRequired,
  /** because is a ref, will be undefined on first render */
  geometry: PropTypes.object,
  position: PropTypes.object.isRequired,
}

export default function UMAPColorSpace({
  animateToCoordinates,
  cameraPosition,
  data,
  dimensions,
  go,
  orbitTarget,
  space,
  spaceRadius,
  sphereRadius,
}) {
  const [geometryRef, geometry] = useResource()
  const { camera } = useThree()

  const [positions, setPositions] = useSprings(data.length, i => {
    const { x, y, z } = getColorXYZPosition[space](spaceRadius, data[i])
    return { meshPosition: [x, y, z] }
  })

  const scale = useMemo(
    () =>
      scaleLinear()
        .domain([0, 1])
        .range([-spaceRadius * 1.5, spaceRadius * 1.5]),
    [spaceRadius]
  )

  useEffect(() => {
    if (animateToCoordinates && go) {
      const coords = new Float32Array(animateToCoordinates)
      setPositions(i => {
        const j = i * dimensions
        return {
          meshPosition: range(3).reduce((triple, k) => {
            if (k < dimensions) {
              triple.push(scale(coords[j + k]))
            } else {
              triple.push(0)
            }
            return triple
          }, []),
        }
      })
    }
  }, [animateToCoordinates, dimensions, go, scale, setPositions])

  useEffect(() => {
    camera.position.set(...(cameraPosition || startingCameraPosition))
    camera.lookAt(...startingFocalPoint)
  }, [camera, cameraPosition])

  return (
    <group>
      <CameraControls autoRotate={false} target={orbitTarget} />
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
        )
      })}
    </group>
  )
}

UMAPColorSpace.defaultProps = {
  dimensions: 2,
  spaceRadius: 50,
  sphereRadius: 1.5,
}

UMAPColorSpace.propTypes = {
  animateToCoordinates: PropTypes.instanceOf(ArrayBuffer),
  data: PropTypes.arrayOf(
    PropTypes.shape({ color: PropTypes.string.isRequired })
  ).isRequired,
  go: PropTypes.bool.isRequired,
  space: PropTypes.oneOf(SPACES).isRequired,
  spaceRadius: PropTypes.number.isRequired,
  sphereRadius: PropTypes.number,
}
