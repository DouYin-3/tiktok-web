/**
 * @desc 函数防抖
 * @param {需要防抖的函数} func
 * @param {延迟时间} wait
 */
export function debounce(func, wait = 500) {
  let timer;
  return function (){
    const context = this
    const args = arguments
    if (timer) clearTimeout(timer) 
    timer = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}


export function isScrollBottom(scroll, threshold = 40) { //新消息条数
  let gap = scroll.y - scroll.maxScrollY;
  return parseInt(gap/20);
}