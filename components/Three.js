import React from 'react';
import { Canvas } from 'react-three-fiber';

export default function Three({ camera, children }) {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas camera={camera} pixelRatio={window.devicePixelRatio}>
        {children}
      </Canvas>
    </div>
  );
}
