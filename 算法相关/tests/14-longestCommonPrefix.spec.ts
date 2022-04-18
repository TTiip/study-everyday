import { longestCommonPrefix } from '../question/14-longestCommonPrefix'

describe('14-longestCommonPrefix', () => {
	test('result1', () => {
		const strs = ["flower","flow","flight"]
		const res = longestCommonPrefix(strs)
		expect(res).toBe('fl')
	})

	test('result2', () => {
		const strs = ["dog","racecar","car"]
		const res = longestCommonPrefix(strs)
		expect(res).toBe('')
	})
})
