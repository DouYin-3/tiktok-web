import React, { Component } from 'react'

export default class TableBar extends Component {
    render() {
        return (
            <div className = "TabBar">
                <div className = "home">首页</div>
                <div className = "friend">朋友</div>
                <div className = "message">消息</div>
                <div className = "profile">我</div>
            </div>
        )
    }
}
