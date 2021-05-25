import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentSelectId: 'ru'
  },
  mutations: {
    updateselected (state, payload) {
      state.currentSelectId = payload
    },
  },
  actions: {
    selected ({ commit }, payload) {
      commit('updateselected', payload)
    },
  },
  getters: {
    currentSelectId (state) {
      return state.currentSelectId
    },
  }
})
