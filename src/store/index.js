import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app.js';
import share from './modules/share.js';
import user from './modules/user.js';
import behavior from './modules/behavior.js';
import business from './modules/business.js';

Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: process.env.NODE_ENV !== 'production' ? [Vuex.createLogger()] : [],
  modules: {
    app,
    share,
    user,
    behavior,
    business,
  }
});
