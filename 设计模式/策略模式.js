' if else switch case过多影响代码的可维护性 拓展性 '


// 商品双11打折优惠力度 会员八折 非会员九折   双12会员满100 减50元   非会员减30
' if else 篇 '

function saleIFELSE1(type, price) {
    if(type === 'R80') {
        return price * 0.8
    } else if(type === 'R90') {
        return price * 0.9
    } else if(type === 'R_100-30') {
        return price - parseInt(price / 100) * 30
    } else {
        return price - parseInt(price / 100) * 50
    }
}

// 逻辑封装在if else中,拓展性仅仅为修改代码  例: 元旦节活动 会员满100减60 非会员满100减40
' if else 实现 '

function saleIFELSE2(type, price) {
    if(type === 'R80') {
        return price * 0.8
    } else if(type === 'R90') {
        return price * 0.9
    } else if(type === 'R_100-30') {
        return price - parseInt(price / 100) * 30
    } else if(type === 'R_100-50'){
        return price - parseInt(price / 100) * 50
    } else if(type === 'R_100-40'){
        return price - parseInt(price / 100) * 40
    } else if(type === 'R_100-60'){
        return price - parseInt(price / 100) * 60
    }
}
' 当出现新需求,导致该块代码极难维护和管理 '

' 策略模式实现 '
let saleStrategy = function sale1() {
    // 管理策略算法
    let strategy = {
        'R80'(price) {
            return price * 0.8
        },
        'R90'(price){
            return price * 0.9
        },
        'R_100-30'(price){
            return parseInt(price / 100) * 30
        },
        'R_100-50'(price){
            return parseInt(price / 100) * 50
        },
    }
    return {
        price(type, price) {
            type in strategy ? strategy[type](price) : alert('该算法未生成')
        },
        add(type, fn) {
            type in strategy ? alert('该算法已生成,无法添加') : strategy[type] = fn
        },
        delete(type) {
            type in strategy ? delete strategy[type] : alert('暂未拥有该算法')
        }
    }
}()

//例: 元旦节活动 会员满100减60 非会员满100减40
saleStrategy.add('R_100-60', ()=> parseInt(price / 100) * 60)
saleStrategy.add('R_100-40', ()=> parseInt(price / 100) * 40)

' 策略模式使得复杂多变的if else场景变得具有拓展性和良好的可维护性 '