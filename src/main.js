// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'swiper/dist/css/swiper.css'
import VueLazyload from 'vue-lazyload'
import store from './store/index'
import './common/stylus/index.styl'
import 'babel-polyfill'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: require('./common/image/default.png')
})
Vue.use(VueAwesomeSwiper)
fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
