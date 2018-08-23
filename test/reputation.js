var RCoin = artifacts.require("./RCoin.sol");

contract('RCoin', function (accounts) {

  it("should put 1000000 RCoin in the first account", function () {
    return RCoin.deployed()
      .then(function (instance) {
        return instance.getBalance.call(accounts[0]);
      }).then(function (balance) {
        assert.equal(balance.valueOf(), 1000000, "1000000 wasn't in the first account");
      });
  });
  it("should not let a person other than the owner to add a product", async() => {
    const productIndex = 2;
    try {
      var newInstance;
      newInstance = await RCoin.new();

      await newInstance.addProduct("producto 2", 150, {from: accounts[4]});
      assert(false)
    } catch(_err) {
      assert(_err)
    }
  });
  it("should only allow a vote per persona", async () => {
    const productIndex = 0;
    const rating1 = 3;
    const rating2 = 4;
    try {
      var newInstance = await RCoin.new();

      await newInstance.addProduct("primeiro produto", 123);

      await newInstance.rateProduct(productIndex, rating1);

      await newInstance.rateProduct(productIndex, rating2);

      assert(false);
    } catch(_err){
      assert(_err);
    }
  });
  it("should let the owner add a product", async() => {
    const productIndex = 1;

    var newInstance;
    newInstance = await RCoin.new();

    await newInstance.addProduct("produto 1", 150)
    assert(true)
  });
});