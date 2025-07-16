import {request} from '@/plugins/request/index'

//  获取列表
export function postVisitAndClickApi (data) {
  return request({
    url: 'https://www.bbzvip.com:8096/account/shunt',
    method: 'post',
    params: data,
    options: {
      headers: {
        'Content-Type': 'application/json' // 确保内容类型合适
      },
      credentials: 'same-origin' // 避免使用'include'来避免发送cookies等凭证信息
    }
  })
}
