<template>
  <div class="songlist">
    <ul>
      <li v-for="(item,index) in songs"
          :key="index"
          @click="selectItem(item,index)"
          class="item">
          <div class="rank" v-show="rank">
            <span :class="getRankCls(index)" v-text="getRanktext(index)"></span>
          </div>
        <div class="content">
          <h2 class="name">
            {{item.name}}
          </h2>
          <p class="desc">{{getdesc(item)}}</p>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'songlist',
  props: {
    songs: {
      type: Array
      // default: []
    },
    rank: {
      type: Boolean
    }
  },
  data () {
    return {}
  },

  components: {},

  computed: {
    ...mapActions([
      'insertSong'
    ]),
    desc () {
      return this.songs.singer + this.songs.album
    }
  },

  beforeMount () {},

  mounted () {
    setTimeout(() => {
      // console.log(this.songs)
    }, 1500)
  },

  methods: {
    selectItem (item, index) {
      this.insertSong(item)
    },
    getdesc (song) {
      return `${song.singer}-${song.album}`
    },
    getRankCls (index) {
      if (index <= 2) {
        return `icon icon${index}`
      } else {
        return 'text'
      }
    },
    getRanktext (index) {
      if (index > 2) {
        return index + 1
      }
    }
  },

  watch: {}
}
</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
@import '~@/common/stylus/mixin.styl'
.songlist
  .item
    font-size: $font-size-medium
    box-sizing: border-box
    align-items: center
    display: flex
    height: 64px
    .rank
      flex 0 0 25px
      width 25px
      margin-right 30px
      text-align center
      .icon
        display inline-block
        width 25px
        height 24px
        background-size 25px 24px
        &.icon0
          bg-image('first')
        &.icon1
          bg-image('second')
        &.icon2
          bg-image('third')
      .text
        color $color-theme
        font-size $font-size-large
    .content
      line-height: 20px
      overflow: hidden
      .name
        no-wrap()
        color: $color-text
      .desc
        no-wrap()
        margin-top: 4px
        color: $color-text-d
</style>
