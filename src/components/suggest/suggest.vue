<template>
  <div class="suggest">
  <div class="search-suggest" v-show="query && songs.length">
    <p class="title" v-show="showSinger">你可能感兴趣</p>
    <div class="search-suggest-item" v-if="suggest.artists">
      <img :src="suggest.artists[0].img1v1Url" width="40" height="40">
      <span class="text">歌手:<span class="singer">{{suggest.artists[0].name}}</span></span>
    </div>
  </div>
<ul class="suggest-list" v-if="suggest.songs">
  <p class="title">单曲列表</p>
  <Scroll class="list" :class="listCls" :data="songs">
    <div>
  <li class="suggest-item" v-for="(item,index) of songs" :key="index">
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
</ul>
</div>
</template>

<script>
import Scroll from '../base/scroll/scroll'
import {getSearchSongs, getSearchSuggest} from '../../api/search'
import {createRecommendSong} from '../../common/js/song'
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
      showSinger: true
    }
  },

  components: {Scroll},
  created () {
  },

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
    search () {
      getSearchSongs(this.query, this.page).then((res) => {
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
    }
  },

  watch: {
    query (val) {
      this.search()
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
</style>
