import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./UMAPonMNISTOffscreen.js"),
  loading: () => null,
});
