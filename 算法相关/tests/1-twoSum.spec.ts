import { twoSum } from '../question/1-twoSum'

describe('509-fib', () => {
	test('result1', () => {
		const nums = [2,7,11,15]
		const target = 9
		const res = [0, 1]

		expect(twoSum(nums, target)).toStrictEqual(res)
	})
	test('result2', () => {
		const nums = [3,2,4]
		const target = 6
		const res = [1, 2]

		expect(twoSum(nums, target)).toStrictEqual(res)
	})
	test('result3', () => {
		const nums = [3,3]
		const target = 6
		const res = [0, 1]

		expect(twoSum(nums, target)).toStrictEqual(res)
	})
})
