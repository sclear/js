'第一年薪资是10k，涨幅每年5%，那么50年后薪资多少钱'
function money(n) {
    return n === 1 ? 10 : money(n - 1) * 1.05
}
money(50)


'求一个数组前n项和'
let ary = [1, 3, 4, 5, 6, 7, 7, 8, 8, 8, 8]

function sum(n,a) {
    return n === 1 ? ary[0] : sum(n - 1,a)+ary[n-1]
}
sum(4, ary)

'阶乘 30'
function fac(n) {
    return n === 1 ? 1 : fac(n - 1) * n
}
fac(30)


'深拷贝'
let deepObj = [ { ary: [ { name: 'jc', sex: 1, like: [],n: null, fn: ()=> {} } ] } ]
function deepClone(obj) {
    let  cur_object = Array.isArray( obj ) ? [] : {}
    for( let k in obj ) {
        cur_object[k] = typeof obj[k] === 'object' && !obj[k] ? deepClone(obj[k]) : obj[k]
    }
    return cur_object
}
deepClone(deepObj)