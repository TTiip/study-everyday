// 参考链接: https://deno.land/x/conditional_type_checks@1.0.5/mod.ts

// 加餐！！！
// 判断一个类型是不是 any 类型。
type IsAny<T> = 0 extends (1 & T) ? true : false

type a1 = IsAny<any>
type a2 = IsAny<number>
type a3 = IsAny<string>
type a4 = IsAny<object>
type a5 = IsAny<Function>
type a6 = IsAny<unknown>
type a7 = IsAny<any[]>
type a8 = IsAny<never>

// 判断一个类型是不是 never 类型。
type IsNever<T> = [T] extends [never] ? true : false

type b1 = IsNever<any>
type b2 = IsNever<number>
type b3 = IsNever<string>
type b4 = IsNever<object>
type b5 = IsNever<Function>
type b6 = IsNever<unknown>
type b7 = IsNever<any[]>
type b8 = IsNever<never>

// 判断一个类型是不是 unknown 类型。
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

