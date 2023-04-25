import { createStore, action } from 'easy-peasy';
import addComplexityScoreToDrinks from '../helpers/addComplexityScore';
import cocktailModel from './cocktailModel';
import userModel from './userModel';

export const store = createStore({
  cocktails: cocktailModel,
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
