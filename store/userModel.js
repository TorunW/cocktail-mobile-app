import { action } from 'easy-peasy';

export default users = {
  userList: [],
  setUserList: action((state, payload) => {
    state.userList = payload;
  }),
  toggleForm: 'login',
  setToggleForm: action((state, payload) => {
    state.toggleForm = payload;
  }),
  currentUser: {
    token: null,
    email: null,
    id: null,
    savedRecipe: null,
    ratedDrinks: null,
  },
  setCurrentUser: action((state, payload) => {
    state.currentUser = payload;
  }),
  toggleSavedRecipe: false,
  setToggleSavedRecipe: action((state, payload) => {
    state.toggleSavedRecipe = payload;
  }),
  settingsIsOpen: false,
  setSettingsIsOpen: action((state, payload) => {
    state.settingsIsOpen = payload;
  }),
};
