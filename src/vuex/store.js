import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
  state: () => ({
    users: JSON.parse(localStorage.getItem('users') || '[]'),
    nextId: 1,
  }),
  actions: {
    UPDATE_USERS({commit}, users) {
      commit('SET_USERS', users);
      localStorage.setItem('users', JSON.stringify(users));
    },
  },
  mutations: {
    SET_USERS: (state, users) => {
      state.users = users;
    },
  },
  getters: {
    USERS(state) {
      return state.users;
    },
  },
});

export default store;