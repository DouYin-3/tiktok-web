import React, { Component } from 'react'
import '../../assets/css/login.css';
import { InputItem, Toast } from 'antd-mobile';

export default class login extends Component {
  state = {
    isLogin :true,
    hasError: false,
    emailError: false,
    userInfo: {
      userEmail: "",
      userName: '',
      password: "",
    },
    register: {
      userEmail: "",
      userName: '',
      password: "",
      code: null,
    }
  }
  goBack = () => {
    let { history } = this.props
    history.go(-1)
  }
  onErrorPassword = () => {
    if (this.state.hasError) {
      Toast.info('请输入6位及以上密码');
    }
  }
  onErrorEmail = () => {
    if (this.state.emailError) {
      Toast.info('请输入正确格式的邮箱');
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
    if (this.state.isLogin) {
      this.setState({
        userInfo: {
          password: value,
        }
      });
    } else {
      this.setState({
        register: {
          password: value,
        }
      });
    }
    
  }
  onChangeEmail = (value) => {
    value = value.trim();
    var reg =  /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
		if(!reg.test(value) && value.length > 0){
			this.setState({
        emailError: true,
      });
		}else{
			this.setState({
        emailError: false,
      });
      if (this.state.isLogin) {
        this.setState({
          userInfo: {
            userEmail: value,
          }
        });
      } else {
        this.setState({
          register: {
            userEmail: value,
          }
        });
      }
      
		}
  }
  onChangeName = (value) => {
    value = value.trim();
    this.setState({
        register: {
            userName: value,
        }
    });
  }
  
  switch = async () => {
    await this.setState({
      isLogin: !this.state.isLogin,
    });
    let allInput = document.getElementsByTagName('input');
    for (let i = 0; i < allInput.length; i++) {
      allInput[i].value = ''
    }
  }
  login = () => {
    console.log('登录')
  }
  register = () => {
    console.log('注册')
  }
  render() {
    return (
      <div className="login">
        <div className="loginTop">
          <div className='return' onClick={this.goBack}>返回</div>
          <div>帮助</div>
        </div>
        {
          this.state.isLogin ?
          <div className="loginCont">
            <p>邮箱密码登录</p>
            <InputItem
              clear
              error={this.state.emailError}
              onErrorClick={this.onErrorEmail}
              onChange={this.onChangeEmail}
              className="input"
              type="text" name="email"  placeholder="请输入邮箱" />
            <InputItem
              error={this.state.hasError}
              onErrorClick={this.onErrorPassword}
              onChange={this.onChange}
              className="input" type="password" placeholder="请输入密码" />
            <div onClick={this.switch} className = "tip">切换注册</div>
            <div className="submit" onClick={this.login}>登录</div>
          </div>
          : 
          <div className="registerCont">
            <p>注册</p>
            <InputItem
              clear
              error={this.state.emailError}
              onErrorClick={this.onErrorEmail}
              onChange={this.onChangeEmail}
              className="input"
              type="text" name="email" placeholder="请输入邮箱" />
            <InputItem clear onChange={this.onChangeName} className = "input" type="text" placeholder="请输入用户名"/>
            <InputItem
              error={this.state.hasError}
              clear
              onErrorClick={this.onErrorClick}
              onChange={this.onChange}
              className="input"  type="password" placeholder="请输入密码" />
            <InputItem
              clear
              type="number"
              onChange={value => {
                this.setState({
                  register :{code: value}
                });
              }}
              placeholder="已向邮箱发送验证码请输入验证码"
            />
            <div onClick={this.switch} className = "tip">切换登录</div>
            <div className="submit" onClick={this.register}>注册</div>
          </div>
        }
      </div>
    )
  }
}
