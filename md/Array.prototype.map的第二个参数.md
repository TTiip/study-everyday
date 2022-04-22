## Array.prototype.map的第二个参数

我们平常在使用map函数时，大多只知道map函数接受一个callback
callback的三个参数分别为：当前循环的item，当前循环的index下标，以及传入的数据arr

对于map函数 接收出callback以外，还接受一个thisArr字段当作 map 函数的第二个参数。
当作map执行函数的this，如果省略了 thisValue，或者传入 null、undefined，那么回调函数的 this 为全局对象。

### 仅传入一个 callback
```
const arr = [1, 2, 3, 4]

arr.map(item => {
	console.log(item) // 依次打印1, 2, 3, 4
})
// 最后返回的是一个 [undefined, undefined, undefined, undefined]


```

### 传入第二个参数
### 无效果版本
```
const arr = [1, 2, 3, 4]

const options = {
	name: 'test'
}
// 此处使用箭头函数，在定义map的时候直接绑定了函数内的 this 指向 window，所以后面传递啥都没用
// ！！！
// 切记这里不能使用 箭头函数
arr.map(item => {
	console.log(item) // 依次打印1, 2, 3, 4
	console.log(this) // 这里 打印的是 window 对象
}, options)
// 最后返回的是一个 undefined的数组
// [undefined, undefined, undefined, undefined]

```

### 有效果版本

```
const arr = [1, 2, 3, 4]

const options = {
	name: 'test'
}
arr.map(function (item) {
	console.log(item) // 依次打印1, 2, 3, 4
	console.log(this) // 这里 打印的是 { name: 'test' } 对象
}, options)
// 最后返回的是一个undefined的数组
// [undefined, undefined, undefined, undefined]
```
