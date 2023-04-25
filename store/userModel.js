import { action } from 'easy-peasy';

export default users = {
  userList: [],
  setUsers: action((state, payload) => {
    state.userList = payload;
  }),
};
