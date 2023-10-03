"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easyPeasy = require("easy-peasy");

var _default = users = {
  userList: [],
  setUserList: (0, _easyPeasy.action)(function (state, payload) {
    state.userList = payload;
  }),
  toggleForm: 'login',
  setToggleForm: (0, _easyPeasy.action)(function (state, payload) {
    state.toggleForm = payload;
  }),
  currentUser: {
    token: null,
    username: null,
    email: null,
    id: null,
    savedRecipe: null,
    ratedDrinks: null
  },
  setCurrentUser: (0, _easyPeasy.action)(function (state, payload) {
    state.currentUser = payload;
  }),
  toggleSavedRecipe: false,
  setToggleSavedRecipe: (0, _easyPeasy.action)(function (state, payload) {
    state.toggleSavedRecipe = payload;
  }),
  settingsIsOpen: false,
  setSettingsIsOpen: (0, _easyPeasy.action)(function (state, payload) {
    state.settingsIsOpen = payload;
  })
};

exports["default"] = _default;