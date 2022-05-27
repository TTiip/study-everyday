import type { AxiosInstance, AxiosInterceptorManager, AxiosPromise } from 'axios'
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import type { apiKeyDataType, apiKeyType } from '~/api'
import apiList from '~/api'

type ResultDataType = apiKeyDataType[apiKeyType]
/*
  NewAxiosInstance接口得根据自己情况来定
  interceptors属性是必须要有，因为后续要用到拦截器
  至于<T = any>(config: AxiosRequestConfig): AxiosPromise<T>这一段代码，因为我后续二次封装axios时采用的是此类型，所以我这里
  声明的是这种数据类型
*/

type NewAxiosInstance = AxiosInstance & {
  /*
    设置泛型T，默认为any，将请求后的结果返回变成AxiosPromise<T>
  */
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse<ResultDataType>>
  }
}

// 定义接口
interface PendingType {
  url?: string
  method?: Method
  params: any
  data: any
  cancel: (...args: any) => any
}

// 取消重复请求
const pending: Array<PendingType> = []
const CancelToken = axios.CancelToken
// 判断是否需要转化参数
const HAS_QS_METHOD: Method[] = ['POST', 'post', 'PUT', 'put']
const NOT_QS_METHOD: Method[] = ['GET', 'get', 'DELETE', 'delete']

// axios 实例
const instance: NewAxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  responseType: 'json'
})

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key
    const list: PendingType = pending[key]
    // 当前请求在数组中存在时执行函数体
    if (
      list.url === config.url
      && list.method === config.method
      && JSON.stringify(list.params) === JSON.stringify(config.params)
      && JSON.stringify(list.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试')
      // 从数组中移除记录
      pending.splice(item, 1)
    }
  }
}

// 添加请求拦截器
instance.interceptors.request.use(request => {
  // 如果不存在showLoading则默认设置为true
  if (!Reflect.has(request.headers!, 'showLoading')) {
    // request.headers.showLoading = true
    // 先设置为false，之后在改。
    request.headers!.showLoading = false
  }

  removePending(request)
  if (request.method && HAS_QS_METHOD.includes(request.method as Method)) {
    // 这里只处理post请求，根据自己情况修改
    // request.data.time = +new Date()
  } else if (request.method && NOT_QS_METHOD.includes(request.method as Method)) {
    // 如果是get请求则添加时间戳，避免缓存
    // request.params.time = +new Date()
  }
  request.cancelToken = new CancelToken(c => {
    pending.push({ url: request.url, method: request.method as Method, params: request.params, data: request.data, cancel: c })
  })
  return request
},
error => {
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  removePending(response.config)

  const code = response.data.code
  if (code !== 200) {
    console.log('error', response.data)
  }
  return response.data
},
error => {
  const response = error.response

  switch (response.data.code) {
    case 301:
      // 为登录状态，显示登录dialog弹窗提示用户登录。
      break
    case 401:
      // 401提示
      break
    default:
      break
  }

  // 超时重新请求
  const config = error.config
  // 全局的请求次数,请求的间隙
  const [RETRY_COUNT, RETRY_DELAY] = [0, 1000]

  if (config && RETRY_COUNT) {
    // 设置用于跟踪重试计数的变量
    config.__retryCount = config.__retryCount || 0
    // 检查是否已经把重试的总数用完
    if (config.__retryCount >= RETRY_COUNT) {
      return Promise.reject(response || { message: error.message })
    }
    // 增加重试计数
    config.__retryCount++
    // 创造新的Promise来处理指数后退
    const backoff = new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, RETRY_DELAY || 1)
    })
    // instance重试请求的Promise
    return backoff.then(() => {
      return instance(config)
    })
  }

  return Promise.reject(response || { message: error.message })
})

export {
  AxiosRequestConfig,
  Method,
  AxiosResponse
}

/*
  限制泛型T必须是接口列表（apiKeyType）中的key
  限制obj中的url必须是接口列表中key的某一个
*/
const httpFunc = <T extends apiKeyType>(options: AxiosRequestConfig & { url: T }) => {
  /*
    限制最终的返回数据类型, 通过 Promise 传入范型 限制 resolve 返回值的类型
  */
  return new Promise<apiKeyDataType[T]>((resolve, reject) => {
    instance({
      url: apiList[options.url],
      params: options.params || {},
      data: options.data || {},
      method: options.method || 'GET',
      responseType: options.responseType || 'json',
      headers: options.headers || {}
    }).then((res: any) => {
      resolve(res)
    }).catch(error => {
      // useMessage('error', error)
      reject(error)
    })
  })
}

// 这里直接把封装以后的方法传出去外部直接调用。
export default httpFunc
