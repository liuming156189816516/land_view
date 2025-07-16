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
