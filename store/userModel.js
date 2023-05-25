import { action } from 'easy-peasy';

export default users = {
  userList: [],
  setUsers: action((state, payload) => {
    state.userList = payload;
  }),
  loggedinUser: {},
  setLoggedinUser: action((state, payload) => {
    state.loggedinUser = payload;
  }),
  toggleForm: 'login',
  setToggleForm: action((state, payload) => {
    state.toggleForm = payload;
  }),
};
