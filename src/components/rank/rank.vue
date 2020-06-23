<template>
  <div class="rank" ref="rank">
    <Scroll :data="toplist" class="toplist" ref="toplist">
      <ul>
        <li @click="selectItem(item)" class="item" v-for="(item,index) in toplist" :key="index">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.coverImgUrl"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in item.top" :key="index">
              <span>{{index + 1}}.</span>
              <span>{{song.name}}-{{song.ar[0].name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!toplist.length">
        <loading></loading>
      </div>
    </Scroll>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import Scroll from '../base/scroll/scroll'
import loading from '../base/loading/loading'
import {getrank} from '../../api/rank'
import {playlistMixin} from '../../common/js/mixin'
import {mapMutations} from 'vuex'
const YUNMUSIC_TOP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23].slice()
export default {
  mixins: [playlistMixin],
  created () {
    this._getTopList()
  },
  data () {
    return {
      toplist: []
    }
  },
  components: {
    Scroll,
    loading
  },
  methods: {
    ...mapMutations({
      settoplist: 'SET_TOPLIST'
    }),
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.toplist.refresh()
    },
    selectItem (item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })
      this.settoplist(item)
    },
    _getTopList () {
      for (let i = 0; i < YUNMUSIC_TOP.length; i++) {
        getrank(YUNMUSIC_TOP[i]).then((res) => {
          let list = res.data.body.playlist
          list.top = res.data.body.playlist.tracks.slice(0, 3)
          this.toplist.push(list)
        })
      }
    }

  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@/common/stylus/variable.styl"
  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
          img
            border-radius 5px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          border-radius 5px
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
