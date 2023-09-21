import { createStore, action } from 'easy-peasy';

export default drinks = {
  drinkList: [],
  setDrinkList: action((state, payload) => {
    state.drinkList = payload;
  }),
  isSaved: false,
  setIsSaved: action((state, payload) => {
    state.ingredients = payload;
  }),
  ingredients: [],
  setIngredients: action((state, payload) => {
    state.ingredients = payload;
  }),
  ingredientsToDrink: [],
  setIngredientsToDrink: action((state, payload) => {
    state.ingredientsToDrink = payload;
  }),
  instructionsToDrink: [],
  setInstructionsToDrink: action((state, payload) => {
    state.instructionsToDrink = payload;
  }),
  image: '',
  setImage: action((state, payload) => {
    state.image = payload;
  }),
  rating: null,
  setRating: action((state, payload) => {
    state.rating = payload;
  }),
  initalStarCount: 0,
  setInitalStarCount: action((state, payload) => {
    state.initalStarCount = payload;
  }),
};
