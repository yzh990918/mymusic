<template>
  <transition name="change">
    <div class="singer-detail">
    </div>
  </transition>

</template>

<script> 

export default {
  name: '',
  props: [''],
  data () {
    return {

    };
  },

  components: {},

  computed: {},

  beforeMount () { },

  mounted () { },

  methods: {},

  watch: {}

}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
.change-enter-active, .change-leave-active
  transition: all 0.3s
.change-enter, .change-leave-to
  transform: translate3d(100%, 0, 0)
  opacity: 0
.singer-detail
  position: fixed
  z-index: 100
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: $color-background
</style>
