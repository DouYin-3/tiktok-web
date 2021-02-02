import React, { Component } from 'react'
import Player from 'xgplayer';
import v from '../../assets/video/v1.mp4'
import avatar from '../../assets/img/avatar.jpg'
//import './.xgplayer/skin/index.js';
import { Tiktok, Like, Comment, Share } from '@icon-park/react'


export default class VideoPlay extends Component {
  state = {}
  componentDidMount() {
    const video = this.props
    const player = new Player({
      id: video.video.Id,
      url: v,
      width: 375,
      height: 618,
      videoInit: true,
      rotateFullscreen: false,
    });
    this.setState({player})
  }
  control = () => {
    if(!this.state.player.hasStart || this.state.player.paused){
      this.state.player.play()
    }else {
      this.state.player.pause()
    }
    
  }
  render() {
    const item = this.props.video
    return (
      <div onClick = {this.control} className = 'VideoPlay'>
        <div id = {item.Id}  className = 'videoItem'></div>
        <div className='rightColumn'>
          <div className='iconGroup'>
            <div className = "avatar">
              <img src={avatar} alt=""/>
            </div>
          </div>
          <div className='iconGroup'>
            <Like theme='filled' size='2.2rem' fill='#fff' />
            <p className='iconText'>{item.likes}</p>
          </div>
          <div className='iconGroup'>
            <Comment theme="outline" size="2.2rem" fill="#fff"/>
            <p className='iconText'>{item.comments}</p>
          </div>
          <div className='iconGroup'>
            <Share theme='filled' size='2.2rem' fill='#fff' />
            <p className='iconText'>{888}</p>
          </div>
          <div className='iconGroup'>
            <div className='singer'>
              <img src={avatar} alt=""/>
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
            <Tiktok theme='filled' fill='#fff' />
            <span className='songName'>歌</span>
          </div>
        </div>
      </div>
    )
  }
}
