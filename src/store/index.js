import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app.js';
import router from './modules/router.js';
import share from './modules/share.js';
import user from './modules/user.js';
import state from './modules/state.js';
import behavior from './modules/behavior.js';
import business from './modules/business.js';
import pModules from '@p/store';

Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: process.env.NODE_ENV !== 'production' ? [Vuex.createLogger()] : [],
  modules: {
    app,
    router,
    share,
    state,
    user,
    behavior,
    business,
    ...pModules
  }
});
