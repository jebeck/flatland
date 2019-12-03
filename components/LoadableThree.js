import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./Three.js'),
  loading: () => null,
});
