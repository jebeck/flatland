import React from "react";

import FlatlandShadowBorder from "./FlatlandShadowBorder";
import { strokeProps } from "./Flatland1";

export default function Flatland() {
  return (
    <>
      <FlatlandShadowBorder />
      <g id="citizens">
        <line x1={612} x2={702} y1={820} y2={900} {...strokeProps} />
        <line x1={1532} x2={1450} y1={463} y2={360} {...strokeProps} />
        <line x1={1200} x2={1280} y1={595} y2={500} {...strokeProps} />
        <circle cx={800} cy={380} r={62.5} {...strokeProps} />
        <polygon
          points="50,5 100,5 125,30 125,80 100,105 50,105 25,80 25,30"
          transform="translate(1000,100) scale(1.125)"
          {...strokeProps}
        />
        <polygon
          points="10,0 60,0 35,50"
          transform="translate(1400,800) scale(2.5) rotate(-45)"
          {...strokeProps}
        />
        <polygon
          points="10,0 60,0 35,50"
          transform="translate(300,623) scale(2.25)"
          {...strokeProps}
        />
        <polygon
          points="10,0 60,0 35,50"
          transform="translate(900,555) scale(2.2)"
          {...strokeProps}
        />
      </g>
      <rect height={120} width={120} {...strokeProps} x={300} y={180} />
    </>
  );
}
