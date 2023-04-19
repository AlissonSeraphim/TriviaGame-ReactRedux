// actions;
import { GET_TOKEN } from '../actions';

// reducers
const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  tokenTest: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return {
      ...state,
      tokenTest: action.payload,
    };

  default:
    return state;
  }
};

export default player;
