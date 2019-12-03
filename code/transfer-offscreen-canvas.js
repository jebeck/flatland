if (document.querySelector('#offscreen')) {
  const renderWorker = new RenderWorker();

  const offscreenCanvas = document
    .querySelector('#offscreen')
    .transferControlToOffscreen();

  renderWorker.postMessage(
    {
      type: 'init',
      payload: {
        canvas: offscreenCanvas,
        data,
        debugLogs: true,
        devicePixelRatio,
        exclude: ['label'],
        height,
        iterate,
        width,
      },
    },
    [offscreenCanvas]
  );
}
