// 参考链接: https://deno.land/x/conditional_type_checks@1.0.5/mod.ts

// 加餐！！！
// 1.判断一个类型是不是 any 类型。================================
type IsAny<T> = 0 extends (1 & T) ? true : false

type a1 = IsAny<any>
type a2 = IsAny<number>
type a3 = IsAny<string>
type a4 = IsAny<object>
type a5 = IsAny<Function>
type a6 = IsAny<unknown>
type a7 = IsAny<any[]>
type a8 = IsAny<never>

// 2.判断一个类型是不是 never 类型。================================
type IsNever<T> = [T] extends [never] ? true : false

type b1 = IsNever<any>
type b2 = IsNever<number>
type b3 = IsNever<string>
type b4 = IsNever<object>
type b5 = IsNever<Function>
type b6 = IsNever<unknown>
type b7 = IsNever<any[]>
type b8 = IsNever<never>

// 3.判断一个类型是不是 unknown 类型。================================
type IsUnknown<T> =
	IsNever<T> extends false
    ? T extends unknown
			? unknown extends T
				? IsAny<T> extends false
					? true
					: false
				: false
			: false
    : false

type c1 = IsUnknown<any>
type c2 = IsUnknown<number>
type c3 = IsUnknown<string>
type c4 = IsUnknown<object>
type c5 = IsUnknown<Function>
type c6 = IsUnknown<unknown>
type c7 = IsUnknown<any[]>
type c8 = IsUnknown<never>

// 4.实现一个 类型转换，功能为 将类型中必填的指定值转化成非必填。================================
type Usera = {
	id: number
	name: string
	age: number
}

/*
	转化成 如下
	type U1 = {
		id?: number | undefined
		name: string
		age: number
	}
*/

type MyGetBykeysAA<T, K extends keyof T> = {
	[P in K]?: T[P]
}

type MyGetBykeysA<T, K extends keyof T> = {
	[P in K]: T[P]
}

type MyExcludeA<T, K> = T extends K ? never : T
type MyPickA<T, K extends keyof T> = {
	[P in K]: T[P]
}

type aaaa = MyGetBykeysA<Usera, 'id'>
/*
	type aaaa = {
		id: number;
	}
*/
type ffff = MyGetBykeysAA<Usera, 'id'>
/*
	type ffff = {
		id?: number | undefined;
	}
*/
type bbbb = MyExcludeA<keyof Usera, 'id'>
/*
	type bbbb = "name" | "age"
*/
type cccc = MyPickA<Usera, bbbb>
/*
	type cccc = {
		name: string;
		age: number;
	}
*/
type gggg = MyGetBykeysA<Usera, bbbb>
/*
	type gggg = {
		name: string;
		age: number;
	}
*/

type hhhh = MyGetBykeysA<Usera, bbbb> & MyGetBykeysAA<Usera, 'id'>
/*
	type hhhh = MyGetBykeysA<Usera, bbbb> & MyGetBykeysAA<Usera, "id">
*/

// 结果!!!
type dddd = MyGetBykeysA<hhhh, keyof hhhh>
/*
	type dddd = {
		id?: number | undefined;
		name: string;
		age: number;
	}
*/


// 利用 数组生成对应的 联合类型 type
// 此处的 as const 作用是固定数组 为指定的值
const array = ['Boolean', 'String', 'Number', 'Date', 'Function', 'Object'] as const

type unionType = typeof array[number]
