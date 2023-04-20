// Types

export const GET_TOKEN = 'GET_TOKEN';

// Creators
export const tokenAction = (token) => ({
  type: GET_TOKEN,
  payload: token,
});
