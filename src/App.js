import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import SignIn from './components/signIn/SignIn'

function App() {
  return (
    <div className="App">
        <Switch>
          <Route exact path ='/signin' component={SignIn} />
          <Route exact path='/' component={Home} />
          <Route path ='/product'
        </Switch>
    </div>
  );
}

export default App;
