import React, { Component } from 'react'
import '../assets/css/live.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import LivePlay from '../components/livePlay/LivePlay'
export default class Live extends Component {
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
      // {
      //   Id: 2,
      //   author: "字节君",
      //   url: "../../assets/img/miao.jpg",
      //   description: "字节跳动8周年，不忘初心,always Day1",
      //   taglist: ["一个普通公司的8年"],
      //   likes: 586892,
      //   comments: 23456,
      // }
    ],
  }
  render() {
    return (
      <div className = "DyLive">
        <Swiper
          direction = 'vertical'
          className='video-swiper'
          ref={c => this.swiper = c }
          onSwiper={(swiper) => this.setState({swiper})}
          // onTouchEnd = {() => {if(this.state.videoList)this.getMore()}}
        >
          {this.state.videoList.map((v) => (
            <SwiperSlide  key= {v.Id.toString()}>
              {({ isActive }) => (
                  <LivePlay item={v} isActive={isActive} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  }
}
