import { isPalindrome } from '../question/9-isPalindrome'

describe('isPalindrome', () => {
	test('result1', () => {
		const val = 11211
		const res = isPalindrome(val)
		expect(res).toBe(true)
	})

	test('result2', () => {
		const val = -121
		const res = isPalindrome(val)
		expect(res).toBe(false)
	})

	test('result3', () => {
		const val = 10
		const res = isPalindrome(val)
		expect(res).toBe(false)
	})
})
