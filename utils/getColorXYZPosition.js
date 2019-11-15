import { scaleLinear } from "d3-scale";

import { CEIL_CHROMA, CEIL_RGB, CEIL_SL } from "./constants";

const rgbRescale = scaleLinear()
  .domain([0, CEIL_RGB])
  .range([-42.5, 42.5]);

/** get position of color with the center of the color space at 0,0,0 instead of a vertex
 * and bounded roughly by sphere of `radius`
 */
const getPosition = {
  hsl(radius, { h, s, l }) {
    return [
      radius * (s / CEIL_SL) * Math.cos(h * (Math.PI / 180)),
      l - CEIL_SL / 2,
      radius * (s / CEIL_SL) * Math.sin(h * (Math.PI / 180)),
    ];
  },
  lab(radius, { l, c, h }) {
    return [
      radius * (c / CEIL_CHROMA) * Math.cos(h * (Math.PI / 180)),
      l - CEIL_SL / 2,
      radius * (c / CEIL_CHROMA) * Math.sin(h * (Math.PI / 180)),
    ];
  },
  rgb(radius, { r, g, b }) {
    return [r, g, b].map(d => rgbRescale(d));
  },
};

export default getPosition;
