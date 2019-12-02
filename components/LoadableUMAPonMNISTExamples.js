import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./UMAPonMNISTExamples.js"),
  loading: () => null,
});
