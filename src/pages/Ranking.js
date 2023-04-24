import React from 'react';
import PropTypes from 'prop-types';

export class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        <div>
          <button
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Tela Inicial
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
