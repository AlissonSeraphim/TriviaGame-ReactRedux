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
    if (response) {
      const data = await response.json();
      const { token } = data;
      console.log(token);
      localStorage.setItem('token', token);
    }
  };
}
