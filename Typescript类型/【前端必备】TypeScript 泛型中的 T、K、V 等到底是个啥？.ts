
// 1.========================
// 此处的 T 表示泛型 用来约束某个变量或者返回值得类型。

// function identify<T>(value: T): T {
// 	return value
// }

/*
	正常情况下会有
		T(Type)      : 表示类型
		K(Key)       : 表示对象中的健的类型
		V(value)     : 表示对象中的值的类型
		E(element)   : 表示元素类型
*/

// 2.========================

// function identify<T, U>(value: T[], message: U): T[] {
// 	console.log(message)
// 	return value
// }

// identify<Number, String>([18, 19, 20], '我是泛型')

// 3.========================




