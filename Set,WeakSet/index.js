
// Set
        //成员无重复 期间类型无转换 '5' 5依然区分
        let foo = new Set([ 1, 2, 3, 3, 3 ]) // [ 1, 2, 3 ]

        //应用: 去重
                let ary = [ 1, 2, 3, 3, 3 ]
                ary = Array.from(new Set(ary)) || [ ...new Set(ary) ]; //Array.from映射出新的结构

                let str = [ ...new Set('asdfsaddaaa') ].join('')
        
        //size
                let fooLength = foo.size //3

        //add has delete clear
                foo.add(true).delete(true).clear().has(true) // [1,2,3,true]  [1,2,3]  []  false 
        // Set.prototype.keys()：返回键名的遍历器
        // Set.prototype.values()：返回键值的遍历器
        // Set.prototype.entries()：返回键值对的遍历器
        // Set.prototype.forEach()：使用回调函数遍历每个成员


// WeakSet 弱引用成员 垃圾处理非引用计数  WeakSet对象消失 引用对象即刻回收
        //成员无重复 成员为引用对象(如果不遵循规则 throw new Error()) symbol无法使用  无size

        //add has delete clear



// Map   
        //突破仅仅能使用字符串作为键的屏障
        let m = new Map()
        let o = { name: 'jc' }
        m.set( o, 'name' )

        m.has(o) // true
        m.get(o) // 'name'
        m.delete(o) // true
        m.has(o) // false
        // key 与内存绑定相关联 ['a'] !== ['a'] 将会是两个键
        // 期间类型无转换'1' 1 依然为两个键
        // 0 -0 +0 将会被视为一个键 
        // NaN严格意义上不等于自身  在Map中 将会被视为一个键

        // size 将会返回总数
            //m.size === 0

        // 数组转为map
            let a = new Map([ [1, 3] ])

// WeakMap 
        // 只接受对象作为键 null除外
        // 添加一个err