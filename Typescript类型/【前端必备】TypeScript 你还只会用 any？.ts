// TS 中 存在两个通用父类型 关键字 any 和 unknown

// any 类型
// 理解成我不在乎它的类型
// 它是类型系统的一个逃生窗口
// 可以 允许我们对 定义为 any 类型的变量进行 任何！！ 操作，无需实现进行类型约束

function testF1 (callBack: any) {
	try {
		callBack()
	} catch (err) {
		console.error(err)
	}
}
testF1(1)
// 这里不会报错
// 因为 any 类型的原因 我们可以对定义的变量做任何操作，只有在执行的时候才会出现 运行错误。



// unknown 类型
// 理解为我不知道它的类型
// 可以简单的理解它为 类型安全的 any 类型

function testF2 (callBack: unknown) {
	try {
		// 直接调用会报错。
		// callBack() // 对象的类型为 "unknown"。

		// 这里类型收窄，判断类型是 函数再进行调用
		if (typeof callBack === 'function') {
			callBack()
		}
	} catch (err) {
		console.error(err)
	}
}
testF2(1)

// 这里会报错
// TS 会对 unknown 类型的参数进行类型检查，避免出现 callBack 参数为非函数类型。


// 另外，unknown 类型的变量只能赋值为 unknown 或者 any 类型的变量
let v1: unknown

let va1: unknown = v1
let va2: any = v1

// 以下 全会报错
let va3: boolean = v1
let va4: number = v1
let va5: string = v1
let va6: symbol = v1
let va7: any[] = v1
let va8: object = v1
let va8: Function = v1

// 还有一点！！！！！
type T40 = keyof any // string | number | symbol
type T41 = keyof unknown // never

type T50<T> = {
	[K in keyof T]: number
}

type T51 = T50<any> // { [x: string]: number }
type T52 = T50<unknown> // {}

// 因为 映射类型中的 key 是 never 类型，该类型会被过滤掉，所以 T52 为空对象。

// 总结：
// any: 你可以把任何值赋值乘 any 类型的变量,并对该变量执行任何操作。

// unknown: 你可以把任何值赋值给 unknown 类型的变量
// 但是必须进行类型检查或者类型断言才能对该变量执行任何操作。

// ！！！
// 实际工作中：我们应当使用 unknown 类型来代替 any 类型

// 两种类型与任何类型的变量 交叉、联合类型的结果

// 联合类型部分
type T00 = unknown & null // null
type T01 = unknown & undefined // undefined
type T02 = unknown & null & undefined // never
type T03 = unknown & string // string
type T04 = unknown & string[] // string[]
type T05 = unknown & any[] // any[]
type T06 = unknown & Function // Function
type T07 = unknown & object // object
// 这里特别注意！！！
type T08 = unknown & any // any

// 交叉类型部分
type T10 = unknown | null // unknown
type T11 = unknown | undefined // unknown
type T12 = unknown | null | undefined // unknown
type T13 = unknown | string // unknown
type T14 = unknown | string[] // unknown
type T15 = unknown | any[] // unknown
type T16 = unknown | Function // unknown
type T17 = unknown | object // unknown
// 这里特别注意！！！
type T18 = unknown | any // any
