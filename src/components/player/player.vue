<template>
  <div class="player" v-show="playlist.length">
    <transition name="normal-player">
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
  <div class="middle">
    <div class="middle-l">
      <div class="cd-wrapper">
        <div class="cd" >
          <img class="image" :src="currentSong.image" alt="">
        </div>
        <div class="play-lyric-wrapper">
          <div class="playing-lyric">
          </div>
        </div>
      </div>
    </div>
    <div class="middle-r">
      <div class="lyric-wrapper">
      </div>
    </div>
  </div>
  <!-- 底部进度条 歌曲操作 -->
  <div class="bottom">
    <!-- 滑块条 -->
    <div class="dot-wrapper">
    </div>
    <!-- 进度条 -->
    <div class="progress-wrapper">
      <div class="progress-bar-wrapper"></div>
    </div>
    <!-- 操作区 -->
    <div class="operators">
      <div class="icon i-left">
        <i class="icon-sequence"></i>
      </div>
      <div class="icon i-left">
        <i class="icon-prev"></i>
      </div>
      <div class="icon i-center">
        <i class="icon-play"></i>
      </div>
      <div class="icon i-right">
        <i class="icon-next"></i>
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
  <div class="image">
    <img class=""  width="40" height="40" :src="currentSong.image"  >
  </div>
  <div class="text">
    <h2 class="name" v-html="currentSong.name"></h2>
    <p class="singername" v-html="currentSong.singer"></p>
  </div>
  <div class="control">
    <i class="icon-mini icon-play-mini"></i>
  </div>
  <div class="control">
    <i class="icon-playlist"></i>
  </div>
</div>
 </transition>
<audio autoplay muted ref="audio" @canplay="getDuration" :src="songsUrl"></audio>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {getMusic} from '../../api/singer'
export default {
  name: 'player',
  props: [''],
  data () {
    return {
      songsUrl: []
    }
  },

  components: {},

  computed: {
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'singerId'
    ])
  },
  beforeMount () {},
  mounted () {
  },
  created () {
  },
  methods: {
    getDuration () {
      console.log(this.$refs.audio.duration)
      this.duration = this.$refs.audio.duration
    },
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
      setFullScreen: 'SET_FULLSCREEN'
    })
  },

  watch: {
    currentSong () {
      getMusic(this.currentSong.id).then((res) => {
        this.songsUrl = res.data.data[0].url
        console.log(this.songsUrl)
        // this.$refs.audio.play()
        this.$refs.audio.play()
      })
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
      .middle-l
        display inline-block
        vertical-align top
        position relative
        width 100%
        height 0
        padding-top 80%
        .cd-wrapper
          position absolute
          left 8%
          top 0
          width  80%
          height 100%
          .cd
            width 100%
            height 100%
            box-sizing border-box
            border-radius 50%
            animation:rotate 20s linear infinite
            .image
              position absolute
              left 0
              top 0
              width 100%
              height  100%
              border-radius 50%
              border: 10px solid hsla(0,0%,100%,.1)
    .bottom
      position absolute
      bottom 50px
      width 100%
      .dot-wrapper
        text-align center
        font-size 0
      .progress-wrapper
        display flex
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

</style>
