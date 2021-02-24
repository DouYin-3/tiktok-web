import React, { Component } from 'react'
import '../assets/css/live.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import LivePlay from '../components/LivePlay'
import http from "../api/http";
export default class Live extends Component {
  state = {
    page: 1,
    liveList: [],
  }
  async componentDidMount() {
    const res =  await http.get(`/lives`, {
      params:{
        id:this.state.page
      }
    })
    let list = this.state.liveList;
    list.push(...res.data.list)
    await this.setState({
      liveList: list
    })
    this.state.swiper.updateSlides();
  }
  render() {
    return (
      <div className="DyLive">
        {this.state.liveList.length > 0 &&
        <Swiper
          direction = 'vertical'
          className='video-swiper'
          ref={c => this.swiper = c }
          onSwiper={(swiper) => this.setState({swiper})}
        >
          {this.state.liveList.map((v) => (
            <SwiperSlide key={v.id.toString()}>
              {({ isActive }) => (
                <LivePlay item={v} isActive={isActive} />
              )}
            </SwiperSlide>
          ))}
          </Swiper>
        }
      </div>
    )
  }
}
