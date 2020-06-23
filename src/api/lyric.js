import axios from 'axios'
export function getLyric (id) {
  const url = `https://neteasemusic.yangxiansheng.top/lyric?id=${id}`
  return axios.get(url)
}
