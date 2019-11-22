async function compute(data) {
  const embedding = await umap.fitAsync(
    data
  );
  const typedArray = new Float32Array(
    embedding
  );

  postMessage(
    { coordinates: typedArray.buffer },
    [typedArray.buffer]
  );
}
