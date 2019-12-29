<template>
  <div class="singer">
    <listview @select="selectSinger" :data="singers"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
import {getSingers} from '../../api/singer'
import Singer from '../../common/js/singer'
import listview from '../base/listview/listview'
import { mapMutations } from 'vuex'
const pinyin = require('pinyin')
export default {
  name: 'singer',
  props: [''],
  data () {
    return {
      singers: []
    }
  },

  components: {
    listview
  },

  computed: {},

  beforeMount () {},
  created () {
    this._getsingerList()
  },
  mounted () {},

  methods: {
    ...mapMutations({
      // * 将 this.setSinger映射为 this.$store.commit(SET_SINGER) 简化代码
      setSinger: 'SET_SINGER'
    }),
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },

    _getsingerList () {
      setTimeout(() => {
        getSingers().then(res => {
          // if (res.code === ERR_OK) {
          //   this.singers = this._normallizeSinger(res.data.artists)
          // }
          let s = res.data.artists
          //! 用pinyin依赖包将singername的首字母提炼出来作为item.initial 接下来就是封装数据为热门 和常规区域
          s.map((item) => {
            let py = pinyin(item.name[0], {
              style: pinyin.STYLE_FIRST_LETTER
            })
            item.initial = py[0][0].toUpperCase()
          })
          this.singers = this._normallizeSinger(s)
          console.log(this.singers)
        })
      }, 1000)
    },
    _normallizeSinger (list) {
      let map = {
        hot: {
          title: '热门',
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < 20) {
          map.hot.items.push(
            new Singer({
              // todo 热门区歌手对象
              id: item.id,
              name: item.name,
              avatar: item.img1v1Url,
              aliaName: item.alias.join(' / ')
            })
          )
        }
        // * 歌手区list
        const key = item.initial
        if (!map[key]) {
          map[key] = {
            // todo map[key]：A.B.C...区块 如果没有key就生成一个list对象 往每个map[key]里面push Singer对象
            title: key,
            items: []
          }
        }
        map[key].items.push(
          new Singer({
            // todo 热门区歌手对象
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url,
            aliaName: item.alias[0]
          })
        )
      })
      // !获取有序列表 通过封装的对象遍历后是无序的
      let hot = []
      let singers = []
      for (let key in map) {
        let value = map[key]
        if (value.title.match(/[a-zA-Z]/)) {
          singers.push(value)
        } else if (value.title === '热门') {
          hot.push(value)
        }
      }
      singers.sort((a, b) => {
        //! charCodeAt 将下标转化为UniCode编码 然后比较二者之间大小进行排序
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(singers)
    }
  },

  watch: {}
}
</script>
<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>
