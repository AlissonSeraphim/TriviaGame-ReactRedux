import React from 'react';
import Header from '../components/Header';

export class Feedback extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="feedback-text">feedback page</h1>
        <Header />
      </div>
    );
  }
}
