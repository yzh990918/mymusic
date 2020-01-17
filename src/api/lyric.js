import axios from 'axios'
export function getLyric (id) {
  const url = `http://neteasemusic.yangxiansheng.top/lyric?id=${id}`
  return axios.get(url)
}
