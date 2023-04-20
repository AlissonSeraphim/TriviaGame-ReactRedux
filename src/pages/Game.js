import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    token: '',
  };

  async componentDidMount() {
    const { history } = this.props;
    const { token } = this.state;
    const getToken = localStorage.getItem('token');
    // const parseToken = JSON.parse(getToken);
    this.setState({
      token: { getToken },
    });
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await response.json();
      const expiredError = 3;
      if (data.response_code === expiredError) {
        localStorage.removeItem(token);
        history.push('/');
      }
    } catch (error) {
      console.log('There was an error', error);
    }
    // console.log(data);
  }

  render() {
    return (
      <div>
        <Header />
        <span data-testid="question-category">Categoria</span>
        <span data-testid="question-text">Pergunta</span>
        {/* map pras respostas - botões <button/> */}
        {/* <span data-testid="answer-options"></span> */}
        {/* a alternativa correta deve conter o data-testid="correct-answer" as alternativas incorretas devem conter o data-testid wrong-answer-${index}, com ${index} iniciando com o valor 0 */}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Game;
