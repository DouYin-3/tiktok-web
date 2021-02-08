import React, { Component } from 'react'
import '../../assets/css/login.css';
import { InputItem, Toast } from 'antd-mobile';

export default class login extends Component {
    state = {
        hasError: false,
        userInfo: {
            userName: '',
            password: "",
        }
    }
    goBack = () => {
        let { history } = this.props
            history.go(-1)
    }
    onErrorClick = () => {
        if (this.state.hasError) {
          Toast.info('请输入6位及以上密码');
        }
      }
    onChange = (value) => {
        if (value.replace(/\s/g, '').length < 6) {
            this.setState({
            hasError: true,
            });
        } else {
            this.setState({
            hasError: false,
            });
        }
        this.setState({
            userInfo: {
                password: value,
            }
        });
    }
    onChangeName = (value) => {
        value = value.trim();
        this.setState({
            userInfo: {
                userName: value,
            }
        });
    }
    login = () => {
        console.log('登录')
    }
    render() {
        return (
            <div className = "login">
                <div className="loginTop">
                    <div className='return' onClick={this.goBack}>返回</div>
                    <div>帮助</div>
                </div>
                <div className="loginCont">
                    <p>邮箱密码登录</p>
                    <InputItem onChange={this.onChangeName} className = "input" type="text" placeholder="请输入用户名"/>
                    <InputItem
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange}
                        value={this.state.userInfo.password}
                        className="input" type="password" placeholder="请输入密码" />
                    <div className = "tip">未注册的用户名验证通过后将自动注册</div>
                    <div className="submit" onClick={this.login}>登录</div>
                </div>
            </div>
        )
    }
}
