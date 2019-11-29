import React, { useMemo, useState } from "react";

import { useUMAP } from "react-flatland";

import LoadableUMAPColorSpace from "./LoadableUMAPColorSpace";
import LoadableThree from "./LoadableThree";

export default function InteractiveUMAPColorSpace(props) {
  const { data, dimensions, exclude } = props;
  const [go, setGo] = useState(false);

  const { coordinates } = useUMAP(
    useMemo(
      () => ({
        data,
        debugLogs: true,
        exclude: props.exclude || ["color"],
        iterate: false,
        params: { dimensions },
      }),
      [data, dimensions, props.exclude]
    )
  );
  // console.log(JSON.stringify(new Float32Array(coordinates)));

  return (
    <>
      <button
        disabled={!coordinates.byteLength}
        onClick={() => {
          setGo(true);
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
        go
      </button>
      <LoadableThree>
        <LoadableUMAPColorSpace
          animateToCoordinates={coordinates}
          go={go}
          {...props}
        />
      </LoadableThree>
    </>
  );
}
