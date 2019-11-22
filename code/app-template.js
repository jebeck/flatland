const worker = new Worker();
// pass data to the Worker
worker.postMessage({ data });

worker.onmessage = function({
  data: { result },
}) {
  // do stuff with Worker-computed result
};
