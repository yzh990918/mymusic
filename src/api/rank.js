import axios from 'axios'
export function getrank (id) {
  const url = `http://neteasemusic.yangxiansheng.top/top/list?idx=${id}`
  return axios.get(url)
}
