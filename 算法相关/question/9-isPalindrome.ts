/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = (val) => {
	const str = val.toString()
	const length = str.length
	let left = 0
	let right = length - 1
	// 当比较的字符超过一半的时候，后续都不需要再进行比较了。
	while (left <= length / 2) {
		if (str[left] !== str[right]) {
			return false
		}
		left++
		right--
	}
	return true
}

export {
	isPalindrome
}
