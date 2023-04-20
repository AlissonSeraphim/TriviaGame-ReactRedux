import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loading from '../components/Loading';

class Login extends React.Component {
  state = {
    emailInput: '',
    userInput: '',
    isFetching: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  verifyEntries = () => {
    const {
      emailInput,
      userInput,
    } = this.state;

    const emailRegex = /^\S+@\S+\.\S+$/;

    return !(emailRegex.test(emailInput)
    && userInput.length > 0);
  };

  fetchToken = async () => {
    const { history } = this.props;
    this.setState({ isFetching: true });
    console.log('fui chamado fetchToken ?!');
    const BASE_URL = 'https://opentdb.com/api_token.php?command=request';

    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();

      console.log(data.token);

      localStorage.setItem('token', data.token);
    } catch (error) {
      console.log('There was an error', error);
    }

    this.setState({ isFetching: false });

    history.push('/game');
  };

  render() {
    const {
      emailInput,
      userInput,
      isFetching,
    } = this.state;
    const { history } = this.props;
    // const { dispatch } = this.props;

    return (
      <div>
        <h1>Trivia</h1>
        <form onSubmit={ this.handleSubmit }>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="emailInput"
                placeholder="emailexample@gmail.com"
                data-testid="input-gravatar-email"
                value={ emailInput }
                onChange={ this.onInputChange }
                required
              />
            </label>
            <label>
              Nome:
              <input
                type="text"
                name="userInput"
                placeholder="Aderbaldo pereira"
                data-testid="input-player-name"
                value={ userInput }
                onChange={ this.onInputChange }
                required
              />
            </label>
            <button
              type="submit"
              name="submitButton"
              data-testid="btn-play"
              disabled={ this.verifyEntries() }
              onClick={ () => {
                this.fetchToken();
              } }

            >
              Play
            </button>
            <button
              data-testid="btn-settings"
              onClick={ () => {
                history.push('/settings');
              } }
            >
              Settings
            </button>
            { isFetching && <Loading /> }
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

// const mapStateToProps = (state) => ({
//   name: state.player.name,
// });
export default connect()(Login);
