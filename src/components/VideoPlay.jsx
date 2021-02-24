import React, { Component } from 'react'
import Player from 'xgplayer';
import avatar from '../assets/img/avatar.jpg'
import http from "../api/http";
export default class VideoPlay extends Component {
  state = {}
  // clickedTime = {
  //   first: '',
  //   second: ''
  // }
  componentDidMount() {
    const {playSize} = this;
    const video= this.props.item
    const player = new Player({
      id: video.id,
      url: video.url,
      width: playSize.clientWidth,
      height: playSize.clientHeight,
      time: false,
      videoInit: true,
      loop: true,
      closeVideoDblclick: true,
      controls: false,
      autoplay: true,
      playsinline: true,
    });
    this.setState({ player, video })
  }
  componentDidUpdate() {
    const isActive = this.props.isActive;
    this.Active(isActive);
  }
  
  //点击控制
  control = (event) => {
    // let e = event || window.event;
    // let position = {}
    // let time = new Date();
    // if (!this.clickedTime.first) {
    //   this.clickedTime.first = time
    // }
    // this.clickedTime.second = time
    // if (Math.abs(this.clickedTime.first - this.clickedTime.second) < 400) {
    //   //双击
    //   position.x = e.clientX;
    //   position.y = e.clientY;
    //   let pink = document.createElement("div")
    //   pink.className = ["addPink", "iconfont", "icon-xihuan "];
    //   const { playSize } = this;
    //   playSize.appendChild(pink);
    //   pink.clientX = e.clientX;
    //   pink.clientY = e.clientY;
    //   console.log(pink)
    // } else {
      //单击
      const {singer,y1,y2,y3} = this;
      if(!this.state.player.hasStart || this.state.player.paused){
        this.state.player.play();
        singer.style.animationPlayState = 'running';
        y1.style.animationPlayState = 'running';
        y2.style.animationPlayState = 'running';
        y3.style.animationPlayState = 'running';
      }else {
        this.state.player.pause();
        singer.style.animationPlayState = 'paused';
        y1.style.animationPlayState = 'paused';
        y2.style.animationPlayState = 'paused';
        y3.style.animationPlayState = 'paused';
      }
    // }
    // this.clickedTime.first = this.clickedTime.second
  }
  //数字转型
  convertNumber = (number) => {
    if (number >= 1000000) return `${(number / 1000000).toFixed(1)}m`
    if (number >= 10000) return `${(number / 10000).toFixed(1)}w`
    return number
  }
  //是否处于active
  Active = (isActive) => {
    const { singer, y1, y2, y3 } = this;
    if (this.props.isCached) {
      this.state.player.pause()
    } else {
      if (isActive) {
        setTimeout(() => {
          this.state.player.play();
          singer.style.animationName = 'song';
          y1.style.animationName = ['music-left','music-top'];
          y2.style.animationName = ['music-left','music-top'];
          y3.style.animationName = ['music-left','music-top'];
        },300)
      } else {
        setTimeout(() => {
          const player = this.state.player
          player.currentTime = 0;
          this.state.player.pause()
          singer.style.animationName = "hhh";
          y1.style.animationName = 'hhh';
          y2.style.animationName = 'hhh';
          y3.style.animationName = 'hhh';
        },300)
      }
    }
  }
  //点赞
  like = async () => {
    let v = this.state.video;
    const {iconLike} = this
    if (iconLike.style.color === 'rgb(221, 0, 27)') {
      //取消点赞
      iconLike.style.color = '#fff';
      const res =  await http.get(`/v1/video/unlike`, {
        params:{
            id: v.id
        }
      })
      console.log(res.data)
      if (res.data.type === "success") {
        v.likes = v.likes - 1
        this.setState({
          video: v
        })
      }
    } else {
      //点赞
      iconLike.style.color = '#DD001b';
      const res =  await http.get(`v1/video/like`, {
        params:{
            id: v.id
        }
      })
      if (res.data.type === "success") {
        v.likes = v.likes + 1
        this.setState({
          video: v
        })
      }
    }
  }
  render() {
    const item = this.props.item
    return (
      <div className='VideoPlay'>
        <div   onClick = {this.control} ref={c => this.playSize = c } className = 'videoItem'>
          <div id = {item.id} className = "player"></div>
        </div>
        <div className='rightColumn'>
          <div className='iconGroup'>
            <div className = "avatar">
              <img src={avatar} alt=""/>
            </div>
          </div>
          <div className='iconGroup'>
            <i ref={c => this.iconLike = c } onClick = {this.like} className="iconfont icon-xihuan like" />
            <p className='iconText'>{this.convertNumber(item.likes)}</p>
          </div>
          <div className='iconGroup'>
            <i className="iconfont icon-pinglun " />
            <p className='iconText'>{this.convertNumber(item.comments)}</p>
          </div>
          <div className='iconGroup'>
            <i className="iconfont icon-zhuanfa" />
            <p className='iconText'>{this.convertNumber(888)}</p>
          </div>
          <div  className='iconGroup '>
            <div  className = 'singerInfo'>
              <div ref={c => this.singer = c } className='singer'>
                <img  src={avatar} alt=""/>
              </div>
              <i ref={c => this.y1 = c } style={{ fontSize: '1.2rem'}} className="iconfont icon-yinle1 y1" />
              <i ref={c => this.y2 = c } style={{ fontSize: '1.2rem'}} className="iconfont icon-yinle y2" />
              <i ref={c => this.y3 = c } style={{ fontSize: '1.2rem'}} className="iconfont icon-yinle1 y3"/>
            </div>
          </div>
        </div>
        <div className='bottomRow'>
          <div className='row'>
            <p className='userId'>@{item.author}</p>
            {/* <p className='time'>213123123</p> */}
          </div>
          <div className='description'>{item.description}</div>
          <div className='row'>
            <i className="iconfont icon-douyin" />
            <span className='songName'>歌</span>
          </div>
        </div>
      </div>
    )
  }
}
