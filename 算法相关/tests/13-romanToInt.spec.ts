import { romanToInt } from '../question/13-romanToInt'

describe('9-romanToInt', () => {
	test('result1', () => {
		const val = 'III'
		const res = romanToInt(val)
		expect(res).toBe(3)
	})

	test('result2', () => {
		const val = 'IV'
		const res = romanToInt(val)
		expect(res).toBe(4)
	})

	test('result3', () => {
		const val = 'IX'
		const res = romanToInt(val)
		expect(res).toBe(9)
	})

	test('result4', () => {
		const val = 'LVIII'
		const res = romanToInt(val)
		expect(res).toBe(58)
	})

	test('result5', () => {
		const val = 'MCMXCIV'
		const res = romanToInt(val)
		expect(res).toBe(1994)
	})
})
