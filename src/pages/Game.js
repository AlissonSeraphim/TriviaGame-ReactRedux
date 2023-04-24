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

  // refreshCounter = () => {
  //   const { contador } = this.state;
  //   this.setState({ contador: contador + 1 }, this.verifyNumberQuestions());
  // };

  questions = () => {
    const { contador, results } = this.state;
    console.log(results);
    const category = results.map((element) => element.category);
    this.setState({ categories: category[contador] });
    const questions = results.map((element) => element.question);
    this.setState({ question: questions[contador] });
    console.log(contador);
    console.log(questions);
    const incorrect = results.map((element) => element.incorrect_answers);
    const right = results.map((element) => element.correct_answer);
    this.setState({ rightAnswer: right[contador] });
    const allAnswers = [];
    allAnswers.push(...incorrect[contador]);
    allAnswers.push(right[contador]);
    this.shuffle(allAnswers);
  };

  shuffle = (array) => {
    array.forEach((_, i) => {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    });
    return this.setState({
      allAnswers: array });
  };

  verifyNumberQuestions = () => {
    const { contador } = this.state;
    const { history } = this.props;

    const maxQuestionsAnswer = 4;

    if (contador < maxQuestionsAnswer) {
      this.setState(
        {
          needNext: false, timeout: false, contador: contador + 1 },
        () => this.questions(),
      );
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
      return (
        correctAnswer + (levels[difficulty] * (secondsLeft))
      );
    };
    console.log('sou a dificuldade:', results[contador].difficulty);
    const TOTAL = calculateScore(results[contador].difficulty, seconds);
    dispatch(scoreSum(TOTAL));
  };

  selectAnswer = () => {
    this.setState({ needNext: true });
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
      contador,
    } = this.state;

    const { history } = this.props;

    console.log(rightAnswer);
    console.log(question);
    console.log(contador);

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
                  this.setTimerQuestion();
                  this.selectAnswer();
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
                  this.setTimerQuestion();
                  this.selectAnswer();
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
                this.setTimerQuestion();
                this.verifyNumberQuestions();
              } }
            >
              Next
            </button>
          )}
          <button
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
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
