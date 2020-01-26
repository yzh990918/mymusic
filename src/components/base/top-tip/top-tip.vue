<template>
<transition name="drop">
  <div class="top-tip" v-show="flag" @click.stop="hide">
<slot></slot>
  </div>
  </transition>
</template>

<script>

export default {
  name: 'top-tip',
  props: [''],
  data () {
    return {
      flag: false

    }
  },

  components: {},
  created () {},

  computed: {},

  beforeMount () {},

  mounted () {},

  methods: {
    show () {
      this.flag = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.hide()
      }, 2000)
    },
    hide () {
      this.flag = false
    }
  },

  watch: {}

}

</script>
<style lang='stylus' scoped>
.top-tip
  position fixed
  top 0
  width 100%
  z-index 500
  background #666
  &.drop-enter-active,&.drop-leave-active
    transition all 0.3s
  &.drop-enter,&.drop-leave-active
    transform translate3d(0,-100%,0)

</style>
