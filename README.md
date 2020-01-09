Simple ICO is a blockchain agnostic React dApp that allows anyone in the world to create a digital asset.

Simple ICO will not, at any moment, store the user's private keys. You can run a local copy of the dApp if in doubt.

# Disclaimer

The Simple ICO team is not responsible of the use of this computer code and the digital assets created with this decentralized web application.

# Table of contents

1. [Motivation](#motivation)
1. [Roadmap](#roadmap)
   1. [Binance chain](#binance-chain)
   1. [Ethereum](#ethereum)
   1. [Arweave](#arweave)
1. [Contributing](#contributing)
   1. [Local development](#local-development)
   1. [Architecture](#architecture)
   1. [Binance Chain](#architecture-bnb)

## Motivation <a name="motivation"></a>

Global financial inclusion. Allow the individual to get access to capital.

```
Donate
Your economic contributions go directly to the development of the decentralizedtechnologies.io ecosystem.
d/t is an open-source movement in Central America that pursuits blockchain mass adoption.

BTC:
ETH:
BNB:
```

## Roadmap <a name="roadmap"></a>

- [ ] Homepage (with nextjs or other, for SEO purposes)
- [ ] Internet Crowd Offerings campaigns page (with nextjs or other, for SEO purposes)
- [ ] FAQs page
- [ ] Mobile responsiveness

### Binance Chain <a name="binance-chain"></a>

#### Create new BEP2 token

- [x] Set the params of the token (name, symbol, supply, mintable)
- [x] Connect the binance wallet using a keystore file
- [ ] Connect the binance wallet using Wallet Connect
- [ ] Connect the binance wallet using a Ledger Device
- [ ] Connect the binance wallet using a Trezor Device
- [ ] Connect the binance wallet using a Mnemonic phrase
- [x] Create the BEP2 token using the specified params
- [ ] Complete error management upon creation
- [x] Display the Binance Chain transaction ID on success

#### BEP2 token tools

- [x] Mint an existing token flow
- [ ] Burn an existing token flow
- [ ] Freeze an existing token flow
- [ ] Unfreeze an existing token flow

### Ethereum <a name="ethereum"></a>

#### Create new ERC20 token

- [ ] Set the params of the token (name, symbol, supply, mintable)
- [ ] Connect an Ethereum wallet using Web3.JS or EthersJS
- [ ] Create the ERC20 token using the specified params
- [ ] Complete error management upon creation
- [ ] Display the Ethereum transaction ID on success

#### Create new ERC20 crowdsale contract

- [ ] Set the ETH price of each ERC20 token unit
- [ ] Deploy the [crowdsale contract](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/crowdsale) to testnet or mainnet
- [ ] Display the transaction ID of the new crowdsale contract
- [ ] Add a QR Code widget to display on the ICO Arweave landing pages

### Arweave.org <a name="arweave"></a>

- [ ] Create a custom ICO campaign landing page using [GrapesJS](https://grapesjs.com/)
- [ ] Upload the landing page to Arweave.org blockchain
- [ ] Error management upon deployment
- [ ] Display the arweave URL on success

## Contributing <a name="contributing"></a>

Please refer to the [roadmap](#roadmap) for the current state of development and submit a pull-request for approval.

Submit an issue for improvement proposals or bugs.

### Local development <a name="local-development"></a>

#### `git clone git@github.com:decentralizedtechnologies/simpleico.git`

Get a copy of the code by cloning or forking this repo.

#### `yarn`

Install the npm dependencies.

#### `yarn start`

Run the project in localhost.

### Architecture <a name="architecture"></a>

Begin by looking at the [routes.ts](https://github.com/decentralizedtechnologies/simpleico/blob/master/src/routes.ts) file.

Then the `src/` directory should follow the same structure. eg. `src/bnb/token/new/`. The views or main screens correspond to the last segment of each route. eg. `src/bnb/token/new/Params.tsx`.

#### Binance Chain <a name="architecture-bnb"></a>

Binance Chain uses the [@binance-chain/javascript-sdk](https://github.com/binance-chain/javascript-sdk/). Refer to the wiki for examples and documentation.

The code using this SDK is in `src/bnb/client/`.
