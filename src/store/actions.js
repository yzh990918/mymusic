import * as types from './mutations-type'
import {playMode} from '../common/js/config'
import {shuffle} from '../common/js/util'
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE, list)
  commit(types.SET_PLAYLIST, list)
  commit(types.SET_CURRENTINDEX, index)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING, true)
}

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE, list)
  let randomlist = shuffle(list)
  commit(types.SET_CURRENTINDEX, 0)
  commit(types.SET_PLAYLIST, randomlist)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING, true)
}
