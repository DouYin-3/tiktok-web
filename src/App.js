
import {Route, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import "./assets/css/normalize.css";
import "./assets/icofont/iconfont.css";
import TableBar from './components/mainView/TableBar'
import Main from './components/Main';
import Profile from './components/mainView/Profile';

import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route  path = "profile" component = {Profile} />
            <Route  path = "/" component = {Main} />
            <Redirect to="/"></Redirect> 
          </Switch>
          <TableBar></TableBar>
        </BrowserRouter>
      </div>
    )
  }
}
