let obj = {
    sum(){
        eval('console.log(this)')   // obj
    },
    name: 9
}

eval('var v = 199;var i =3;')   // let 存在作用域
console.log(i) 