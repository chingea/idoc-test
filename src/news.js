'use strict';

const channels = ["Al Arabiya", "BBC", "ANN", "France 24", "CNN", "Al Jazeera", "Global News", "Al Ghad", "France 2"]
const media = "media/"

class Channel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    }
  }
  render() {
    return (
      <div
      className={"grid-item".concat(this.props.playing ? " grid-item-playing" : "")}
      onMouseEnter={() => this.props.onMouseEnter(this.props.index)}
      onMouseLeave={this.props.onMouseLeave}>
        <video
        muted={this.props.isActive ? false : "muted"}
        className={this.props.isActive ? "active" : "inactive"}
        id={this.props.index}
        onCanPlayThrough={() => this.props.onCanPlayThrough(this.props.index)}>
          <source src={media.concat(channels[this.props.index]).concat(".mp4")} type="video/mp4" />
        </video>
      </div>
    )
  }
}

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleCanPlayThrough = this.handleCanPlayThrough.bind(this);
  }
  handleCanPlayThrough(index) {
    alert(index + " can be played through.");
  }
  handleMouseEnter(index) {
    if (this.props.playing) {
      this.setState({
        activeIndex: index
      });
  }
  }
  handleMouseLeave() {
    this.setState({
      activeIndex: null
    });
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  handleKeyPress(e) {
    switch (e.keyCode) {
      case 37:
        if (![0, 3, 6].includes(this.state.activeIndex)) {
          this.setState({
            activeIndex: this.state.activeIndex - 1
          });
        }
        break;
      case 38:
        if (![0, 1, 2].includes(this.state.activeIndex)) {
          this.setState({
          activeIndex: this.state.activeIndex - 3
        });
      }
        break;
      case 39:
        if (![2, 5, 8].includes(this.state.activeIndex)) {
          this.setState({
          activeIndex: this.state.activeIndex + 1
        });
      }
        break;
      case 40:
        if (![6, 7, 8].includes(this.state.activeIndex)) {
          this.setState({
          activeIndex: this.state.activeIndex + 3
        });
      }
        break;
      default:
        return;
          }
          e.preventDefault();
  }
  renderChannel(i) {
    return (
      <Channel
        index={i}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        isActive={this.state.activeIndex === i}
        playing={this.props.playing}
        onCanPlayThrough={this.handleCanPlayThrough} />
    )
  }
  render() {
    return (
      <div className="grid">
        <div className="grid-header">Move cursor or use keyboard arrows to change channels.</div>
        {this.renderChannel(0)}
        {this.renderChannel(1)}
        {this.renderChannel(2)}
        {this.renderChannel(3)}
        {this.renderChannel(4)}
        {this.renderChannel(5)}
        {this.renderChannel(6)}
        {this.renderChannel(7)}
        {this.renderChannel(8)}
      </div>
    )
  }
}

class PlayButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
      className={this.props.playing ? "none" : "play-button"}
      id="play"
      onClick={this.props.handleClick}>PLAY</div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    }
    this.play = this.play.bind(this);
  }
  play() {
    $("video").each((i, vid) => {
      vid.play();
    });
    this.setState({
      playing: true
    });
  }
  render() {
    return (
      <div>
        <Grid playing={this.state.playing}/>
        <PlayButton handleClick={this.play} playing={this.state.playing}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
