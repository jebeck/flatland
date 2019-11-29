import React from "react";
import { range } from "d3-array";

import singleDigit from "../images/MNIST_eight.png";

const SIZE = 28 * 30;

const VIEW_SIZE = 280;

export default function SingleMNISTDigit({ coordinates, highlight, overlay }) {
  return (
    <div
      style={{
        alignItems: "center",
        backgroundColor: "ghostwhite",
        display: "flex",
        flexDirection: "column",
        height: highlight ? SIZE / 1.75 + 28 : SIZE + 56,
        justifyContent: "center",
        width: highlight ? SIZE / 1.75 + 28 : SIZE + 56,
      }}
    >
      <svg
        height={highlight ? SIZE / 1.75 : SIZE}
        viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
        width={highlight ? SIZE / 1.75 : SIZE}
      >
        <image xlinkHref={singleDigit} height="100%" width="100%" />
        {overlay ? (
          <>
            <rect
              fill="none"
              height={VIEW_SIZE}
              stroke="#f05d61"
              strokeWidth="1.5px"
              width={VIEW_SIZE}
              x={0}
              y={0}
            />
            <g id="horizontal-lines">
              {range(0, 27).map((d, i) => (
                <line
                  key={d}
                  stroke="#f05d61"
                  strokeWidth=".75px"
                  x1={0}
                  x2={VIEW_SIZE}
                  y1={((i + 1) * VIEW_SIZE) / 28}
                  y2={((i + 1) * VIEW_SIZE) / 28}
                />
              ))}
            </g>
            <g id="vertical-lines">
              {range(0, 27).map((d, i) => (
                <line
                  key={d}
                  stroke="#f05d61"
                  strokeWidth=".75px"
                  x1={((i + 1) * VIEW_SIZE) / 28}
                  x2={((i + 1) * VIEW_SIZE) / 28}
                  y1={0}
                  y2={VIEW_SIZE}
                />
              ))}
            </g>
          </>
        ) : null}
        {coordinates ? (
          <>
            <g id="horizontal-coordinates">
              {range(0, 28).map((d, i) => (
                <text
                  dominantBaseline="middle"
                  fontSize="6px"
                  fontWeight="bold"
                  key={d}
                  textAnchor="middle"
                  x={(i + 1) * 10 - 5}
                  y={5}
                >
                  {d}
                </text>
              ))}
            </g>
            <g id="vertical-coordinates">
              {range(1, 28).map(d => (
                <text
                  dominantBaseline="middle"
                  fontSize="6px"
                  fontWeight="bold"
                  key={d}
                  textAnchor="middle"
                  x={5}
                  y={(d + 1) * 10 - 5}
                >
                  {d}
                </text>
              ))}
            </g>
          </>
        ) : null}
        {highlight ? (
          <rect
            fill="none"
            height={10 + 10}
            stroke="orange"
            strokeWidth={9}
            width={10 + 10}
            x={highlight[0] * 10 - 5}
            y={highlight[1] * 10 - 5}
          />
        ) : null}
      </svg>
    </div>
  );
}
