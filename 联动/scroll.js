/**
 * 节流
 * @param { fn  }  频繁function
 * @param { wait}  间隔Time
 */
const Ithrottle = function (fn, wait = 50) {
  let timer = null;
  return function () {
      const context = this;
      const args = arguments;
      if (!timer) {
          timer = setTimeout(function () {
              fn.apply(context, args);
              timer = null;
          }, wait)
      }
  }
}
/**
 * 读取最终position
 * @param { element } element 
 * @param { attr    } attr property
 */
function getStyle(element, attr = 'position') {
  if (element.currentStyle) {
      return element.currentStyle[attr];
  } else {
      return document.defaultView.getComputedStyle(element, null)[attr];
  }
}





/**
 * 
 * @param { warpElement } 容器Element
 * @param { scrollInfo  } 记录字节点信息,已便移动定位Class
 * @param { moving      } 移动状态, 不希望存在移动事件并行
 * 
 * USE
 * const BSCROLL = new Bscroll(wrapName)
 * 
 *    ============ on 配合菜单联动 ===============
 *    BSCROLL.on(nowClassName=> {
 *        nowClassName 是当前的菜单位置回调,必须配合scrollInfo
 *    })
 *
 *  
 *    =========== off 取消监听    ================
 *    this.BSCROLL.off()
 * 
 * 
 *    =========== 定位到任意dom   
 *    BSCROLL.scrollTo(menuTarget)
 *    定位到联动菜单
 */
class Bscroll {
  constructor(warpElement) {
    this.element = warpElement
    this.scrollInfo = []
    this.init()
    this.moving = false
  }
  /**
   * 初始化记录信息
   * @param { scrollInfo } Only - ChildNodes,不支持全部节点定位
   */
  init() {
    this.scrollInfo = [...this.element.childNodes].map(el=> {
      return {
        className: el.className,
        height: el.offsetHeight
      }
    })
  }
  /**
   * 监听Scroll( 此处监听的是scrollInfo中标记的菜单, 默认顶部对齐 )
   * @param { callback } onScroll ing,触发回调定位到当前项
   */
  on(callback) {
    this.element.addEventListener('scroll',Ithrottle(()=> {
      let h = this.getScrollHeight(),
          scrollHeight = 0;
      for(let i = 0; i < this.scrollInfo.length; i++) {
        scrollHeight += this.scrollInfo[i].height
        if(h < scrollHeight && !this.moving) {
            callback && callback(this.scrollInfo[i].className)
            break
        }
      }
    }), false)
  }
  off() {
    this.element.removeEventListener('scroll', ()=> {
      console.log('Scroll Remove Success')
    })
  }
  /**
   * 计算相对容器的目标高度
   * @param { className } 目标的className, 必须存在于INfo
   */
  calcRelativeWarp(className) {
    const isClassName = this.scrollInfo.some(item=> item.className === className)
    if(!isClassName) return 0
    let scrollHeight = 0;
    for(let i = 0; i < this.scrollInfo.length; i++) {
      if(this.scrollInfo[i].className === className) {
        break
      }
      else {
        scrollHeight += this.scrollInfo[i].height
      }
    }
    return scrollHeight
  }
  /**
   * 
   * 读取scroll卷过的Top
   */
  getScrollHeight() {
    return this.element.scrollTop
  }
  /**
   * 读取任意符合规范的dom,height属性
   * @param { target } 目标节点className id tagName ...
   */
  getElementHeight(target) {
    let child = document.querySelector(target)
    let __scrollTop__, offsetParents = [];
    let pointer = child.offsetParent;
    while (pointer && this.element !== pointer && this.element.contains(pointer)) {
      offsetParents.push(pointer)
      pointer = pointer.offsetParent
    }
    __scrollTop__ = child.offsetTop + offsetParents.reduce((pre, curr)=> pre + curr.offsetTop, 0)

    return __scrollTop__
  }
  scrollToElement(target) {
    if(this.moving) return

    let h = this.getElementHeight(target)

    if(h > this.getScrollHeight())  this.moveDown(h)
    else this.moveUp(h)
  }
  /**
   * 定位移动
   * @param { className } 定位移动目标className 
   */
  scrollTo(className) {
    if(this.moving) return

    let h = this.calcRelativeWarp(className)

    if(h > this.getScrollHeight())  this.moveDown(h)
    else this.moveUp(h)
  }
  moveDown(h, speed = 30) {
    this.moving = true
    let top = h,
        currentTop = this.getScrollHeight(),
        requestId;

    let step = ()=> {
      currentTop += speed;
      if (currentTop <= top) {
        this.element.scrollTop = currentTop;
        requestId = window.requestAnimationFrame(step);
      } else {
        if(currentTop !== h) this.element.scrollTop = h
        window.cancelAnimationFrame(requestId);
        setTimeout(() => {
          this.moving = false
        }, 100);
      }
    }
    step()
  }
  moveUp(h, speed = 30) {
    this.moving = true
    let top = h,
        currentTop = this.getScrollHeight(),
        requestId;

    let step = ()=> {
      currentTop -= speed;
      if (currentTop >= top) {
        this.element.scrollTop = currentTop;
        requestId = window.requestAnimationFrame(step);
      } else {
        if(currentTop !== h) this.element.scrollTop = h
        window.cancelAnimationFrame(requestId);
        setTimeout(() => {
          this.moving = false
        }, 100);
      }
    }
    step()
  }
}

export default Bscroll