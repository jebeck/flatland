import React, { useState } from "react";

import LoadableColorSpace from "./LoadableColorSpace";
import LoadableThree from "./LoadableThree";

import { SPACES } from "../utils/constants";

export default function InteractiveColorSpace(props) {
  const { space } = props;
  const [animateToSpace, setAnimateToSpace] = useState(null);

  return (
    <>
      <button
        onClick={() => {
          let relevantSpaceIdx;
          if (animateToSpace) {
            relevantSpaceIdx = SPACES.findIndex(
              aSpace => aSpace === animateToSpace
            );
          } else {
            relevantSpaceIdx = SPACES.findIndex(aSpace => aSpace === space);
          }
          if (relevantSpaceIdx === SPACES.length - 1) {
            setAnimateToSpace(SPACES[0]);
          } else {
            setAnimateToSpace(SPACES[relevantSpaceIdx + 1]);
          }
        }}
      >
        click me
      </button>
      <LoadableThree>
        <LoadableColorSpace animateToSpace={animateToSpace} {...props} />
      </LoadableThree>
    </>
  );
}
