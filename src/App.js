import React from 'react';
import './App.css';
import Header from './components/header/Header'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path='/home' component={Home} />
        </Switch>
    </div>
  );
}

export default App;
