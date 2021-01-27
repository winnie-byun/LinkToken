const HDWalletProvider = require("truffle-hdwallet-provider-klaytn");

// const MNEMONIC =
//   process.env.MNEMONIC ||
//   'clock radar mass judge dismiss just intact mind resemble fringe diary casino'
// const INFURA_API_KEY = process.env.INFURA_API_KEY
// const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const privateKey = "0x8a1b191dd20f4e0636f828bb8bab202a6df55d79a852a3416bd862b9a0fd4ebf";

// const walletProvider = provider => new HDWalletProvider({
//   mnemonic: {
//     password: "1234!@#$qwer"
//   },
//   providerOrUrl: "https://api.baobab.klaytn.net:8651"
// })

module.exports = {
  //$ truffle test --network <network-name>
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    baobab: {
      provider: () => new HDWalletProvider(privateKey, "https://api.baobab.klaytn.net:8651"),
      network_id: '1001', //Klaytn baobab testnet's network id
      gas: '8500000',
      gasPrice: null
    },
    cypress: {
      provider: () => new HDWalletProvider(privateKey, "https://api.cypress.klaytn.net:8651"),
      network_id: '8217', //Klaytn mainnet's network id
      gas: '8500000',
      gasPrice: null
    }
  },

  compilers: {
    solc: {
      version: "0.6.6",    // Fetch exact version from solc-bin (default: truffle's version)
      docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "constantinople"
      }
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD',
      gasPrice: 21,
      showTimeSpent: true,
    },
  },

  // Configure contracts location to dir without contracts
  // to avoid Truffle compilation step (we use @chainlink/belt instead)
  contracts_directory: './contracts_null',

  verify: {
    preamble: 'LINK\nVersion: 0.1.0',
  },

  // api_keys: {
  //   etherscan: ETHERSCAN_API_KEY,
  // },
}
