async function messageHandler({
  data: { dataToFlatten }
}) {
  const embedding = new UMAP(dataToFlatten); // pseudo-code

  await embedding.embed();

  postMessage({
    coordinates: embedding.asArray()
  });
}

onmessage = messageHandler;
