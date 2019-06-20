import React from "react"

export default function TeamOrg() {
  return (
    <>
      <h1>(the team)</h1>
      <div style={{ display: "flex", height: "33vh", width: "80vw" }}>
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#4ecec9",
            borderRadius: "0.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "1rem",
            width: "25%",
          }}
        >
          <h1 style={{ color: "#276764", margin: "1rem" }}>A</h1>
          <h2 style={{ color: "#276764", margin: "1rem" }}>client</h2>
        </div>
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#4ecec9",
            borderRadius: "0.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "1rem",
            width: "25%",
          }}
        >
          <h1 style={{ color: "#276764", margin: "1rem" }}>B</h1>
          <h2 style={{ color: "#276764", margin: "1rem" }}>styling</h2>
        </div>
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#4ecec9",
            borderRadius: "0.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "1rem",
            width: "25%",
          }}
        >
          <h1 style={{ color: "#276764", margin: "1rem" }}>C</h1>
          <h2 style={{ color: "#276764", margin: "1rem" }}>merch</h2>
        </div>
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#4ecec9",
            borderRadius: "0.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "1rem",
            width: "25%",
          }}
        >
          <h1 style={{ color: "#276764", margin: "1rem" }}>D</h1>
          <h2 style={{ color: "#276764", margin: "1rem" }}>etc.</h2>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#4ecec9",
          borderRadius: "0.5rem",
          display: "flex",
          flexDirection: "column",
          height: "20vh",
          justifyContent: "center",
          margin: "0 auto",
          width: "calc(80vw - 2rem)",
        }}
      >
        <h2 style={{ color: "#276764" }}>data platform</h2>
      </div>
    </>
  )
}
