"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = void 0;

var _easyPeasy = require("easy-peasy");

var _drinkModel = _interopRequireDefault(require("./drinkModel"));

var _userModel = _interopRequireDefault(require("./userModel"));

var _searchModel = _interopRequireDefault(require("./searchModel"));

var _alertModel = _interopRequireDefault(require("./alertModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = (0, _easyPeasy.createStore)({
  drinks: _drinkModel["default"],
  users: _userModel["default"],
  search: _searchModel["default"],
  alert: _alertModel["default"]
});
exports.store = store;