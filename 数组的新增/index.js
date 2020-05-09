
' Find找出符合条件的第一项 '
let a = [1, 3, 5, , 2].find((v, i, ary) => v > 2)

' FindIndex找出符合条件的首项的Index '
let b = [1, 3, 5, , 2].findIndex((v, i, ary) => v > 4)


' Flat数组扁平化 拉平 '
' arg参数 n 拉平层数 '
let c = [1, 3, [4, 5], [6, 7, [8, 9]]].flat(3)
console.log(c)

' FlatMap ~ Map '
' 参数1(回调) 参数2(bind this)  '






// some( 满足单项 ) every( 全部满足 )
let d = [1, 2, 3, 4, 5].some(e => e === 3)
console.log(d) // true

let e = [1, 2, 3, 4, 5].every(e => e >= 1)
console.log(e) // true