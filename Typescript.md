# 装饰器

- > 修饰一些东西，本身是一个函数，在需要装饰的东西前面使用（@xxx）
- > 使用这个装饰器 必须在 tsconfig.json 中 开启 experimentalDecorators 选项！！
- > 装饰器在 装饰的东西 定义的时候就会执行。


## 类的装饰器
```
const tesetDecorator1 = (constructor: any) => {
	console.log('tesetDecorator1')
	constructor.prototype.getName = () => {
		console.log('test')
	}
}

const tesetDecorator2 = (constructor: any) => {
	console.log('tesetDecorator2')
	constructor.prototype.getName = () => {
		console.log('test')
	}
}

@tesetDecorator1
@tesetDecorator2
class Test {}

const test: any = new Test()

test.getName()

// 先收集后调用，所以输出为 tesetDecorator2 -> tesetDecorator1 -> test
// 执行顺序为 从下到上 从右到左
```

## 方法的装饰器
```
// 普通方法：
// target --> 类的 prototype
// key --> 装饰的 方法 名
// descriptor --> 类似于 Object.definedProperty 的作用

// 静态方法：
// target --> 类的构造函数
// key --> 装饰的 方法 名
// descriptor --> 类似于 Object.definedProperty 的作用

function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
	console.log('target', target)
}


class Test {
	constructor (public name: string) {}

	@getNameDecorator
	getName () {
		console.log(this.name)
	}
}

```

## 访问器的装饰器
```

// target --> 类的 prototype
// key --> 装饰的 访问器 名
// descriptor --> 类似于 Object.definedProperty 的作用
// set get 不能使用同名的 装饰器！！！

function setValueDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
	console.log('target', target)
	console.log('key', key)
	console.log('descriptor', descriptor)
}


class Test {
	constructor (public name: string) {}

	get value () {
		return this.name
	}

	@setValueDecorator
	set value (value) {
		this.name = value
	}
}

const test = new Test('dell')

test.name = '12212'

console.log(test.name)


```

## 属性的装饰器

```
// target --> 类的 prototype
// key --> 装饰的 属性 名

// target[key] = 'xxxx' 修改的并不是实例上的 name，而是原型上的 name
function nameDecorator(target: any, key: string) {
	console.log('target', target)
	console.log('key', key)
	target[key] = '112233'
}


class Test {
	@nameDecorator
	name: string = ''
	constructor (name: string) {
		this.name = name
	}
}

const test: any = new Test('dell')
console.log(test.name) // dell
console.log(test.__proto__.name) // 112233

```

## 参数 装饰器

```

// target --> 类的 prototype
// method --> 装饰的 参数的方法名
// paramIndex --> 参数所在的位置（index）

function paramsDecorator(target: any, method: string, paramIndex: number) {
	console.log('target', target)
	console.log('method', method)
	console.log('paramIndex', paramIndex)
}


class Test {
	getInfo (@paramsDecorator name: string, @paramsDecorator age: number) {
		console.log('name', name)
		console.log('age', age)
	}
}

const test: any = new Test()
test.getInfo('dell', 18)


```

## reflect-metadata

### 给对象添加元属性。
```
import 'reflect-metadata'

const test = {
	name: 'test'
}

Reflect.defineMetadata('ddd', '1122334455', test)

const data = Reflect.getMetadata('ddd', test)

console.log('data', data) // 1122334455

```
### 给类添加 元属性
```

@Reflect.metadata('aaaaa', 'dddddd')
class Test {
	name: string = '112233'
}

console.log(Reflect.getMetadata('aaaaa', Test)) // dddddd

```

### 给类的属性 或者 方法 元属性
```
class Test {
	@Reflect.metadata('aaaaa', 'nameString')
	name: string = '112233'

	@Reflect.metadata('bbbbb', 'fnSring')
	getName () {

	}

	@Reflect.metadata('ccccc', 'getString')
	get value () {
		return ''
	}
}

console.log(Reflect.getMetadata('aaaaa', Test.prototype, 'name')) // nameString
console.log(Reflect.getMetadata('bbbbb', Test.prototype, 'getName')) // fnSring
console.log(Reflect.getMetadata('ccccc', Test.prototype, 'value')) // getString

```
