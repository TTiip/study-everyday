/**
 * @param {number} n
 * @return {number}
 */
const fib = function(n) {
	if (n < 2) {
		return n
	}
	let prev = 0
	let next = 0
	let res = 1
	for (let i = 2; i <= n; i++) {
		prev = next
		next = res
		res = prev + next
	}
	return res
}

export {
	fib
}
