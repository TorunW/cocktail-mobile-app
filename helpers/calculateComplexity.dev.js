"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function calculateDrinkComplexity(drink) {
  var objectKeys = Object.keys(drink);
  var objectValues = Object.values(drink);
  var firstIndex = objectKeys.indexOf('strIngredient1');
  var lastIndex = objectKeys.indexOf('strIngredient15');
  var filteredIngredientArr = objectValues.filter(function (ingredient, index) {
    return index > firstIndex && index < lastIndex && ingredient !== null;
  });
  var ingredientScore;

  if (filteredIngredientArr.length <= 2) {
    ingredientScore = 1;
  } else if (filteredIngredientArr.length > 2 && filteredIngredientArr.length < 5) {
    ingredientScore = 2;
  } else if (filteredIngredientArr.length === 5) {
    ingredientScore = 3;
  }

  var instructionsLength = drink.strInstructions.length;
  var instructionScore;

  if (instructionsLength <= 150) {
    instructionScore = 1;
  } else if (instructionsLength > 150 && instructionsLength <= 300) {
    instructionScore = 2;
  } else if (instructionsLength > 300) {
    instructionScore = 3;
  }

  return ingredientScore + instructionScore / 2;
}

var _default = calculateDrinkComplexity;
exports["default"] = _default;