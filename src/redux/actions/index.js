// Types
export const SCORE_SUM = 'SCORE_SUM';
export const USER_REQUEST = 'GET_USER';

// Creators
export const userInfo = (email, userName) => ({
  type: USER_REQUEST,
  payload: {
    name: userName,
    gravatarEmail: email,
  },
});

export const scoreSum = (payload) => ({
  type: SCORE_SUM,
  payload,
});
