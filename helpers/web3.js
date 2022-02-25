import Web3 from 'web3';

// import Token Contract
import Token from '../src/abis/Token.json'
// import Token Contract
import Exchange from '../src/abis/Exchange.json'
// import the necessary 

// export const loadWeb3 = () => {
// 	const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
// 	return web3;
// }

// here we also check for metamask and default to the Ganache blockchain
export const loadWeb3 = async () => {
	if (typeof window.ethereum !== 'undefined') {
		const web3 = new Web3(window.ethereum)
		return web3
	} else {
		// window.alert('Please install Metamask')
		const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
		// window.location.assign("https://metamask.io/")
		return web3
	}
}

// Get the account info
export const loadAccount = async (web3) => {
	// get the accounts
	const accounts = await web3.eth.getAccounts()
	// grab the first account
	var account = accounts[0]

	return account
}

// Get the Token contract
export const loadToken = async (web3, networkId) => {
	// get the Token abi in here
  const abi = Token.abi;
  const tokenAddress = Token.networks[networkId].address;
  // instantiate a new Contract object for our token
  const token = new web3.eth.Contract(abi, tokenAddress)
	
	return token
}

// Get the Exchange contract
export const loadExchange = async (web3, networkId) => {
	// get the Token abi in here
  const abi = Exchange.abi;
  const exchangeAddress = Exchange.networks[networkId].address;
  // instantiate a new Contract object for our token
  const exchange = new web3.eth.Contract(abi, exchangeAddress)
	
	return exchange
}

// Grab the Order data from the events emitted by the Exchange contract
export const loadAllOrders = async (exchange) => {
	// Fetch cancelled orders with "Cancek" event stream
	let cancelStream = await exchange.getPastEvents('Cancel', { fromBlock: 0, toBlock: 'latest' })
	let cancelledOrders = cancelStream.map((event) => event.returnValues)

	// Fetch filled orders with the "Trade" event stream
	let tradeStream = await exchange.getPastEvents('Trade', { fromBlock: 0, toBlock: 'latest' })
	let filledOrders = tradeStream.map((event) => event.returnValues)

	// Fetch all orders with the "Order" event stream
	let orderStream = await exchange.getPastEvents('Order', { fromBlock: 0, toBlock: 'latest' })
	let allOrders = orderStream.map((event) => event.returnValues)

	return { 
		cancelledOrders, 
		filledOrders, 
		allOrders 
	}
}