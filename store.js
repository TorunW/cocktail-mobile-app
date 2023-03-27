import { createStore, action } from 'easy-peasy';

export const store = createStore({
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
