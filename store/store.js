import { createStore } from 'easy-peasy';
import drinkModel from './drinkModel';
import userModel from './userModel';

export const store = createStore({
  drinks: drinkModel,
  users: userModel,
});
