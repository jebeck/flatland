import React, { useCallback, useEffect, useState } from 'react';

import LoadableUMAPColorSpace from './LoadableUMAPColorSpace';
import LoadableThree from './LoadableThree';

import hsl from '../json/uniformHslUMAP.json';
import rgb from '../json/uniformRgbUMAP.json';

const coordinates = { hsl, rgb };

export default function InteractiveUMAPColorSpace(props) {
  const { space } = props;
  const [go, setGo] = useState(false);

  const coords = new Float32Array(
    Object.values(coordinates[space]).map(d => parseFloat(d))
  );

  const cb = useCallback(() => {
    setGo(true);
  }, [setGo]);

  useEffect(() => {
    setTimeout(() => {
      if (!go) {
        setGo(true);
      }
    }, 5000);
  }, [go]);

  return (
    <div onClick={cb} style={{ height: '100vh', width: '100vw' }}>
      <LoadableThree>
        <LoadableUMAPColorSpace
          animateToCoordinates={coords.buffer}
          autoRotate={!go}
          go={go}
          {...props}
        />
      </LoadableThree>
    </div>
  );
}
