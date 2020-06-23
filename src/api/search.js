import axios from 'axios'
export function gethotsearch () {
  const url = `https://music.linkorg.club/search/hot/detail`
  return axios.get(url)
}
// 获取搜索建议
export function getSearchSuggest (key) {
  const url = `https://neteasemusic.yangxiansheng.top/search/suggest?keywords=${key}`
  return axios.get(url)
}

// 获取搜索歌手结果
export function getSearchSinger (key) {
  const url = `https://neteasemusic.yangxiansheng.top/search?keywords=${key}&type=100`
  return axios.get(url)
}

// 获取搜索歌曲结果
export function getSearchSongs (name, page) {
  const url = `https://neteasemusic.yangxiansheng.top/search?keywords=${name}&offset=${page}`
  return axios.get(url)
}

// 获取歌曲详情
export function getSongDetail (id) {
  const url = `https://neteasemusic.yangxiansheng.top/song/detail?ids=${id}`
  return axios.get(url)
}
