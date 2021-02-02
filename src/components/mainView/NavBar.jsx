import React, { Component } from 'react'

export default class NavBar extends Component {
    render() {
        return (
            <div className = "NavBar">
                <div className = "live">直播</div>
                <div className = "pick">关注</div>
                <div className = "search">搜索</div>
            </div>
        )
    }
}
