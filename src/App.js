import React, { Component } from "react";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, Redirect } from 'react-router-dom';
import Logout from "./containers/Auth/Logout/Logout";

import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import asyncComponent from "./components/hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(()=> {
  return import('./containers/Checkout/Checkout');
});
const asyncOrder = asyncComponent(()=> {
  return import('./containers/Orders/Orders');
});
const asyncAuth = asyncComponent(()=> {
  return import('./containers/Auth/Auth');
});

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignIn();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrder} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>  
      )
    }
    return (
      <div>
        <Layout>
          {routes}        
        </Layout>
      </div>
    );
  }
  
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
