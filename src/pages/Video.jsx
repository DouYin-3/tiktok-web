import React, { Component } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import VideoPlay from '../components/VideoPlay'
import NavBar from '../components/mainView/NavBar';
import http from "../api/http";
import { Toast } from 'antd-mobile';
export default class Video extends Component {
  constructor(props, ...args) {
    super(props, ...args)
    props.cacheLifecycles.didCache(this.componentDidCache)
    props.cacheLifecycles.didRecover(this.componentDidRecover)
  }
  //跳转暂停
  componentDidCache = () => {
    this.setState({ isCached: true })
  }
  componentDidRecover = () => {
    this.setState({ isCached: false })
  }
  state = {
    page: 1,
    videoList: [],
    isCached: false,
    muted: true,
    translate: 0
  }
  async componentDidMount() {
    this.setState({ isCached: this.props.isCached })
    const res =  await http.get(`/v1/videos`, {
      params:{
          id:this.state.page
      }
    })
    let list = this.state.videoList;
    list.push(...res.data.list)
    await this.setState({
      videoList: list
    })
    this.state.swiper.update();
    this.mutePage()
  }
  // Mute a singular HTML5 element
  muteMe = (elem) => {
    elem.muted = this.state.muted;
  }
  //页面静音
  mutePage = () => {
    document.querySelectorAll("video").forEach( video => this.muteMe(video) );
  }
  noMuted = async () => {
    await this.setState({ muted: false })
    this.mutePage()
  }
  //加载更多
  getMore = async () => {
    //this.state.swiper.updatePagination()
    const swiper = this.state.swiper;
    let gap = this.state.translate - swiper.translate 
    this.setState({ translate: swiper.translate })
    if (swiper.isEnd && gap > 0 ) {
      const res =  await http.get(`/v1/videos`, {
        params:{
            id:this.state.videoList[this.state.videoList.length - 1].id
        }
      })
      if (res.data.list.length === 0) {
        Toast.info('已经到底了');
      } else {
        let list = this.state.videoList;
        list.push(...res.data.list)
        this.setState({
          videoList: list
        })
        swiper.activeIndex = swiper.activeIndex + 1;
        this.state.swiper.update()
        this.mutePage()
      }
      console.log('加载')
    }
  }
  render() {
    return (
      <div className = "allVideo">
        { (this.state.muted && document.querySelectorAll("video").length > 0) ?
          <div className="muted" onClick={this.noMuted}>取消静音</div> :
          <div className="muted"></div>
        }
        <NavBar></NavBar>
        <div className="video" >
          {this.state.videoList.length > 0 &&
            <Swiper
            direction = 'vertical'
            className='video-swiper'
            ref={c => this.swiper = c }
            onSwiper={(swiper) => this.setState({ swiper })}
            onClick={() => { return false }}
            onTouchEnd = {() => {if(this.state.videoList)this.getMore()}}
          >
            {this.state.videoList.map((v) => (
              <SwiperSlide  key= {v.id.toString()}>
                {({ isActive }) => (
                    <VideoPlay item={v} isActive={isActive} isCached={this.state.isCached}/>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          }
        </div>
      </div>
      
    )
  }
}
