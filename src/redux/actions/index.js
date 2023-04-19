// Types

export const GET_TOKEN = 'GET_TOKEN';

// Creators
export const tokenAction = (token) => ({
  type: GET_TOKEN,
  payload: token,
});

// Thunk Creators
export function fetchToken() {
  console.log('fui chamado ?!');
  const BASE_URL = 'https://opentdb.com/api_token.php?command=request';
  return async () => {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data);
    const { token } = data;

    if (token) {
      console.log(token);
      localStorage.setItem('token', token);
    }
  };
}
