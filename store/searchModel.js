import { action } from 'easy-peasy';

export default search = {
  ingredientSearch: [],
  setIngredientSearch: action((state, payload) => {
    state.ingredientSearch = payload;
  }),
  filteredIngredients: [],
  setFilteredIngredients: action((state, payload) => {
    state.filteredIngredients = payload;
  }),
  filteredDrinks: [],
  setFilteredDrinks: action((state, payload) => {
    state.filteredDrinks = payload;
  }),
  alphabeticallyOrder: '',
  setAlphabeticallyOrder: action((state, payload) => {
    state.alphabeticallyOrder = payload;
  }),
  popularityOrder: '',
  setPopularityOrder: action((state, payload) => {
    state.popularityOrder = payload;
  }),
};
