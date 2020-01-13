<template>
<transition name="slide">
<div class="disc">
  <musiclist :title="title" :bgImage="bgImage" :songs="node"></musiclist>
</div>
</transition>
</template>

<script>
import musiclist from '../music-list/music-list'
import {mapGetters} from 'vuex'
import {getRecommendlistDetail} from '../../api/recommend'
import {createRecommendSong} from '../../common/js/song'
export default {
  name: 'disc',
  props: [''],
  data () {
    return {
      node: [],
      listdetail: []

    }
  },

  components: {
    musiclist
  },

  computed: {
    ...mapGetters([
      'disc'
    ]),
    title () {
      return this.disc.name
    },
    bgImage () {
      return this.disc.coverImgUrl
    }
  },

  beforeMount () {},

  created () {
    this._getRecommendlist()
  },

  methods: {
    _getRecommendlist () {
      if (!this.disc.id) {
        this.$router.push('/recommend')
        return
      }
      getRecommendlistDetail(this.disc.id).then((res) => {
        this.node = res.data.result.tracks
      }).then(() => {
        this.node = this._normalizeSong(this.node)
      })
    },
    _normalizeSong (list) {
      let ret = []
      list.forEach((item) => {
        ret.push(createRecommendSong(item))
      })
      return ret
    }
  },

  watch: {
    // node (val) {
    //   // this.listdetail = this._normalizeSong(val)
    //   // console.log(this.listdetail)
    //   // console.log(val.tracks)
    //   this.listdetail = this._normalizeSong(val)
    // }
  }

}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl';
.slide-enter-active,.slide-leave-active
  transition all 0.3s
.slide-enter,.slide-leave-active
  transform translate3d(100%,0,0)
.disc
  z-index 200
  position fixed
  left 0
  top 0
  right 0
  bottom 0
  background-color:$color-background
</style>
