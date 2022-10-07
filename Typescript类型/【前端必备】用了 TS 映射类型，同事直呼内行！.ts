// 1.=========================================================
type User = {
	name: string
	age: number
	password: string
	address: string
	phone?: string
}

type UserPartial = {
	name?: string
	password?: string
	address?: string
	phone?: string
}

type ReadonlyUser = {
	readonly name: string
	readonly password: string
	readonly address: string
	readonly phone: string
}

// 在实际工作中我们时常需要将 User 映射成 UserPartial 类型 或者 ReadonlyUser
// 该类型中的所有的键 都是可选键 或者 只读键

type MyPartial<T> = {
	readonly [P in keyof T]?: T[P]
}
// 使用 + 和 - 来添加或者删除映射类型的键 前面不写符号默认设置为添加
// { [P in K] : T }
// { [P in K] ?: T }
// { [P in K] -?: T }
// { readonly [P in K] : T }
// { readonly [P in K] ?: T }
// { -readonly [P in K] ?: T }

// 2.=========================================================
// 可以使用映射类型：

type Item = {
	a: string
	b: number
	c: boolean
}

type T1 = { [P in 'x' | 'y']: number }
// --> { x: number, y: number }

type T2 = { [P in 'x' | 'y']: P }
// --> { x: 'x', y: 'y' }

type T3 = { [P in 'a' | 'b']: Item[P] }
// --> { a: string, b: number }

type T4 = { [P in keyof Item]: Item[P] }
// --> { a: string, b: number, c: boolean }

// 3.=========================================================

// typescript 4.1 新增了Key Remapping

// type MappedTypeWithNewKesy<T> = {
// 	[P in keyof T as NewKeyType]: T[P]
// }

// 其中 NewKeyType 必须是 String Number Symbol 联合类型的子类型

// 例如：
type Getters<T> = {
	[K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

// Capitalize<string & K>
// 此处 K 可能是 symbol 类型，所以需要加上交叉类型 避免报错
type Person = {
	name: string
	age: number
	address: string
}

type LazyPerson = Getters<Person>
// 映射成以下结果
// type LazyPerson = {
// 	getName: () => string,
// 	getAge: () => number,
// 	getAddress: () => string
// }

// 4.=========================================================

type RemoveKindField<T> = {
	[K in keyof T as MyExclude<K, 'kind'>]: T[K]
}

// 详情参考: https://cloud.tencent.com/developer/article/1884330

// 返回 never 类型，该键将会被删除
// T extends U 可以简单的理解为 T 可不可以分配给 U, 而不是说类型 T 是类型 U 的子集。
// 简单理解 T 的范围比 U 的范围要大。

// 如果实在转不过弯来，就直接简单粗暴的理解为 T 包不包含 U，如果包含，就直接返回 never。
type MyExclude<T, U> = T extends U ? never : T
type aa = MyExclude<keyof Circle, 'kind'>

type Circle = {
	kind: 'circle'
	radius: number
}

type RemoveRes = RemoveKindField<Circle>

// 加餐！！！！！
type Human = {
	name: string
	occupation: string
}
type Duck = {
	name: string
}

type Bool1 = Duck extends Human ? 'yes' : 'no' // 'no'
type Bool2 = Human extends Duck ? 'yes' : 'no' // 'yes'

// 此处可以简单的理解成 “多属性的” 可以分配给 “少属性的”
// 少的 不能 给多的 (因为少的不包含多的中的一些属性嘛。)

// 5.=========================================================
// 限制类型
export enum Grade {
  Freshman,
  sophomore,
  Junior,
  Senior
}

type Students = Record<`on${keyof typeof Grade}`, string[]>

const students: Students = {
  onFreshman: ['David', 'John'],
  onsophomore: [],
  onJunior: ['Lily'],
  onSenior: ['Tom'],
	ontest: 112234
};

type Students11 = Record<keyof typeof Grade, string[]>

const students11: Students11 = {
  Freshman: ['David', 'John'],
  sophomore: [],
  Junior: ['Lily'],
  Senior: ['Tom'],
	test: 112234
};

// 6.=========================================================
type a = keyof string
type b = Record<`on${Capitalize<Exclude<string, ''>>}`, (params?: unknown) => unknown>

const A: b = {
	on: () => 'str',
	onClick: (num) => num,
	onclick: () => {}
}
