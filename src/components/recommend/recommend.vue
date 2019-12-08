<template>
  <div class="recommend"
       ref="recommend">
    <scroll class="recommend-content"
            :data="recommendsList"
            ref="scroll">
      <div>
        <!-- 只有等到拿到recommends时 就正确加载出slot内容 不然浏览器拿不到slot内容 就执行了mounted钩子 -->
        <div class="slider-wrapper"
             v-if="banner.length">
          <slider>
            <div v-for="(item,index) in banner"
                 :key="index">
              <a :href="item.url">
                <!-- 添加needsclcik 阻止冲突 -->
                <img class="needsclick"
                     width="100%"
                     @load="loadimage"
                     :src="item.imageUrl"
                     alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list"
             ref="recommendscroll">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item,index) in recommendsList"
                :key="index"
                class="item">
              <div class="icon">
                <img width="60"
                     height="60"
                     v-lazy="item.imgurl"
                     alt="">
              </div>
              <div class="text">
                <h2 class="name"
                    v-html="item.creator.name"></h2>
                <p class="desc"
                   v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-wrapper"
           v-show="!recommendsList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
import { getRecommendlist, getBanner } from '../../api/recommend'
import scroll from '../base/scroll/scroll'
import { ERR_OK } from '../../api/config'
import slider from '../base/slider/slider'
import loading from '../base/loading/loading'
export default {
  name: 'recommend',
  props: [''],
  data () {
    return {
      banner: [],
      recommendsList: []

    }
  },

  components: {
    slider,
    scroll,
    loading
  },

  computed: {},

  beforeMount () { },
  mounted () {

  },
  created () {
    this._getcommend()
  },

  methods: {
    _getcommend () {
      getBanner().then((res) => {
        this.banner = res.data.banners
        // console.log(res.data.banners)
      })
      setTimeout(() => {
        getRecommendlist().then((res) => {
          if (res.code === ERR_OK) {
            this.recommendsList = res.data.list
            // console.log(this.recommendsList)
          }
        }

        )
      }, 1500)
    },
    /**
     * todo 等页面加载出图片时重新计算高度 保证scroll能计算出正确的高度
     */
    loadimage () {
      if (!this.checkLoaded) {
        // !图片加载完 重新计算 第一张图片加载就计算高度 后面不需要重新计算
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  },

  watch: {}

}

</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable.styl'
.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  z-index: -1
  .recommend-content
    height: 100%
    overflow: hidden
    .slide-wrapper
      position: relative
      width: 100%
      overflow: hidden
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
    .loading-wrapper
      // ! 加载loading 居中显示
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
