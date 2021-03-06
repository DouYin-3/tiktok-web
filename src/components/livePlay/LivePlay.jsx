import React, { Component } from 'react'
import 'xgplayer';
import HlsPlayer from 'xgplayer-hls';
import Comment from "../comment/Comment";
import {withRouter} from 'react-router-dom'
//import v from 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'
export default withRouter(class LivePlay extends Component {
  state = {}
  componentDidMount() {
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps.isActive) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    const isActive = this.props.isActive;
    this.Active(isActive);
  }
  //是否处于active
  Active = (isActive) => {
    if (isActive) {
      const {playSize} = this;
      const video = this.props.item
      let player =  new HlsPlayer({
        id: video.Id,
        width: playSize.clientWidth,
        height: playSize.clientHeight,
        url: video.url,
        controls: false,
        isLive: true,
        autoplay: true,
        playsinline: true,
        definitionActive: 'click'
      });
      player.once('complete', () => {
        console.log('complete')
        console.log(this.props.isActive);
        if (!this.props.isActive) {
          //player.destroy()
        }
      })
    }
  }
  //关闭直播
  close = () => {
    let { history } = this.props
		history.push({pathname: '/'}) 
  }                                                                                                                                                                                                                                                                                                                                
  render() {
    const item = this.props.item
    return (
      <div>
        {
          this.props.isActive ?
          <div className='LivePlay'>
            <div className = 'liveItem'  onClick = {this.control} ref={c => this.playSize = c }>
              <div id = {item.Id} ></div>
            </div>
            <div className = "surface">
              <div className = "liveHeader">
                <div className="liveInfo">
                  <div>CCTV1</div>
                </div>
                <div onClick = {this.close}>关闭</div>
              </div>
              <div className="liveComment">
                <Comment />
              </div>         
            </div>     
          </div>
          :
          <div className = "noActive"></div>
        }
      </div>
    )
  }
})
