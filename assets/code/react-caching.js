class Compute extends Component {
  constructor(props) {
    this.id = hash(props.data);
  }

  componentDidMount() {
    if (cache) {
      const coordinates = JSON.parse(
        localStorage.getItem(
          `computed_${this.id}`
        )
      );
      if (!coordinates) {
        this.compute();
      } else {
        this.setState({ coordinates });
      }
    } else {
      // compute as usual
    }
  }

  store = coordinates => {
    try {
      localStorage.setItem(
        `computed_${this.id}`,
        JSON.stringify(coordinates)
      );
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return <DisplayComputed />;
  }
}
