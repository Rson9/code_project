import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    isCollapsed: false
  },
  getters: {},
  mutations: {
    changeCollapsed(state) {
      state.isCollapsed = !state.isCollapsed
    }
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      paths: ['isCollapsed'] // 控制是否持久化
    })
  ]
})

