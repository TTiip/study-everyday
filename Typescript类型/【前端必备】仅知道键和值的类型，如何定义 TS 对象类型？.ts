// const user = {}

// user.id = 'TS001'
// user.name = 'Hexirs'

// 以上代码因为没有定义 user 的 类型 所以直接赋值 TS 就提示错误。

// 正常工作中 需要以下的场景。

const Wang = {
	base: 10000,
	bonus: 2000
}

const Guo = {
	Salary: 26000
}

// 这里我们一般会定义一个函数去生成对应的对象
// function calculateSalary (salaryObject: ???) {
// 	let total = 0
// 	for (const name in salaryObject) {
// 		total += salaryObject[name]
// 	}
// 	return total
// }

// 这里的 ??? 应该怎么定义呢？一般我们会使用 索引签名。

// 索引签名参数类型必须是 “string”、“number”、“symbol”或模板文本类型。
interface Dictionary {
	[key: string]: string
}

interface DictionaryString {
	[key: `${string}Change`]: () => void
}

const user: DictionaryString = {
	idChange: () => {},
	nameChange: () => {},
	// ageShange: () => {} // TS 报错，因为 ageShange 不符合 `${string}Change`
}

// 定义索引签名，实现索引签名。

type salaryType = {[key: string]: number}
function calculateSalary (salaryObject: salaryType) {
	let total = 0
	for (const name in salaryObject) {
		total += salaryObject[name]
	}
	return total
}

// 确定健的索引签名
// 以下 类型中的 timeout 为确定的健。
type Options = {
	[key: string]: string | number | boolean
	timeout: number
}

const options: Options = {
	timeout: 1000,
	errorMessage: 'Something went wrong',
	isSuccess: true
}

// Record 定义出需要的类型

const user1: { [key: string]: string } = {
	name: 'Test'
}

const user2: Record<string, string> = {
	name: 'Test'
}

// 区别!!!!!!!!!

// 索引类型的值只能是 string、number、是 sytmol、模板字符串 四种。

// 报错：索引签名参数类型不能为文本类型或泛型类型。请考虑改用映射的对象类型。
// type User1 = {
// 	[key: 'id']: string
// }
// type User2 = {
// 	[key: 'id' | 'name']: string
// }

// Record 可以定义 除了上述四种类型以外的联合类型。
type User3 = Record<'id', string> & Record<string, string>
type User4 = Record<'id' | 'name', string> & Record<string, string>

const user5: User3 = {
	id: 'TS001',
	aa: '123'
}
