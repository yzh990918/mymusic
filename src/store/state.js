import {playMode} from '../common/js/config'
import {localstorage, loadPlay, loadFavoriate} from '../common/js/cache'
const state = {
  singer: {},
  playing: false, // 播放暂停
  fullScreen: false, // 全屏展示
  playlist: [], // 播放列表
  sequencelist: [], // 顺序播放的列表
  mode: playMode.sequence, // 默认顺序播放
  currentIndex: -1, // 当前播放的歌曲下标
  singerId: null,
  disc: {},
  topList: {},
  searchhistory: localstorage(),
  playhistory: loadPlay(),
  favoriatelist: loadFavoriate()
}
export default state
// todo: 1.配置vuex数据项 mixin里面配置点击收藏取消收藏逻辑  2.cache.js 添加收藏 读取收藏 删除收藏 3.action 添加 删除 4.渲染 dom 5.play组件收藏 playlist组件收藏  选择歌曲 insert这个歌曲 6.解决高度问题 在handleplaylist里面刷新scroll组件 7. 随机播放按钮实现(list由currentindex决定)
