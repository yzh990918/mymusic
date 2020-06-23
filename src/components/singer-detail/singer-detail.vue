<template>
  <transition name="change">
    <div class="singer-detail">
       <musiclist :songs="listdetail" :title="title" :bgImage="bgimage"></musiclist>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '../../api/singer'
// import { ERR_OK } from '../../api/config'
import {createSong} from '../../common/js/song'
import musiclist from '../music-list/music-list'
// 取数据的语法堂
export default {
  name: '',
  props: [''],
  data () {
    return {
      songs: [],
      node: null,
      listdetail: []

    }
  },

  components: {musiclist},

  computed: {
    title () {
      return this.singer.name
    },
    bgimage () {
      return this.singer.avatar
    },
    // 拿到state里面的singer
    ...mapGetters(['singer'])
  },
  created () {
    // console.log(this.singer);
    this._getDetail()
  },
  beforeMount () {},

  mounted () {},

  methods: {
    _getDetail () {
      if (!this.singer.id) {
        // 如果在歌手详情页刷新 用户无法获取到数据 就回退路由
        this.$router.push('/singer')
        return
      }
      // getSingerDetail(this.singer.id).then(res => {
      //   if (res.status === ERR_OK) {
      //     // console.log(res.data.list)
      //     this.songs = this._normalizeSong(res.data.hotSongs)
      //     console.log(this.songs)
      //   }
      // })

      getSingerDetail(this.singer.id).then((res) => {
        this.node = res.data.body.hotSongs
        // console.log(this.songs)
      })
    },
    _normalizeSong (list) {
      let ret = []
      list.forEach((item) => {
        ret.push(createSong(item))
      })
      return ret
    }
  },

  watch: {
    node (val) {
      this.listdetail = this._normalizeSong(val)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
.singer-detail
  z-index 200
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  background-color:$color-background
  &.change-enter-active, &.change-leave-active
    transition: all 0.3s
  &.change-enter, &.change-leave-active
    transform: translate3d(100%, 0, 0)

</style>
