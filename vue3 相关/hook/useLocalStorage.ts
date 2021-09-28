
const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, value)
}

const getLocalStorage = (key: string) => {
  return localStorage.getItem(key)
}

const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key)
}

export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage
}
