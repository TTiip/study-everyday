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
