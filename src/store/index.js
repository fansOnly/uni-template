import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import state from './modules/state.js'
import behavior from './modules/behavior.js'
import business from './modules/business.js'
import pModules from '@p/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    state,
    user,
    behavior,
    business,
    ...pModules
  }
})
