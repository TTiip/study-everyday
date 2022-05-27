// javascript 中我们可以使用 Object.keys 来获取对象的 健，返回的是健组成的数组。

// const user = {
// 	id: 666,
// 	name: '张三'
// }

// Object.keys(user)

// Typescript 中

// 获取 type interface 等类型，获取类型的健 使用 keyof

type KeyofType = {
	id: number,
	name: string
}

// 其返回类型是联合 “健” 组成的联合类型
type keys = keyof KeyofType

// 使用类似于对象取值的语法进行值得获取。
type Utest1 = KeyofType['id']
type Utest2 = KeyofType['id' | 'name']

type Utest3 = KeyofType[keyof KeyofType]

// 实际工作中一般用于以下情景
// ！！！
// js 写法

// const usera = {
// 	id: 666,
// 	name: '张三'
// }

// function getProperty (obj, key) {
// 	return obj[key]
// }

// getProperty(usera, 'name')

// ts写法

const usera = {
	id: 666,
	name: '张三'
}

function getProperty<T extends object, K extends keyof T> (obj: T, key: K) {
	return obj[key]
}

getProperty(usera, 'id')
getProperty(usera, 'name')
getProperty(usera, 'age')

// 上述情况使用
// T extends UseraType 约束参数 obj 的类型 为 object 的类型或者其子类型
// K extends T 约束参数 key 的类型
// 当不存在 key 的时候，会报错

// 不仅可以运用在 对象类型 以下情况也是可以的

type K1 = keyof boolean // "valueOf"
type K2 = keyof number  // "toString" | "toFixed" | "toExponential" | "toPrecision" | "valueOf" | "toLocaleString"
type K3 = keyof any     // string | number | symbol

enum HttpMethod {
	GET,
	POST,
	PUT,
	DELETE
}

type HttpMethodKeys = keyof typeof HttpMethod // "GET" | "POST" | "PUT" | "DELETE"

// 此处补充一点 typeof 用法

const userTest = {
	id: 12,
	name: 'test',
	address: 'n'
}

type userTypeOf = typeof userTest
// 转化以后变成

/**
	type xxxx = {
		id: number,
		name: string,
		address: string
	}
 */

// keyof 不能直接使用 作用于 定义的值
// 所以此处需要先将定义的对象转换成 类型
// 之后再使用 keyof 获取 健
