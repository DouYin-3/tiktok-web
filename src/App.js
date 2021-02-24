
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import "./assets/icofont/iconfont.css";
import Main from './components/Main'
import Login from './pages/login'
import Live from './pages/Live'
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/live" component={Live} />
            <Route path="/" component={Main} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
