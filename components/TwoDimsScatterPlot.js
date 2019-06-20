import _ from "lodash"
import React from "react"
import { extent } from "d3-array"
import { scaleLinear } from "d3-scale"

import data from "../assets/data/food-emoji.json"

export default function TwoDimsScatterPlot() {
  const h = 800
  const w = 1200

  const dataToRender = data.filter(
    d =>
      d.emoji &&
      d["avg weight per unit"] &&
      d["avg calories per unit"] &&
      !_.includes(["coconut", "pineapple", "watermelon"], d["food name"])
  )

  const pad = 60

  const x = scaleLinear()
    .domain(extent(dataToRender.map(d => d["avg weight per unit"])))
    .range([pad, w - pad])
  const y = scaleLinear()
    .domain(extent(dataToRender.map(d => d["avg calories per unit"])))
    .range([h - pad, pad])
  return (
    <div style={{ height: "80vh", width: "80vw" }}>
      <svg height="100%" width="100%" viewBox={`0 0 ${w} ${h}`}>
        <g id="axes">
          <line
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={8}
            x1={0}
            x2={0}
            y1={0 + 4}
            y2={h - 4}
          />
          <line
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={8}
            x1={0}
            x2={w}
            y1={h - 4}
            y2={h - 4}
          />
        </g>
        <g id="points">
          {dataToRender.map(d => (
            <text
              x={x(d["avg weight per unit"])}
              y={y(d["avg calories per unit"])}
            >
              {d.emoji}
            </text>
          ))}
        </g>
      </svg>
    </div>
  )
}
