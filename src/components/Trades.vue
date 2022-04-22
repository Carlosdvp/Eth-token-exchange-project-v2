<template>
  <div class="trades">
    <h2>Trades</h2>
    <table id="trades-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>MOON</th>
          <th>MOON/ETH</th>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tr>
      </thead>
      <tbody>
        <tr>{{ getOrder }}</tr>
        <tr></tr>
      </tbody>
    </table>
  </div>
</template>



<script>
  // import the store
import { useStore } from 'vuex'
import { computed } from 'vue'
	
export default {
  name: 'Trades',
  mounted() {
    // this.getFilledOrders()
  },
  setup() {
    const store = useStore()

    // COMPUTED PROPERTIES
    // const account2 = computed(() => store.state.Web3.account)
    // const account3 = computed(() => store.getters.getAccount)

    let filledOrders = computed(() => store.state.Exchange.filledOrders.data)
    let getOrder = filledOrders.value[1]
    console.log(getOrder)

    // METHODS
    // const getFilledOrders = computed(() => store.getters.getFilledOrders)


    return {
      filledOrders,
      getOrder
    }
  }

}

</script>


<style scoped>

#trades-table {
  margin: 0 auto;
  border-bottom: 1px solid antiquewhite;
  border-top: 1px solid antiquewhite;
}

thead tr {
  align-content: center;
}

th:first-child, th:nth-child(2) {
  border-right: 1px solid antiquewhite;
  padding: 0.2rem 0.4rem;
}

th:nth-child(3) {
  padding-left: 0.4rem;
}


</style>