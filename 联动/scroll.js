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
   * 
   * @param { warpElement } 容器Element
   * @param { scrollInfo  } 记录字节点信息,已便移动定位Class
   * @param { moving      } 移动状态, 不希望存在移动事件并行
   * 
   */
  class Bscroll {
    constructor(warpElement) {
      this.element = warpElement
      this.scrollInfo = []
      this.init()
      this.moving = false
    }
    // 初始化info内存记录子节点
    init() {
      this.scrollInfo = [...this.element.childNodes].map(el=> {
        return {
          className: el.className,
          height: el.offsetHeight
        }
      })
    }
    /**
     * 监听Scroll
     * @param { callback } onScroll ing,触发回调定位到当前项
     */
    on(callback) {
      this.element.addEventListener('scroll',Ithrottle(()=> {
        let h = this.getScrollHeight()
        let scrollHeight = 0
        for(let i = 0; i < this.scrollInfo.length; i++) {
          scrollHeight += this.scrollInfo[i].height
          if(h < scrollHeight) {
            if(!this.moving) {
              callback && callback(this.scrollInfo[i].className)
            }
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
    // 容器当前位置信息
    getScrollHeight() {
      return this.element.scrollTop
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
      let top = h;
      let currentTop = this.getScrollHeight();
      let requestId;
      let step = ()=> {
        currentTop += speed;
        if (currentTop <= top) {
          this.element.scrollTo(0, currentTop);
          requestId = window.requestAnimationFrame(step);
        } else {
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
      let top = h;
      let currentTop = this.getScrollHeight();
      let requestId;
      let step = ()=> {
        currentTop -= speed;
        if (currentTop >= top) {
          this.element.scrollTo(0, currentTop);
          requestId = window.requestAnimationFrame(step);
        } else {
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