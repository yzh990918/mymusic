<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BSroll from 'better-scroll'
export default {
  name: '',
  props: {
    probeType: {
      // 监听滚动事件类型
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {

    }
  },

  components: {},

  computed: {},

  beforeMount () { },

  mounted () {
    setTimeout(() => {
      this._initscroll()
    }, 20)
  },

  methods: {
    _initscroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BSroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
    },
    enable () {
      // 启用better-scroll
      this.scroll && this.scroll.enable()
    },
    disable () {
      // 启用better-scroll
      this.scroll && this.scroll.disable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      //! 因为要给better-scroll的scrollTo传入参数 所以用apply方法将this指向scroll实例 然后传入到better-scroll 很绕 apply参数必须是数组 所以用到argument模拟数组
      this.scroll && this.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }

  },

  watch: {
    data () {
      // 监听到data变化 重新refresh计算高度
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }

}

</script>
<style lang='stylus' scoped></style>
