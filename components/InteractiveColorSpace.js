import React, { useState } from "react"

import LoadableColorSpace from "./LoadableColorSpace"
import LoadableThree from "./LoadableThree"

import { SPACES } from "../utils/constants"

export default function InteractiveColorSpace(props) {
  const { space } = props
  const [animateToSpace, setAnimateToSpace] = useState(null)

  return (
    <>
      <button
        onClick={() => {
          let relevantSpaceIdx
          if (animateToSpace) {
            relevantSpaceIdx = SPACES.findIndex(
              aSpace => aSpace === animateToSpace
            )
          } else {
            relevantSpaceIdx = SPACES.findIndex(aSpace => aSpace === space)
          }
          if (relevantSpaceIdx === SPACES.length - 1) {
            setAnimateToSpace(SPACES[0])
          } else {
            setAnimateToSpace(SPACES[relevantSpaceIdx + 1])
          }
        }}
        style={{
          backgroundColor: "#9ab0e5",
          fontSize: "1.25rem",
          padding: "0.5rem 0.75rem",
          position: "absolute",
          right: "1rem",
          top: "1rem",
          zIndex: 100,
        }}
      >
        next
      </button>
      <LoadableThree>
        <LoadableColorSpace animateToSpace={animateToSpace} {...props} />
      </LoadableThree>
    </>
  )
}
