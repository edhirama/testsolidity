/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */


var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "rack live lecture water pill beach ladder plunge borrow salute home cash";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic,     "https://rinkeby.infura.io/v3/9e93687a9c214bfca59f5405981bba7b");
      },
      network_id: 1,
      gas: 4500000,
      gasPrice: 10000000000
    }
  }
};