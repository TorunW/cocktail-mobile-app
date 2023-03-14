"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _native = require("@react-navigation/native");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FocusedStatusBar = function FocusedStatusBar() {
  var isFocused = (0, _native.useIsFocused)();
  return;
};

var _default = FocusedStatusBar;
exports["default"] = _default;