import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./UMAPonMNIST.js"),
  loading: () => null,
});
