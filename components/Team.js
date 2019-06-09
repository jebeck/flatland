import React from "react"
import shuffle from "shuffle-array"

export default function team() {
  return (
    <>
      <div style={{ fontSize: "4rem" }}>
        {shuffle([
          "👩🏼‍💻",
          "👩‍💻",
          "👩🏻‍💻",
          "👩🏽‍💻",
          "👩🏾‍💻",
          "👩🏿‍💻",
          "👨🏼‍💻",
          "👨‍💻",
          "👨🏻‍💻",
          "👨🏽‍💻",
          "👨🏾‍💻",
          "👨🏿‍💻",
        ]).join("")}
      </div>
      <h1>the team</h1>
      <div style={{ fontSize: "4rem" }}>
        {shuffle([
          "👩🏼‍💻",
          "👩‍💻",
          "👩🏻‍💻",
          "👩🏽‍💻",
          "👩🏾‍💻",
          "👩🏿‍💻",
          "👨🏼‍💻",
          "👨‍💻",
          "👨🏻‍💻",
          "👨🏽‍💻",
          "👨🏾‍💻",
          "👨🏿‍💻",
        ]).join("")}
      </div>
    </>
  )
}
