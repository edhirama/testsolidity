var RCoin = artifacts.require("./RCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(RCoin);
};
