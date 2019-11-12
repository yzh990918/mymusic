import originJSONP from 'jsonp'
export default function jsonp (url, data, option) {
  // 封装jsonp函数 参数一般设置为url data返回参数 option操作
  // 拼接url 如果没有问号就拼接一个问号 有就拼一个&
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  // 执行回调 根据url 返回数据
  return new Promise((resolve, reject) => {
    // ! 三个参数 url option callback
    originJSONP(url, option, (err, data) => {
      // * 回调的两个参数 err data
      if (!err) {
        // 如果成功 将数据传入
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
// 用data拼接好url
export function param (data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
  }
  // 删除第一个and
  return url ? url.substring(1) : ''
}
