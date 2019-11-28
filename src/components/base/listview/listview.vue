<template>
  <scroll :data="data"
          class="listview"
          ref="listview">
    <ul>
      <li v-for="(group,index) in data"
          :key="index"
          class="list-group"
          ref="listgroup">
        <h2 class="title">{{group.title}}</h2>
        <ul>
          <li v-for="(item,index) in group.items"
              :key="index"
              class="list-group-item">
            <img v-lazy="item.avatar"
                 class="avatar"
                 alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>

      </li>
    </ul>
    <div class="list-shortcut">
      <ul>
        <li v-for="(item,index) of shortcutlist"
            :key="index"
            class="item"
            :data-index="index"
            @touchstart.stop.prevent="OnshortcutTouchstart"
            @touchmove.stop.prevent="OnshortcutTouchstop">{{item}}</li>
      </ul>

    </div>

  </scroll>
</template>

<script>
import scroll from '../scroll/scroll'
import { getData } from '../../../common/js/dom'
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

  computed: {
    shortcutlist () {
      return this.data.map((group) => {
        // *map方法 得到一个经过处理后的数组 热门区 字母索引区 substr拿第一个字符
        return group.title.substr(0, 1)
      })
    }
  },

  beforeMount () { },

  mounted () { },

  methods: {
    OnshortcutTouchstart (e) {
      let shortcutindex = getData(e.target, 'index')
      // * 索引表构建方法：1.封装一个方法:参数为（e,name,val）如果有val没优值就get到属性 （例如dom结构中有data-index变量 那么获取这个变量的值就可以调用getAttribute('data'-name)） 所以获取下标后 调用封装好的scrollToElement切换到下标元素
      this._initScrollToElement(shortcutindex)
    },
    // todo 第二步 触发touchmove事件 手指滑动事件
    OnshortcutTouchmove (e) {
      let firstTouch = e.touches[0]// 获取手指第一次触碰的位置
      this.touch.y2 = firstTouch.pageY// 获取y值
      let delta = Math.floor((this.touch.y2 - this.touch.y1) / 18)//! 获取两者之间锚点的数量
      let shortcutindex = delta + this.touch.startindex//! 获取下标
      this._initScrollToElement(shortcutindex)
    },
    _initScrollToElement (index) {
      this.$refs.listview.scrollToElement(this.$refs.listgroup[index], 1000)
    }

  },

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
  .list-shortcut
    position: absolute
    z-index: 30
    right: 0
    top: 50%
    padding: 20px 0
    text-align: center
    border-radius: 10px
    transform: translateY(-50%)
    background: $color-background-d
    font-family: Helvetica
    .item
      padding: 3px
      line-height: 1
      color: $color-text-l
      font-size: $font-size-small
</style>
