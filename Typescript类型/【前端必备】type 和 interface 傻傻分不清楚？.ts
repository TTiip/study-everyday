// type 和 interface

// 相同点!!!

// 1. 类型别名和接口都可以用来定义对象或者函数
// type Point = { x: number, y: number }
// type SetPoint = (x: number, y: number) => void

// interface Point { x: number, y: number }
// interface SetPoint { (x: number, y: number): void }

// 2. 类型别名和接口都支持扩展
// type Animal = { name: string }
// type Bear = Animal & { honey: boolean }

// interface Animal { name: string }
// interface Bear extends Animal { honey: boolean }

// 或者========
// type Animal = { name: string }
// interface Bear extends Animal { honey: boolean }

// interface Animal { name: string }
// type Bear = Animal & { honey: boolean }





// 不同点!!!
// 1. 类型别名可以为基本类型、联合类型或者元组类型，接口不行
// type MyNumber = number
// type StringOrNumber = string | number
// type Point = [number, string]


// 2. 同名的接口会自动合并，类型别名不会
// interface User1 { name: string }
// interface User1 { id: string }
// let user1: User1 = { name: 'Tom', id: '123' }


// 总结
// 使用类型别名的场景：
// - 定义基本类型的别名时，使用 type
// - 定义元组类型时，使用 type
// - 定义函数类型时，使用 type
// - 定义联合类型时，使用 type
// - 定义映射类型时，使用 type


// 使用接口的场景：
// - 需要利用接口的自动合并特性的时候 使用 interface
// - 定义对象类型且无需使用 type 的时候 使用 interface
