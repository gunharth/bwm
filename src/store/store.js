import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snack: ''
  },
  mutations: {
    setSnack(state, snack) {
      state.snack = snack
    }
  },
  actions: {

  }
})
