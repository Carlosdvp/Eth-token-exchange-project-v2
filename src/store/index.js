import { createStore } from 'vuex'

// import the module file
import { TestModule } from './TestModule'


export default createStore({
  state: {
    connection: false,
    accounts: []
  },
  mutations: {
    WEB3_LOADED(state, connection) {
      state.connection = connection;
    },
    WEB3_LOAWEB3_ACCOUNT_LOADEDDED(state, connection) {
      state.connection = connection;
    }
  },
  actions: {
    web3Loaded({ commit }, connection) {
      commit('WEB3_LOADED', connection)

      console.log(connection)
    }
  },
  modules: {
    Test: TestModule
  }
})

// const store = createStore({
//   state () {
//     return {
//       count: 0
//     }
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// })


// Create a new store instance.
// const store = createStore({
//   state () {
//     return {}
//   }
// })

// export default store
