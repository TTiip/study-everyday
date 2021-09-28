### watch笔记

```

## 路由的监听
>>>> vue3.0中的监听路由已经不能使用watch的方法
>>>> 改进方式，使用 onBeforeRouteUpdate

```
```

## 路由参数监听
const route = useRoute()
watch(() => route.query.xx, () => {})

注意：直接 watch(route, () => {}) 可以监听到, 但是 watch(route.query, () => {}) 不能监听到。

>>>>>>>>>>
>>>>>>>>>>
>>>>>>>>>>
总结：监听route时候使用() => {}函数getter函数返回值

```
```

## props监听
const props = definedProps({
  id: {
    type: String,
    default: () => (')
  }
})
watch(() => props.id, () => {})
或者
watch(props, () => {})
或者
watch(props.options, () => {})

>>>>>>>>>>
>>>>>>>>>>
>>>>>>>>>>
总结：三种方式都适用。

```
```

## ref监听
const name = ref('li')
watch(() => name.value, () => {}) 或者 watch(name, () => {})

>>>>>>>>>>
>>>>>>>>>>
>>>>>>>>>>
总结：监听ref时候，传入要么是直接 声明的变量，要么是 () => 变量.value

```
```

## reactive监听
const nameOptions = reactive({ name: 'xxx', age: 18 })
watch(() => nameOptions.name, () => {})

注意：这里直接监听 nameOptions 没有效果。

>>>>>>>>>>
>>>>>>>>>>
>>>>>>>>>>
总结：两种方式都适用

```

```

## computed监听
const comVal = computed(() => {})
watch(() => comVal.value, () => {}) 或者 watch(comVal, () => {})

>>>>>>>>>>
>>>>>>>>>>
>>>>>>>>>>
总结：监听reactive监听，使用() => {}函数getter函数返回值

```

## watch 大总结
```
######使用getter形式######：
1. 路由参数监听(() => route.query.变量名)
2. props监听(() => props.变量名)
3. ref监听(() => 变量名.value)
4. reactive监听(() => 变量名.reactive中的属性)
5. computed监听(() => 变量名.value)

######使用响应式对象######：
1. props监听(porps 或者 props.变量名)
2. ref监听(变量名称)
3. computed监听(变量名称)

```
