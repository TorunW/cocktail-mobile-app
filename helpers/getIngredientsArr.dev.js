"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = getIngredientsArr = function getIngredientsArr(data) {
  var keysArr = Object.keys(data);
  var startIndexIngred = keysArr.findIndex(function (item) {
    return item === 'strIngredient1';
  });
  var lastIndexIngred = keysArr.findIndex(function (item) {
    return item === 'strIngredient15';
  });
  var valuesArr = Object.values(data);
  var ingrArr = [];
  valuesArr.filter(function (item, index) {
    if (index >= startIndexIngred && index <= lastIndexIngred && item !== null) {
      ingrArr.push(item);
    }
  });
  return ingrArr;
};

exports["default"] = _default;