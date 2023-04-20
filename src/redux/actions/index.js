// Types

export const USER_REQUEST = 'GET_USER';

// Creators
export const userInfo = (email, userName) => ({
  type: USER_REQUEST,
  payload: {
    name: userName,
    gravatarEmail: email,
  },
});
