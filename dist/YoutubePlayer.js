'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _YTPlayer = require('./YTPlayer');

var _YTPlayer2 = _interopRequireDefault(_YTPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YoutubePlayer = function (_Component) {
    _inherits(YoutubePlayer, _Component);

    function YoutubePlayer(props) {
        _classCallCheck(this, YoutubePlayer);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.props = props;
        _this.state = props;
        _this.player;
        _this.startAt = _this.props.startAt;
        _this.id = _this.generateUid();
        _this.code = _this.props.code;
        return _this;
    }

    YoutubePlayer.prototype.componentDidMount = function componentDidMount() {
        this.player = new _YTPlayer2.default(this.id, this.props.code, this.props.options, this.props);
    };

    YoutubePlayer.prototype.componentDidUpdate = function componentDidUpdate() {
        switch (this.props.currentState) {
            case "play":
                this.player.play();
                break;
            case "pause":
                this.player.pause();
                break;
            case "stop":
                this.player.stop();
                break;
        }
        if (this.code != this.props.code) {
            this.code = this.props.code;
            this.player.play(this.code);
        }
        if (this.startAt != this.props.startAt) {
            this.startAt = this.props.startAt;
            this.player.seekTo(this.startAt);
        }
    };

    YoutubePlayer.prototype.generateUid = function generateUid(separator) {
        var delim = separator || "-";

        function S4() {
            return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
        }

        return S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4();
    };

    YoutubePlayer.prototype.render = function render() {
        return _react2.default.createElement('div', { id: this.id });
    };

    return YoutubePlayer;
}(_react.Component);

exports.default = YoutubePlayer;