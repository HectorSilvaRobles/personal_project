import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import axios from 'axios'
import Home from './components/Home/Home'
import SignIn from './components/signIn/SignIn'
import ProductPage from './components/ProductPage/ProductPage'
import MyCart from './components/Cart/MyCart'
import {connect} from 'react-redux'
import {setUser} from './dux/reducer'
import ThankYou from './components/ThankYou/ThankYou'


class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      productId: null
    }
  }

  componentDidMount(){
    axios.get('/api/user').then(res => {
      this.props.setUser(res.data)
      console.log(this.props)
      console.log(res.data)
    })
  }
  
  render(){
    return (
      <div id="App">
          <Switch>
            <Route exact path ='/signin' component={SignIn} />
            <Route exact path='/' component={Home} />
            <Route path ='/product/:id' component={ProductPage} />
            <Route path='/my-cart' component={MyCart} />
            <Route path='/thank-you' component={ThankYou} />
            <Route path ='*' render= {()=> {
              return <div>Sorry the page you are looking for does not exist</div>
            }} />
          </Switch>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => {
  return reduxState
}

const myConnect = connect(mapStateToProps, {setUser})

export default myConnect(App);
