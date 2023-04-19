import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchToken } from '../redux/actions';

class Login extends React.Component {
  state = {
    emailInput: '',
    userInput: '',
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

  tokenRequest = async () => {
    const { history, dispatch } = this.props;
    await dispatch(fetchToken());

    history.push('/game');
  };

  render() {
    const {
      emailInput,
      userInput,
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
              onClick={ this.tokenRequest }

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
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

// const mapStateToProps = (state) => ({
//   name: state.player.name,
// });
export default connect()(Login);
