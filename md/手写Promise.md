## 简单实现

基于应用场景发现promise可以有三种状态，分别是pedding 、Fulfilled、 Rejected。
```
	Pending Promise对象实例创建时候的初始状态
	Fulfilled 可以理解为成功的状态
	Rejected可以理解为失败的状态
```
- 1.构造一个Promise实例需要给Promise构造函数传入一个函数。传入的函数需要有两个形参，两个形参都是function类型的参数。分别是resolve和reject。

- 2.Promise上还有then方法，then 方法就是用来指定Promise 对象的状态改变时确定执行的操作，resolve 时执行第一个函数（onFulfilled），reject时执行第二个函数（onRejected）

- 3.当状态变为resolve时便不能再变为reject，反之同理。

```
function Promise(executor){ //executor执行器
	let self = this
	self.status = 'pending' //等待态
	self.value  = undefined // 表示当前成功的值
	self.reason = undefined // 表示是失败的值
	function resolve(value){ // 成功的方法
		if(self.status === 'pending'){
			self.status = 'resolved'
			self.value = value
		}
	}
	function reject(reason){ //失败的方法
		if(self.status === 'pending'){
			self.status = 'rejected'
			self.reason = reason
		}
	}
	executor(resolve,reject)
}

Promise.prototype.then = function(onFufiled,onRejected){
	let self = this
	if(self.status === 'resolved'){
		onFufiled(self.value)
	}
	if(self.status === 'rejected'){
		onRejected(self.reason)
	}
}
module.exports = Promise

```
