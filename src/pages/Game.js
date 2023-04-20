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
    timeout: false,
    timer: 0,
  };

  componentDidMount() {
    this.checkExpired();
  }

  setTimer = () => {
    const timeToAnswer = 30000;
    this.setState({
      timer: setTimeout(() => {
        this.setState({ timeout: true });
      }, timeToAnswer),
    });
  };

  setTimerQuestion = () => {
    const { timer } = this.state;
    clearTimeout(timer);
    this.setTimer();
  };

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
      }, () => this.questions(), this.setTimer());
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
    // this.setState({ wrongAnswer: incorrect[contador] });
    const right = results.map((element) => element.correct_answer);
    this.setState({ rightAnswer: right[contador] });
    const allAnswers = [];
    allAnswers.push(...incorrect[contador]);
    allAnswers.push(right[contador]);
    this.shuffle(allAnswers);
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

  render() {
    const { rightAnswer, categories, allAnswers, question, timeout, timer } = this.state;
    return (
      <div>
        <Header />
        <div>
          Countdown:
          {timer}
        </div>
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
                  this.setTimerQuestion();
                } }
                disabled={ timeout }
              >
                {e}
              </button>)
            : (
              <button
                data-testid={ `wrong-answer-${index}` }
                key={ index }
                onClick={ () => {
                  this.questions();
                  this.setTimerQuestion();
                } }
                disabled={ timeout }
              >
                {e}
              </button>)))}
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
