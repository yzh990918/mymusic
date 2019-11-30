<template>
  <div class="loading">
    <img width="80"
         height="45"
         src="./5-160914192R6-50.gif"
         alt="">
    <p class="desc">努力加载中...</p>
  </div>
</template>

<script>

export default {
  name: '',
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
.loading
  width: 100%
  text-align: center
  background-color: $color-background
  .desc
    line-height: 20px
    font-size: $font-size-small
    color: $color-text-l
</style>
