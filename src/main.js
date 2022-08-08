import Vue from 'vue'
import App from './App'
import store from './store'
import methods from '@/mixins/methods'

import '@/common/styles/index.scss'
import '@p/assets/styles/index.scss'

// 全局mixin
Vue.mixin(methods)

Vue.config.productionTip = false

// 让页面的 onLoad 在 onLaunch 之后执行
Vue.prototype.$onLaunched = new Promise(resolve => {
  Vue.prototype.$isResolve = resolve
})

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})
app.$mount()
