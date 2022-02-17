export const TestModule = {
	namespaced: true,

	state: {
    user: null
  },

  // Mutations are functions that affect the State
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    }
  },

  // Actions are functions used to call a mutation throughout the application
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    }
  }
}