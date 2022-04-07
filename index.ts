
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

