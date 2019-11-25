<template>
  <scroll :data="data"
          class="listview">
    <ul>
      <li v-for="group in data"
          :key="group"
          class="list-group">
        <h2 class="title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items"
              :key="item"
              class="list-group-item">
            <img v-lazy="item.avatar"
                 class="avatar"
                 alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>

      </li>
    </ul>

  </scroll>
</template>

<script>
import scroll from '../scroll/scroll'
export default {
  name: 'listview',
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {

    }
  },

  components: {
    scroll
  },

  computed: {},

  beforeMount () { },

  mounted () { },

  methods: {},

  watch: {}

}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
.listview
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  background: $color-background
  .list-group
    padding-bottom: 20px
    .title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
    .list-group-item
      display: flex
      align-items: center
      padding: 20px 0 0 30px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50%
      .name
        margin-left: 20px
        color: $color-text-l
        font-size: $font-size-medium
</style>
