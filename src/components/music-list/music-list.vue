<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
<div class="bg-image" :style="bgimage" ref="image">
  <div class="play-wrapper">
  </div>
  <div class="filter"></div>
</div>
    <scroll :data="songs"
            @scroll="scroll"
            :listenscroll="true"
            :probeType="probetype"
            class="list"
            ref="list"
           >
      <div class="songlist-wrapper" ref="wrapper">
        <songlist :songs="songs"></songlist>
      </div>
      <!-- <div v-show="!songs.length"
           class="loading-container">
        <loading></loading>
      </div> -->
    </scroll>
  </div>

</template>

<script>
import scroll from '../base/scroll/scroll'
import songlist from '../base/songlist/songlist'
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
    scroll
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
    this.$refs.wrapper.style.top = `${this.imageHeight}px`
  },

  methods: {
    back () {
      this.$router.push('/singer')
    },

    scroll (pos) {
      this.scrollY = pos.y
    }
  },

  watch: {}

}

</script>
<style lang='stylus' scoped>
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
    .filter
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      background rgba(7,17,27,0.4)
  .list
    position fixed
    top 0
    bottom  0
    width 100%
    background $color-background
    .songlist-wrapper
      position fixed
      top 262px!important
      // position absolute
      // top 0
      // bottom  0
      padding 20px 30px
</style>
