// TS 的交叉类型

// 非对象类型交叉运算
type N0 = string & number
type N1 = any & 1
type N2 = any & never

// 对象类型交叉运算
type A = { kind: 'a', foo: string }
type B = { kind: 'b', foo: number }
type C = { kind: 'c', foo: number }

type AB = A & B
type BC = B & C
type AC = A & C

// 函数类型的交叉运算

type Fa1 = (a: string, b: string) => void
type Fa2 = (a: number, b: number) => string

type Fn = Fa1 & Fa2

// 可以把 类型 理解为一系列 值 的集合。

// 交叉运算符 &
// 可以把多个类型合并为一个类型。
// 重要的一个特性: 父类型收敛 --> 如果 B 是 A 的父类型，则 A & B 将被收敛成 A 类型。

type A0 = 1 & number // 1
type A1 = '1' & string // '1'
type A2 = true & boolean // true

// 当 出现 any 的时候，类型收敛会有一些不一样的地方。
// 除了 never 类型以外，任何类型与 any 类型做交叉计算，都会返回 any 类型。
type A3 = any & 1 // any
type A4 = any & boolean // any
type A5 = any & never // never

// 对象类型的交叉运算

interface Point {
	x: number
	y: number
}

interface Named {
	name: string
}

type PointNamed = Point & Named
// 结果为： PointNamed = { x: number; y: number; name: string; }

// 属性字段名字部分一致，类型不一致的 交叉运算
interface X {
	c: string
	d: string
}

interface Y {
	c: number
	e: string
}

type XY = X & Y
type YX = Y & X

const p: XY = { c: 'c', d: 'd', e: 'e' } // 报错： 不能将类型“string”分配给类型“never”。ts(2322)
const q: YX = { c: 6, d: 'd', e: 'e' } // 报错： 不能将类型“string”分配给类型“never”。ts(2322)

// 此处对象中的 c 属性 为 string & number
// 即获取的类型既可以是 string 类型，也可以是 number 类型(很显然这种类型不存在，所以返回never)



// 那么，如果不同的对象中含有相同的属性，且属性类型是非基本数据类型的话，结果会是怎样呢?
interface D { d: boolean }
interface E { e: string }
interface F { f: number }

interface AA { x: D }
interface BB { x: E }
interface CC { x: F }

type ABC = AA & BB & CC

const abc: ABC = {
	x: {
		d: true,
		e: 'tttt',
		f: 666
	}
}
// 由以上结果可知，在多个类型进行交叉运算时，若存在相同的属性，且属性的类型是对象类型
// 那么属性会按照对应的规则进行合并

// 但是需要注意，对象类型进行交叉运算，如果对象中的属性是 字面量类型 或者是 字面类型组成的联合类型
// 最终的交叉运算结果会返回 never 类型

type AA1 = { kind: 'a', foo: string }
type BB1 = { kind: 'b', foo: string }
type CC1 = { kind: 'c', foo: string }

type AB1 = AA1 & BB1 // never
type BC1 = BB1 & CC1 // never
type AC1 = AA1 & CC1 // never
type ABC1 = AA1 & BB1 & CC1 // never

// 这里也需要注意一下
type Foo = {
	age: number
	name: string
}

type Bar = {
	age: number
	name: number
}

type Baz = Foo & Bar
/*
	type Baz = {
		name: never --> string & number
		age: number
	}
*/

/*
	当 Foo 中的 name 属性类型改为 boolean 时，即
	type Foo = {
		age: number
		name: boolean --> true | false
	}

	则返回结果:
	type Baz = never
	name 为 true | false 的联合类型，所以返回 type Baz = never
*/


// 函数部分==================================
// type F1 = (a:string, b: string) => void
// type F2 = (a:number, b: number) => string

// const f: F1 & F2 = (a: string | number, b: string | number) => {}

// f('hello', 'world') // 正确
// f(1, 2) // 正确
// f(1, '2') // 错误

// 函数类型的交叉运算 会使用函数重载的方式进行合并
// 解决以上报错可以这么做:
type F1 = (a:string, b: string) => void
type F2 = (a:number, b: number) => string
type F3 = (a: number, b: string) => void

const f: F1 & F2 & F3 = (a: string | number, b: string | number) => ''

f(1, '2') // 正确

