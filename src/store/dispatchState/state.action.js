import stateType from './state.type';

export default {
  setPelanggan: (payload) => {
    return (dispatch) => {
      dispatch({ type: stateType.SET_PELANGGAN, payload });
    };
  },
  reset: () => {
    return (dispatch) => {
      dispatch({ type: stateType.RESET });
    };
  },
};
