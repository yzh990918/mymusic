<template>
  <div class="progresscircle">
    <!-- wdith height 是svg圈的大小 stroke-dasharray是描边周长 dashOffset描边偏移  -->
 <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray"
              :stroke-dashoffset="dashOffset"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'progresscircle',
  props: {
    radius: {
      type: Number,
      default: 100
    },
    precent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dashArray: 314
    }
  },

  components: {},

  computed: {

    dashOffset () {
      return (1 - this.precent) * this.dashArray
    }
  },

  beforeMount () {},

  mounted () {},

  methods: {},

  watch: {}

}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
 .progresscircle
    position: relative
    circle
      stroke-width: 6px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: $color-theme-d
      &.progress-bar
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-theme
</style>
