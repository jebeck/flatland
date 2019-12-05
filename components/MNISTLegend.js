import React from 'react';

import { schemeCategory10 } from 'd3-scale-chromatic';

export default function MNISTLegend({ position }) {
  let absolute = { bottom: '2vh', left: '2vw' };
  if (position === 'top right') {
    absolute = { top: '2vh', right: '2vw' };
  }
  return (
    <div
      style={{
        color: '#261F41',
        display: 'flex',
        position: 'absolute',
        ...absolute,
      }}
    >
      {schemeCategory10.map((color, i) => (
        <div
          key={color}
          style={{
            backgroundColor: color,
            fontFamily: 'Gloria Hallelujah',
            margin: '0.25rem',
            padding: '0 0.75rem',
            width: '4rem',
          }}
        >
          {i}
        </div>
      ))}
    </div>
  );
}
