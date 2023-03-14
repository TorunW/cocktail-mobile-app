"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _calculateComplexity = _interopRequireDefault(require("./calculateComplexity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function addComplexityScoreToDrinks(drinks) {
  var highestInstructionLength = 0;
  drinks.forEach(function (drink, index) {
    if (drink.strInstructions !== null && drink.strInstructions.length > highestInstructionLength) {
      highestInstructionLength = drink.strInstructions.length;
    }
  }); // MAPPING

  var newDrinks = drinks.map(function (orgDrink, index) {
    return _objectSpread({}, orgDrink, {
      complexity: (0, _calculateComplexity["default"])(orgDrink)
    });
  });
  return newDrinks;
}

var _default = addComplexityScoreToDrinks;
exports["default"] = _default;