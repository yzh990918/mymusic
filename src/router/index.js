import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 路由懒加载
const Recommend = (resolve) => {
  import('../components/recommend/recommend').then((module) => {
    resolve(module)
  })
}
const rank = (resolve) => {
  import('../components/rank/rank.vue').then((module) => {
    resolve(module)
  })
}
const singer = (resolve) => {
  import('../components/singer/singer.vue').then((module) => {
    resolve(module)
  })
}
const search = (resolve) => {
  import('../components/search/search.vue').then((module) => {
    resolve(module)
  })
}
const SingerDetail = (resolve) => {
  import('../components/singer-detail/singer-detail.vue').then((module) => {
    resolve(module)
  })
}
const disc = (resolve) => {
  import('../components/Disc/disc.vue').then((module) => {
    resolve(module)
  })
}
const rankdetail = (resolve) => {
  import('../components/rank-detail/rank-detail.vue').then((module) => {
    resolve(module)
  })
}
const User = (resolve) => {
  import('../components/user/user.vue').then((module) => {
    resolve(module)
  })
}
export default new Router({
  routes: [
    // {
    //   // 配置默认根路径
    //   path: '/',
    //   redirect: '/recommend'
    // },
    {
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

    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
