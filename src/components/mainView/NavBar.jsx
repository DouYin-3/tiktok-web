import React, { Component } from 'react'

export default class NavBar extends Component {
    render() {
        return (
            <div className = "NavBar">
                <i  className="live iconfont icon-zhibo" />
                
                <div className = "pick">关注</div>
                <i className="search iconfont icon-sousuo" />
            </div>
        )
    }
}
