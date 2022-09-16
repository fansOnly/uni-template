import Vue from 'vue';
import App from './App';
import store from './store';
import methods from '@/mixins/methods';
import router from './router';

// 全局mixin
Vue.mixin(methods);

Vue.prototype.$wxRouter = router;
Vue.config.productionTip = false;

// 让页面的 onLoad 在 onLaunch 之后执行
Vue.prototype.$onLaunched = new Promise(resolve => {
  Vue.prototype.$isResolve = resolve;
});

// 挡板数据
if (process.env.USE_MOCK) {
  require('./mocks');
}

App.mpType = 'app';

const app = new Vue({
  store,
  ...App
});
app.$mount();
