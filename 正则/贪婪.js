

// let str = '<p>234234</p><div>几天</div>'

let strDiv = '<div>345</div><p></p>'

// let reg = /\<.+?\>.*?\<\/.+?\>/g  // 量词跟?

// let reg1 = /\<\div\>\<\/\div\>/g

console.log( strDiv.match( /\d/g ) )
// console.log( JSON.parse(JSON.stringify(str.match(reg)).replace(/<.+?\>/g,'')) )

let obj = { name: 9 }

let s = eval('obj.name')

console.log(s)
