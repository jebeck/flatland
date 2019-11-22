import Loadable from "react-loadable"

export default Loadable({
  loader: () => import("./UMAPColorSpace.js"),
  loading: () => null,
})
