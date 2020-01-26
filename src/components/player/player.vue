<template>
  <div class="player" v-show="playlist.length">
    <transition name="normal-player"
    @touchstart.once="firstPlay"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
    @after-leave="afterLeave"
    >
<div class="normal-player" v-show="fullScreen">
  <!-- 背景图 -->
  <div class="background">
    <img width="100%" height="100%" :src="currentSong.image" alt="">
  </div>
  <!-- 顶部标题 -->
  <div class="top">
    <div class="back" @click="back" >
      <i class="icon-back" ></i>
    </div>
    <h1 class="title" v-html="currentSong.name">
    </h1>
    <h2 class="subtitle" v-html="currentSong.singer" @click="tosinger"></h2>
  </div>
  <!-- 中间部分cd唱片 歌曲歌词 -->
  <div class="middle"
  @touchstart.prevent="midleTouchStart"
  @touchmove.prevent='midleTouchMove'
  @touchend.prevent="middleTouchEnd"
  >
    <div class="middle-l" ref="middleL">
      <div class="cd-wrapper" ref="cdWrapper">
        <div class="cd" :class="cdCLs" >
          <img class="image" :src="currentSong.image" alt="">
        </div>
        <div class="play-lyric-wrapper">
          <div class="playing-lyric">
            {{currentLyrictxt}}
          </div>
        </div>
      </div>
    </div>
 <Scroll class="middle-r" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p ref="lyricLine"
                   class="text"
                   :class="{'current':currentLineNum === index}"
                   v-for="(line,index) in currentLyric.lines" :key="index">{{line.txt}}</p>
              </div>
            </div>
          </Scroll>
  </div>
  <!-- 底部进度条 歌曲操作 -->
  <div class="bottom">
    <!-- 滑块条 -->
    <div class="dot-wrapper">
    <span class="dot" :class="{'active':currentShow === 'cd'}"></span>
    <span class="dot" :class="{'active':currentShow === 'lyric'}"></span>
    </div>
    <!-- 进度条 -->
    <div class="progress-wrapper">
      <span class="time time-l">{{format(currentTime)}}</span>
      <div class="progress-bar-wrapper">
        <progressbar :currentTime="currentTime" :songsTime="songsTime" :precent="precent" @percentChangeEnd="onProgressBarChange"></progressbar>
      </div>
      <span class="time time-r">{{format(songsTime)}}</span>
    </div>
    <!-- 操作区 -->
    <div class="operators">
      <div class="icon i-left" @click="changeMode">
        <i :class="iconMode" ></i>
      </div>
      <div class="icon i-left" :class="disabledCls">
        <i @click="prev" class="icon-prev"></i>
      </div>
      <div class="icon i-center" :class="disabledCls">
        <i :class="playIcon" @click="toggleplaying"></i>
      </div>
      <div class="icon i-right" :class="disabledCls">
        <i @click="next" class="icon-next"></i>
      </div>
      <div class="icon i-right">
        <i class="icon icon-not-favorite"></i>
      </div>
    </div>
  </div>
</div>
 </transition>
 <transition name="min-player">
<div class="mini-player" @click="open" v-show="!fullScreen">
  <div class="image" :class="cdCLs">
    <img class=""  width="40" height="40" :src="currentSong.image">
  </div>
  <div class="text">
    <h2 class="name" >{{currentSong.name}}<span class="lyrictxt">{{currentLyrictxt}}</span></h2>
    <p class="singername" v-html="currentSong.singer"></p>
  </div>
  <div class="control">
    <progresscircle :radius="32" :precent="precent" >
 <i :class="miniIcon" class="icon-mini" @click.prevent.stop="toggleplaying"></i>
    </progresscircle>
</div>
  <div class="control">
    <i class="icon-playlist" @click.stop="showplaylist"></i>
  </div>
</div>
 </transition>
 <playlist @clear="clearlist" @delete="deletePlaylist" @changemode ="changeMode" @select="selectSong" ref="playlist"></playlist>
<audio autoplay  ref="audio" @play="ready" @canplay="getDuration" @error="error" :src="songsUrl" @timeupdate="UpdateTime" @ended="End"></audio>
  </div>
</template>

