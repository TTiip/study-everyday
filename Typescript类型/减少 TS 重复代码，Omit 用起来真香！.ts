type User2 = {
	id: string
	name: string
	password: string
	age: number
	createdAt: Date
	updatedAt: Date
}

// 使用 Omit 类型 过滤掉对象中不需要的属性
type OmitUser = Omit<User2, 'id' | 'createdAt' | 'updatedAt'>
// ---> { name: string; password: string; age: number }

type PickUser = Pick<User2, 'id' | 'createdAt' | 'updatedAt'>
// ---> { id: string; createdAt: Date; updatedAt: Date }

// 可以简单的理解 Pick 和 Omit 的结果是互补的。



// 实际应用============
// 去掉原有 type 属性中的 createdAt 和 updatedAt 同时将其转换为 string 类型
type UserUI =  Omit<User2, 'createdAt' | 'updatedAt'> & { createdAt: string, updatedAt: string }

// type ChangeType<T, U extends keyof T> = Omit<T, U> & { [p in U]: string }
// type UserUI = ChangeType<User2, 'createdAt' | 'updatedAt'>
