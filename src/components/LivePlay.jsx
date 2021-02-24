import React, { Component } from 'react'
import 'xgplayer';
import HlsPlayer from 'xgplayer-hls';
import Comment from "./Comment";
import {withRouter} from 'react-router-dom'
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
        id: video.id,
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
              <div id = {item.id} ></div>
            </div>
            <div className = "surface">
              <div className = "liveHeader">
                <div className="liveInfo">
                  <div>{item.author}</div>
                </div>
                <div onClick = {this.close}>关闭</div>
              </div>
              <div className="liveComment">
                <Comment liveId = {this.props.item.id} />
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
