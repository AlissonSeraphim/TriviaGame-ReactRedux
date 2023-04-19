// Types

export const GET_TOKEN = 'GET_TOKEN';

// Creators
export const tokenAction = (token) => ({
  type: GET_TOKEN,
  payload: token,
});

// Thunk Creators
export function fetchToken() {
  const BASE_URL = 'https://opentdb.com/api_token.php?command=request';
  return async (dispatch) => {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data);
    const { token } = data;

    if (token) {
      console.log(token);
      const tokenLocalStorage = JSON.stringify(token);
      localStorage.setItem('token', tokenLocalStorage);
    }

    dispatch(tokenAction(token));
  };
}
