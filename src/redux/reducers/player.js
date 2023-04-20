// actions;
import { USER_REQUEST } from '../actions';

// reducers
const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_REQUEST:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };

  default:
    return state;
  }
};

export default player;
