const twoSum = (nums, target) => {
	// 简历一个map，key是数字，value是下标
	const map = new Map()
	// 遍历数组 通过map.get(target - num) 查找是否有相同的数字
	// 一次循环 时间复杂度O(n)
	for (let i = 0; i < nums.length; i++) {
		const diff = target - nums[i]
		if (map.has(diff)) {
			return [map.get(diff), i]
		} else {
			map.set(nums[i], i)
		}
	}
	return []
}

export {
	twoSum
}
