import { createStore, action } from 'easy-peasy';
import addComplexityScoreToDrinks from './helpers/addComplexityScore';

export const store = createStore({
  cocktails: {
    cocktailList: [],
    setCocktailList: action((state, payload) => {
      state.cocktailList = addComplexityScoreToDrinks(payload);
    }),

    term: '',
    searchTerm: action((state, payload) => {
      state.term = payload;
    }),
  },
  menu: {
    isOpen: false,
    openMenu: action((state, payload) => {
      state.isOpen = true;
    }),
    closeMenu: action((state, payload) => {
      state.isOpen = false;
    }),
  },
  usersList: {
    users: [],
    setUsers: action((state, payload) => {
      state.users = payload;
    }),
  },
});
