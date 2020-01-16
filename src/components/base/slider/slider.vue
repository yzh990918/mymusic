// todo 手写轮播组件
<template>
  <div class="slider"
       ref="slider">
    <div class="slider-group"
         ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span v-for="(item,index) of dots"
            :key="index"
            :class="{active:currentpageindex===index}"
            class="dots-item">
      </span>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { addClass } from '../../../common/js/dom.js'
export default {
  name: 'slider',
  // * 第一步 设置slide属性
  props: {
    loop: {
      // *循环轮播
      type: Boolean,
      default: true
    },
    autoPlay: {
      // *自动轮播
      type: Boolean,
      default: true
    },
    interval: {
      // *轮播间隔
      type: Number,
      default: 3000
    }
  },
  data () {
    return {
      dots: [],
      currentpageindex: 0

    }
  },

  components: {},

  computed: {},
  destroyed () {
    clearTimeout(this.timer)
  },
  beforeMount () { },

  mounted () {
    setTimeout(() => {
      this._setSliderwidth()
      this._initdots()
      this._initSlider()
      if (this.autoPlay) {
        this._play()
      }
    }, 20)
    window.addEventListener('resize', () => {
      if (!this.slider) {

      }
      this._setSliderwidth(true)
      this.slider.refresh()
    })
  },

  methods: {
    // * 第二步 计算出slider的宽度 并且设置slidergroup的宽度
    _setSliderwidth (isResize) {
      this.children = this.$refs.sliderGroup.children
      // better-scroll 会多复制两份
      let width = 0
      // 拿到slide宽度
      let sliderwidth = this.$refs.slider.clientWidth
      // 计算slidegroup的宽度
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        // 添加dom样式
        addClass(child, 'slide-item')
        // child的宽度
        child.style.width = sliderwidth + 'px'
        // 总宽度
        width += sliderwidth
      }
      if (this.loop && !isResize) {
        // 循环切换 width加两倍sliderwidth
        width += 2 * sliderwidth
      }
      // 设置slider-group宽度
      this.$refs.sliderGroup.style.width = width + 'px'
    },
    // * 第三步 初始化slider 并设置属性
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        // !惯性 循环 轮播间隔 可以点击
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapThreshold: 0.3,
        snapSpeed: 300

      })
      // * 第五步 计算出当前的轮播下标 添加dots.active样式
      // 获取当前下标 滚动派发scrollEnd事件
      this.slider.on('scrollEnd', () => {
        // pageX 当前pageindex
        let pageIndex = this.slider.getCurrentPage().pageX
        if (this.loop) {
          // 默认第一个元素会添加拷贝 所以要减掉一
          pageIndex -= 1
        }
        this.currentpageindex = pageIndex
        if (this.autoPlay) {
          //! 轮播前必须清除 不然跳到第二章图片会stop 然后因为settimeout只执行一次 所以再执行一遍_play()
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    // * 第四步 添加dots
    _initdots () {
      this.dots = new Array(this.children.length)
    },
    // * 第七部 添加自动轮播
    _play () {
      let pageIndex = this.currentpageindex + 1
      if (this.loop) {
        pageIndex += 1
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 300)
      }, this.interval)
    }
  },

  watch: {}

}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
.slider
  min-height: 1px
  .slider-group
    position: relative
    overflow: hidden
    white-space: nowrap
    .slide-item
      // * 轮播图slidergroup的样式
      float: left
      box-sizing: border-box
      overflow: hidden
      text-align: center
      a
        display: block
        width: 100%
        overflow: hidden
        text-decoration: none
      img
        display: block
        width: 100%
  .dots
    position: absolute
    top: 130.075px
    right: 0
    left: 0
    bottom: 12px
    text-align: center
    font-size: 0
    height: 8px
    .dots-item
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: $color-text-l
      &.active
        width: 20px
        border-radius: 5px
        background: $color-text-ll
</style>
