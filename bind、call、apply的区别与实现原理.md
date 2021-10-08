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
// arg: undefined

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
// arg: undefined

const testObj = test.call(obj, 'callStr1', 'callStr2', 'callStr3')

testObj()
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
// arg: undefined

const testObj = test.apply(obj, ['callStr1', 'callStr2', 'callStr3'])

testObj()
// this: true
// arg: callStr

```

apply和call都是为了改变某个函数运行时的上下文而存在的（就是为了改变函数内部this的指向）；apply和call的调用返回函数执行结果；

如果使用apply或call方法，那么this指向他们的第一个参数，apply的第二个参数是一个参数数组，call的第二个及其以后的参数都是数组里面的元素，就是说要全部列举出来;