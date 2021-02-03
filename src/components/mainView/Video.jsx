import React, { Component } from 'react'
//import BScroll from 'better-scroll'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import VideoPlay from '../videoPlay/VideoPlay'
export default class Video extends Component {
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
    ]
    
  }
  // componentDidMount() {
  //     const wrapper = document.querySelector('.video')
  //     //选中DOM中定义的 .wrapper 进行初始化
  //     const scroll = new BScroll(wrapper, {
  //         scrollX: false,  //关闭横向滚动
  //         click: true,  // better-scroll 默认会阻止浏览器的原生 click 事件
  //         scrollY: true, //开启竖向滚动
  //     })
  //     this.setState({
  //       Bscroll: scroll,
  //     })
  // }
  render() {
    return (
      <div className = "video">
        {/* <div className = "content"> */}
        <Swiper
          direction = 'vertical'
          className='video-swiper'
        >
          {this.state.videoList.map((v) => (
          <SwiperSlide  key= {v.Id.toString()}>
            {({ isActive }) => (
              <VideoPlay item={v} isActive={isActive} />
            )}
            {/* <VideoPlay video={v}/> */}
          </SwiperSlide>
        ))}
        </Swiper>
        {/* </div> */}
      </div>
    )
  }
}
