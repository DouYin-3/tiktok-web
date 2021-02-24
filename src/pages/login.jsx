import React, { Component } from 'react'
import '../assets/css/login.css';
import { InputItem, Toast } from 'antd-mobile';
import http from "../api/http";
export default class login extends Component {
  state = {
    isLogin :true,
    hasError: false,
    emailError: false,
    getCode: false,
    time: 60,
    userInfo: {
      mailName: "",
      password: "",
    },
    register: {
      mailName: "",
      userName: '',
      password: "",
      code: '',
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
      let obj = this.state.userInfo
      obj.password = value
      this.setState({
        userInfo: obj
      });
    } else {
      let obj = this.state.register
      obj.password = value
      this.setState({
        register: obj
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
    }
    if (this.state.isLogin) {
      let obj = this.state.userInfo
      obj.mailName = value
      this.setState({
        userInfo: obj
      });
    } else {
      let obj = this.state.register
      obj.mailName = value
      this.setState({
        register: obj
      });
    }
  }
  onChangeName = (value) => {
    value = value.trim();
    let obj = this.state.register
    obj.userName = value
    this.setState({
      register: obj
    });
  }
  onChangeCode = (value) => {
    value = value.trim();
    let obj = this.state.register
    obj.code = value
    this.setState({
      register: obj
    });
  }
  
  switch = async () => {
    await this.setState({
      isLogin: !this.state.isLogin,
    });
  }
  login = async () => {
    let obj = this.state.userInfo;
    if (this.state.hasError || this.state.emailError) {
      Toast.info('请输入正确格式的信息');
    } else {
      const res = await http.post(`/v1/SignIn`, obj)
      if (res.data !== "") {
        localStorage.setItem("userInfo", JSON.stringify(res.data))
        let { history } = this.props
        history.push({pathname: '/'}) 
      } else {
        Toast.info('登录失败');
      }
    }
  }
  register = async () => {
    let obj = this.state.register;
    if (this.state.hasError || this.state.emailError
      || obj.userName === '' || obj.code === '') {
      Toast.info('请输入正确格式的信息');
    } else {
      const res = await http.post(`v1/Register`, obj)
      if (res.data === 1) {
        Toast.info('成功注册,请返回登录');
      } else {
        Toast.info('注册失败');
      }
    }
  }
  //发送验证码
  getCode = async () => {
    let obj = this.state.register;
    if (!this.state.getCode) {
      this.setState({
        getCode : ! this.state.getCode
      })
      this.noCode()
      await http.post(`/v1/SendMail`,
        { mailName: obj.mailName }
      )
    }
    return false
  }
  noCode = () => {
    let timer = setInterval(() => {
      if (this.state.time === 0) {
        this.setState({
          time: 60
        })
        this.setState({
          getCode : ! this.state.getCode
        })
        clearTimeout(timer)
      }
      this.setState({
        time: this.state.time - 1
      })
    },1000)
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
              value = {this.state.userInfo.mailName}
              id = "email"  
              className="input"
              type="text" name="email"  placeholder="请输入邮箱" />
            <InputItem
              error={this.state.hasError}
              value = {this.state.userInfo.password}
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
              defaultValue = ""  
              error={this.state.emailError}
              id="Remail"
              value = {this.state.register.mailName}
              onErrorClick={this.onErrorEmail}
              onChange={this.onChangeEmail}
              className="input"
              type="text" name="email" placeholder="请输入邮箱" />
            <InputItem 
              value = {this.state.register.userName}
              clear onChange={this.onChangeName} className="input" type="text" placeholder="请输入用户名" />
            <InputItem
              error={this.state.hasError}
              clear
              value = {this.state.register.password}
              onErrorClick={this.onErrorClick}
              onChange={this.onChange}
              className="input"  type="password" placeholder="请输入密码" />
            <div onClick={this.getCode} className="getCode">
              {this.state.getCode ? '已发送验证码到邮箱' + this.state.time + "s" : '发送验证码'}</div>
            <InputItem
              clear
              type="number"
              className = "code"
              value = {this.state.register.code}
              onChange={this.onChangeCode}
              placeholder="请输入验证码"
            />
            <div onClick={this.switch} className = "tip">切换登录</div>
            <div className="submit" onClick={this.register}>注册</div>
          </div>
        }
      </div>
    )
  }
}
