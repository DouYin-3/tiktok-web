import React, { Component } from 'react'
import "../assets/css/profile.css";
import img from "../assets/img/bj.png";
import avatar from "../assets/img/avatar.jpg";
import { Toast } from 'antd-mobile';
export default class Profile extends Component {
  state = {
    userInfo: {
      id: JSON.parse(localStorage.getItem('userInfo')).id,
      userName: JSON.parse(localStorage.getItem('userInfo')).userName,
      avatar: avatar,
    }
  }
  close = () => {
    localStorage.clear()
    Toast.info('退出成功');
    let { history } = this.props
    history.go(-1)
  }
  render() {
    return (
      <div className="user">
        <div className="uHeader">
          <img src={img} alt=""/>
        </div>
        <div className="uContent">
          <div className="userInfo">
            <div className="uAvatar">
              <div className="img">
                <img src={this.state.userInfo.avatar} alt="" />
              </div>
              <p>{this.state.userInfo.userName}</p>
            </div>
            <div className="editor">编辑资料</div>
            <div onClick={this.close} className="friends">退出登录</div>
          </div>
          <div className="introduction">
            这个人很懒什么简介都没有填
          </div>
        </div>
      </div>
    )
  }
}
