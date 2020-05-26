' 定义对象的一对多关系, 发布者与订阅者互不联系, 完全解耦. 发布者通知调度中心, 调度中心与订阅者绑定,事件集中管理派发'

class ob {
    constructor() {
        this.observeArray = {}
    }
    // 订阅
    on(eventType, fn) {
        if(!this.observeArray[eventType]) this.observeArray[eventType] = [];
        this.observeArray[eventType].push(fn)
    }
    // 发布
    emit(eventType, ...arg) {
        if(this.observeArray[eventType]) {
            setTimeout(()=> {
                this.observeArray[eventType].forEach(evt=> { evt(...arg) })
            },4)
        }
    }
    // 取消订阅
    remove(eventType, fn) {
        if(!fn || !this.observeArray[eventType]) return false
        this.observeArray[eventType] = this.observeArray[eventType].filter(item=> item !== fn)
        if(!this.observeArray[eventType].length) delete this.observeArray[eventType]
    }
}

let observe = new ob()
function sayName(name) {
    console.log(name)
}
observe.on('myname', sayName)
observe.on('myname2', sayName)
observe.on('myname3', sayName)
observe.remove('myname', sayName)
console.log(observe)
