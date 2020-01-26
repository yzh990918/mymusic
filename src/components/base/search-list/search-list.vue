<template>
  <div class="searchlist" v-show="searches.length">
    <ul >
      <li class="search-item" v-for="(item,index) of searches" :key="index" >
        <span class="text"></span>
        <span class="icon">
          <i class="icon-delete"></i>
        </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'search-list',
  props: {
    searches: {
      type: Array
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
@import '~@/common/stylus/mixin.styl'
.searchlist
  .search-item
    display flex
    align-items center
    height 40px
    overflow hidden
    .text
      flex 1
      color $color-text-l
    .icon
      extend-click()
      .icon-delete
        font-size $font-size-small
        color $color-text-d
</style>
