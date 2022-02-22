import Web3 from 'web3';

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
export const loadAccount = async () => {
	const web3 = await loadWeb3()
	// get the accounts
	const accounts = await web3.eth.getAccounts()
	// grab the first account
	var account = accounts[0]

	return account
}

