import * as types from '../types';

const INITIAL_STATE = {
  usuarioLogado: false,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST: {
      return state;
    }
    case types.LOGIN_SUCCESS: {
      const newState = { ...state, usuarioLogado: !state.usuarioLogado }; // fazendo uma cópia do state
      // const newState = { ...state };  fazendo uma cópia do state
      // newState.usuarioLogado = !newState.usuarioLogado;
      return newState;
    }
    case types.LOGIN_FAILURE: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
