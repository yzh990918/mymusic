import axios from 'axios'
export function getSingers () {
  const url = 'https://neteasemusic.yangxiansheng.top/toplist/artist'
  return axios.get(url)
}
export function getSingerDetail (singerId) {
  const url = `https://neteasemusic.yangxiansheng.top/artists?id=${singerId}`
  return axios.get(url)
}
export function getMusic (musicId) {
  const url = `https://neteasemusic.yangxiansheng.top/song/url?id=${musicId}`
  return axios.get(url)
}
