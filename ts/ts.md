##### TypeScript小🖊记
---

    js的片段中开辟了一条ts的笔记空间,可能记录的只是遇到的小部分栗子,就没必要再存一个项目了


# null 和 undefined的失误
---

定义类型`string` `boolean` `number`,当其赋值为`null`或者`undefined`也是可行的,或许某些情况我们无法预料到他的值  
例如:
```typescript
    let name = 'Mr j'
    name = null
    return name.length // Error
```
ts.config可配置严格的检查`null`或者`undefined`
```json
    {
    "compilerOptions": {
        "strictNullChecks": true
            // ...
        }
    }
```
构建可空联合类型
```typescript
    let name: string | null

    // 如何js保护可空联合类型属性访问
    if(name) {
        return name.length
    }
    return name
```

# TS也是支持映射的
---
```typescript
    interface Iperson {
        name: string
    }
    interface Iman extends Iperson{
        sex: Iperson['name']
        // sex: Iperson['name' | 'propName']
    }

    const man: Iman = {
        name: 'jc',
        sex: '🚹'
    }
```

# KeyOf的神奇之处
---

```typescript
    interface Ifoo {
        name: string
        sex: number
    }
    const foo: Ifoo = {
        name: 'j',
        sex: 1
    }
    function prop(objs: Ifoo, vKey: string) {
        return objs[vKey]
    }
    prop(foo, 'x') // 此时是没有x键的 真是令人难堪


    // 方案1
    function prop(objs: Ifoo, vKey: keyof Ifoo): Iobj[keyof Iobj] {
        return objs[vKey]
    }    // 此时约束了vKey的来源是跟objs息息相关

    // 方案2
    function prop<T extends object, K extends keyof T>(objs: T, vKey: K): T[k] {
        return objs[vKey]
    }   // 此时约束了T是object的子类型,K必须得是T的子类型
```