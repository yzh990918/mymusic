import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '../components/recommend/recommend'
import rank from '../components/rank/rank'
import singer from '../components/singer/singer'
import search from '../components/search/search'
import SingerDetail from '../components/singer-detail/singer-detail'
import disc from '../components/Disc/disc'
import rankdetail from '../components/rank-detail/rank-detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      // 配置默认根路径
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: disc
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank,
      children: [
        {
          path: ':id',
          component: rankdetail
        }
      ]
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      children: [
        {
          path: 'singer/:id',
          component: SingerDetail
        }
      ]

    }
  ]
})
