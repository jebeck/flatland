if (document.querySelector('#offscreen')) {
  const renderWorker = new RenderWorker();

  const offscreenCanvas = document
    .querySelector('#offscreen')
    .transferControlToOffscreen();

  renderWorker.postMessage(
    { canvas: offscreenCanvas },
    [offscreenCanvas]
  );
}
