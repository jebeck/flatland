import React from "react";

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
      <path d="M1741.73 34.219c9.057 0 16.216 7.563 16.216 16.68v939.898c0 9.117-7.159 16.68-16.216 16.68H181.4c-9.056 0-16.215-7.563-16.215-16.68V50.899c0-9.117 7.159-16.68 16.215-16.68h1560.33zm0 8H181.4c-4.537 0-8.215 3.886-8.215 8.68v939.898c0 4.794 3.678 8.68 8.215 8.68h1560.33c4.538 0 8.216-3.886 8.216-8.68V50.899c0-4.794-3.678-8.68-8.216-8.68z" />
      <g id="citizens">
        <line x1={612} x2={702} y1={820} y2={900} {...strokeProps} />
        <line x1={1432} x2={1350} y1={200} y2={76} {...strokeProps} />
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
