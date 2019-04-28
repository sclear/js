/**
 * @param {with} 改变作用域
 * 1、性能问题
 * 2、语义不明，调试困难
 */

let obj = {
    name: '蒋超'
}

with(obj) {
    console.log(name)   // 蒋超
    console.log(this)   // this依然未改变成期望的obj
}