/**
 * 写入cookie
 * @param {*} name
 * @param {*} value
 */

export function setCookie (name, value) {
  document.cookie = name + '=' + escape(value)
}

/**
 * 读取cookie
 * @param {*} name
 * @returns
 */
export function getCookie (name) {
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('url=')
    return value
  }
  return null
}

/**
 * 解析http地址
 * @param {*} url
 * @returns
 */
export function getQueryParams (url = '') {
  const urlObj = new URL(url || window.location.href)
  // 获取基础URL（不包含查询参数）
  const baseUrl = urlObj.origin + urlObj.pathname
  console.log('baseUrl', baseUrl)
  console.log('urlObj', urlObj)
  // 处理查询参数
  const params = {}
  urlObj.searchParams.forEach((value, key) => {
    if (key in params) {
      if (Array.isArray(params[key])) {
        params[key].push(value)
      } else {
        params[key] = [params[key], value]
      }
    } else {
      params[key] = value
    }
  })
  return {
    baseUrl,
    params
  }
}
