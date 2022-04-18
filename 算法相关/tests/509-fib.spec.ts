import { fib } from '../question/509-fib'

describe('fib', () => {
	test('result1', () => {
		const fib0 = fib(0)
		const fib1 = fib(1)
		const fib2 = fib(2)
		expect(fib2).toBe(fib0 + fib1)
	})
	test('result2', () => {
		const fib1 = fib(1)
		const fib2 = fib(2)
		const fib3 = fib(3)
		expect(fib3).toBe(fib1 + fib2)
	})
	test('result3', () => {
		const fib2 = fib(2)
		const fib3 = fib(3)
		const fib4 = fib(4)
		expect(fib4).toBe(fib2 + fib3)
	})
})
