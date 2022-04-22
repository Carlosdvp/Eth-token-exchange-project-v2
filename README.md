# project-one-v2

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Compile SmartContracts




**********************************************************************

# Blockchain Dapp Bootcamp

Following the Dapp University Dapp Bootcamp to build an Exchange. 

Some important differences:
	- I am using Vue 3 with vue router and vuex for state management.
	- Decided to replace React for the frontend as I believe Vue is a superior technology; plus it is built and maintained by the community and not by a centralized tech behemoth (i.e. Facebook). This keep sthe whole thing more in line with the philosophy of decentralization and community.
	- I have also decided to use one of the latest versions for Solidity, 0.8.0; since the version used in the course is very old and there have been many breaking changes between then and now. This I believe will future proof the work and help me develop with current tech and not obsolete build patterns.

## Some of the things I've learned so far

* Coding the contract and then the front end went well as separate units.
* Ran into a wall when trying to import and use the web3 library in the frontend app.
* Through trial and error I finally figured it out; online resources were 2-3 yeras old at best, nearly non-existent for dapps using Vue.
* The key was apparebtly to import web3 in a separate js file; and then to import that into a Vue component View; where the methods and function calls also reside.


-----------------------------------------------------------------------------

# Project One v2

## Create ERC-20 Token
	- create a smart contract for an ERC-20 token: Artemis $MOON
	- use chai and truffle for the tests

## Create a cryptocurrency exchange
	- create a smart contract with the basic functinality of an exchange
	- deposit and withdraw funds
	- place and cancel an order to swap tokens

## Tech Stack used

- Solidity for the Dapp - 0.8.0
- JS for the tests
- Vue for the fronend
- Vue Router and Vuex 
- git for version control


----------------------------------------------------------------------

## Deploy Contracts

### Exchange Contract

- when using ganache
	- if you restart Ganache to rest the ETH balances make sure to redeploy the smart contracts:
		1. run this command: `truffle migrate --reset`
		2. and then seed the exchange: `truffle exec scripts/seed-exchange.js`



---------------------------------------------------------------------


# Project - Part 2

## The Front end application

- run the dev server: `npm run dev`

### Notes and Observations regarding the Bootcamp content

The Part 2 project uses React and Bootstrap or the framework and the scaffolding respectively.

I prefer to use Vue.js, so I have replaced React with Vite. And I have also replaced Bootstrap/flexbox with CSS grid and custom css.
	- later I can look into something like Vuetify or Tailwind to simplify the CSS implementation

### Vuex implementation: Successful

- Was able to completely replace the Redux implementation from the course with Vuex 4
	-- Got the Actions to be triggeed from the Component, which activated the Mutations and changed the state
	-- Was also able to implement the use of Getters to access the information from the Vuex store anywhere in the application
	-- Looks like Pinia is the next evolution of Vuex, should check it out later


## How to Run Helper Scripts from within Truffle

- In the root folder of the project I have a scripts folder and a seed-exchange.js file within
- I couldn't run it as a standalone js file the usual manner (i.e. node <file_name.js>)
- I need to do it like this inside a Truffle project:

`truffle exec scripts/seed-exchange.js`

---------------------------------------------------------------------


### Issues Encountered

- when running the app I get a ton (7) console errors, Token / Exchange contracts are not being loaded correctly.

- errors with web3, networkId and others as undefined:
	- apparently it was because Metamask was not connected, once I logged into a test account the contracts got picked up.

#### Error: Network not synced; last block was 6624.5 seconds ago
- if this one passes then the next error comes up:

#### Error: ENS is not supoorted on network private (using ganache)

- could this be the answer:
https://trufflesuite.com/docs/truffle/advanced/ethereum-name-service/

	- from their docs: https://docs.ens.domains/deploying-ens-on-a-private-chain
	- import contracts: npm install @ensdomains/ens-contracts

	- added import statements to the Token and Exchange contracts
	- deployed contracts again
	- now I have the following error message:


	- looks like this issue is known and might not have a fix as long as one is on a dev (ganache) network, do to how the ganache automining works.

- Truffle is supposed to have ENS integration and one should be able to use it inside the truffle project, that, however, is not the case.