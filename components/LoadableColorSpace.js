import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./ColorSpace.js'),
  loading: () => null,
});
