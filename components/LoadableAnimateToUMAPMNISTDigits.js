import Loadable from "react-loadable";

export default Loadable({
  loader: () => import("./AnimateToUMAPMNISTDigits.js"),
  loading: () => null,
});
