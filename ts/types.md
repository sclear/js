# 声明文件
---

    写声明文件须确保tsconfig的配置 `files` `include` `exclude`包含文件

#### 全局对象
    typescript中当script第三方js文件引入时,文件将会缺少声明,如果挂载全局对象 如: jq将会把自身吐在Window对象  
    定义jq  
    或者是自己写的全局方法 或者定义的全局属性

```typescript

    // 声明全局变量
    declare var num: string

    //声明全局方法
    declare function Jq(str: string): Element

    // 类
    declare class Animal {
        constructor(foo: string)
        say(): string
    }
    // ... 
```


#### 命名空间

    为了全局对象 或者方法添加声明
    举例: JQ

```typescript
    // 对应: jQery.ajax   jQuery.version   jQuery.fn.check
    declare namespace jQuery {
        function ajax(url: string, setting?: any): void
        const version: number
        namespace fn {
            function check(el: string): string
        }
    }

    declare namespace jQuery.fn {
        function check(el: string): string
    }

    /* 当interface定义接口 丢入namespace，全局将会能够访问到该interface
       Iobj是全局可以访问 或 使用的接口
       尽可能少的全局变量，防止命名冲突 */
    interface Iobj = {  
        name: string    
    }
    

    declare namespace jq {

        // Ifoo是局部访问的 全局无法访问
        interface Ifoo { 
            name: string
        }

        const obj: Iobj
        const foo: Ifoo
    }
```

#### 声明合并

    为了防止jq既是函数 也是对象

```typescript

    declare function jq(el: string): Element

    declare namespace jq {
        function ajax(url: string, setting?: any): viod
    }
```

#### npm包

符合`ES6`规范的模块化规范,为其添加声明文件  
下载其声明文件@types/xxx  

主要是为npm包添加声明文件  
```json
    // tsconfig.json 的path baseUrl的指向
    {
        "compilerOptions": {
            "module": "commonjs",
            "baseUrl": "./",
            "paths": {
                "*" : ["types/*"]
            }
        }
    }
```

引入包文件名与包命名需要相同 例: index模块   创建types/foo/index.d.ts

    第一种推荐的方式

```typescript
    '例如引入了 indexof js模块'
    // work.ts
    import indexof from 'indexof'

    // types/indexof/index.d.ts
    '1'
    export default function indexof( str: string ): void;

    '2'
    declare function indexof( str: string ): void
    export default indexof

```

    第二种不推荐的方式

```typescript
    declare module 'indexof' {
        export default function indexof( str: string ): void

        export function foo( str: string ): void
    }
```
