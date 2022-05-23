function great(value: string): string {
	return `Hello ${value}`
}

// 这里传入的是 string 类型的参数，返回值是 string 类型

// 如果 传入的是一个数组，需要返回 对应类型的数组
// 可以使用 1. 联合类型 或者 2.使用函数重载。


// 函数重载 分为 重载签名和实现签名

// 重载签名(可以有多个) 定义函数的参数类型 和 返回值类型，但是不包含函数体。

// 实现签名(只能有一个) 定义函数的参数类型 和 返回值类型(一般使用 unknown 或者 any 的通用类型类型)，且包含函数体。

// 实际使用种个只有重载 签名才能调用

// 当编译器 处理函数重载的时候 会根据传入的参数类型来匹配重载签名
// 尝试使用第一个 重载定义 如果匹配 则立即返回
// 如果匹配不到，就会报错(类型匹配失败)。

// ！！！！特别注意 两个 重载签名的参数名 不能一样！！！！
type MessageType = 'string' | 'image' | 'audio'
type Message = {
	id: number
	type: MessageType
	content: string
}
const data: Message[] =[]

// 重载签名
function getMessage(id: number): Message | undefined
function getMessage(type: MessageType): Message[]

// 实现签名
function getMessage(query: any): any {
  if (typeof query === "number") {
    return data.find(message => message.id === query)
  } else {
    return data.filter(message => message.type === query)
  }
}

// 类的方法重载
class Calculator {
	add (a: number, b: number): number
	add (a: string, b: string): string
	add (a: string, b: number): string
	add (a: number, b: string): string
	add (a: any, b: any): any {
		if (typeof a === 'string' || typeof b === 'string') {
			return a.toString() + b.toString()
		}
		return a + b
	}
}
