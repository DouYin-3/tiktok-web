
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import "./assets/css/normalize.css";
import "./assets/icofont/iconfont.css";
import Main from './components/Main'
import Login from './components/login/login'

import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={Main} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
