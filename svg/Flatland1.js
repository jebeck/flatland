import React from "react";

import FlatlandShadowBorder from "./FlatlandShadowBorder";

const strokeProps = {
  fill: "none",
  stroke: "black",
  strokeWidth: 8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
};

export default function Flatland() {
  return (
    <>
      <FlatlandShadowBorder />
      <rect height={120} width={120} {...strokeProps} x={300} y={180} />
    </>
  );
}
