(function () {
    function SWI(event, obj) {
        //event 主要获取swiper宽度 确定子元素 轮播方案
        this.wt = document.getElementsByClassName(event)[0].offsetWidth;
        //side(不可更改) 获取swiper容器 并 确定容器大小
        this.side = document.getElementsByClassName("side")[0];
        //获取轮播对象
        this.cont = document.getElementsByClassName("cont");
        //子元素数量
        this.num = this.cont.length;

        if (obj.autoplay === true) {
            this.auto = setInterval(() => {
                this.nex()
            }, 2000)
        }
        if (obj.btn) {
            document.getElementsByClassName(obj.btn.pre)[0].addEventListener("click", () => { console.log(this.pre); this.pre() })
            document.getElementsByClassName(obj.btn.nex)[0].addEventListener("click", () => { this.nex() })
        }
    }
    SWI.prototype = {
        //上一页
        pre() {
            this.side.insertBefore(this.cont[this.num-1], this.side.firstChild);
            this.cont[0].style.marginLeft = -this.wt + 'px';

            setTimeout(() => {
                this.cont[0].style.marginLeft = 0
            }, 0);
        },
        //下一页
        nex() {
            this.cont[0].style.marginLeft = -this.wt + 'px';
            setTimeout(() => {
                this.cont[0].style.marginLeft = "0px";
                this.side.appendChild(this.cont[0]);
            }, 300);
        }
    }
    window.swiper = SWI

})()