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
