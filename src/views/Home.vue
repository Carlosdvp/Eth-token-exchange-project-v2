<template>
  <div class="home">
    <Metamask/>
    <Exchange></Exchange>
    <FooterComponent/>
  </div>
</template>

<script>
// import components
import Exchange from '../components/Exchange.vue'
import FooterComponent from '../components/FooterComponent.vue'
import Metamask from '../components/Metamask.vue'

// Vuex
import { useStore } from 'vuex'
// we also need to use computed properties
import { computed } from 'vue'

// import the web3 Helpers library
import { loadWeb3, loadAccount, loadToken, loadExchange } from '../../helpers/web3';


// Module exports and methods
export default {
  name: 'Home',
  components: {
    Exchange,
    FooterComponent,
    Metamask
  },
  beforeCreate() {
    // console.log('web3Loaded Action dispatched from Home.vue')
    this.$store.dispatch('web3Loaded')
    this.$store.dispatch('web3AccountLoaded')
    this.$store.dispatch('tokenLoaded')
    this.$store.dispatch('exchangeLoaded')
    this.$store.dispatch('cancelledOrdersLoaded')
    this.$store.dispatch('filledOrdersLoaded')
    this.$store.dispatch('allOrdersLoaded')
  },
  mounted() {
    this.loadBlockchainData()
  },
  methods: {
    async loadBlockchainData() {
      // confirm the web3 connection
      const web3 = await loadWeb3()
      // grab the network ID
      const networkId = await web3.eth.net.getId()
      // Check the network we are connected to
      const network = await web3.eth.getChainId()
      // get the accounts
      const accounts = await loadAccount(web3)
      // alert the user if either of these contracts are not loaded
      const token = await loadToken(web3, networkId)
      const exchange = await loadExchange(web3, networkId)
      // console.log(exchange)
      // get the total supply by calling one of our contract methods
      // const totalSupply = await token.methods.totalSupply().call()
    }
  }
}
</script>