<script>
import animations from 'create-keyframe-animation'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {getMusic} from '../../api/singer'
import progressbar from '../progress-bar/progress-bar'
import progresscircle from '../progress-circle/progresscircle'
import {playMode} from '../../common/js/config'
import {shuffle} from '../../common/js/util'
import {getLyric} from '../../api/lyric'
import Lyric from 'lyric-parser'
import Scroll from '../base/scroll/scroll'
import {prefixStyle} from '../../common/js/dom'
import playlist from '../playlist/playlist'
const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')
export default {
  name: 'player',
  props: [''],
  data () {
    return {
      songsUrl: [],
      // 歌曲信息加载成功
      songReady: false,
      currentTime: 0,
      songsTime: 0,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd',
      currentLyrictxt: ''
    }
  },

  components: {
    progressbar,
    progresscircle,
    Scroll,
    playlist
  },

  computed: {
    precent () {
      return this.currentTime / this.songsTime
    },
    cdCLs () {
      return this.playing ? 'play' : 'play pause'
    },
    playIcon () {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniIcon () {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    disabledCls () {
      return this.songReady ? '' : 'disable'
    },
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'singerId',
      'playing',
      'currentIndex',
      'mode',
      'sequencelist'
    ]),
    iconMode () {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    }
  },
  beforeMount () {},
  mounted () {
  },
  created () {
    // 实现左右滑动
    // 1.定义touch
    this.touch = {}
  },
  methods: {
    ready () {
      this.songReady = true
      this.saveHistory(this.currentSong)
    },
    clearlist () {
      this.clearplaylist()
    },
    ...mapActions([
      'deleteSong',
      'clearplaylist',
      'saveHistory'
    ]),
    deletePlaylist (item) {
      setTimeout(() => {
        this.deleteSong(item)
      }, 20)
    },
    selectSong (index) {
      this.setCurrentindex(index)
      this.setPlaying(true)
    },
    showplaylist () {
      this.$refs.playlist.show()
    },
    firstPlay () {
      this.$refs.audio.play()
    },
    // todo 下面两个函数都是针对时间戳格式化(0:00) 时间戳格式化
    format (inteval) {
      // 向下取整
      inteval = inteval | 0
      let minute = inteval / 60 | 0
      let second = this._pad(inteval % 60)
      return `${minute}:${second}`
    },
    _pad (num, n = 2) {
      // 如果秒的字符串长度小于2 就补0
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    enter (el, done) {
      // 解构取 x,y,scale
      const {x, y, scale} = this._getPosAndScale()
      let animation = {
        // 底部飞到大图片 然后从60到100 scale回调
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }
      // 注册animation
      animations.registerAnimation({
        name: 'move',
        animation, // 定义好的动画
        presets: { // 预设字段
          duration: 400,
          easing: 'linear'
        }
      })
      // 运行animation
      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter () {
      // 清除animation
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave (el, done) {
      const {x, y, scale} = this._getPosAndScale()
      this.$refs.cdWrapper.style['transform'] = `translate3d(${x}px,${y}px,0) scale(${scale})`
      this.$refs.cdWrapper.style.transition = 'all 0.4s'
      // 监听transitionend事件 之后执行afterLeave
      this.$refs.cdWrapper.addEventListener('transitionend', done)
    },
    afterLeave () {
      this.$refs.cdWrapper.style['transform'] = ''
      this.$refs.cdWrapper.style.transition = ''
    },
    // * 要做一个大图片从mini播放器飞到大图层cdWrapper的动画 使用到create-keyframe-animation第三方插键
    // ! 思路：1.计算出偏移横纵坐标 2.横轴偏移(屏幕宽度/2-min播放器左侧偏移) 3.纵轴偏移(屏幕高度-大图层paddingTop-min播放器圆心距底部位置-cdwrapper的高度/2) 4.书写动画

    _getPosAndScale () {
      // 默认向左偏移为负数 向下偏移为正数
      const targetwidth = 40 // 图片宽度
      const paddingLeft = 40 // min图片的圆心左翩移
      const paddingBottom = 30
      const paddingTop = 80
      const width = window.innerWidth * 0.8// cd-wrapper的宽度
      const scale = targetwidth / width // 初始缩放比例
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {
        x,
        y,
        scale
      }
    },
    error () {
      // 当歌曲不能播放 url出现错误
      this.songReady = true
    },
    UpdateTime (e) {
      this.currentTime = e.target.currentTime
    },
    getDuration () {
      console.log(this.$refs.audio.duration)
      this.duration = this.$refs.audio.duration
      this.songsTime = this.$refs.audio.duration
      // 可以播放 songReady置为true
      this.songReady = true
    },
    // todo:优化 点击跳转到歌手页
    tosinger () {
      if (this.singerId) { this.setFullScreen(false) } else {
        this.$router.push({
          path: `/singer/${this.singerId}`
        })
      }
    },
    back () {
      this.setFullScreen(false)
    },
    open () {
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN',
      setPlaying: 'SET_PLAYING',
      setCurrentindex: 'SET_CURRENTINDEX',
      setMode: 'SET_PLAY_MODE',
      setsplaylist: 'SET_PLAYLIST'
    }),
    // *下面这些事件 为了防止点击过快 只有当歌曲能够播放时才触发
    // 播放状态改变 暂停播放
    toggleplaying () {
      if (!this.songReady) {
        return
      }
      this.setPlaying(!this.playing)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    next () {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playlist.length) {
        index = 0
      }
      this.setCurrentindex(index)
      if (!this.playing) {
        this.toggleplaying()
      }
      this.songReady = false
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    End () {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    loop () {
      setTimeout(() => {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
      }, 1000)
      if (this.currentLyric) { // 将歌词平移到歌曲的开始
        this.currentLyric.seek(0)
      }
    },
    prev () {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playlist.length - 1
      }
      this.setCurrentindex(index)
      if (!this.playing) {
        this.toggleplaying()
      }
      this.songReady = false
    },
    onProgressBarChange (precent) {
      // console.log(this.currentTime)
      this.$refs.audio.currentTime = this.songsTime * precent
      if (!this.playing) {
        this.toggleplaying()
      }
      if (this.currentLyric) { // 将歌词平移到歌曲的开始
        this.currentLyric.seek(this.$refs.audio.currentTime * 1000)
      }
    },
    // finished: 没有解决掉更换模式当前歌曲不切换的bug 后续解决
    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setMode(mode)
      let list = null
      if (this.mode === playMode.random) {
        list = shuffle(this.sequencelist)
        this.resetCurrentIndex(list)
        this.setsplaylist(list)
      } else {
        list = this.sequencelist
        this.resetCurrentIndex(list)
        this.setsplaylist(list)
      }
      // this.setsplaylist(list)
    },
    resetCurrentIndex (list) {
      // findIndex是es6的一个语法，接受一个函数，函数可以拿到每一个list元素
      let index1 = list.findIndex((item) => {
        // 将当前歌曲的索引赋值给item的索引
        return item.id === this.currentSong.id
      })
      this.setCurrentindex(index1) // setMutaions方法设置当前的index
    },
    _getLyric (id) {
      getLyric(id).then((res) => {
        // 调用第三方库 将currentLyric转化为一个time-text对象
        this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric)
        if (this.playing) {
          this.currentLyric.play()
        }
      })
    },
    handleLyric ({lineNum, txt}) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        // 获取到往上偏移第五个位置的p
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 500)
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000)
      }
      this.currentLyrictxt = txt
    },
    //  finished:左右滑动效果展示歌词
    midleTouchStart (e) {
      // 设置标志位已经初始化
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.startY = e.touches[0].pageY
    },
    midleTouchMove (e) {
      if (!this.touch.initiated) {
        return
      }
      // 拿到差值
      const deltaX = e.touches[0].pageX - this.touch.startX
      const deltaY = e.touches[0].pageY - this.touch.startY
      // 歌词纵向滚动 当纵向偏移大于左右偏移的时候 我们不应该左右移动
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      // 拿到滚动过程中middle-r距离左右两侧的屏幕的差值
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      // lyricList是一个Vue(scroll)组件，是无法直接造作它的dom的，用$el来代替它的dom
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style[transitionDuration] = 0
      // 透明度的渐变
      this.$refs.middleL.style.opacity = 1 - this.touch.percent
      this.$refs.middleL.style[transitionDuration] = 0
    },
    middleTouchEnd () {
      // 用来决定停在哪个位置
      let offsetWidth
      let opacity
      if (this.currentShow === 'cd') {
        // 从右向左滑，只需要滑10%就行
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth // 最终停止的位置
          opacity = 0
          this.currentShow = 'lyric' // 改变dot的css样式
        } else {
          offsetWidth = 0 // 否则就回到原来的位置
          opacity = 1
        }
      } else { // 从右向左滑，看的是0.9
        if (this.touch.percent < 0.9) {
          offsetWidth = 0
          this.currentShow = 'cd'
          opacity = 1
        } else {
          offsetWidth = -window.innerWidth
          opacity = 0
        }
      }
      const time = 300
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      // 添加动画效果
      this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
      this.$refs.middleL.style.opacity = opacity
      this.$refs.middleL.style[transitionDuration] = `${time}ms`
      this.touch.initiated = false
    }
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!newSong.id) {
        return
      }
      if (newSong.id === oldSong.id) {
        return
      }
      // finished:解决ios声音bug
      getMusic(this.currentSong.id).then((res) => {
        this.songsUrl = res.data.data[0].url
      })
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
      this._getLyric(this.currentSong.id)
    },

    playing (val) {
      const audio = this.$refs.audio
      val ? audio.play() : audio.pause()
    }

  }

}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
@import '~@/common/stylus/mixin'
.player
  .normal-player
    position fixed
    left 0
    right  0
    top 0
    bottom 0
    z-index 150
    background $color-background
    &.normal-player-enter-active,&.normal-player-leave-active
      transition all 0.4s
      .top,.bottom
        transition all 0.4s cubic-bezier(0.86,0.18,0.82,1.32)
    &.normal-player-enter,&.normal-player-leave-active
      opacity 0
      .top
        transform translate3d(0,-100px,0)
      .bottom
        transform translate3d(0,100px,0)
    .background
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      z-index  -1
      opacity 0.6
      filter:blur(20px)
    .top
      position relative
      margin-bottom 25px
      .back
        position absolute
        top 0
        left 6px
        z-index 50
        .icon-back
          display block
          padding 9px
          font-size $font-size-large-x
          color $color-theme
          transform rotate(-90deg)
      .title
        width 70%
        margin  0 auto
        line-height 40px
        text-align center
        no-wrap()
        font-size $font-size-large
        color:$color-text
      .subtitle
        line-height 20px
        text-align center
        font-size $font-size-medium
        color $color-text
        no-wrap()
    .middle
      position fixed
      width 100%
      top 80px
      bottom 170px
      white-space nowrap
      font-size 0
      .middle-r
        display inline-block
        position absolute
        top 0
        vertical-align top
        width 100%
        height 100%
        overflow hidden
        .lyric-wrapper
          width 80%
          margin 0 auto
          overflow hidden
          text-align center
          .text
            line-height 40px
            color $color-text-d
            font-size $font-size-medium
            &.current
              color:#f1c40f
      .middle-l
        display inline-block
        vertical-align top
        position relative
        width 100%
        height 0
        padding-top 80%
        .cd-wrapper
          position absolute
          left 10%
          top 0
          width  80%
          height 100%
          .playing-lyric
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            color: #fff;
          .cd
            width 100%
            height 100%
            box-sizing border-box
            border-radius 50%
            border: 10px solid rgba(255, 255, 255, 0.1)
            &.play
              animation rotate 20s linear infinite
            &.pause
              animation-play-state paused
            .image
              position absolute
              left 0
              top 0
              width 100%
              height  100%
              border-radius 50%

    .bottom
      position absolute
      bottom 50px
      width 100%
      .dot-wrapper
        text-align center
        font-size 0
        .dot
          display inline-block
          vertical-align middle
          margin:0 4px
          width 8px
          height 8px
          border-radius 50%
          background $color-text-l
          &.active
            width 20px
            border-radius 5px
            background $color-text-ll
      .operators
        display flex
        align-items center
        .icon
          flex 1
          color $color-theme
          i
            font-size 30px
        .i-left
          text-align right
        .i-center
          padding 0 20px
          text-align center
          i
            font-size 40px
        .i-right
          text-align left
        .icon-favorite
          color:$color-sub-theme
      .progress-wrapper
        display flex
        align-items center
        width 80%
        margin 0 auto
        padding 10px 0
        .time
          color:$color-text
          font-size $font-size-small
          flex 0 0 30px
          line-height 1.875rem
          width 1.875rem
          &.time-l
            text-align left
          &.time-r
            text-align right
        .progress-bar-wrapper
          flex 1
  .mini-player
    display:flex
    align-items center
    position fixed
    left 0
    bottom 0
    z-index 180
    width 100%
    height 60px
    background $color-highlight-background
    &.mini-player-enter-active,&.mini-player-leave-active
      transition all 0.4s
    &.mini-player-enter,&.mini-player-leave-active
      opacity 0
    .image
      flex 0 0 40px
      width 40px
      padding 0 10px 0 20px
      &.play
        animation rotate 20s linear infinite
      &.pause
        animation-play-state paused
      img
        border-radius 50%
    .text
      display flex
      flex-direction column
      justify-content center
      flex 1
      line-height 20px
      overflow hidden
      .name
        margin-bottom 2px
        no-wrap()
        font-size $font-size-meidum
        color $color-text
        .lyrictxt
          margin-left 10px
          color $color-theme
          nor-wrap()
          font-size 13px
      .singername
        no-wrap()
        font-size $font-size-small
        color $color-text-d
    .control
      flex 0 0 30px
      width 30px
      padding 0 10px
      .icon-play-mini, .icon-pause-mini, .icon-playlist
        font-size 1.875rem
        color $color-theme-d
      .icon-mini
        font-size 2rem
        position absolute
        left 0
        top 0

  @keyframes rotate
    0%
      transform rotate(0)
    100%
      transform rotate(360deg)

</style>
