/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
	if(strs.length === 0) {
		return ''
	}
	let prefix = strs[0]
	// strs = ["flower", "flow", "flight"]
	// 默认取数组的第一项做为prefix prefix = 'flower'
	// 使用 indexOf 去查找 strs 的每一项中是否有 prefix
	// 存在即返回 index 否则返回 -1 (注明：如果存在则是从 0 开始)
	// 如果不是 0 则从第一项开始 一次减小 prefix 的长度，直到匹配出结果
	strs.map(item => {
		while(item.indexOf(prefix) !== 0) {
			prefix = prefix.slice(0, prefix.length - 1)
		}
	})
	return prefix
}

export {
	longestCommonPrefix
}
