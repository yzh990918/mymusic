<template>
  <scroll
    :data="data"
    class="listview"
    ref="listview"
    :listenScroll="listenScroll"
    :probeType="probeType"
    @scroll="handlescroll"
  >
    <ul>
      <li
        v-for="(group, index) in data"
        :key="index"
        class="list-group"
        ref="listgroup"
      >
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li
            @click="selectitem(item)"
            v-for="(item, index) in group.items"
            :key="index"
            class="list-group-item"
          >
            <img v-lazy="item.avatar" class="avatar" alt="" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut">
      <ul>
        <li
          v-for="(item, index) of shortcutlist"
          :key="index"
          class="item"
          :class="{ current: currentindex === index }"
          :data-index="index"
          @touchstart.stop.prevent="OnshortcutTouchstart"
          @touchmove.stop.prevent="OnshortcutTouchmove"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="fixedtitle" v-show="fixedtitle" ref="fixed">
      <h1 class="title">{{ fixedtitle }}</h1>
    </div>
    <div class="loading" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
import scroll from '../scroll/scroll'
import { getData } from '../../../common/js/dom'
import loading from '../loading/loading'
export default {
  name: 'listview',
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      showactive: false,
      scrollY: 0,
      listheight: [],
      currentindex: 0,
      diff: -1
    }
  },
  created () {
    this.touch = {}
    // todo 2.向子组件传值 要调用监听scroll事件
    this.listenScroll = true
    this.probeType = 3 // 连续滚动事件一定要设置这个api
  },
  components: {
    scroll,
    loading
  },
  computed: {
    shortcutlist () {
      return this.data.map(group => {
        // *map方法 得到一个经过处理后的数组 热门区 字母索引区 substr拿第一个字符
        return group.title.substr(0, 1)
      })
    },
    fixedtitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentindex]
        ? this.data[this.currentindex].title
        : ''
    }
  },

  beforeMount () {},

  methods: {
    refresh () {
      this.$refs.listview.refresh()
    },
    selectitem (item) {
      this.$emit('select', item)
    },
    // todo 第一步 传入index 触发touchstart事件
    OnshortcutTouchstart (e) {
      let shortcutindex = getData(e.target, 'index')
      let firstTouch = e.touches[0] // 获取手指第一次触碰的位置
      this.touch.y1 = firstTouch.pageY // 获取y值
      this.touch.startindex = shortcutindex // 记录首次点击的下标
      // * 索引表构建方法：1.封装一个方法:参数为（e,name,val）如果有val没优值就get到属性 （例如dom结构中有data-index变量 那么获取这个变量的值就可以调用getAttribute('data'-name)） 所以获取下标后 调用封装好的scrollToElement切换到下标元素
      this._initScrollToElement(shortcutindex)
    },
    // todo 第二步 触发touchmove事件 手指滑动事件
    OnshortcutTouchmove (e) {
      let firstTouch = e.touches[0] // 获取手指第一次触碰的位置
      this.touch.y2 = firstTouch.pageY // 获取y值
      let delta = Math.floor((this.touch.y2 - this.touch.y1) / 18) //! 获取两者之间锚点的数量
      let shortcutindex = delta + parseInt(this.touch.startindex) //! 获取下标
      this._initScrollToElement(shortcutindex)
    },
    _initScrollToElement (index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listheight.length - 2) {
        index = this.listheight.length - 2
      }
      this.scrollY = -this.listheight[index]
      this.$refs.listview.scrollToElement(this.$refs.listgroup[index], 400)
    },
    // todo 3.获取左侧滚屏的y值
    handlescroll (pos) {
      // ! scrollY 获取实时滚屏的y值
      this.scrollY = pos.y
      // console.log(-this.scrollY)
    },
    // todo 4.计算左侧每个group各自的高度
    _calculateheight () {
      // 计算每个区块的高度 push到listheight
      const singerlist = this.$refs.listgroup
      let height = 0
      this.listheight.push(height)
      for (let i = 0; i < singerlist.length; i++) {
        let item = singerlist[i]
        height += item.clientHeight
        this.listheight.push(height)
      }
    }
  },
  // todo 5.通过监听data 和scrollY实时计算区间高度和currentindex
  watch: {
    data () {
      setTimeout(() => {
        // 数据到DOM的变化有一个延时
        this._calculateheight()
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listheight
      // ? 常规方法 这种方法计算到的最后z的currentinde是23 显然不对
      /**
       * currentindex() {
      for (let i = 0; i < this.listheight.length; i++) {
        // 获取落到区间的范围
        let height1 = this.listheight[i];
        let height2 = this.listheight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
       */
      // * 当滚动到顶部， newY > 0
      if (newY > 0) {
        this.currentindex = 0
        return
      }
      //* 中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        //  listheight的元素比索引表元素多一个 listHeight 0~23 右侧 0~22
        if (-newY >= height1 && -newY < height2) {
          // !height2表示列表的最后一项
          this.currentindex = i
          this.diff = height2 + newY // diff是上线减去scrollY
          // console.log(this.diff)
          // console.log(height1)
          // console.log(height2)
          return
        }
      }
      //* 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentindex = listHeight.length - 2
      // console.log(this.index)
    },
    diff (newval) {
      // *思路：通过计算出滚屏所在位置距上限的差值是否大于标题的高度 如果大于不用操作 小于的话向上平移差值的高度 这样就不会有两个标题重叠的现象 会把上一个fixedtitle向上顶
      let fixTop = newval > 0 && newval < 30 ? newval - 30 : 0
      if (this.fixTop === fixTop) {
        return
      }
      this.fixTop = fixTop
      // 向上偏移
      this.$refs.fixed.style.transform = `translate3d(0,${fixTop}px,0)`
    }
  }
}
</script>
<style lang="stylus" scoped>
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
      &.current
        color: $color-theme
  .fixedtitle
    position: absolute
    left: 0
    top: 0
    width: 100%
    .title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
  .loading
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
