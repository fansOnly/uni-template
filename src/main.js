import Vue from 'vue'
import App from './App'
import store from './store'
import methods from '@/mixins/methods'
import { router, RouterMount } from './router'

// uni 内部是通过 Component 构造器实现前端页面
import { proxyComponent } from './common/core/component-proxy'
// Component = proxyComponent(Component)

Vue.use(router)

const sysInfo = uni.getSystemInfoSync()
Vue.prototype.$sysInfo = uni.$sysInfo = sysInfo

// 全局mixin
Vue.mixin(methods)

Vue.config.productionTip = false

// 挡板数据
if (process.env.USE_MOCK) {
  require('./mocks')
}

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount() //为了兼容小程序及app端必须这样写才有效果
// #endif
