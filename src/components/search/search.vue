<template>
  <div class="search" >
    <div class="search-box-wrapper">
   <searchbox ref="searchbox" @query="Changequery" class="searchbox"></searchbox>
   </div>
   <div class="shortcut-warpper" v-show="!query" ref="search">
    <Scroll class="shortcut"  ref="scroll">
   <hotsearch @addquery="addinput"></hotsearch>
   </Scroll>
   </div>
   <div class="search-result" v-show="query"> <suggest @beforescroll="blurinput" @select="selectItem" @selectList="selectList" :query="query"></suggest></div>
   <router-view></router-view>
  </div>
</template>
<script>
import searchbox from '../base/search-box/search-box'
import hotsearch from '../../components/search/hotsearch/hotsearch'
import suggest from '../suggest/suggest'
import Scroll from '../base/scroll/scroll'
import {mapMutations, mapActions} from 'vuex'
import {playlistMixin} from '../../common/js/mixin'
export default {
  mixins: [playlistMixin],
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
    blurinput () {
      this.$refs.searchbox.blur()
    },
    ...mapActions([
      'insertSong'
    ]),
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    addinput (query) {
      this.$refs.searchbox.add(query)
    },
    Changequery (query) {
      this.query = query
    },
    selectItem (item) {
      this.$router.push({
        path: `/search/singer/${item.id}`
      })
      console.log(item)
      this.setSinger(item)
    },
    selectList (item) {
      this.insertSong(item)
    },
    handlePlaylist  (playlist) {
      const bottom = playlist.length > 0 ? '70px' : ''
      this.$refs.search.style.bottom = bottom
      this.$refs.scroll.refresh()
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
