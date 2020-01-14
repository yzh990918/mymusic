<template>
  <div class="progress-bar" ref="progressbar" >
    <!-- 总进度条 -->
    <div class="bar-inner" >
      <!-- 进度条左侧 -->
      <div class="progress" ref="progress"></div>
      <!-- 进度条按钮 -->
      <div class="progress-btn-wrapper" >
        <div class="progress-btn" ref="progressbtn"></div>
      </div>
    </div>

  </div>
</template>

<script>
// 计算宽度要减去按钮宽度
// const progressBtnWidth = 16
import {prefixStyle} from '../../common/js/dom'
const transform = prefixStyle('transform')
export default {
  name: 'progress-bar',
  props: {
    precent: {
      type: Number
      // default: null
    },
    currentTime: {
      type: Number
    },
    songsTime: {
      type: Number
    }
  },
  data () {
    return {

    }
  },

  components: {},

  computed: {},

  beforeMount () {},

  mounted () {
    console.log(this.currentTime)
    console.log(this.songsTime)
  },

  methods: {},

  watch: {
    // precent (newPrecent) {
    //   console.log(this.newPrecent)
    //   if (newPrecent >= 0) {
    //     // bar的总长度
    //     let barWidth = this.$ref.progressbar.clientWidth - progressBtnWidth
    //     // 左侧progress的宽度
    //     let offseWidth = newPrecent * barWidth
    //     this.$refs.progress.style.width = `${offseWidth}px`
    //   }
    // }
    currentTime (val) {
      if (val >= 0) {
        const progressTotalWidth = this.$refs.progressbar.clientWidth - 16
        const precentx = val / this.songsTime
        const progressWidth = progressTotalWidth * precentx
        this.$refs.progress.style.width = `${progressWidth}px`
        this.$refs.progressbtn.style[transform] = `translate3d(${progressWidth}px,0,0)`
      }
    }
  }

}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable'
.progress-bar
  height 30px
  .bar-inner
    position relative
    top 13px
    height 4px
    background rgba(0,0,0,0.3)
    .progress
      position absolute
      height 100%
      background $color-theme
    .progress-btn-wrapper
      position absolute
      left -8px
      top -13px
      width 30px
      height 30px
      .progress-btn
        position relative
        top 7px
        left 7px
        box-sizing border-box
        width 16px
        height 16px
        border 3px solid $color-text
        border-radius 50%
        background $color-theme

</style>
