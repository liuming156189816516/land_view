import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // 可从环境变量获取基础URL
  timeout: 10000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在这里可以统一处理请求前的操作，如添加 token
    // config.headers['Authorization'] = getToken()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 在这里可以统一处理响应数据
    return response.data
    // 假设我们的业务状态码在 res.code 中
  },
  error => {
    // 在这里可以统一处理 HTTP 错误
    return Promise.reject(error)
  }
)

/**
 * 封装请求方法
 * @param {string} url 请求地址
 * @param {string} method 请求类型 GET/POST/PUT/DELETE等
 * @param {object} params 请求参数
 * @param {object} options 其他 axios 配置选项
 * @returns {Promise}
 */
export function request ({url, method = 'GET', params = {}, options = {}}) {
  // 统一转换为大写
  method = method.toUpperCase()

  const config = {
    url,
    method,
    ...options
  }

  // 根据请求类型处理参数
  if (method === 'GET' || method === 'DELETE') {
    config.params = params
  } else {
    config.data = params
  }

  return service(config)
}

// 导出常用方法
export const get = (url, params, options) => request(url, 'GET', params, options)
export const post = (url, params, options) => request(url, 'POST', params, options)
export const put = (url, params, options) => request(url, 'PUT', params, options)
export const del = (url, params, options) => request(url, 'DELETE', params, options)

export default {
  request,
  get,
  post,
  put,
  delete: del
}
