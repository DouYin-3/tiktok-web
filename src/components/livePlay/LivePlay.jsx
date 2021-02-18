import React, { Component } from 'react'
import 'xgplayer';
import HlsPlayer from 'xgplayer-hls';
import BScroll from 'better-scroll';
import Comment from "../comment/Comment";
import {withRouter} from 'react-router-dom'
//import v from 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'
export default withRouter(class LivePlay extends Component {
  state = {
    list: [],
    restComment: 0,
    restNums: 0,
    wrapperDom: null,
    listDom: null,
    wrapperHeight: 0
  }
  componentDidMount() {
    const {playSize} = this;
    const video = this.props.item
    console.log(this.props.isActive);
    const player = new HlsPlayer({
      id: video.Id,
      //url: this.props.isActive ? 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8' : '',
      //url: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8' ,
      width: playSize.clientWidth,
      height: playSize.clientHeight,
      controls: false,
      isLive: true,
      autoplay: true,
      muted: true,
      playsinline: true,
    });
    this.setState({ player })
    let scroll = new BScroll(document.querySelector('.wrapper'), {
      probeType: 1,
      //pullUpLoad: this.pullUpLoad,
      click: true,
      stopPropagation: true,
      //scrollX: this.scrollX,
      //pullDownRefresh: this.pullDownRefresh,
      hasVerticalScroll: true,
    });
    scroll.on('scroll', (event) => {
      //console.log(position.x, position.y)
      //event.stopPropagation()
    })
    
  }
  componentDidUpdate() {
    const isActive = this.props.isActive;
    this.Active(isActive);
  }
  //点击控制
  control = () => {
  }
  //是否处于active
  Active = (isActive) => {
    // const {playSize} = this;
    // const video = this.props.item
    const player = this.state.player
    if (isActive) {
      player.start('http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8')
    } else {
      player.start('');
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
      <div  className = 'LivePlay'>
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
    )
  }
})
