function Test() {
  const test = 'test'
}
const t = new Test()

console.log(t.__proto__ === Test.prototype) // true
console.log(Test.__proto__ === Function.prototype) // true
console.log(Test.prototype.__proto__ === Object.prototype) // true

