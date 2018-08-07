var RCoin = artifacts.require("./build/RCoin.sol");

contract('RCoin', function(accounts) {
  it("should put 1000000 RCoin in the first account", function() {
    return RCoin.deployed().then(function(instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 1000000, "1000000 wasn't in the first account");
    });
  });
  it("should send coin correctly", function() {
    var meta;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return RCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return meta.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return meta.sendCoin(account_two, amount, {from: account_one});
    }).then(function() {
      return meta.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return meta.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
  it("should rate products correctly", function() {
    var productIndex = 0
    var totalRatings;
    var currentRating;
    var lastRating = 4;

    return RCoin.deployed().then(function(instance) {
        rcoin = instance;
        return rcoin.addProduct("primeiro produto", 123);
    }).then(function (productName) {
        return rcoin.products[productName]
    }).then(function(product) {
        return product.rating
    }).then(function(rating) {
        totalRatings = rating.amount
        currentRating = rating.current
        return rcoin.rateProduct(product, lastRating)
    }).then(function(updatedRating) {
        assert.equal(updatedRating, ((totalRatings * currentRating) + lastRating)/(totalRatings + 1), "resulting ratings are different")
    });
  });
});
