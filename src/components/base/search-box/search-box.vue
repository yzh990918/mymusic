<template>
  <div class="search-box">
  <i class="icon-search"></i>
  <input ref="query" v-model="query" class="box" :placeholder="placeholder" >
  <i class="icon-dismiss" @click="clear" v-show="query"></i>
  </div>
</template>
<script>
import {debounce} from '../../../common/js/util'
export default {
  name: 'search-box',
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲，歌手'
    }
  },
  data () {
    return {
      query: ''
    }
  },
  created () {
    this.$watch('query', debounce((val) => {
      this.$emit('query', val)
    }, 300))
  },
  components: {},

  computed: {},

  beforeMount () {},

  mounted () {},

  methods: {
    clear () {
      this.query = ''
    },
    add (query) {
      this.query = query
    },
    blur () {
      this.$refs.query.blur()
    }
  },

  watch: {}

}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
.search-box
  display flex
  align-items center
  box-sizing border-box
  width 100%
  padding 0 6px
  height 40px
  background $color-highlight-background
  border-radius 6px
  .icon-search
    font-size 24px
    color $color-background
  .box
    flex 1
    margin 0 5px
    line-height  18px
    background $color-highlight-background
    color $color-text
    font-size $font-size-medium
    &::placeholder
      color $color-text-d
  .icon-dismiss
    font-size 16px
    color $color-background
</style>
