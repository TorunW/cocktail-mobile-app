import { createStore } from 'easy-peasy';
import drinkModel from './drinkModel';
import userModel from './userModel';
import searchModel from './searchModel';

export const store = createStore({
  drinks: drinkModel,
  users: userModel,
  search: searchModel,
});
