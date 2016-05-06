'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  className: _react.PropTypes.string,
  placeholder: _react.PropTypes.string,
  value: _react.PropTypes.string,
  onChange: _react.PropTypes.func
};

var defaultProps = {
  onChange: function onChange() {}
};

var AddressLookup = function (_Component) {
  _inherits(AddressLookup, _Component);

  function AddressLookup(props) {
    _classCallCheck(this, AddressLookup);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AddressLookup).call(this, props));

    _this.state = {
      value: props.value
    };

    (0, _utils.bind)(_this, ['onInputValueChange', 'onInputFocus', 'onPlaceChange', 'onPosition']);
    return _this;
  }

  _createClass(AddressLookup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.autocomplete = new google.maps.places.Autocomplete(this.refs.input, {
        types: ['address']
      });
      this.autocomplete.addListener('place_changed', this.onPlaceChange);
    }
  }, {
    key: 'onInputValueChange',
    value: function onInputValueChange(_ref) {
      var target = _ref.target;

      this.setState({ value: target.value });
    }
  }, {
    key: 'onInputFocus',
    value: function onInputFocus() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.onPosition);
      }
    }
  }, {
    key: 'onPosition',
    value: function onPosition(_ref2) {
      var coords = _ref2.coords;

      var circle = new google.maps.Circle({
        radius: coords.accuracy,
        center: {
          lat: coords.latitude,
          lng: coords.longitude
        }
      });
      this.autocomplete.setBounds(circle.getBounds());
    }
  }, {
    key: 'onPlaceChange',
    value: function onPlaceChange() {
      var place = this.autocomplete.getPlace();
      var type = function type(_ref3) {
        var types = _ref3.types;
        return types[0];
      };
      var reducer = function reducer(acc, component, i) {
        return _extends({}, acc, _defineProperty({}, (0, _utils.camelize)(type(component)), (0, _utils.camelizeKeys)(component)));
      };
      var result = place.address_components.reduce(reducer, {});
      this.props.onChange(result);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', { type: 'text',
        ref: 'input',
        className: this.props.className,
        placeholder: this.props.placeholder,
        onChange: this.onInputValueChange,
        onFocus: this.onInputFocus,
        value: this.state.value });
    }
  }]);

  return AddressLookup;
}(_react.Component);

exports.default = AddressLookup;