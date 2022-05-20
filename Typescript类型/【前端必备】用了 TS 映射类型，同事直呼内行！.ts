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
// 该类型中的所有的健 都是可选健 或者 只读健

type MyPartial<T> = {
	readonly [P in keyof T]?: T[P]
}
// 使用 + 和 - 来添加或者删除映射类型的健 前面不写符号默认设置为添加
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

// 健重新映射是 as 子句 返回 never 类型，该健将会被删除
// T extends U 可以简单的理解为 T 里面 包不包含 U 的健
type MyExclude<T, U> = T extends U ? never : T
type aa = MyExclude<keyof Circle, 'kind'>

type Circle = {
	kind: 'circle'
	radius: number
}

type RemoveRes = RemoveKindField<Circle>
