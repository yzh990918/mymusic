<template>
  <div class="songlist">
    <ul>
      <li v-for="(item,index) in songs"
          :key="index"
          class="item">
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
export default {
  name: 'songlist',
  props: {
    songs: {
      type: Array
      // default: []
    }
  },
  data () {
    return {}
  },

  components: {},

  computed: {
    desc () {
      return this.songs.singer + this.songs.album
    }
  },

  beforeMount () {},

  mounted () {
    console.log(this.songs)
  },

  methods: {
    getdesc (song) {
      return `${song.singer}-${song.album}`
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
