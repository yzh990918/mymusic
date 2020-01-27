import * as types from './mutations-type'
import {playMode} from '../common/js/config'
import {shuffle} from '../common/js/util'
import {saveSearch, clearStorage, savePlayHistory, deletehistory, saveFavoriatelist, deleteFavoriatelist} from '../common/js/cache'
function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
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

// 插入单曲进入playlist 如果以前的有 就插入删除以前的存在的相同歌曲的元素
export const insertSong = function ({commit, state}, song) {
  // 需要使用slice生成一个副本 不然我能在action里面直接修改state里面的参数
  let playlist = state.playlist.slice()
  let sequencelist = state.sequencelist.slice()
  let currentIndex = state.currentIndex
  let currentSong = playlist[currentIndex]
  let fpIndex = findIndex(playlist, song)
  currentIndex++
  playlist.splice(currentIndex, 0, song)
  if (fpIndex > -1) {
    // 当前歌曲索引在以前存在歌曲的后面
    if (currentIndex > fpIndex) {
      // 如果存在歌曲索引在前面 想要删除掉它的索引currentindex必须-1 这时fpIndex才正确
      currentIndex--
      playlist.splice(fpIndex, 1)
    } else {
      // 当存在歌曲在后面 插入歌曲在前面 只需要fpindex+1即可
      playlist.splice(fpIndex + 1, 1)
    }
  }
  // 当前歌曲在sequencelist的索引 因为是顺序列表 所以加一
  let currentSIndex = findIndex(sequencelist, currentSong) + 1
  let fsIndex = findIndex(sequencelist, song)
  sequencelist.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequencelist.splice(fsIndex, 1)
    } else {
      sequencelist.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE, sequencelist)
  commit(types.SET_CURRENTINDEX, currentIndex)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING, true)
}

export const saveSearchHistory = ({commit}, query) => {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const clearSearchHistory = ({commit}) => {
  commit(types.SET_SEARCH_HISTORY, clearStorage)
}

// 从playlist删除一首歌曲
export const deleteSong = ({commit, state}, song) => {
  let playlist = state.playlist.slice()
  let sequencelist = state.sequencelist.slice()
  let currentIndex = state.currentIndex
  let deleteIndex = findIndex(playlist, song)
  playlist.splice(deleteIndex, 1)
  let sIndex = findIndex(sequencelist, song)
  sequencelist.splice(sIndex, 1)
  // 如果删除歌曲在播放歌曲前面 或者最后一个了 currentIndex--
  if (currentIndex > deleteIndex || currentIndex === playlist.length) {
    currentIndex--
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE, sequencelist)
  commit(types.SET_CURRENTINDEX, currentIndex)
  // 当删除完了的情况 播放停止
  const overdelete = playlist.length > 0
  commit(types.SET_PLAYING, overdelete)
}

// 清空歌曲列表
export const clearplaylist = ({commit}) => {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_CURRENTINDEX, -1)
  commit(types.SET_SEQUENCE, [])
  commit(types.SET_PLAYING, false)
}
// 保存播放历史
export const saveHistory = ({commit}, song) => {
  commit(types.SET_PLAY_HISTORY, savePlayHistory(song))
}

// 删除一条记录
export const deleteSearchHitory = ({commit}, query) => {
  commit(types.SET_SEARCH_HISTORY, deletehistory(query))
}

// 增加收藏歌曲
export const addfavoriate = ({commit}, song) => {
  commit(types.SET_FAVORIATELIST, saveFavoriatelist(song))
}

// 删除收藏歌曲
export const deletefavoriate = ({commit}, song) => {
  commit(types.SET_FAVORIATELIST, deleteFavoriatelist(song))
}
