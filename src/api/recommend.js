import { HOST } from '../common/js/newapi'
import axios from 'axios'

export function getBanner () {
  const url = HOST + '/banner'
  return axios.get(url)
}
export function getRecommendlist () {
  const url = HOST + '/top/playlist?limit=100'
  return axios.get(url)
}

export function getRecommendlistDetail (id) {
  const url = HOST + `/playlist/detail?id=${id}`
  return axios.get(url)
}
