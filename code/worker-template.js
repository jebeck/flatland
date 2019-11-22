onmessage = function({ data: { data } }) {
  // do stuff with app data
  const result = compute(data);

  // pass back result
  postMessage({ result });
};
