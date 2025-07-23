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
 * @param {*} key
 * @returns
 */
export function getCookie (key) {
  const cookies = document.cookie.split('; ')
  const params = {}
  cookies.forEach(item => {
    let [key, value] = item.split('=')
    params[key] = value
  })
  return params[key] || ''
}

/**
 * 解析http地址
 * @param {*} url
 * @returns
 */
export function getQueryParams () {
  const baseUrl = window.location.href
  const urlArr = baseUrl.split('?')
  const url = urlArr[0]
  const params = {}
  const paramsArr = urlArr[1] ? urlArr[1].split('&') : []
  paramsArr.forEach(item => {
    let [key, value] = item.split('=')
    params[key] = value
  })
  return {
    url,
    baseUrl,
    params
  }
}
