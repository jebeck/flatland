import _ from "lodash";
import React from "react";

import { strokeProps } from "./Flatland1";

const WORKERS = ["👷🏿", "👷🏽‍♀️", "👷🏻‍♀️", "👷🏼", "👷‍♀️"];

const COORDS = [
  [1600, 800],
  [850, 850],
  [1500, 300],
  [1000, 400],
  [1200, 750],
];

const RADII = [100, 90, 150, 120, 110];

export default function MainAndWorkers() {
  return (
    <>
      <defs>
        <filter id="a">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
          <feOffset dy="2" result="offsetblur" />
          <feFlood floodColor="#000" />
          <feComposite in2="offsetblur" operator="in" />
        </filter>
        <radialGradient
          id="b"
          gradientUnits="userSpaceOnUse"
          cx="985.472"
          cy="531.723"
          r="391.573"
        >
          <stop offset="0" stopColor="#FFF" />
          <stop offset="1" stopColor="#FA9499" />
        </radialGradient>
      </defs>
      <g transform="scale(0.675) translate(-250, 50)">
        <path
          d="M985.472 908.364c-216.259 0-391.572-168.628-391.572-376.641 0-208.014 175.313-376.642 391.572-376.642 216.26 0 391.573 168.628 391.573 376.642 0 208.013-175.313 376.641-391.573 376.641z"
          fill="url(#b)"
        />
        <path
          d="M985.472 908.364c-216.259 0-391.572-168.628-391.572-376.641 0-208.014 175.313-376.642 391.572-376.642 216.26 0 391.573 168.628 391.573 376.642 0 208.013-175.313 376.641-391.573 376.641z"
          {...strokeProps}
          fill="none"
        />
        <g>
          <text
            fontFamily="Source Code Pro"
            fontSize="120"
            fontWeight="bold"
            color="black"
            transform="translate(984.972 520.848)"
          >
            <tspan x="-103.35" y="-156.852">
              the{" "}
            </tspan>{" "}
            <tspan x="-151.725" y="39.148">
              main{" "}
            </tspan>{" "}
            <tspan x="-209.025" y="235.148">
              thread
            </tspan>
          </text>
        </g>
      </g>
      <g id="workers">
        {WORKERS.map((worker, i) => (
          <g key={worker}>
            <circle
              cx={COORDS[i][0]}
              cy={COORDS[i][1]}
              fill="#4ECEC9"
              r={RADII[i]}
              {..._.omit(strokeProps, "fill")}
            />
            <text
              alignmentBaseline="central"
              fontSize="8rem"
              textAnchor="middle"
              x={COORDS[i][0]}
              y={COORDS[i][1]}
            >
              {worker}
            </text>
          </g>
        ))}
      </g>
    </>
  );
}
