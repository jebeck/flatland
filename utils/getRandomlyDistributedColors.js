import { color, lab, lch, rgb } from "d3-color"
import { range } from "d3-array"

import {
  CEIL_A,
  CEIL_B,
  CEIL_HUE,
  CEIL_RGB,
  CEIL_SL,
  FLOOR_A,
  FLOOR_B,
} from "./constants"
import getRandomInt from "./getRandomInt"

const getRandomlyDistributedColors = {
  hsl(n) {
    return {
      data: range(n).map(() => {
        const h = getRandomInt(CEIL_HUE)
        const s = getRandomInt(CEIL_SL)
        const l = getRandomInt(CEIL_SL)

        return { color: `hsl(${h}, ${s}%, ${l}%)`, h, l, s }
      }),
      space: "hsl",
    }
  },
  lab(n) {
    return {
      data: range(n).map(() => {
        const l = getRandomInt(CEIL_SL + 1)
        const a = getRandomInt(CEIL_A - FLOOR_A + 1) - CEIL_A
        const b = getRandomInt(CEIL_A - FLOOR_B + 1) - CEIL_B

        const { c, h } = lch(lab(l, a, b))

        return {
          a,
          b,
          c,
          color: `${color(lab(l, a, b)).formatRgb()}`,
          h,
          l,
        }
      }),
      space: "lab",
    }
  },
  rgb(n) {
    return {
      data: range(n).map(() => {
        const r = getRandomInt(CEIL_RGB)
        const g = getRandomInt(CEIL_RGB)
        const b = getRandomInt(CEIL_RGB)

        return { b, color: `rgb(${r}, ${g}, ${b})`, g, r }
      }),
      space: "rgb",
    }
  },
}

export default getRandomlyDistributedColors
