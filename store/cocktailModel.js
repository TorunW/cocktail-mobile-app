import { createStore, action } from 'easy-peasy';

export default cocktails = {
  cocktailList: [],
  setCocktailList: action((state, payload) => {
    state.cocktailList = payload;
  }),
  ingredients: [],
  setIngredients: action((state, payload) => {
    state.ingredients = payload;
  }),
  image: '',
  setImage: action((state, payload) => {
    state.image = payload;
  }),
  term: '',
  searchTerm: action((state, payload) => {
    state.term = payload;
  }),
};
