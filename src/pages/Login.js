import React from 'react';

export class Login extends React.Component {
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

  render() {
    const {
      emailInput,
      userInput,
    } = this.state;

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
                // history.push('/carteira');
              } }

            >
              Play
            </button>
          </div>
        </form>
      </div>
    );
  }
}
