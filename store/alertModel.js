import { action } from 'easy-peasy';

export default alertModel = {
  isAlertVisible: false,
  setIsAlertVisible: action((state, payload) => {
    state.isAlertVisible = payload;
  }),
};
