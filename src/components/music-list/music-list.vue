<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title"></h1>
<div class="bg-image">
  <div class="play-wrapper">
    <div class="play"></div>
  </div>
  <div class="filter"></div>
</div>
  </div>
</template>

<script>

export default {
  name: 'music-list',
  props: [''],
  data () {
    return {

    }
  },

  components: {},

  computed: {},

  beforeMount () {},

  mounted () {},

  methods: {
    back () {
      this.$router.push('/singer')
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
  bottom:0
  right:0
  z-index:100
  background-color:$color-background
  .back
    position absolute
    top 0
    left 6px
    z-index 100
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
    font-size $font-size-large
    color $color-text
    text-align center
    z-index 100
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

</style>
