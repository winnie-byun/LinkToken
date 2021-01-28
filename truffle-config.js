const HDWalletProvider = require('@truffle/hdwallet-provider')

const privateKey = "0x8a1b191dd20f4e0636f828bb8bab202a6df55d79a852a3416bd862b9a0fd4ebf";

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
