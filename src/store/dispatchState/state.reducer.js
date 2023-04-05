import stateType from './state.type';

const initialState = {
  pelanggan: {},
};

function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case stateType.SET_PELANGGAN:
      return {
        ...state,
        pelanggan: payload,
      };
    case stateType.RESET:
      return initialState;
    default:
      return state;
  }
}

export default reducer;
