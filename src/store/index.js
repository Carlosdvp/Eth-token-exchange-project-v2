import { createStore } from 'vuex'
import Web3 from 'web3'

// import our Web3 helper methods
import { 
  loadWeb3,
  loadAccount,
  loadToken,
  loadExchange,
  loadAllOrders
} from '../../helpers/web3'


export default createStore({
  state: {
    Web3: {
      web3: null,
      account: null
    },
    Token: {
      loaded: false,
      contract: null
    },
    Exchange: {
      loaded: false,
      contract: null,
      cancelledOrders: {
        loaded: false,
        data: null
      },
      filledOrders: {
        loaded: false,
        data: null
      },
      allOrders: {
        loaded: false,
        data: null
      },
    }
  },
  // getters act like computed properties for the Vuex store, which can be accessed in our app's components
  getters: {
    getAccount: (state) => {
      return `${state.Web3.account}`
    },
    tokenLoaded: (state) => {
      return `${state.Token.loaded}`
    },
    exchangeLoaded: (state) => {
      return `${state.Exchange.loaded}`
    },
    contractsLoaded: (state) => {
      if (state.Token.loaded === true && state.Exchange.loaded === true) {
        return true
      } else {
        return false
      }
    },
    exchange: (state) => {
      return `${state.Exchange.contract}`
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
    TOKEN_LOADED(state, contract, loaded) {
      let result = contract
      loaded = true
      state.Token.contract = result
      state.Token.loaded = loaded
    },
    EXCHANGE_LOADED(state, contract, loaded) {
      // console.log('EXCHANGE_LOADED Mutation being executed', contract)
      let result = contract
      loaded = true
      state.Exchange.contract = result
      state.Exchange.loaded = loaded
    },
    CANCELLED_ORDERS_LOADED(state, cancelledOrders, loaded) {
      // this variable needs to return the same thing as the loadAllOrders(exchange) function
      let result = cancelledOrders
      loaded = true
      console.log('inside the CANCELLED_ORDERS_LOADED mutation', result.cancelledOrders)

      state.Exchange.cancelledOrders.loaded = loaded
      state.Exchange.cancelledOrders.data = result.cancelledOrders
    },
    FILLED_ORDERS_LOADED(state, filledOrders, loaded) {
      // this variable needs to return the same thing as the loadAllOrders(exchange) function
      let result = filledOrders
      loaded = true
      console.log('inside the FILLED_ORDERS_LOADED mutation', result.filledOrders)

      state.Exchange.filledOrders.loaded = loaded
      state.Exchange.filledOrders.data = result.filledOrders
    },
    ALL_ORDERS_LOADED(state, allOrders, loaded) {
      // this variable needs to return the same thing as the loadAllOrders(exchange) function
      let result = allOrders
      loaded = true
      console.log('inside the ALL_ORDERS_LOADED mutation', result.allOrders)

      state.Exchange.allOrders.loaded = loaded
      state.Exchange.allOrders.data = result.allOrders
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
      // console.log('tokenLoaded Action being executed')
      const web3 = await loadWeb3()
      const networkId = await web3.eth.net.getId()

      let contract = await loadToken(web3, networkId)
      console.log('commit result to the TOKEN_LOADED Mutation')
      commit('TOKEN_LOADED', contract)
    },
    // EXCHANGE ACTIONS
    async exchangeLoaded({ commit }) {
      // console.log('exchangeLoaded Action being executed')
      const web3 = await loadWeb3()
      const networkId = await web3.eth.net.getId()

      let contract = await loadExchange(web3, networkId)
      console.log('commit result to the EXCHANGE_LOADED Mutation')
      commit('EXCHANGE_LOADED', contract)
    },
    async cancelledOrdersLoaded({ commit}) {
      console.log('cancelledOrdersLoaded Action being executed')
      const web3 = await loadWeb3()
      const networkId = await web3.eth.net.getId()

      let exchange = await loadExchange(web3, networkId)
      let cancelledOrders = await loadAllOrders(exchange)

      console.log('commit result to the CANCELLED_ORDERS_LOADED Mutation')
      commit('CANCELLED_ORDERS_LOADED', cancelledOrders)
    },
    async filledOrdersLoaded({ commit }) {
      console.log('filledOrdersLoaded Action being executed')
      const web3 = await loadWeb3()
      const networkId = await web3.eth.net.getId()

      let exchange = await loadExchange(web3, networkId)
      let filledOrders = await loadAllOrders(exchange)

      console.log('commit result to the FILLED_ORDERS_LOADED Mutation')
      commit('FILLED_ORDERS_LOADED', filledOrders)
    },
    async allOrdersLoaded({ commit }) {
      console.log('allOrdersLoaded Action being executed')
      const web3 = await loadWeb3()
      const networkId = await web3.eth.net.getId()

      let exchange = await loadExchange(web3, networkId)
      let allOrders = await loadAllOrders(exchange)

      console.log('commit result to the ALL_ORDERS_LOADED Mutation')
      commit('ALL_ORDERS_LOADED', allOrders)
    }
  },
  modules: { }
})