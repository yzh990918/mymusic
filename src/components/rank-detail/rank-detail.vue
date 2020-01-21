<template>
  <transition name="slide">
    <div class="rank-detail">
    <musiclist :rank="rank" :title="title" :bgImage="bgImage" :songs="listdetail"></musiclist>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import musiclist from '../music-list/music-list'
import {mapGetters} from 'vuex'
import {createSong} from '../../common/js/song'
export default {
  computed: {
    ...mapGetters([
      'topList'
    ]),
    title () {
      return this.topList.name
    },
    bgImage () {
      return this.topList.coverImgUrl
    }
  },
  created () {
    // 页面渲染就执行方法
    this._normalizeSong(this.topList.tracks)
    console.log(this.topList)
  },
  data () {
    return {
      songs: [],
      rank: true,
      listdetail: []
    }
  },
  methods: {

    _normalizeSong (list) {
      if (!this.topList.tracks) {
        this.$router.push('/rank')
        return
      }
      let ret = []
      list.forEach((item) => {
        ret.push(createSong(item))
      })
      this.listdetail = ret
    }
  },
  components: {
    musiclist
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable.styl';
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .rank-detail
    z-index 200
    position fixed
    left 0
    top 0
    right 0
    bottom 0
    background-color:$color-background
</style>
