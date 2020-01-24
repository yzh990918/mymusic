<template>
<transition name="confirm-fade">
  <div ref="confirm" class="confirm" v-show="showcomfirm" @click.stop>
    <div class="confirm-wrapper">
      <div class="confirm-content">
        <div class="text">{{text}}</div>
      <div class="operate">
        <div class="operate-btn left" @click="cancel">{{cancleBtnText}}</div>
        <div class="operate-btn" @click="confirm">{{confirmBtnText}}</div>
      </div>
      </div>
    </div>

  </div>
  </transition>
</template>

<script>

export default {
  name: 'confirm',
  props: {
    text: {
      type: String,
      default: ''
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancleBtnText: {
      type: String,
      default: '取消'
    }
  },
  data () {
    return {
      showcomfirm: false
    }
  },

  components: {},
  created () {},

  computed: {},

  beforeMount () {},

  mounted () {},

  methods: {
    show () {
      this.showcomfirm = true
    },
    hide () {
      this.showcomfirm = false
    },
    confirm () {
      this.hide()
      this.$emit('confirm')
    },
    cancel () {
      this.hide()
    }
  },

  watch: {}

}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'

.confirm
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  z-index 998
  background $color-background-d
  // 动画开始渐隐渐现遮罩层 内容有一个缩放效果
  &.confirm-fade-enter-active
    animation confirm-fadein 0.3s
    .confirm-content
      animation confirm-zoom 0.5s
  .confirm-wrapper
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
    z-index 1000
    .confirm-content
      width 270px
      border-radius 13px
      background $color-highlight-background
      .text
        padding: 19px 15px
        line-height: 22px
        text-align: center
        font-size: $font-size-large
        color: $color-text-l
      .operate
          display: flex
          align-items: center
          text-align: center
          font-size: $font-size-large
          .operate-btn
            flex: 1
            line-height: 22px
            padding: 10px 0
            border-top: 1px solid $color-background-d
            color: $color-text-d
            &.left
              border-right: 1px solid $color-background-d
  @keyframes confirm-fadein
    0%
      opacity 0
    100%
      opacity 1

  @keyframes confirm-zoom
    0%
      transform scale(0)
    50%
      transform scale(1.1)
    100%
      transform scale(1)

</style>
