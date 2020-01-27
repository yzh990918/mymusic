<template>
<transition name="list-fade">
  <div class="playlist" @click="hide" v-show="showFlag">
<div class="list-wrapper" @click.stop>
  <div class="list-header">
    <div class="title">
      <i class="icon" :class="iconMode" @click="changeMode"></i>
      <span class="text">{{modetext}}<span>({{this.playlist.length}})</span></span>
      <span class="clear" @click="showconfirm"><i class="icon-clear"></i></span>
    </div>
  </div>
  <Scroll ref="scroll" class="listContent" :data="sequencelist">
    <ul>
    <li ref="items" class="item" v-for="(item,index) of sequencelist " :key="index" @click="selectItem(item,index)">
      <i class="current" :class="Isplaying(item)"></i>
      <span class="text" :class="IsplayingText (item)">{{item.name}}</span>
      <span class="like" @click.stop>
        <i :class="getFavoriteIcon(item)"
        ></i>
      </span>
      <span class="delete"  @click.stop="deleteitem(item)">
        <i class="icon-delete"  ></i>
      </span>
    </li>
    </ul>
  </Scroll>
  <div class="list-operate">
    <div class="add">
      <i class="icon-add"></i>
      <span class="text" @click="addSong">添加歌曲至队列</span>
    </div>
  </div>
  <div class="hide" @click="hide">
    <span>关闭</span>
  </div>
</div>
<confirm text="是否清空播放列表" ref="confirm" @confirm="clearlist"></confirm>
<addSong ref="addsong"></addSong>
  </div>
</transition>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import Scroll from '../base/scroll/scroll'
import {playMode} from '../../common/js/config'
import confirm from '../base/confirm/confirm'
import addSong from '../add-song/add-song'
import {playerMixin} from '../../common/js/mixin'
export default {
  mixins: [playerMixin],
  name: 'playlist',
  props: [''],
  data () {
    return {
      showFlag: false

    }
  },

  components: {Scroll, confirm, addSong},
  created () {},

  computed: {
    ...mapActions([
      'deletefavoriate',
      'addfavoriate'
    ]),
    ...mapGetters([
      'sequencelist',
      'currentSong',
      'mode',
      'playlist',
      'favoriatelist'
    ]),
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENTINDEX',
      setplaying: 'SET_PLAYING',
      setPlaymode: 'SET_PLAY_MODE',
      setplaylist: 'SET_PLAYLIST'
    }),
    iconMode () {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    },
    modetext () {
      return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.loop ? '单曲循环' : '随机播放'
    }
  },

  beforeMount () {},

  mounted () {},

  methods: {
    addSong () {
      this.$refs.addsong.show()
    },
    showconfirm () {
      this.$refs.confirm.show()
    },
    show () {
      this.showFlag = true
      // 因为dom渲染需要 showFlag为true时才挂载上 所以betterscroll需要在这里延时刷新
      setTimeout(() => {
        this.$refs.scroll.refresh()
        this.scrollToItem(this.currentSong)
      }, 20)
    },
    hide () {
      this.showFlag = false
    },
    Isplaying (item) {
      if (item.id === this.currentSong.id) {
        return 'icon-play'
      } else {
        return ''
      }
    },
    IsplayingText (item) {
      if (item.id === this.currentSong.id) {
        return 'current'
      } else {
        return ''
      }
    },
    selectItem (item, index) {
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex((song) => {
          return song.id === item.id
        })
      }
      this.$emit('select', index)
    },
    scrollToItem (current) {
      const Index = this.sequencelist.findIndex((song) => {
        return song.id === current.id
      })
      this.$refs.scroll.scrollToElement(this.$refs.items[Index], 300)
    },
    changeMode () {
      this.$emit('changemode')
    },
    deleteitem (item) {
      this.$emit('delete', item)
    },
    clearlist () {
      this.$emit('clear')
      if (!this.playlist.length) {
        this.hide()
      }
    }
  },
  watch: {
    currentSong (newsong, oldsong) {
      // 同一首歌就不需要滚动
      if (!this.showFlag && newsong.id === oldsong.id) {
        return
      }
      setTimeout(() => {
        this.scrollToItem(newsong)
      }, 20)
    }
  }
}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
@import '~@/common/stylus/mixin.styl'
.playlist
  position fixed
  left 0
  top 0
  bottom 0
  right 0
  z-index 200
  background $color-background-d
  &.list-fade-enter-active,&.list-fade-leave-active
    transition opacity 0.3s
    .list-wrapper
      transition all 0.3s
  &.list-fade-enter,&.list-fade-leave-to
    opacity 0
    .list-wrapper
      transform translate3d(0,100%,0)
  .list-wrapper
    position absolute
    left 0
    bottom 0
    width 100%
    border-radius 20px
    background $color-highlight-background
    .list-header
      position relative
      padding 20px 30px 10px 25px
      .title
        display flex
        align-items center
        .icon
          margin-right 10px
          font-size 28px
          color #fbc531
        .text
          flex 1
          font-size $font-size-medium
          color $color-text-l
        .clear
          extend-click()
          .icon-clear
            font-size $font-size-medium
            color $color-text-d
    .listContent
      max-height 240px
      overflow hidden
      .item
        display flex
        align-items center
        height 40px
        padding 0 30px 0 20px
        overflow hidden
        .current
          flex 0 0 20px
          width 20px
          font-size $font-size-small
          color $color-theme-d
        .text
          flex 1
          no-wrap()
          font-size $font-size-medium
          color $color-text-d
          &.current
            color $color-theme
        .like
          extend-click()
          margin-right 15px
          font-size $font-size-medium
          color $color-theme
        .icon-favorite
          color $color-sub-theme
        .delete
          extend-click()
          margin-right auto
          font-size $font-size-small
          color $color-theme
    .list-operate
      width: 140px
      margin: 20px auto 30px auto
      .add
        display: flex
        align-items: center
        padding: 8px 16px
        border: 1px solid $color-text-l
        border-radius: 100px
        color: $color-text-l
        .icon-add
          margin-right: 5px
          font-size: $font-size-small-s
        .text
          font-size: $font-size-small
    .hide
      text-align: center
      line-height: 50px
      background: $color-background
      font-size: $font-size-medium-x
      color: $color-text-l

</style>
