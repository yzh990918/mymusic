<template>
  <div class="search" >
    <div class="search-box-wrapper">
   <searchbox ref="searchbox" @query="Changequery" class="searchbox"></searchbox>
   </div>
    <div class="history" v-show="this.searchhistory.length && !query">
        <h1 class="title">搜索历史</h1>
        <i class="icon-clear" @click="showconfirm"></i>
        <ul>
          <li class="item" v-for="(item,index) in this.searchhistory" :key="index" @click="addquery(item)">
            <span>{{item}}</span>
          </li>
        </ul>
      </div>
   <div class="shortcut-warpper" :class="topcls" v-show="!query" ref="search">
    <Scroll class="shortcut"  ref="scroll" :data="data">
   <hotsearch @refresh="refreshScroll" @addquery="addinput"></hotsearch>
   </Scroll>
   </div>
   <div class="search-result" v-show="query"> <suggest @beforescroll="blurinput" @select="selectItem" @selectList="selectList" :query="query"></suggest></div>
<confirm ref="confirm" @confirm ="clearSearchHistory" text="是否清空历史搜索记录" confirmBtnText="清空"></confirm>
    <router-view></router-view>
  </div>
</template>
<script>
import searchbox from '../base/search-box/search-box'
import hotsearch from '../../components/search/hotsearch/hotsearch'
import suggest from '../suggest/suggest'
import Scroll from '../base/scroll/scroll'
import {mapMutations, mapActions, mapGetters} from 'vuex'
import {playlistMixin} from '../../common/js/mixin'
import confirm from '../base/confirm/confirm'
export default {
  mixins: [playlistMixin],
  name: 'search',
  props: [''],
  data () {
    return {
      query: '',
      searches: [],
      top: '',
      data: []
    }
  },
  components: {searchbox, hotsearch, suggest, Scroll, confirm},
  computed: {
    ...mapGetters([
      'searchhistory'
    ]),
    topcls () {
      if (this.searchhistory.length === 0) {
        return 'top1'
      }
      if (this.searchhistory.length > 0 && this.searchhistory.length < 5) {
        return 'top2'
      } else {
        return 'top3'
      }
    }

  },
  beforeMount () {},
  mounted () {
  },
  methods: {
    refreshScroll (item) {
      this.data = item
    },
    addquery (item) {
      this.$refs.searchbox.add(item)
    },
    blurinput () {
      this.$refs.searchbox.blur()
    },
    ...mapActions([
      'insertSong',
      'saveSearchHistory',
      'clearSearchHistory'
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
      this.saveSearchHistory(item.name)
      this.setSinger(item)
    },
    selectList (item) {
      this.insertSong(item)
      this.saveSearchHistory(item.name)
    },
    handlePlaylist  (playlist) {
      const bottom = playlist.length > 0 ? '80px' : ''
      this.$refs.search.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    showconfirm () {
      this.$refs.confirm.show()
    }
  },

  watch: {}
}
</script>
<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
.search
  .search-box-wrapper
    margin 20px
  .history
      margin 0 20px 10px 20px
      .title
        margin-bottom 20px
        font-size 15px
        color $color-text-l
      .icon-clear
        font-size 14px
        position absolute
        right 25px
        top 174px
        color $color-text-d
      .item
        display inline-block
        padding 5px 10px
        margin 0 20px 10px 0
        border-radius 6px
        background $color-highlight-background
        font-size 12px
        color $color-text-d
  .shortcut-warpper
    position fixed
    bottom 0
    width 100%
    &.top1
      top 158px
    &.top2
      top 258px
    &.top3
      top 288px
    .shortcut
      height 100%
      overflow hidden
</style>
