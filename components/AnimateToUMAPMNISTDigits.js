import React, { useCallback, useEffect, useState } from 'react';
import { extent } from 'd3-array';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { Application, Text, TextStyle } from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';

import inputData from '../json/MNISTdigits5000.json';
import umapData from '../json/MNISTdigits5000UMAP.json';

const PADDING = 64;

const colorScale = scaleOrdinal(schemeCategory10);
const xScale = scaleLinear()
  .domain(extent(Object.values(umapData).filter((d, i) => i % 2 === 0)))
  .range([PADDING, window.innerWidth - PADDING]);
const yScale = scaleLinear()
  .domain(extent(Object.values(umapData).filter((d, i) => i % 2 !== 0)))
  .range([PADDING, window.innerHeight - PADDING]);

const textStyle = new TextStyle({
  fontSize: 24,
  fontFamily: '"Gloria Hallelujah", sans-serif',
});

const startingPositions = inputData.map(() => ({
  x: xScale(Math.random()),
  y: yScale(Math.random()),
}));

const endingPositions = [];
const umapCoords = new Float32Array(
  Object.values(umapData).map(d => parseFloat(d))
);
for (let i = 0; i < umapCoords.length; i += 2) {
  endingPositions.push({
    x: xScale(umapCoords[i]),
    y: yScale(umapCoords[i + 1]),
  });
}

export default function AnimateToUMAPMNISTDigits() {
  const [rendered, setRendered] = useState(null);

  const canvasEl = useCallback(node => {
    if (node) {
      const pixi = new Application({
        height: window.innerHeight,
        resolution: window.devicePixelRatio,
        transparent: true,
        width: window.innerWidth,
        view: node,
      });

      const rendered = [];
      inputData.forEach(({ label }, i) => {
        const text = new Text(label, { ...textStyle });
        text.style.fill = colorScale(label);
        text.x = startingPositions[i].x;
        text.y = startingPositions[i].y;
        rendered.push(text);
        setRendered(rendered);
        pixi.stage.addChild(text);
      });
    }
  }, []);
  const [go, setGo] = useState(false);

  useEffect(() => {
    setTimeout(() => setGo(true), 5000);
  }, []);

  useEffect(() => {
    if (go && rendered) {
      inputData.map((d, i) => {
        const origPosition = { ...startingPositions[i] };
        new TWEEN.Tween(origPosition)
          .to({ ...endingPositions[i] }, 1500)
          .easing(TWEEN.Easing.Quadratic.InOut)
          .onUpdate(() => {
            // rendered[i].style.fill = interpolateColor(origPosition.color);
            rendered[i].x = origPosition.x;
            rendered[i].y = origPosition.y;
          })
          .start();
      });

      function animate() {
        requestAnimationFrame(animate);
        TWEEN.update();
      }
      animate();
    }
  }, [go, rendered]);

  if (xScale.range()[1] !== 1) {
    return (
      <div style={{ height: '100vh', width: '100vw' }}>
        <canvas
          height={window.innerHeight * window.devicePixelRatio}
          ref={canvasEl}
          style={{ height: window.innerHeight, width: window.innerWidth }}
          width={window.innerWidth * window.devicePixelRatio}
        />
      </div>
    );
  }
  return null;
}
