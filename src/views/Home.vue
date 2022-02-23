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

// import the web3 library
import { loadWeb3, loadAccount, loadToken, loadExchange } from '../../helpers/web3';

// Vuex
import { useStore } from 'vuex'
// we also need to use computed properties
import { computed } from 'vue'


// Module exports and methods
export default {
  name: 'Home',
  components: {
    Exchange,
    FooterComponent,
    Metamask
  },
  beforeCreate() {
    console.log('web3Loaded Action dispatched from Home.vue')
    this.$store.dispatch('web3Loaded')
    console.log('web3AccountLoaded Action dispatched from Home.vue')
    this.$store.dispatch('web3AccountLoaded')
    console.log('tokenLoaded Action dispatched from Home.vue')
    this.$store.dispatch('tokenLoaded')
    console.log('exchangeLoaded Action dispatched from Home.vue')
    this.$store.dispatch('exchangeLoaded')
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
      // Check the network we are connected to -- this method appears to be deprecated (getNetworkType), docs recommend we use the one included below
      const network = await web3.eth.getChainId()
      // get the accounts
      const accounts = await loadAccount(web3)
      console.log(accounts)
      // get the Token abi in here
      // const abi = Token.abi;
      // const tokenAddress = Token.networks[networkId].address;
      const token = await loadToken(web3, networkId)
      const exchange = await loadExchange(web3, networkId)

      // get the total supply by calling one of our contract methods
      // const totalSupply = await token.methods.totalSupply().call()
      // console.log("Total Supply: ", totalSupply)
    }
  }
}
</script>
