import { createStore } from 'vuex'
import Web3 from 'web3'

// import our Web3 helper methods
import { 
  loadWeb3,
  loadAccount,
  loadToken,
  loadExchange
} from '../../helpers/web3'


export default createStore({
  state: {
    Web3: {
      web3: null,
      account: null
    },
    Token: {
      contract: null
    },
    Exchange: {
      contract: null
    }
  },
  // getters act like computed properties for the Vuex store, which can be accessed in our app's components
  getters: {
    getAccount: (state) => {
      return `${state.Web3.account}`
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
      state.Token.contract = result
    },
    EXCHANGE_LOADED(state, contract) {
      console.log('EXCHANGE_LOADED Mutation being executed', contract)
      let result = contract
      state.Exchange.contract = result
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
      const web3 = await loadWeb3()
      let account = await loadAccount(web3)
      // console.log('commit result to the WEB3_ACCOUNT_LOADED Mutation')
      commit('WEB3_ACCOUNT_LOADED', account)
    },
    // TOKEN ACTIONS
    async tokenLoaded({ commit }) {
      console.log('tokenLoaded Action being executed')
      const web3 = await loadWeb3()
      const networkId = await web3.eth.net.getId()

      let contract = await loadToken(web3, networkId)
      console.log('commit result to the TOKEN_LOADED Mutation')
      commit('TOKEN_LOADED', contract)
    },
    // EXCHANGE ACTIONS
    async exchangeLoaded({ commit }) {
      console.log('exchangeLoaded Action being executed')
      const web3 = await loadWeb3()
      const networkId = await web3.eth.net.getId()

      let contract = await loadExchange(web3, networkId)
      console.log('commit result to the EXCHANGE_LOADED Mutation')
      commit('EXCHANGE_LOADED', contract)
    }
  },
  modules: { }
})