import React, { Component } from 'react'

import { Redirect} from 'react-router-dom'
import Video from '../pages/Video'
import TableBar from "./mainView/TableBar";
import Profile from '../pages/Profile'
import {CacheSwitch, CacheRoute} from 'react-router-cache-route';

import '../assets/css/style.css'

export default class Main extends Component {
    // constructor(props, ...args) {
    //     super(props, ...args)
    //     props.cacheLifecycles.didCache(this.componentDidCache)
    //     props.cacheLifecycles.didRecover(this.componentDidRecover)
    // }
    // state = {
    //     isCached: false
    // }
    // //跳转暂停
    // componentDidCache = () => {
    // this.setState({ isCached: true })
    // }
    // componentDidRecover = () => {
    // this.setState({ isCached: false })
    // console.log("123")
    // }
    render() {
        return (
            <div>
                <CacheSwitch>
                    <CacheRoute  path = "/profile" component = {Profile} />
                    {/* <CacheRoute path="/" isCached={this.state.isCached} component={Video} /> */}
                    <CacheRoute   path = "/"  component = {Video} />
                    <Redirect to="/"></Redirect> 
                </CacheSwitch>
                <TableBar></TableBar>
            </div>
        )
    }
}
