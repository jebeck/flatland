import React from "react";
import { Canvas } from "react-three-fiber";

export default function Three({ camera, children }) {
  return (
    <Canvas camera={camera} pixelRatio={window.devicePixelRatio}>
      {children}
    </Canvas>
  );
}
