import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    good: 0,
    tab: 0,
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setGood(state, payload) {
      state.good = payload;
    },
    setTab(state, payload) {
      state.tab = payload;
    },
  },
  actions: {},
  modules: {},
});
