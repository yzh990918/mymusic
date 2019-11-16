<template>
  <div class="m-header">
    <div class="icon"></div>
    <div class="text">Magic music</div>
    <router-link tag="div"
                 class="user"
                 to="#">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'm-header',
  props: [''],
  data () {
    return {

    }
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
@import '~@/common/stylus/mixin.styl'
.m-header
  position: relative
  height: 44px
  text-align: center
  color: $color-theme
  font-size: 0
  z-index: 50
  .icon
    display: inline-block
    vertical-align: top
    margin-top: 6px
    margin-right: 9px
    width: 30px
    height: 32px
    bg-image('logo')
    background-size: 30px 32px
  .text
    display: inline-block
    vertical-align: top
    line-height: 44px
    font-size: $font-size-large
  .user
    position: absolute
    right: 0
    top: 0
    .icon-mine
      display: block
      padding: 12px
      font-size: 20px
      color: $color-theme
</style>
