' 一个工厂能提供一个创建对象的公共接口，我们可以在其中指定我们希望被创建的工厂对象的类型 '

// 自行车专卖店对自行车的各种款式生产
class bicycle {
    constructor() {
        this.year = 15;
        this.wheel = 2;
    }
    speed() {
        console.log('我跑的贼快')
    }
}
// 各种类型车的生产方式
class longBicycle extends bicycle {
    constructor(color) {
        super()
        this.color = color
    }
}
class midBicycle extends bicycle {
    constructor(color) {
        super()
        this.color = color
    }
}
class smallBicycle extends bicycle {
    constructor(color) {
        super()
        this.color = color
    }
}

// 创建车的类
class CreateBicycle {
    Create(type) {
        switch(type) {
            case 1: return new longBicycle('white')
            case 2: return new midBicycle('black')
            case 3: return new smallBicycle('gray')
        }
    }
}