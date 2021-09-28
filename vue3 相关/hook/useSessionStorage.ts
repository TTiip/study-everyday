
const setSessionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, value)
}

const getSessionStorage = (key: string) => {
  return sessionStorage.getItem(key)
}

const removeSessionStorage = (key: string) => {
  sessionStorage.removeItem(key)
}

export {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage
}
