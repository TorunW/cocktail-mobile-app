import { createStore, action } from 'easy-peasy';
import addComplexityScoreToDrinks from '../helpers/addComplexityScore';
import drinkModel from './drinkModel';
import userModel from './userModel';

export const store = createStore({
  drinks: drinkModel,
  users: userModel,
  menu: {
    isOpen: false,
    openMenu: action((state, payload) => {
      state.isOpen = true;
    }),
    closeMenu: action((state, payload) => {
      state.isOpen = false;
    }),
  },
});
