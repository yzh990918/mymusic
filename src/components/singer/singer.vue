<template>
  <div class="singer">
    <listview @select="selectSinger" :data="singers"></listview>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from "../../api/singer";
import { ERR_OK } from "../../api//config";
import Singer from "../../common/js/singer";
import listview from "../base/listview/listview";
import { mapMutations } from "vuex";
export default {
  name: "singer",
  props: [""],
  data() {
    return {
      singers: []
    };
  },

  components: {
    listview
  },

  computed: {},

  beforeMount() {},
  created() {
    this._getsingerList();
  },
  mounted() {},

  methods: {
    ...mapMutations({
      // * 将 this.setSinger映射为 this.$store.commit(SET_SINGER) 简化代码
      setSinger: "SET_SINGER"
    }),
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },

    _getsingerList() {
      setTimeout(() => {
        getSingerList().then(res => {
          if (res.code === ERR_OK) {
            this.singers = this._normallizeSinger(res.data.list);
          }
        });
      }, 1000);
    },
    _normallizeSinger(list) {
      let map = {
        hot: {
          title: "热门",
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < 10) {
          map.hot.items.push(
            new Singer({
              // todo 热门区歌手对象
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          );
        }
        // * 歌手区list
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            // todo map[key]：A.B.C...区块 如果没有key就生成一个list对象 往每个map[key]里面push Singer对象
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            // todo 热门区歌手对象
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        );
      });
      // !获取有序列表 通过封装的对象遍历后是无序的
      let hot = [];
      let singers = [];
      for (let key in map) {
        let value = map[key];
        if (value.title.match(/[a-zA-Z]/)) {
          singers.push(value);
        } else if (value.title === "热门") {
          hot.push(value);
        }
      }
      singers.sort((a, b) => {
        //! charCodeAt 将下标转化为UniCode编码 然后比较二者之间大小进行排序
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(singers);
    }
  },

  watch: {}
};
</script>
<style lang="stylus" scoped>
@import '~@/common/stylus/variable.styl'
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>
