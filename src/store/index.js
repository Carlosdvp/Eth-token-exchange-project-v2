import { createStore } from 'vuex'
import Web3 from 'web3'

// import our Web3 helper method
import { 
  loadWeb3,
  loadAccount
} from '../../helpers/web3'


export default createStore({
  state: {
    Web3: {
      web3: null,
      account: null,
      contract: null
    }
  },
  mutations: {
    WEB3_LOADED(state, payload) {
      // console.log('WEB3_LOADED Mutation being executed', payload)
      let result = payload
      // update the state
      state.Web3.web3 = result
    },
    WEB3_ACCOUNT_LOADED(state, account) {
      // console.log('WEB3_ACCOUNT_LOADED Mutation being executed', account)
      let result = account
      // update the state
      state.Web3.account = result
    },
    TOKEN_LOADED(state, contract) {
      console.log('TOKEN_LOADED Mutation being executed', contract)
      let result = contract
      state.Web3.contract = result
    }
  },
  actions: {
    async web3Loaded({ commit }) {
      // console.log('web3Loaded action being executed')
      // this line below is where the method is breaking
      let result = await loadWeb3()
      // console.log('commit result to the WEB3_LOADED Mutation')
      commit('WEB3_LOADED', result)
    },
    // load the account being used
    async web3AccountLoaded({ commit }) {
      // console.log('web3AccountLoaded action being executed')
      // this line below is where the method is breaking
      let account = await loadAccount()
      // console.log('commit result to the WEB3_ACCOUNT_LOADED Mutation')
      commit('WEB3_ACCOUNT_LOADED', account)
    },
    // load the Token
    async tokenLoaded({ commit }) {
      console.log('tokenLoaded Action being executed')
      // let contract = await 
    }
  },
  modules: { }
})