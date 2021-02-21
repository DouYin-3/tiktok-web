import React, { Component } from 'react'

import {Link, withRouter} from 'react-router-dom'
class TableBar extends Component {

    change = () => {
        let { history } = this.props
        if (localStorage.userInfo) {
		    history.push({pathname: '/profile'})
        } else {
            history.push({pathname: '/login'})
        }
    }
    render() {
        return (
            <div className = "TabBar">
                <Link className = "home n" to = "/">首页</Link>
                <div className = "friend n">朋友</div>
                <div className = "message n">消息</div>
                {/* <Link  className = "profile n" to = "/profile">我</Link> */}
                <div className="profile n" onClick={this.change}>我</div>
            </div>
        )
    }
}

export default withRouter(TableBar)
