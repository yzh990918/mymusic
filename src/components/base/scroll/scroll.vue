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
