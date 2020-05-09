
// 设置默认值

    function defalutArg(name, name1, name) {
        console.log(name)
    }
    defalutArg()

    let sum = 10
    function defalutArg1(n = sum + 1) {
        console.log(n)
    }
    defalutArg1(sum) // 10

    let x = 99;
    function foo(p = x + 1) {
        console.log(p);
    }
    foo() // 100

    ' 对象结构 '
    ' undefined特殊参数 将不会影响形参结构行为 '   
    function foo1({ name = 1 } = {}) {
        console.log(name)
    }
    // foo1( { name: undefined } )
    

    function n(a) {
        console.log(a)
    }
    n()


    ' Generator '
    function* Gen() {
        yield setTimeout(() => {
            console.log('yield 1')
        }, 1001);
        yield setTimeout(() => {
            console.log('yield 2')
        }, 1000);
        console.log(1)
    }
    // Gen.next()
    let generator = Gen()
    generator.next()
    // generator.next()
