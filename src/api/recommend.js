import { HOST } from '../common/js/newapi'
import axios from 'axios'

export function getBanner () {
  const url = HOST + '/banner'
  return axios.get(url)
}
export function getRecommendlist () {
  const url = HOST + '/personalized?limit=200'
  return axios.get(url)
}
