import { createStore, action } from 'easy-peasy';

export default drinks = {
  drinkList: [],
  setDrinkList: action((state, payload) => {
    state.drinkList = payload;
  }),
  ingredients: [],
  setIngredients: action((state, payload) => {
    state.ingredients = payload;
  }),
  ingredientsToDrink: [],
  setIngredientsToDrink: action((state, payload) => {
    state.ingredientsToDrink = payload;
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
