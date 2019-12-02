import React, { useEffect, useMemo, useRef } from "react";

import Typer from "./Typer";
import { UMAPStatus } from "../styled";
import { RenderWorker, useUMAP } from "react-flatland";

export default function UMAPonMNISTOffscreen({ data, iterate }) {
  const { devicePixelRatio, height, width } = useMemo(() => {
    return {
      devicePixelRatio: window.devicePixelRatio,
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }, []);

  const renderWorkerRef = useRef(null);

  useEffect(() => {
    if (document.querySelector("#offscreen-canvas")) {
      const renderWorker = new RenderWorker();
      renderWorkerRef.current = renderWorker;
      const offscreenCanvas = document
        .querySelector("#offscreen-canvas")
        .transferControlToOffscreen();
      renderWorker.postMessage(
        {
          type: "init",
          payload: {
            canvas: offscreenCanvas,
            data,
            debugLogs: true,
            devicePixelRatio,
            exclude: ["label"],
            height,
            iterate,
            width,
          },
        },
        [offscreenCanvas]
      );
      renderWorker.onmessage = msg => {
        console.log(msg);
      };
    }
  }, [data, devicePixelRatio, height, iterate, width]);

  const { computing, coordinates, error, iteration, nEpochs } = useUMAP({
    data,
    debugLogs: false,
    exclude: useMemo(() => ["label"], []),
    iterate,
  });

  useEffect(() => {
    if (renderWorkerRef.current && coordinates) {
      renderWorkerRef.current.postMessage(
        {
          type: "compute",
          payload: { coordinates },
        },
        [coordinates]
      );
    }
  }, [coordinates]);

  return (
    <>
      <Typer />
      <div style={{ height: "100vh", width: "100vw" }}>
        <canvas
          height={height * devicePixelRatio}
          id="offscreen-canvas"
          style={{ height, width }}
          width={width * devicePixelRatio}
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
    </>
  );
}
