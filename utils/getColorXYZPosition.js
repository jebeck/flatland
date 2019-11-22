import { scaleLinear } from "d3-scale"

import { CEIL_CHROMA, CEIL_RGB, CEIL_SL } from "./constants"

const rgbRescale = scaleLinear()
  .domain([0, CEIL_RGB])
  .range([-42.5, 42.5])

/** get position of color with the center of the color space at 0,0,0 instead of a vertex
 * and bounded roughly by sphere of `radius`
 */
const getPosition = {
  hsl(radius, { h, s, l }) {
    return {
      x: radius * (s / CEIL_SL) * Math.cos(h * (Math.PI / 180)),
      y: l - CEIL_SL / 2,
      z: radius * (s / CEIL_SL) * Math.sin(h * (Math.PI / 180)),
    }
  },
  lab(radius, { l, c, h }) {
    return {
      x: radius * (c / CEIL_CHROMA) * Math.cos(h * (Math.PI / 180)),
      y: l - CEIL_SL / 2,
      z: radius * (c / CEIL_CHROMA) * Math.sin(h * (Math.PI / 180)),
    }
  },
  rgb(radius, { r, g, b }) {
    return {
      x: rgbRescale(r),
      y: rgbRescale(g),
      z: rgbRescale(b),
    }
  },
}

export default getPosition
