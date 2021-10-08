# 简单说一下bind、call、apply的区别
>* 三者都是用于改变函数体内this的指向，
>* 但是bind与apply和call的最大的区别是：bind不会立即调用，而是返回一个新函数，称为绑定函数，其内的this指向为创建它时传入bind的第一个参数，而传入bind的第二个及以后的参数作为原函数的参数来调用原函数。

## bind >>>>>

```
const obj = {}

function test(...arg) {
  console.log('this: ', this === obj)
  console.log('arg: ', arg)
}

test()
// this: false
// arg: []

const testObj = test.bind(obj, 'testObj text')

testObj()
// this: true
// arg: testObj text

```

## call >>>>>
注： 第一个参数是改变的this的对象，第二个及其以后的参数都是数组里面的元素

```
const obj = {}

function test(...arg) {
  console.log('this: ', this === obj)
  console.log('arg: ', arg)
}

test()
// this: false
// arg: []

const testObj = test.call(obj, 'callStr1', 'callStr2', 'callStr3')

// 绑定以后直接调用
// this: true
// arg: callStr

```

## apply >>>>>
注： 第一个参数是改变的this的对象，第二个参数是一个参数数组

```
const obj = {}
// 这里需要注意一下是...arg
function test(...arg) {
  console.log('this: ', this === obj)
  console.log('arg: ', arg)
}

test()
// this: false
// arg: []

const testObj = test.apply(obj, ['callStr1', 'callStr2', 'callStr3'])

// 绑定以后直接调用
// this: true
// arg: callStr

```

apply和call都是为了改变某个函数运行时的上下文而存在的（就是为了改变函数内部this的指向）；apply和call的调用返回函数执行结果；

如果使用apply或call方法，那么this指向他们的第一个参数，apply的第二个参数是一个参数数组，call的第二个及其以后的参数都是数组里面的元素，就是说要全部列举出来

## 区别总结：

>* 当我们使用一个函数需要改变this指向的时候才会用到call,apply,bind
>* 如果你要传递的参数不多，则可以使用fn.call(thisObj, arg1, arg2 ...)
>* 如果你要传递的参数很多，则可以用数组将参数整理好调用fn.apply(thisObj, [arg1, arg2 ...])
>* 如果你想生成一个新的函数长期绑定某个函数给某个对象使用，则可以使用

# 简单实现

## myBind >>>>>

```
Function.prototype.myBind = function() {
  const _this = this
  const context = [].shift.call(arguments) // 保存需要绑定的this上下文
  const args = [].slice.call(arguments) // 剩下参数转为数组
  console.log(_this, context, args)
  return function() {
    return _this.apply(context, [].concat.call(args, [].slice.call(arguments)))
  }
}
```

## myCall >>>>>

```
/**
 * 每个函数都可以调用call方法，来改变当前这个函数执行的this关键字，并且支持传入参数
 */
Function.prototype.myCall = function(context) {
  // 第一个参数为调用call方法的函数中的this指向
  const context = context || global
  // 将this赋给context的fn属性
  context.fn = this // 此处this是指调用myCall的function

  const arr = []
  for (const i=0,len=arguments.length i<len i++) {
    arr.push("arguments[" + i + "]")
  }
  // 执行这个函数，并返回结果
  const result = eval("context.fn(" + arr.toString() + ")")
  // 将this指向销毁
  delete context.fn
  return result
}
```

## myApply >>>>>

```
/**
 * apply函数传入的是this指向和参数数组
 */
Function.prototype.myApply = function(context, arr) {
  const context = context || global
  context.fn = this
  const result
  if (!arr) {
    result = context.fn() // 直接执行
  } else {
    const args = []
    for (const i=0,len=arr.lengthi<leni++) {
      args.push("arr[" + i + "]")
    }
    result = eval("context.fn([" + args.toString() + "])")
  }
  // 将this指向销毁
  delete context.fn
  return result
}
```

注意：绑定函数(bind函数返回的新函数)不可以再通过apply和call改变其this指向，即当绑定函数调用apply和call改变其this指向时，并不能达到预期效果。

```

const obj = {}

function test() {
  console.log(this === obj)
}

const testObj = test.bind(obj)
testObj()  //true

const objTest = {
  "作者": "chengbo"
}
/**
 * 预期返回false, 但是testObj是个绑定函数，所以不能改变其this指向
 */
testObj.apply(objTest) // true
testObj.call(objTest) // true
```