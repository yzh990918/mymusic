<template>
  <div class="search">
    <div class="search-box-wrapper">
   <searchbox ref="searchbox" @query="Changequery" class="searchbox"></searchbox>
   </div>
   <div class="shortcut-warpper">
    <Scroll class="shortcut">
   <hotsearch @addquery="addinput" v-show="!query"></hotsearch>
   </Scroll>
   </div>
   <div class="search-result" v-show="query"> <suggest :query="query"></suggest></div>
  </div>

</template>
<script>
import searchbox from '../base/search-box/search-box'
import hotsearch from '../../components/search/hotsearch/hotsearch'
import suggest from '../suggest/suggest'
import Scroll from '../base/scroll/scroll'
export default {
  name: 'search',
  props: [''],
  data () {
    return {
      query: ''
    }
  },

  components: {searchbox, hotsearch, suggest, Scroll},

  computed: {},

  beforeMount () {},

  mounted () {},

  methods: {
    addinput (query) {
      this.$refs.searchbox.add(query)
    },
    Changequery (query) {
      this.query = query
    }
  },

  watch: {}
}
</script>
<style lang="stylus" scoped>
.search
  .search-box-wrapper
    margin 20px
  .shortcut-warpper
    position fixed
    top 178px
    bottom 0
    width 100%
    .shortcut
      height 100%
      overflow hidden
</style>
