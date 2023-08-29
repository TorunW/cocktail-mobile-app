"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyPeasy = require("easy-peasy");

var _default = alertModel = {
  isAlertVisible: false,
  setIsAlertVisible: (0, _easyPeasy.action)(function (state, payload) {
    state.isAlertVisible = payload;
  })
};

exports["default"] = _default;