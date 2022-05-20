function greet (person: string) {
	return 'hello' + person
}

// 联合类型 = 类型A | 类型B
// 可以将多个类型合并为一个类型
type NumOrStr = number | string

// 使用联合类型定义变量
function greet1 (person: string | string[]): string | string[] {
	if (typeof person === 'string') {
		return `Hello, ${person}`
	} else {
		return person.map(name => `Hello, ${name}`)
	}
}

// 此处用 HttpMethods 来限制传入参数的类型。
type HttpMethods = 'GET' | 'POST' | 'DELETE' | 'PUT'
function sendRequest (method: HttpMethods) {}
