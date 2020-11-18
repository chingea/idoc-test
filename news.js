'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var channels = ["Al Arabiya", "BBC", "ANN", "France 24", "CNN", "Al Jazeera", "Global News", "Al Ghad", "France 2"];

$(window).bind("load", function () {
  alert("loaded");
});

$(document).ready(function () {
  $(document).click(function () {
    $("video").each(function (i, vid) {
      vid.play();
    });
  });
});

var Channel = function (_React$Component) {
  _inherits(Channel, _React$Component);

  function Channel(props) {
    _classCallCheck(this, Channel);

    var _this = _possibleConstructorReturn(this, (Channel.__proto__ || Object.getPrototypeOf(Channel)).call(this, props));

    _this.state = {
      selected: false
    };
    return _this;
  }

  _createClass(Channel, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(
        "div",
        {
          className: "grid-item",
          onMouseEnter: function onMouseEnter() {
            return _this2.props.onMouseEnter(_this2.props.index);
          },
          onMouseLeave: this.props.onMouseLeave },
        React.createElement(
          "video",
          { muted: this.props.isActive ? false : "muted", className: this.props.isActive ? "active" : "inactive" },
          React.createElement("source", { src: channels[this.props.index].concat(".mp4"), type: "video/mp4" })
        )
      );
    }
  }]);

  return Channel;
}(React.Component);

var Grid = function (_React$Component2) {
  _inherits(Grid, _React$Component2);

  function Grid(props) {
    _classCallCheck(this, Grid);

    var _this3 = _possibleConstructorReturn(this, (Grid.__proto__ || Object.getPrototypeOf(Grid)).call(this, props));

    _this3.state = {
      activeIndex: null
    };
    _this3.handleMouseEnter = _this3.handleMouseEnter.bind(_this3);
    _this3.handleMouseLeave = _this3.handleMouseLeave.bind(_this3);
    _this3.handleKeyPress = _this3.handleKeyPress.bind(_this3);
    return _this3;
  }

  _createClass(Grid, [{
    key: "handleMouseEnter",
    value: function handleMouseEnter(index) {
      this.setState({
        activeIndex: index
      });
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave() {
      this.setState({
        activeIndex: null
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener("keydown", this.handleKeyPress);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyPress);
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(e) {
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
  }, {
    key: "renderChannel",
    value: function renderChannel(i) {
      return React.createElement(Channel, {
        index: i,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        isActive: this.state.activeIndex === i });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "grid" },
        React.createElement(
          "div",
          { className: "grid-header" },
          "Move cursor or use keyboard arrows to change channels."
        ),
        this.renderChannel(0),
        this.renderChannel(1),
        this.renderChannel(2),
        this.renderChannel(3),
        this.renderChannel(4),
        this.renderChannel(5),
        this.renderChannel(6),
        this.renderChannel(7),
        this.renderChannel(8)
      );
    }
  }]);

  return Grid;
}(React.Component);

var App = function (_React$Component3) {
  _inherits(App, _React$Component3);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement(Grid, null);
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
