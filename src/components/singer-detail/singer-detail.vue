<template>
  <transition name="change">
    <div class="singer-detail"></div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from '../../api/singer'
import { ERR_OK } from '../../api/config'
import {createSong} from '../../common/js/song'
// 取数据的语法堂
export default {
  name: '',
  props: [''],
  data () {
    return {
      song: []
    }
  },

  components: {},

  computed: {
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
      getSingerDetail(this.singer.id).then(res => {
        if (res.code === ERR_OK) {
          // console.log(res.data.list)
          this.song = this.normalizeSonge(res.data.list)
          console.log(this.song)
        }
      })
    },
    normalizeSonge (list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item// 解构赋值 只拿musicData
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))//! 工厂模式将数据传入 封装好song对象后再push进ret数组
        }
      })
      return ret
    }
  },

  watch: {}
}
</script>
<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
.change-enter-active, .change-leave-active
  transition: all 0.3s
.change-enter, .change-leave-to
  transform: translate3d(100%, 0, 0)
  opacity: 0
.singer-detail
  position: fixed
  z-index: 100
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: $color-background
</style>
