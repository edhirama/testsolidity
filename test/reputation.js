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
  it("should count the rating right", async () => {
    
    const rating1 = 3;
    const rating2 = 4;

    var newInstance = await RCoin.new();

    var productIndex = await newInstance.addProduct("primeiro produto", 123);
    console.log(productIndex);
    assert(true);
    // await newInstance.rateProduct(productIndex, rating1);
    // var current = await newInstance.getRating(productIndex)

    // assert.equal(rating1, current[0].toNumber());
    // return newInstance.rateProduct(productIndex, rating2, {from: accounts[3]})
    //   .then(async() => {
    //     var rating = await newInstance.getRating(productIndex)
    //     var currentRating = rating[0].toNumber();
    //     var amountRating = rating[1].toNumber();
    //     let expected = (rating1 + rating2) / amountRating;
    //     assert.equal(expected, currentRating)
    //   });
  });
  it("should let the owner add a product", async() => {
    const productIndex = 1;

    var newInstance;
    newInstance = await RCoin.new();

    await newInstance.addProduct("produto 1", 150)
    assert(true)
  });
  it("should not let someone othet than the owner add a product", async() => {
    const productIndex = 1;

    var newInstance;
    newInstance = await RCoin.new();
    try {
      await newInstance.addProduct("produto 1", 150);
      assert.equal(1,2);
    } catch(_err) {
      assert(_err);
    }
  });
});
