import React, { Component } from 'react'

import {withRouter} from 'react-router-dom'
export default  withRouter(class NavBar extends Component {
	goLive = () => {
		let { history } = this.props
	history.push({pathname: '/live'}) 
	}
	render() {
		return (
			<div className = "NavBar">
				<i onClick = {this.goLive}  className="live iconfont icon-zhibo" />
				<div className = "pick">关注</div>
				<i className="search iconfont icon-sousuo" />
			</div>
		)
	}
})
