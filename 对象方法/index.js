
// is
    '1 == 1 1 === 1 '
    ' ==  存在自动转换类型 '
    ' === NaN 严格意义上不等于自身 ' 
    ' Object.is 部署同值相等的算法 '
    Object.is('1', '1') // true
    Object.is(+0, -0) // fase  特殊情况: +0 -0存在不相等的行为
    Object.is(NaN, NaN) // true 同值相等


// assign
    ' Object.assign()  null Undefined(throw new Error) ' 
    ' 当参数不是对象时 默认转对象 Object.assign(2) 转特殊对象Number{2} ' 
    ' 参数 target source1 source2 ...  目标对象 源对象...  将返回新对象(返回对象与首参数同一引用) ' 
    ' null Undefined 不在首参数 将不会报错,并且跳过 '
    ' 处理数组也是转对象处理 ' 
    Object.assign(SomeClass.prototype, {
        someMethod(arg1, arg2) {
        },
        anotherMethod() {
        }
      });
      
      // 等同于下面的写法
      SomeClass.prototype.someMethod = function (arg1, arg2) {
      };
      SomeClass.prototype.anotherMethod = function () {
      };

// Keys  Values


// entries
      'Object.entries() 返回一个数组'
      ' const o = { a: 1 }  return [ ["a", 1] ]'  
      ' 主动忽略Symbol的属性名的值 '

// fromEntries entries的逆向操作