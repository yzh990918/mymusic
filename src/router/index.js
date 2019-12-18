import Vue from "vue";
import Router from "vue-router";
import Recommend from "../components/recommend/recommend";
import rank from "../components/rank/rank";
import singer from "../components/singer/singer";
import search from "../components/search/search";
import SingerDetail from "../components/singer-detail/singer-detail";
Vue.use(Router);

export default new Router({
  routes: [
    {
      // 配置默认根路径
      path: "/",
      redirect: "/recommend"
    },
    {
      path: "/recommend",
      name: "Recommend",
      component: Recommend
    },
    {
      path: "/rank",
      name: "rank",
      component: rank
    },
    {
      path: "/singer",
      name: "singer",
      component: singer,
      children: [
        {
          path: ":id",
          component: SingerDetail
        }
      ]
    },
    {
      path: "/search",
      name: "search",
      component: search
    }
  ]
});
