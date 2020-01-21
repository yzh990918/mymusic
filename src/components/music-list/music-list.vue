<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgimage" ref="image">
      <div class="filter"></div>
      <div class="play-wrapper" ref="playwrapper"  v-show="songs.length">
        <div class="play-button" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放热门歌曲</span>
        </div>
        </div>
    </div>
    <div class="layer" ref="layer"></div>
    <scroll :probeType="probetype" :listenScroll="true" @scroll="scroll" :data="songs" class="list" ref="list">
      <div class="songlist-wrapper">
        <songlist  @select="selectItem" :songs="songs" :rank="rank"></songlist>
      </div>
    </scroll>
    <div v-show="!songs.length"
           class="loading-container">
        <loading></loading>
      </div>
  </div>
</template>

<script>
import scroll from '../base/scroll/scroll'
import songlist from '../base/songlist/songlist'
import loading from '../base/loading/loading'
import {mapActions, mapMutations} from 'vuex'
const TITLE_HEIGHT = 40
// const RESERVERD_HEIGHT = 40
export default {
  name: 'music-list',
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array
    },
    title: {
      type: String,
      default: ''
    },
    rank: {
      type: Boolean
    }
  },
  data () {
    return {
      probetype: 3,
      scrollY: 0
    }
  },

  components: {
    songlist,
    scroll,
    loading
  },

  computed: {
    bgimage () {
      return `background-image:url(${this.bgImage})`
    }
  },

  beforeMount () {},

  mounted () {
    this.imageHeight = this.$refs.image.clientHeight
    // ? 组件取dom $refs.refname.$el
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
    // *计算距顶高度 设置后面的偏移量
    this.minTranslateY = -this.imageHeight + TITLE_HEIGHT
  },

  methods: {
    ...mapMutations({
      setSingerId: 'SET_SINGERID'
    }),
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ]),
    selectItem (item, index) {
      this.selectPlay({list: this.songs, index})
    },
    back () {
      this.$router.back()
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    random () {
      this.randomPlay({
        list: this.songs
      })
    }
  },

  watch: {
    scrollY (val) {
      let scale = 1
      let zIndex = 0
      let translateY = Math.max(this.minTranslateY, val)
      this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`
      this.$refs.layer.style['webkitTransform'] = `translate3d(0,${translateY}px,0)`

      const present = Math.abs(val / this.imageHeight)
      if (val > 0) {
        // image的高度会加上val的值
        scale = 1 + present
        zIndex = 10
      }
      // !当滚动到顶部 设置图片区的样式为一个固定高度 其他情况下都是padding来撑开
      if (val < translateY) {
        zIndex = 10
        this.$refs.image.style.paddingTop = 0
        this.$refs.image.style.height = '40px'
        this.$refs.playwrapper.style.display = 'none'
      } else {
        this.$refs.image.style.paddingTop = '70%'
        this.$refs.image.style.height = 0
        this.$refs.playwrapper.style.display = ''
      }
      this.$refs.image.style.zIndex = zIndex
      this.$refs.image.style['transform'] = `scale(${scale})`
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~@/common/stylus/variable.styl";
@import "~@/common/stylus/mixin.styl";
.music-list
  position fixed
  top:0
  left:0
  right:0
  bottom 0
  z-index:100
  background-color:$color-background
  .back
    position absolute
    top 0
    left 6px
    z-index 50
    .icon-back
      display block
      font-size $font-size-large-x
      padding 10px
      color $color-theme
  .title
    position absolute
    top 0
    left 10%
    width 80%
    line-height 40px
    font-size $font-size-large
    color $color-text
    text-align center
    z-index 40
    no-wrap()
  .bg-image
    position relative
    width 100%
    height 0
    padding-top 70%
    transform-origin top
    background-size cover
    .play-wrapper
      position absolute
      bottom 20px
      z-index 50
      width 100%
      .play-button
        box-sizing border-box
        width 9.6875rem
        padding 7px 0
        margin 0 auto
        text-align center
        border 1px solid $color-theme
        color:$color-theme
        border-radius 100px
        font-size 0
        .icon-play
          display inline-block
          vertical-align middle
          margin-right 6px
          font-size $font-size-medium-x
        .text
          display inline-block
          vertical-align middle
          font-size $font-size-small

    .filter
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      background rgba(7,17,27,0.4)
  .layer
    position relative
    height 100%
    background $color-background
  .list
    position fixed
    top 0
    bottom  0
    width 100%
    background $color-background
    .songlist-wrapper
      padding 20px 30px
  .loading-container
    position absolute
    width 100%
    top 60%
    transform translateY(-50%)
</style>
