import React, { useCallback, useEffect, useMemo, useRef } from "react";
import Stats from "stats.js";

import { UMAPStatus } from "../styled";
import { useUMAP } from "react-flatland";

import renderUMAPonMNIST from "../utils/renderUMAPonMNIST";
import RenderWorker from "../utils/render.worker";

const stats = new Stats();
stats.showPanel(0);

export default function UMAPonMNISTExamples({
  data,
  iterate,
  offscreen,
  worker,
}) {
  const renderFn = useRef(null);

  const renderWorker = new RenderWorker();

  renderWorker.postMessage({ msg: "Hi" });

  useEffect(() => {
    return () => {
      stats.dom.remove();
    };
  }, []);

  const canvasEl = useCallback(
    node => {
      if (node) {
        stats.dom.style.transform = "scale(4) translate(40%,42.5%)";
        document.body.appendChild(stats.dom);
        renderFn.current = renderUMAPonMNIST({
          canvas: node,
          data,
          stats: stats,
        });
      }
    },
    [data]
  );

  const { computing, coordinates, error, iteration, nEpochs } = useUMAP({
    data,
    debugLogs: false,
    exclude: useMemo(() => ["label"], []),
    iterate,
    worker,
  });

  useEffect(() => {
    if (renderFn.current) {
      renderFn.current(coordinates);
    }
  }, [coordinates, renderFn]);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <canvas
        height={window.innerHeight * window.devicePixelRatio}
        ref={canvasEl}
        style={{ height: window.innerHeight, width: window.innerWidth }}
        width={window.innerWidth * window.devicePixelRatio}
      />
      {computing && !iteration ? <UMAPStatus>Computing...</UMAPStatus> : null}
      {computing && iteration ? (
        <UMAPStatus>{`Iteration ${iteration + 1}${
          nEpochs ? ` of ${nEpochs}` : ""
        }`}</UMAPStatus>
      ) : null}
      {error ? (
        <UMAPStatus>{error.message || "Unknown error 😭"}</UMAPStatus>
      ) : null}
    </div>
  );
}
