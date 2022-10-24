import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

//添加事件总线，默认情况下,$bus是没有值的,main.js中赋值
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false
//安装toash插件
Vue.use(toast)

FastClick.attach(document.body)

//使用懒加载插件，loading为占位符
Vue.use(VueLazyLoad, { loading: require('./assets/img/common/placeholder.png') })

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
