import {playMode} from '../common/js/config'
const state = {
  singer: {},
  playing: false, // 播放暂停
  fullScreen: false, // 全屏展示
  playlist: [], // 播放列表
  sequencelist: [], // 顺序播放的列表
  mode: playMode.sequence, // 默认顺序播放
  currentIndex: -1, // 当前播放的歌曲下标
  singerId: null
}
export default state
