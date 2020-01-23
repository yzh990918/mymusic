import axios from 'axios'
export function getSingers () {
  const url = 'http://neteasemusic.yangxiansheng.top/top/artists?limit=300'
  return axios.get(url)
}
export function getSingerDetail (singerId) {
  const url = `http://neteasemusic.yangxiansheng.top/artists?id=${singerId}`
  return axios.get(url)
}
export function getMusic (musicId) {
  const url = `http://neteasemusic.yangxiansheng.top/song/url?id=${musicId}`
  return axios.get(url)
}
