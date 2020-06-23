<template>
<div class="hot-search">
<p class="title">热搜榜</p>
<ul>
  <li @click="addquery(item.searchWord)" class="hot-search-list" v-for="(item,index) in hotsearchList" :key="index">
    <div class="song-info">
        <span class="num">{{index+1}}</span>
      <p class="song-name">{{item.searchWord}}</p>
      <span class="search-num">{{item.score}}</span>
      <img v-if="item.iconUrl" :src="item.iconUrl" class="search-png" >
    </div>
    <h2 class="desc">
      {{item.content}}
    </h2>
  </li>
</ul>
  </div>
</template>

<script>
import {gethotsearch} from '../../../api/search'
import {mapActions} from 'vuex'
export default {
  name: '',
  props: [''],
  data () {
    return {
      hotsearchList: []

    }
  },

  components: {},
  created () {
    this._getHotlist()
  },

  computed: {},

  beforeMount () {},

  mounted () {},

  methods: {
    ...mapActions([
      'saveSearchHistory'
    ]),
    _getHotlist () {
      gethotsearch().then((res) => {
        this.hotsearchList = res.data.body.data
      }).catch((error) => {
        console.log(error)
      })
    },
    addquery (item) {
      this.saveSearchHistory(item)
      this.$emit('addquery', item)
      this.$emit('refresh', this.hotsearchList)
    }
  },

  watch: {}

}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
@import '~@/common/stylus/mixin.styl'
.hot-search
  box-sizing border-box
  padding 0 20px
  margin-top 20px
  .hot-search-list
    display flex
    margin 20px 0
    flex-direction column
    &:nth-child(1)
      .song-info
        .num
          color #dd001b
    &:nth-child(2)
      .song-info
        .num
          color #dd001b
    &:nth-child(3)
      .song-info
        .num
          color #dd001b
    &:nth-child(4)
      .song-info
        .num
          color #dd001b
    .song-info
      margin-left 6px
      font-size 15px
      vertical-align top
      display flex
      line-height 19px
      no-wrap()
      .num
        line-height 18px
        font-size 18px
        margin-right 6px
        margin-top 6px
        color $color-theme
      .song-name
       margin 0 15px
      .search-png
        margin-left 14px
        height 16px
      .search-num
        color #999
        font-size 13px
        line-height 16px
    .desc
      font-size 12px
      color $color-text-d
      margin 8px 38px
</style>
