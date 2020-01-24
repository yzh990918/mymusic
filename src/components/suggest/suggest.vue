<template>
  <div class="suggest" ref="suggest">
  <div class="search-suggest" v-show="query && songs.length">
    <p class="title" v-show="showSinger">你可能感兴趣</p>
    <div class="search-suggest-item" v-if="suggest.artists"
     @click="selectSinger(suggest.artists[0])">
      <img :src="suggest.artists[0].img1v1Url" width="40" height="40">
      <span class="text">歌手:<span class="singer">{{suggest.artists[0].name}}</span></span>
    </div>
  </div>
<ul class="suggest-list" v-if="suggest.songs">
  <p class="title">单曲列表</p>
  <Scroll @scrollToEnd="searchMore" class="list" @beforeScroll="beforescroll" :beforeScroll="true"
  ref="scroll"
  :class="listCls" :pullup="true" :data="songs">
    <div>
  <li @click="selectList(item)" class="suggest-item" v-for="(item,index) of songs" :key="index">
    <div class="icon">
      <i class="icon-music"></i>
    </div>
    <div class="desc">
      <p class="songname">{{item.name}}</p>
      <p class="songdesc">{{item.singer}}-{{item.album}}</p>
    </div>
  </li>
  </div>
  </Scroll>
   <loading v-show="showMore" class="loading-content"></loading>
</ul>
<div class="noresult-wrapper">
  <noresult v-show="!this.suggest.artists && !this.suggest.songs" title="臣妾搜不到啊"></noresult>
</div>

</div>
</template>
<script>
import Scroll from '../base/scroll/scroll'
import {getSearchSongs, getSearchSuggest, getSongDetail} from '../../api/search'
import {createRecommendSong} from '../../common/js/song'
import loading from '../base/loading/loadingpluss'
import Singer from '../../common/js/singer'
import noresult from '../base/no-result/no-result'
export default {
  name: 'suggest',
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      result: [],
      page: 0,
      songs: [],
      suggest: {},
      showSinger: true,
      // finished: 下拉刷新bug 总是显示loading 模拟了加载
      showMore: false
    }
  },

  components: {Scroll, loading, noresult},

  computed: {
    listCls () {
      if (!this.suggest.artists) {
        return 'list1'
      } else {
        return 'list2'
      }
    }
  },

  beforeMount () {},

  mounted () {

  },

  methods: {
    beforescroll () {
      this.$emit('beforescroll')
    },
    selectSinger (item) {
      const singer = new Singer({
        id: item.id,
        name: item.name,
        avatar: item.img1v1Url,
        aliaName: item.alias[0]
      })
      this.$emit('select', singer)
    },
    selectList (item) {
      getSongDetail(item.id).then((res) => {
        item.image = res.data.songs[0].al.picUrl
      })
      this.$emit('selectList', item)
    },
    search () {
      console.log('首次搜索' + this.showMore)
      getSearchSongs(this.query, this.page).then((res) => {
        if (!res.data.result.songs.length) {
          this.showMore = false
        }
        let list = res.data.result.songs
        let ret = []
        list.forEach((item) => {
          ret.push(createRecommendSong(item))
        })
        this.songs = ret
      })
      getSearchSuggest(this.query).then((res) => {
        this.suggest = res.data.result
      })
    },
    searchMore () {
      this.showMore = true
      console.log('搜索更多' + this.showMore)
      if (!this.songs.length) {
        this.showMore = false
        return
      }
      getSearchSongs(this.query, this.page).then((res) => {
        let list = res.data.result.songs
        if (!res.data.result.songs) {
          this.showMore = false
        }
        let ret = []
        list.forEach((item) => {
          ret.push(createRecommendSong(item))
        })
        this.songs = this.songs.concat(ret)
        this.$refs.scroll.refresh()
        this.page += 1
      }).then((res) => {
      })
    }
  },

  watch: {
    query (val) {
      if (val === '') {
        return
      }
      this.search()
    },
    showMore () {
      setTimeout(() => {
        this.showMore = false
      }, 1000)
      console.log('watch的showmore' + this.showMore)
    }
  }

}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
@import '~@/common/stylus/mixin.styl'
.suggest
  .search-suggest
    .title
      color #dcdde1
      font-weight 600
      font-size 14px
      padding-left 20px
      margin-bottom 16px
    .search-suggest-item
      display flex
      align-items center
      padding 6px 25px
      font-size $font-size-medium
      img
        flex 0 0 40px
        border-radius 50%
      .text
        flex 1
        margin-left 18px
        color #ecf0f1
        font-size 16px
        .singer
          color $color-theme
          margin-left 4px
  .suggest-list
    margin-top 15px
    padding 0 25px
    .list
      position fixed
      bottom 0
      overflow hidden
      height 100%
      &.list1
        top 230px
      &.list2
        top 300px
    .title
      margin-top 6px
      margin-bottom 6px
      line-height 30px
      font-size 16px
      color  #eb4d4b
      font-weight 600
    .suggest-item
      display flex
      align-items center
      padding-bottom 20px
      .icon
        flex 0 0 30px
        width 30px
        [class^="icon-"]
          font-size 15px
          color $color-text-d
      .desc
        flex 1
        font-size $font-size-medium
        line-height 15px
        .songname
          np-wrap()
          color #ecf0f1
        .songdesc
          color $color-text-d
          margin-top 4px
          no-wrap()
    .loading-content
        position absolute
        width 30%
        top 30%
        right 0
        transform translate3d(0,-40%,0)
  .noresult-wrapper
    position absolute
    top 50%
    transform translateY(-50%)
    width 100%
</style>
