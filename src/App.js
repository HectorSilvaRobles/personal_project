import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import SignIn from './components/signIn/SignIn'
import ProductPage from './components/ProductPage/ProductPage'



const Child = ({match}) => {
  console.log(match)
  return (
    <div>
      
      <ProductPage />
    </div>
  )
}

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      productId: null
    }
  }
  
  render(){
    return (
      <div className="App">
          <Switch>
            <Route exact path ='/signin' component={SignIn} />
            <Route exact path='/' component={Home} />
            <Route path ='/product/:id' component={ProductPage} />
            <Route path ='*' render= {()=> {
              return <div>Sorry the page you are looking for does not exist</div>
            }} />
          </Switch>
      </div>
    );
  }
}

export default App;
