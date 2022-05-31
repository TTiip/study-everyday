// type Exclude<T, U> = T extends U ? never : T
// type Extract<T, U> = T extends U ? T : never
// type NonNullable<T> = T extends null | undefined ? never : T
// type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
// type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

// T extends U ? X : Y
// 可以理解为，当类型 T 可以赋值给类型 U 时，返回值为 X，否则返回值为 Y。

type TypeName<T> =
	T extends string ? 'string' :
	T extends number ? 'number' :
	T extends boolean ? 'boolean' :
	T extends undefined ? 'undefined' :
	T extends Function ? 'function' :
	'object'

type TT0 = TypeName<string> // 'string'
type TT1 = TypeName<'a'> // 'string'
type TT2 = TypeName<true> // 'boolean'
type TT3 = TypeName<() => void> // 'function'
type TT4 = TypeName<string[]> // 'object'
type TT5 = TypeName<{}> // 'object'

type TT10 = TypeName<string | (() => void)> // "string" | "function"
type TT11 = TypeName<string | string[] | undefined> // "string" | "undefined" | "object"

// 因为，TypeName 属于分布式条件类型。
// T extends U ? X : Y
// 在条件类型中，被检查的属性是一个 "裸类型" 参数 (没有被数组、元组、Promise 包装过的类型)。
// T[]、[T]、Promise<T> 这三种处理以后不是 "裸类型" 参数，该条件类型称之为 分布式条件类型。


// 分布式条件类型 传入的参数是联合类型的话，在运算时会分别计算即:

// A | B | C extends U ? X : Y
// 变成以下情况
// (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)

// 举个栗子：
type Naked<T> = T extends boolean ? 'Yes' : 'No'
type Naked0 = Naked<number | boolean> // "No" | "Yes"

type WrappedTuple<T> = [T] extends [boolean] ? 'Yes' : 'No'
type WrappedArray<T> = T[] extends boolean[] ? 'Yes' : 'No'
type WrappedPromise<T> = Promise<T> extends Promise<boolean> ? 'Yes' : 'No'

type WrappedTuple0 = WrappedTuple<number | boolean> // "No"
type WrappedTuple1 = WrappedArray<number | boolean> // "No"
type WrappedTuple2 = WrappedPromise<number | boolean> // "No"

// 由以上结果可知，如果条件参数被包装过，该条件类型就不属于分布式条件类型。
// 所以在运算时就不会被分解成多个条件运算分支。


// 使用条件类型 + 映射类型，我们就可以是实现一些自定义的类型生成器。
interface User1 {
	id: number
	name: string
	age: number
	updateName(newName: string): void
}

type GetFunctionPropertyNames<T> = {
	[K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

type GetFunctionProperty<T> = Pick<T, GetFunctionPropertyNames<T>>

type FunctionName = GetFunctionPropertyNames<User1> // "updateName"
type FunctionProperty = GetFunctionProperty<User1> //
/*
	{
		updateName: (newName: string) => void;
	}
*/

// type GetFunctionPropertyNames<T> = {
// 	[K in keyof T]: T[K] extends Function ? K : never
// }
// ----> 注意上面这行 没有 [keyof T]
// 所以下面的返回 FunctionName 结果是一个 interface

// type FunctionName = GetFunctionPropertyNames<User1>
/*
	type FunctionName = {
		id: never;
		name: never;
		age: never;
		updateName: "updateName";
	}
*/
