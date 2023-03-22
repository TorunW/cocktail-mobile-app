"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _default = getIngredientsArr = function getIngredientsArr(data) {
  var keysArr = Object.keys(data);
  var startIndexMeasure = keysArr.findIndex(function (item) {
    return item === 'strMeasure1';
  });
  var lastIndexMeasure = keysArr.findIndex(function (item) {
    return item === 'strMeasure15';
  });
  var valuesArr = Object.values(data);
  var measArr = [];
  valuesArr.filter(function (item, index) {
    if (index >= startIndexMeasure && index <= lastIndexMeasure && item !== null) {
      measArr.push(item);
    }
  });
  return measArr;
};

exports["default"] = _default;