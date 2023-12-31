import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Your global data goes here
    user: null,
    isLoggedIn: false,
    someOtherData: 'default value'
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_LOGIN_STATUS(state, status) {
      state.isLoggedIn = status;
    }
    // ... other mutations
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    // ... other actions
  },
  getters: {
    user: state => state.user,
    // ... other getters
  }
});
