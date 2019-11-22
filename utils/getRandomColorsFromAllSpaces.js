import { hsl, lch, rgb } from "d3-color"
import getRandomlyDistributedColors from "./getRandomlyDistributedColors"

import { SPACES } from "./constants"

const converters = {
  hsl({ color, h, s, l }) {
    const str = `hsl(${h}, ${s}%, ${l}%)`
    const { r, g, b } = rgb(str)
    const { l: labL, c: labC, h: labH } = lch(str)

    return {
      color,
      hslH: h,
      hslS: s,
      hslL: l,
      labL,
      labC,
      labH,
      rgbR: r,
      rgbG: g,
      rgbB: b,
    }
  },
  lab({ color, l, c, h }) {
    const str = lch(l, c, h).formatRgb()
    const { h: hslH, s: hslS, l: hslL } = hsl(str)
    const { r: rgbR, g: rgbG, b: rgbB } = rgb(str)

    return {
      color,
      hslH: hslH,
      hslS: hslS * 100,
      hslL: hslL * 100,
      labL: l,
      labC: c,
      labH: h,
      rgbR,
      rgbG,
      rgbB,
    }
  },
  rgb({ color, r, g, b }) {
    const str = `rgb(${r}, ${g}, ${b})`
    const { h: hslH, s: hslS, l: hslL } = hsl(str)
    const { l, c, h } = lch(str)

    return {
      color,
      hslH,
      hslS: hslS * 100,
      hslL: hslL * 100,
      labL: l,
      labC: c,
      labH: h,
      rgbR: r,
      rgbG: g,
      rgbB: b,
    }
  },
}

export default function getRandomColorsFromAllSpaces(n = 9999) {
  const randoms = {}
  SPACES.forEach(space => {
    const { data } = getRandomlyDistributedColors[space](Math.ceil(n / 3))
    randoms[space] = data.map(d => {
      const converted = { ...converters[space](d) }
      return {
        ...converted,
        r: converted.rgbR,
        g: converted.rgbG,
        b: converted.rgbB,
      }
    })
  })

  return SPACES.reduce((acc, space) => {
    acc.push(...randoms[space])
    return acc
  }, [])
}
