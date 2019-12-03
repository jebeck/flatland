import _ from 'lodash';
import * as color from 'd3-color';

import { CEIL_SL } from './constants';
import getColorXYZPosition from './getColorXYZPosition';

export default function getColorXYZInAnotherSpace({
  animateToSpace,
  d,
  spaceRadius,
}) {
  let newColor = color[animateToSpace](color.color(d.color));
  if (animateToSpace === 'hsl') {
    newColor.s = newColor.s * CEIL_SL;
    newColor.l = newColor.l * CEIL_SL;
  } else if (animateToSpace === 'rgb') {
    newColor = _.mapValues(newColor, Math.floor);
  } else if (animateToSpace === 'lab') {
    newColor = color.lch(newColor);
  } else {
    throw new Error(
      `Color space to animate to not recognized: ${animateToSpace}!`
    );
  }
  return getColorXYZPosition[animateToSpace](
    animateToSpace === 'lab' ? spaceRadius * 2.5 : spaceRadius,
    {
      color: d.color,
      ...newColor,
    }
  );
}
