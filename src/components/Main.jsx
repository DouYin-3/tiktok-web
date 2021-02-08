import React, { Component } from 'react'

import {Route, Redirect} from 'react-router-dom'
import Video from './mainView/Video'
import TableBar from "./mainView/TableBar";
import Profile from './mainView/Profile'
import {CacheSwitch, CacheRoute} from 'react-router-cache-route';

import '../assets/css/style.css'

export default class Main extends Component {
    render() {
        return (
            <div>
                <CacheSwitch>
                    <Route  path = "/profile" component = {Profile} />
                    <CacheRoute  path = "/" component = {Video} />
                    <Redirect to="/"></Redirect> 
                </CacheSwitch>
                <TableBar></TableBar>
            </div>
        )
    }
}
