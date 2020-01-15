<template>
  <div class="progress-bar" ref="progressbar"  @click="progressClick" >
    <!-- 总进度条 -->
    <div class="bar-inner" >
      <!-- 进度条左侧 -->
      <div class="progress" ref="progress"></div>
      <!-- 进度条按钮 -->
      <div class="progress-btn-wrapper" >
        <div class="progress-btn" ref="progressbtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend.prevent="progressTouchEnd"

        ></div>
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

  created () {
    // console.log(this.currentTime)
    // console.log(this.songsTime)
    this.touch = {} // 共享数据 挂载到touch对象
  },

  methods: {
    // 点击进度条事件
    progressClick (e) {
      //  ! e.pageX 获取到的位置有bug
      const rect = this.$refs.progressbar.getBoundingClientRect()
      // rect.left 元素距离左边的距离
      // e.pageX 点击距离左边的距离
      const offsetWidth = e.pageX - rect.left
      // console.log(rect, e.pageX)
      this._offset(offsetWidth)
      const barWidth = this.$refs.progressbar.clientWidth - 16
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChangeEnd', percent)
    },
    // 记录第一次触屏位置 和初始进度条偏移
    progressTouchStart (e) {
      // 定义初始化
      this.touch.initiated = true
      // 第一次触屏的位置
      this.touch.startX = e.touches[0].pageX
      // 进度条的初始偏移量
      this.touch.left = this.$refs.progress.clientWidth
    },
    // 记录拖动偏移量 现在偏移量就等于初始偏移量+拖动偏移 但是不能超过进度条的总宽度
    progressTouchMove (e) {
      if (!this.touch.initiated) {
        return
      }
      const moveWidth = e.touches[0].pageX - this.touch.startX
      const offsetWidth = Math.min(this.$refs.progressbar.clientWidth - 16, Math.max(0, this.touch.left + moveWidth))
      this._triggerPrecent()
      this._offset(offsetWidth)
    },
    // 初始化为false 将拖动信息派发
    progressTouchEnd (e) {
      this.touch.initiated = false
      const barWidth = this.$refs.progressbar.clientWidth - 16
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChangeEnd', percent)
    },
    // 偏移方法
    _offset (offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressbtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    },
    _triggerPrecent () {
      // 派发当前precent
      const progressTotalWidth = this.$refs.progressbar.clientWidth - 16
      const precent = this.$refs.progress.clientWidth / progressTotalWidth
      this.$emit('precentChange', precent)
    }
  },

  watch: {
    // precent (newPrecent) {
    //   console.log(this.newPrecent)
    //   if (newPrecent >= 0) {

    //     let barWidth = this.$ref.progressbar.clientWidth - progressBtnWidth

    //     let offseWidth = newPrecent * barWidth
    //     this.$refs.progress.style.width = `${offseWidth}px`
    //   }
    // }
    currentTime (val) {
      // 拖动过程不修改宽度
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
