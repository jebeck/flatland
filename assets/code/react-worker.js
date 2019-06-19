import ComputeWorker from "./compute.worker.js";

class Compute extends Component {
  constructor(props) {
    super(props);

    this.worker = new Worker();

    this.worker.onmessage = this.handleMessage;
  }

  handleMessage = ({ data: { coords } }) => {
    // do stuff! probably setState
  };

  componentDidMount() {
    const { data } = this.props;
    this.worker.postMessage({ data });
  }

  render() {
    // stuff
  }
}
