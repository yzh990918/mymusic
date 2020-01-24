<template>
  <div class="noresult">
  <div class="noresult-icon"></div>
  <p class="noresult-text">{{title}}</p>
  </div>
</template>

<script>

export default {
  name: 'no-result',
  props: {
    title: {
      type: String,
      default: ''
    }

  },
  data () {
    return {

    }
  },

  components: {},
  created () {},

  computed: {},

  beforeMount () {},

  mounted () {},

  methods: {},

  watch: {}

}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
.noresult
  text-align center
  .noresult-icon
    width 86px
    height 90px
    margin 0 auto
    background url('no-result@2x.png')
    background-size 86px 90px
  .noresult-text
    margin-top 30px
    font-size $font-size-medium
    color $color-text-d
</style>
