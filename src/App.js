import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import { Settings } from './pages/Settings';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/games" component={ Game } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default App;
