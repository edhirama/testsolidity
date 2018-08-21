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

  it("should rate products correctly", async () => {
    const productIndex = 0

    const rating1 = 3;
    const rating2 = 1;
    const rating3 = 5;

    var newInstance;

    //nova instancia
    var newInstance = await RCoin.new()

    //add product
    await newInstance.addProduct("primeiro produto", 123)

    //apenas teste do teste kkkkk (que poderia ser outro teste separado)
    await newInstance.rateProduct(productIndex, rating1)
    await newInstance.rateProduct(productIndex, rating2)

    //rate product
    return newInstance.rateProduct(productIndex, rating3)
      .then(async () => {

        //get Rating do blockchain
        var rating = await newInstance.getRating(productIndex)

        //metodo retorna um array
        var currentRating = rating[0].toNumber();
        var amountRating = rating[1].toNumber();

        let expected = (rating1 + rating2 + rating3) / amountRating;

        assert.equal(expected, currentRating)
      });
  });

});