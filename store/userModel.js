import { action } from 'easy-peasy';

export default users = {
  userList: [],
  setUserList: action((state, payload) => {
    state.userList = payload;
  }),
  toggleForm: 'login',
  setToggleForm: action((state, payload) => {
    state.toggleForm = payload;
  }),
  currentUser: { token: null, email: null, id: null, likes: null },
  setCurrentUser: action((state, payload) => {
    state.currentUser = payload;
  }),
  toggleLike: false,
  setToggleLike: action((state, payload) => {
    state.toggleLike = payload;
  }),
};
