
<template>
<!-- Navbar Section -->
<nav>

	<a class="navbar-brand" href="/">
		<p class="logo-text">Artemis Exchange</p> 
	</a>

  <input type="checkbox" id="nav-toggle">
  <label for="nav-toggle" class="burger-menu">
    <img id="burger" src="../assets/menu.svg" alt="burger icon">
  </label>

	<div class="navbar">
    <p class="nav-item-account">
      <a :href="accountEtherscan" target="_blank">{{ getAccount }}</a>
    </p>
	</div>

</nav>
<!-- End of the Navbar section -->
</template>



<script>
  // import the store
import { useStore } from 'vuex'
import { computed } from 'vue'
	
export default {
  name: 'NavBar',
  setup() {
    const store = useStore()
    // Computed Properties
    const account = computed(() => store.state.Web3.account)
    // get the Etherscan URL
    const accountEtherscan = computed(() => `https://etherscan.io/address/${account.value}`)
    // grab the account getter with the new syntax
    let getAccount = computed(() => store.getters.getAccount)

    return {
      account,
      accountEtherscan,
      getAccount
    }
  }
  // with this computed property we can trigger one of our getters in the store the old way
  // computed: {
  //   ...mapGetters(['getAccount'])
  // }
}

</script>


<style scoped>

body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

nav {
	width: 100%;
  box-shadow: 2px 2px 3px rgba(0,0,0,0.6);
  display: grid;
  grid-template-columns: 30% 1fr 20% 1fr 50% 1fr;
  grid-auto-rows: auto;
  align-items: center;
  text-align: center;
  padding: 1rem 0;
  border: 1px solid lightslategray;
  margin: 0  0 3px 0;
  background-color: rgba(4, 8, 8, .7);
}

/* for the burger menu */
#nav-toggle, .burger-menu {
  display: none;
}

.navbar-brand {
  grid-column: 1;
  display: grid;
  grid-template-columns: 30% 70%;
  justify-items: start;
  align-items: center;
}

.logo-text {
	grid-column: 2;
	margin: 0;
	padding: 0 .5em;
	font-size: 1.5em;
	color: ghostwhite;
  text-shadow: 1px 1px lightslategray;
}

.navbar {
	grid-column: 5;
}

/* Replacing the Nav links with the Account */
.nav-item-account {
  grid-row: 1;
  grid-column: 1;
  text-align: right;
  margin-right: 1rem;
}

#logo-navbrand {
	width: auto;
	margin: .2em .5em;
  grid-column: 1;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  height: 50px;
}

nav a {
	color: ghostwhite;
	text-decoration: none;
  transition: .4s all ease-in-out;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav ul li a {
  text-decoration: none;
  font-size: 1em;
  padding: 0 1em;
}


/* Only stick if you can fit */
@media (min-height: 300px) {
  nav ul {
    position: sticky;
    top: 0;
  }
}

/* Medium sized screens - Tablets */
@media only screen and (max-width: 799px) {
  .navbar-brand {
    grid-column: 1;
    display: grid;
    grid-template-columns: 40% 1fr 60% 1fr;
    justify-items: center;
    align-items: center;
  }

  .logo-text {
    grid-column: 3;
    margin: 0;
    padding: 0 .5em;
    font-size: .7em;
    color: firebrick;
  }

  /* Responsive Nav Menu */
  .burger-menu, #burger {
    display: inline-block;
    width: 40px;
    grid-column: 7;
    justify-self: center;
  }
  .navbar {
    display: none;
  }
  #nav-toggle:checked ~ .navbar {
    display: grid;
    grid-row: 4;
  }

}

/* Small screens - Mobile  */
@media only screen and (max-width: 420px) {
  .navbar-brand {
    grid-column: 1;
    display: grid;
    grid-template-columns: 50% 50%;
    justify-items: center;
    align-items: center;
  }

  #logo-navbrand {
    height: 40px;
  }

  .logo-text {
    grid-column: 2;
    margin: 0.3em;
    padding: 0 .5em;
    font-size: .5em;
    color: firebrick;
  }
}

</style>