import { action } from 'easy-peasy';

export default users = {
  userList: [],
  setUsers: action((state, payload) => {
    state.userList = payload;
  }),
  toggleForm: 'login',
  setToggleForm: action((state, payload) => {
    state.toggleForm = payload;
  }),
  storageData: { token: null, email: null, id: null },
  setStorageData: action((state, payload) => {
    state.storageData = payload;
  }),
};
