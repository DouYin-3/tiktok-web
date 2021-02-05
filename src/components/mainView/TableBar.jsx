import React, { Component } from 'react'

import {Link, withRouter} from 'react-router-dom'
class TableBar extends Component {
    render() {
        return (
            <div className = "TabBar">
                <Link className = "home n" to = "/">首页</Link>
                <div className = "friend n">朋友</div>
                <div className = "message n">消息</div>
                <Link  className = "profile n" to = "/profile">我</Link>
            </div>
        )
    }
}

export default withRouter(TableBar)
