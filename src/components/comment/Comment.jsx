import React, { Component } from 'react'
import BScroll from 'better-scroll'
import { debounce, isScrollBottom } from '../../api/utils'
export default class Comment extends Component {
  state = {
    list: [],
    infoNums: 0,
    wrapperDom: null,
    listDom: null,
    wrapperHeight: 0,
    isWilling: false,
    inputValue: null,
  }
  componentDidMount() {
    const { wrapper } = this
    let scroll = new BScroll(wrapper, {
      probeType: 2,
      click: true,
      stopPropagation: true,
      hasVerticalScroll: true,
      momentum: true,
      useTransition:false
    });
    this.initDom(scroll);
     // ajax...
    const data = new Array(0).fill('');
    this.queue(data);
    // setTimeout(() => {
    //   const list = new Array(5).fill('');
    //   this.queue(list);
    // }, 15000);
    scroll.on('beforeScrollStart', () => {
      this.setState({ isWilling: true })
    })
    scroll.on('scrollEnd', this.addScroll)
  }
  initDom = (scroll) => {
    const { wrapper, list } = this;
    this.setState({
      wrapperDom: scroll,
      listDom: list,
      wrapperHeight: wrapper.offsetHeight
    });
  }
  
  // 队列添加消息
  queue = async (data) => {
    for (let i = 0; i < data.length; i++) {
      const opt = {
        name: i + "-用户名",
        content: i + "-评论内容",
        id: Date.now()
      }
      await this.addTimeOut(opt);
    }
  }
  addTimeOut = (opt) => {
    return new Promise((resolve, reject) => {
     setTimeout(() => {
        this.addComment(opt);
        resolve()
     }, 500);
    });
  }

  // 添加评论 如果超过50条就将前20条删除
  addComment = (data) => {
    let list = this.state.list;
    if (list >= 50) {
        list.splice(0, 20);
    }
    list.push(data)
    this.setState({ list: list })
    setTimeout(() => {
      this.renderComment();
    }, 500);
  }
  
  addScroll = () => {
    if (this.state.infoNums > 0) {
      (debounce(this.listScroll, 100))();
    }
  }
  //改变提示新消息条数
  listScroll = () => {
    const scroll = this.state.wrapperDom;
    const nums = isScrollBottom(scroll);
    if (nums < Number(this.state.infoNums)) {
      this.setState({ infoNums: nums })
    }
    if (nums === 0) {
      this.setState( { isWilling :false})
    }
    
  }
  // 滚动到底部
  goBottom = () => {
    this.infoNums = 0; // 清除剩余消息
    this.setState({ infoNums : 0 , isWilling: false})
    this.state.wrapperDom.scrollTo(0, this.state.wrapperDom.maxScrollY,200);
  }
  // 渲染评论
  renderComment = () => {
    const listHight = this.state.listDom.offsetHeight;
    const diff = listHight - this.state.wrapperHeight; // 列表高度与容器高度差值
    const top = - Number(this.state.wrapperDom.y); // 列表滚动高度
    this.state.wrapperDom.refresh()
    
    if (diff - top < 50) {
      this.setState( { isWilling : false})
      if (diff > 0 && !this.state.isWilling) {
        this.state.wrapperDom.scrollTo(0, -diff - 15, 400);
        this.setState({ infoNums : 0 })
      }
    } else {
      this.setState({infoNums : this.state.infoNums +1})
    }
  }

  submit = async () => {
    let value = this.inputValue.value.trim();
    if(value.length > 0) {
      //this.setState({ inputValue : value })
      let obj = {
        id: Date.now(),
        name: "唐琪",
        content: value,
      }
      //this.inputValue.value = ""
      await this.addTimeOut(obj);
    }
  }
  
  render() {
    return (
      <div>
        <div ref={c => this.wrapper = c }  className="display wrapper">
          <ul className="ComContent" ref={c => this.list = c }>
          {this.state.list.map((item) => (
            <li key={item.id.toString()}>
              <div className = "comCon">
                <span className="userName">{item.name}：</span>
                <span className="content">{item.content}</span>
              </div>
            </li>
          ))}
          </ul>
        </div>
        { this.state.infoNums > 0 ?
          <div onClick={this.goBottom} className="rest-nums" >
              {this.state.infoNums}条新消息
            </div>
          :
            <div></div>
        }
        <div className = "ComInput">
          <input  type="text" ref={input => this.inputValue = input} placeholder="说点什么..." />
          <div className = "submit" onClick={this.submit}>发送</div>
        </div>
      </div>
    )
  }
}
