import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { scoreSum } from '../redux/actions';

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
    needNext: false,
    seconds: 30,
  };

  componentDidMount() {
    this.checkExpired();
  }

  setTimer = () => {
    const timeout = 1000;
    const timer = setInterval(() => {
      const { seconds } = this.state;
      if (seconds > 0) {
        this.setState({ seconds: seconds - 1 });
      }
      if (seconds === 0) {
        console.log('h');
        clearInterval(timer);
        this.setState({ timeout: true });
      }
    }, timeout);
  };

  setTimerQuestion = () => {
    const { seconds } = this.state;

    if (seconds > 0) { this.setState({ seconds: 30 }); }

    if (seconds === 0) {
      this.setState({ seconds: 30, timeout: false }, this.setTimer());
    }
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

  includesNext = () => {
    this.setState({ needNext: true });
  };

  verifyNumberQuestions = () => {
    const { contador } = this.state;
    const { history } = this.props;

    const maxQuestionsAnswer = 5;

    if (contador < maxQuestionsAnswer) {
      this.questions();
    }

    if (contador === maxQuestionsAnswer) {
      history.push('/feedback');
    }
  };

  answerClick = () => {
    const { contador, seconds, results } = this.state;
    const { dispatch } = this.props;
    const calculateScore = (difficulty, secondsLeft) => {
      const levels = {
        easy: 1,
        medium: 2,
        hard: 3,
      };
      const correctAnswer = 10;
      console.log(secondsLeft);
      return (
        correctAnswer + (levels[difficulty] * (secondsLeft))
      );
    };
    const TOTAL = calculateScore(results[contador].difficulty, seconds);
    dispatch(scoreSum(TOTAL));
  };

  render() {
    const {
      rightAnswer,
      categories,
      allAnswers,
      question,
      needNext,
      timeout,
      seconds,
    } = this.state;

    // const { history } = this.props;

    console.log(rightAnswer);
    console.log(question);

    return (
      <div>
        <Header />
        <div>
          Countdown:
          {seconds}

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
                  this.includesNext();
                  this.answerClick();
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
                  this.includesNext();
                } }
                disabled={ timeout }
              >
                {e}
              </button>)))}
          { (needNext)
          && (
            <button
              data-testid="btn-next"
              onClick={ () => {
                this.verifyNumberQuestions();
                this.setTimerQuestion();
              } }
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

export default connect()(Game);
