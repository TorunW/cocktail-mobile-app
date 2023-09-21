"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyPeasy = require("easy-peasy");

var _default = drinks = {
  drinkList: [],
  setDrinkList: (0, _easyPeasy.action)(function (state, payload) {
    state.drinkList = payload;
  }),
  isSaved: false,
  setIsSaved: (0, _easyPeasy.action)(function (state, payload) {
    state.ingredients = payload;
  }),
  ingredients: [],
  setIngredients: (0, _easyPeasy.action)(function (state, payload) {
    state.ingredients = payload;
  }),
  ingredientsToDrink: [],
  setIngredientsToDrink: (0, _easyPeasy.action)(function (state, payload) {
    state.ingredientsToDrink = payload;
  }),
  instructionsToDrink: [],
  setInstructionsToDrink: (0, _easyPeasy.action)(function (state, payload) {
    state.instructionsToDrink = payload;
  }),
  image: '',
  setImage: (0, _easyPeasy.action)(function (state, payload) {
    state.image = payload;
  }),
  rating: null,
  setRating: (0, _easyPeasy.action)(function (state, payload) {
    state.rating = payload;
  }),
  initalStarCount: 0,
  setInitalStarCount: (0, _easyPeasy.action)(function (state, payload) {
    state.initalStarCount = payload;
  })
};

exports["default"] = _default;