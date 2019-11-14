<template>
  <div class="recommend">
    <div class="recommend-content">
      <!-- 只有等到拿到recommends时 就正确加载出slot内容 不然浏览器拿不到slot内容 就执行了mounted钩子 -->
      <div v-if="recommends.length"
           class="slider-wrapper">
        <slider>
          <div v-for="(item,index) in recommends"
               :key="index">
            <a :href="item.linkUrl">
              <img :src="item.picUrl"
                   alt="">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul></ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getRecommend, getRecommendlist } from '../../api/recommend'

import { ERR_OK } from '../../api/config'
import slider from '../base/slider/slider'
export default {
  name: 'recommend',
  props: [''],
  data () {
    return {
      recommends: [],
      recommendsList: []

    }
  },

  components: {
    slider
  },

  computed: {},

  beforeMount () { },

  created () {
    this._getcommend()
  },

  methods: {
    _getcommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
      getRecommendlist().then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data.list)
          this.recommendsList = res.data.list
        }
      })
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
</style>
