import React, { Component } from 'react'
//import BScroll from 'better-scroll'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import VideoPlay from '../videoPlay/VideoPlay'
import NavBar from './NavBar';
import http from "../../api/http";
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
    videoList: [
      {
        Id: 1,
        author: "字节君",
        url: "../../assets/img/miao.jpg",
        description: "字节跳动8周年，不忘初心,always Day1",
        taglist: ["一个普通公司的8年"],
        likes: 586892,
        comments: 23456,
      },
      {
        Id: 2,
        author: "字节君",
        url: "../../assets/img/miao.jpg",
        description: "字节跳动8周年，不忘初心,always Day1",
        taglist: ["一个普通公司的8年"],
        likes: 586892,
        comments: 23456,
      },
      {
        Id: 3,
        author: "字节君",
        url: "../../assets/img/miao.jpg",
        description: "字节跳动8周年，不忘初心,always Day1",
        taglist: ["一个普通公司的8年"],
        likes: 586892,
        comments: 23456,
      },
      {
        Id: 4,
        author: "字节君",
        url: "../../assets/img/miao.jpg",
        description: "字节跳动8周年，不忘初心,always Day1",
        taglist: ["一个普通公司的8年"],
        likes: 586892,
        comments: 23456,
      },
      {
        Id: 5,
        author: "字节君",
        url: "../../assets/img/miao.jpg",
        description: "字节跳动8周年，不忘初心,always Day1",
        taglist: ["一个普通公司的8年"],
        likes: 586892,
        comments: 23456,
      },
    ],
    isCached:  false,
  }
  async componentDidMount () {
    const res = await http.get('api/getVideoList')
    console.log(res)
  }
  //加载更多
  getMore = async  () =>{
    const swiper = this.state.swiper;
    if (swiper.isEnd) {
      const res = await http.get('api/getVideoList')
      console.log(res)
    }
  }
  render() {
    return (
      <div>
        <NavBar></NavBar>
      <div className = "video" >
        {/* <div className = "content"> */}
        <Swiper
          direction = 'vertical'
          className='video-swiper'
          ref={c => this.swiper = c }
          onSwiper={(swiper) => this.setState({swiper})}
          onTouchEnd = {() => {if(this.state.videoList)this.getMore()}}
        >
          {this.state.videoList.map((v) => (
          <SwiperSlide  key= {v.Id.toString()}>
            {({ isActive }) => (
                <VideoPlay item={v} isActive={isActive} isCached={this.state.isCached}/>
            )}
          </SwiperSlide>
        ))}
        </Swiper>
        {/* </div> */}
      </div>
      </div>
      
    )
  }
}
