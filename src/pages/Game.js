import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    token: '',
    results: [],
    contador: 0,
    categories: [],
    question: '',
    rightAnswer: '',
    allAnswers: [],
    needNext: false,
  };

  componentDidMount() {
    this.checkExpired();
  }

  checkExpired = async () => {
    const { history } = this.props;
    const { token } = this.state;
    try {
      console.log('b');
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${localStorage.getItem('token')}`);
      const data = await response.json();
      const expiredError = 3;
      if (data.response_code === expiredError) {
        localStorage.removeItem(token);
        history.push('/');
      }
      this.setState({
        results: data.results,
      }, () => this.questions());
    } catch (error) {
      console.log('There was an error', error);
    }
  };

  refreshCounter = () => {
    const { contador } = this.state;
    this.setState({ contador: contador + 1 });
  };

  questions = () => {
    const { contador, results } = this.state;
    const category = results.map((element) => element.category);
    this.setState({ categories: category[contador] });
    const questions = results.map((element) => element.question);
    this.setState({ question: questions[contador] });
    const incorrect = results.map((element) => element.incorrect_answers);
    const right = results.map((element) => element.correct_answer);
    this.setState({ rightAnswer: right[contador] });
    const allAnswerss = [];
    allAnswerss.push(...incorrect[contador]);
    allAnswerss.push(right[contador]);
    this.shuffle(allAnswerss);
    this.refreshCounter();
  };

  shuffle = (array) => {
    array.forEach((_, i) => {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    });
    return this.setState({
      allAnswers: array });
  };

  includesNext = () => {
    this.setState({ needNext: true });
  };

  render() {
    const {
      rightAnswer,
      categories,
      allAnswers,
      question,
      needNext,
    } = this.state;

    return (
      <div>
        <Header />
        <span data-testid="question-category">{categories}</span>

        <div>
          <span data-testid="question-text">{ question }</span>
        </div>
        <div data-testid="answer-options">
          {allAnswers.map((e, index) => (rightAnswer === e
            ? (
              <button
                data-testid="correct-answer"
                key={ index }
                onClick={ () => {
                  this.questions();
                  this.includesNext();
                } }
              >
                {e}
              </button>)
            : (
              <button
                data-testid={ `wrong-answer-${index}` }
                key={ index }
                onClick={ () => {
                  this.questions();
                  this.includesNext();
                } }
              >
                {e}
              </button>)))}
          { needNext
          && (
            <button
              data-testid="btn-next"
              onClick={ this.questions }
            >
              Next Button
            </button>
          )}
        </div>
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
