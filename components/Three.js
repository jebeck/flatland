import React from "react";
import { Canvas } from "react-three-fiber";

export default function Three({ children }) {
  return <Canvas pixelRatio={window.devicePixelRatio}>{children}</Canvas>;
}
