// 参考链接: https://deno.land/x/conditional_type_checks@1.0.5/mod.ts

// 加餐！！！
// 判断一个类型是不是 any 类型。
type IsAny<T> = 0 extends (1 & T) ? true : false;

type a1 = IsAny<any>
type a2 = IsAny<number>
type a3 = IsAny<string>
type a4 = IsAny<object>
type a5 = IsAny<Function>
type a6 = IsAny<unknown>
type a7 = IsAny<any[]>
type a8 = IsAny<never>

// 判断一个类型是不是 unknown 类型。
type IsNever<T> = [T] extends [never] ? true : false;

type b1 = IsNever<any>
type b2 = IsNever<number>
type b3 = IsNever<string>
type b4 = IsNever<object>
type b5 = IsNever<Function>
type b6 = IsNever<unknown>
type b7 = IsNever<any[]>
type b8 = IsNever<never>

// 判断一个类型是不是 unknown 类型。
type isUnknown<T> =
	IsNever<T> extends false
    ? T extends unknown
			? unknown extends T
				? IsAny<T> extends false
					? true
					: false
				: false
			: false
    : false

type c1 = isUnknown<any>
type c2 = isUnknown<number>
type c3 = isUnknown<string>
type c4 = isUnknown<object>
type c5 = isUnknown<Function>
type c6 = isUnknown<unknown>
type c7 = isUnknown<any[]>
type c8 = isUnknown<never>

