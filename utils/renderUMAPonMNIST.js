import { extent, range } from 'd3-array';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { Application, Text, TextStyle } from 'pixi.js';

const textStyle = new TextStyle({
  fontSize: 24,
  fontFamily: '"Gloria Hallelujah", sans-serif',
});

const PADDING = 100;

const colorScale = scaleOrdinal()
  .domain(range(0, 10))
  .range(schemeCategory10);

export default function renderUMAPonMNIST({ canvas, data, stats }) {
  const pixi = new Application({
    height: window.innerHeight,
    resolution: window.devicePixelRatio,
    transparent: true,
    width: window.innerWidth,
    view: canvas,
  });

  const xScale = scaleLinear()
    .domain([0, 1])
    .range([PADDING, window.innerWidth - PADDING]);
  const yScale = scaleLinear()
    .domain([0, 1])
    .range([PADDING, window.innerHeight - PADDING]);

  const startingPositions = data.map(() => ({
    x: xScale(Math.random()),
    y: yScale(Math.random()),
  }));

  const rendered = [];
  data.forEach(({ label }, i) => {
    const text = new Text(label, { ...textStyle });
    text.style.fill = colorScale(label);
    text.x = startingPositions[i].x;
    text.y = startingPositions[i].y;
    rendered.push(text);
    pixi.stage.addChild(text);
  });

  return coordinates => {
    stats.begin();
    const coords = new Float32Array(coordinates);

    const xScale = scaleLinear()
      .domain(extent(Object.values(coords).filter((d, i) => i % 2 === 0)))
      .range([PADDING, window.innerWidth - PADDING]);
    const yScale = scaleLinear()
      .domain(extent(Object.values(coords).filter((d, i) => i % 2 !== 0)))
      .range([PADDING, window.innerHeight - PADDING]);

    for (let i = 0; i < coords.length; i += 2) {
      const text = rendered[Math.floor(i / 2)];
      text.x = xScale(coords[i]);
      text.y = yScale(coords[i + 1]);
    }
    stats.end();
  };
}
