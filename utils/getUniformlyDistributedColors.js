import { color, lab, lch } from "d3-color";
import { scaleLinear } from "d3-scale";
import { range } from "d3-array";
import { CEIL_AB, CEIL_HUE, CEIL_RGB, CEIL_SL, FLOOR_AB } from "./constants";

const getUniformlyDistributedColors = {
  hsl(n) {
    const coords = [];

    const hueScale = scaleLinear()
      /** double the iterations across hue to avoid the spikey spokes look */
      .domain([0, n * 2])
      .range([0, CEIL_HUE]);
    const sScale = scaleLinear()
      /** halve the iterations across saturation to avoid spikey spokes look */
      .domain([0, n / 2])
      .range([0, CEIL_SL]);
    const lScale = scaleLinear()
      .domain([0, n])
      .range([0, CEIL_SL]);

    range(0, n * 2 + 1).forEach(x => {
      range(0, n / 2 + 1).forEach(y => {
        range(0, n + 1).forEach(z => {
          const h = hueScale(x);
          const s = Math.round(sScale(y));
          const l = Math.round(lScale(z));

          coords.push({ color: `hsl(${h}, ${s}%, ${l}%)`, h, l, s });
        });
      });
    });

    return { data: coords, space: "hsl" };
  },
  lab(n) {
    const coords = [];

    const lScale = scaleLinear()
      .domain([0, n])
      .range([0, CEIL_SL]);
    const abScale = scaleLinear()
      .domain([0, n])
      .range([FLOOR_AB, CEIL_AB]);

    range(0, n + 1).forEach(x => {
      range(0, n + 1).forEach(y => {
        range(0, n + 1).forEach(z => {
          const l = lScale(x);
          const a = abScale(y);
          const b = abScale(z);

          const { c, h } = lch(lab(l, a, b));

          coords.push({
            a,
            b,
            c,
            color: `${color(lab(l, a, b)).formatRgb()}`,
            h,
            l,
          });
        });
      });
    });

    return { data: coords, space: "lab" };
  },
  rgb(n) {
    const coords = [];

    const rgbGridScale = scaleLinear()
      .domain([0, n])
      .range([0, CEIL_RGB]);

    range(0, n + 1).forEach(x => {
      range(0, n + 1).forEach(y => {
        range(0, n + 1).forEach(z => {
          /** r, g, b values must be integers */
          const r = Math.round(rgbGridScale(x));
          const g = Math.round(rgbGridScale(y));
          const b = Math.round(rgbGridScale(z));
          coords.push({
            b,
            color: `rgb(${r}, ${g}, ${b})`,
            g,
            r,
          });
        });
      });
    });

    return { data: coords, space: "rgb" };
  },
};

export default getUniformlyDistributedColors;
