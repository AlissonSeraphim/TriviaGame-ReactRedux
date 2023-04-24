import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  state = {
    feedbackMessage: '',
  };

  componentDidMount() {
    const { assertions } = this.props;
    const changeMessage = 3;
    if (assertions < changeMessage) {
      this.setState({
        feedbackMessage: 'Could be better...',
      });
    } else {
      this.setState({
        feedbackMessage: 'Well Done!',
      });
    }
  }

  render() {
    const { feedbackMessage } = this.state;
    const { assertions, score, history } = this.props;
    return (
      <div>
        <h1>feedback page</h1>
        <Header />
        <div data-testid="feedback-text">{ feedbackMessage }</div>
        <div data-testid="feedback-total-score">{ score }</div>
        <div data-testid="feedback-total-question">{ assertions }</div>
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
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,

});

export default connect(mapStateToProps)(Feedback);
