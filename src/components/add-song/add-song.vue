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
<switches :switches="switches" @switch="switchItem" :currentIndex="currentIndex"></switches>
<div class="list-wrapper">
<scroll>
  <div class="list-inner">
<songlist :select="selectSong">
</songlist>
  </div>
</scroll>
</div>
    </div>
<div class="search-result">
  <suggest @select="selectItem" @selectList="selectList" :showSinger="false" :query="query" v-show="query"></suggest>
</div>
  </div>
  </transition>
</template>

<script>
import searchbox from '../base/search-box/search-box'
import suggest from '../suggest/addSong-suggest'
import {mapActions, mapMutations} from 'vuex'
import switches from '../base/switches/switches'
import scroll from '../base/scroll/scroll'
import songlist from '../base/songlist/songlist'
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

  components: {searchbox, suggest, switches, scroll, songlist},
  created () {},

  computed: {},

  beforeMount () {},

  mounted () {},

  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong',
      'saveSearchHistory'
    ]),
    show () {
      this.showFlag = true
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
    },
    switchItem (index) {
      this.currentIndex = index
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
  .search-result
    position fixed
    top 114px
    bottom 0
    width 100%
</style>
