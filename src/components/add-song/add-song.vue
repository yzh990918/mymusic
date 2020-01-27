<template>
<transition name="slide">
  <div class="add-song" v-show="showFlag" @click.stop>
    <div class="header">
      <h1 class="title">添加歌曲到列表</h1>
      <div class="close">
        <i class="icon-close" @click="hide"></i>
      </div>
    </div>
    <div class="search-box-wrapper">
      <searchbox ref="searchbox" placeholder="搜索歌曲" @query="receivequery"></searchbox>
    </div>
    <div class="shortcut" v-show="!query">
<Select :switches="switches" @select ="changeCurrentIndex" :currentIndex="currentIndex"></Select>
<div class="list-wrapper">
<scroll ref="playhistory" :data="playhistory" class="list-scroll"  v-if="currentIndex===0">
  <div class="list-inner">
<songlist :songs="playhistory" @select="selectHistory">
</songlist>
  </div>
</scroll>
<scroll ref="searchhistory" :data="searchhistory" class="list-scroll"   v-if="currentIndex===1">
  <div class="list-inner">
    <searchlist @select="addinput" @delete="deleterecord" :searches="searchhistory">
</searchlist>
  </div>
</scroll>
</div>
    </div>
<div class="search-result" v-show="query">
  <suggest @select="selectItem" @selectList="selectList" :showSinger="false" :query="query"></suggest>
</div>
<toptip ref="toptip" class="toptip">
  <div class="title">
     <i class="icon-ok"></i>
    <span class="text">添加播放列表成功</span>
  </div>
</toptip>
  </div>
  </transition>
</template>

<script>
import searchbox from '../base/search-box/search-box'
import suggest from '../suggest/addSong-suggest'
import {mapActions, mapMutations, mapGetters} from 'vuex'
import Select from '../base/switches/switches'
import scroll from '../base/scroll/scroll'
import songlist from '../base/songlist/songlist'
import searchlist from '../base/search-list/search-list'
import toptip from '../base/top-tip/top-tip'
export default {
  name: 'add-song',
  props: [''],
  data () {
    return {
      showFlag: false,
      query: '',
      switches: [{
        name: '最近播放'
      }, {
        name: '历史搜索'
      }],
      currentIndex: 0
    }
  },

  components: {searchbox, suggest, Select, scroll, songlist, searchlist, toptip},
  created () {},

  computed: {
    ...mapGetters([
      'playhistory',
      'searchhistory'
    ])
  },

  beforeMount () {},

  mounted () {
  },

  methods: {
    addinput (item) {
      this.$refs.searchbox.add(item)
    },
    deleterecord (query) {
      this.deleteSearchHitory(query)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong',
      'saveSearchHistory',
      'deleteSearchHitory'
    ]),
    show () {
      this.showFlag = true
      setTimeout(() => {
        this.$refs.playhistory.refresh()
        this.$refs.searchhistory.refresh()
      }, 20)
    },
    hide () {
      this.showFlag = false
    },
    receivequery (query) {
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
      this.$refs.toptip.show()
    },
    changeCurrentIndex (index) {
      this.currentIndex = index
    },
    selectHistory (song, index) {
      console.log(song)
      this.insertSong(song)
      this.$refs.toptip.show()
    }
  },

  watch: {}

}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
@import '~@/common/stylus/mixin.styl'
.add-song
  position fixed
  top 0
  bottom  0
  width 100%
  z-index 200
  background $color-background
  &.slide-enter,&.slide-leave-active
    transform translate3d(100%,0,0)
  &.slide-enter-active,&.slide-leave-active
    transition all 0.3s
  .header
    position relative
    height 44px
    text-align center
    .title
      line-height 44px
      font-size $font-size-large
      color $color-text
    .close
      position absolute
      top 0
      right 8px
      .icon-close
        display block
        padding .75rem
        font-size 20px
        color $color-theme
  .search-box-wrapper
    margin 20px
  .shortcut
    .list-wrapper
      position absolute
      top 165px
      bottom 0
      width 100%
      .list-scroll
        height 100%
        overflow hidden
        .list-inner
          padding 20px 30px
  .search-result
    position fixed
    top 114px
    bottom 0
    width 100%
  .toptip
    .title
      text-align center
      padding 18px 0
      font-size 0
      .icon-ok
        font-size $font-size-medium
        color $color-theme
        margin-right 4px
      .text
        font-size $font-size-medium
        color $color-text

</style>
