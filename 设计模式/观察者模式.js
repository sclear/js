' 定义对象的一对多关系, 松解耦, 订阅者与发布者互相联系, 发布者触发事件通知各个订阅者 占用内存 多个观察者错误难以定位'

class Subject {
    constructor() {
        this.Observes = []
    }
    addObserve(observe) {
        if(!this.Observes.includes( observe )) this.Observes.push( observe )
    }
    publish() {
        this.Observes.forEach(observe=> {
            observe.update()
        })
    }
    removeObserve(observe) {
        if(observe && this.Observes.includes(observe)) {
            this.Observes.splice( this.Observes.indexOf(observe), 1 )
        } else {
            this.Observes = []
        }

    }
}

class Observe {
    constructor(name) {
        this.name = name
    }
    update() {
        console.log(`我竟然更新了name:${this.name}`)
    }
}
let Observes = new Subject()

let foo = new Observe('jc')
let foo1 = new Observe('jc1')

Observes.addObserve(foo)
Observes.addObserve(foo1)

Observes.publish()