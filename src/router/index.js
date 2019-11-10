import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../components/recommend/recommend'
import rank from '../components/rank/rank'
import singer from '../components/singer/singer'
import search from '../components/search/search'
Vue.use(Router)

export default new Router({
  routes: [{
    // 配置默认根路径
    path: '/',
    redirect: '/Recommend'
  }, {
    path: '/Recommend',
    name: 'Recommend',
    component: Recommend
  }, {
    path: '/rank',
    name: 'rank',
    component: rank
  },
  {
    path: '/singer',
    name: 'singer',
    component: singer
  },
  {
    path: '/search',
    name: 'search',
    component: search
  }
  ]
})
