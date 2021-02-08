import React, { Component } from 'react'
import "../../assets/css/profile.css";
import img from "../../assets/img/bj.png";
import avatar from "../../assets/img/avatar.jpg";
export default class Profile extends Component {

    state = {
        userInfo: {
            id: 1,
            userName: '唐堂长',
            avatar: avatar,
        }
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
                        <div className="friends">朋友</div>
                    </div>
                    <div className="introduction">
                        这个人很懒什么简介都没有填
                    </div>
                </div>
                
            </div>
        )
    }
}
