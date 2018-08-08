pragma solidity ^0.4.18;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract RCoin is Ownable, StandardToken { 
    
    struct Rating {
        uint current;
        uint amount;
    }

    struct Product {
        string name;
        uint price;
        Rating rating;
    }

    //Dynamically sized array of products
    mapping (uint => Product)  products;

    address public admin;

    uint initialSupply = 1000000;
    mapping (address => uint) balances;

    uint indexProduct = 1;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    
    constructor() public {
        totalSupply_ = initialSupply;
        balances[msg.sender] = totalSupply_;
        admin = msg.sender;
        addProduct("teste", 11);
        addProduct("teste2", 12);
    }

    // constructor(bytes32[] productNames, uint[] productPrices) public {
    //     balances[msg.sender] = 1000000;
    //     admin = msg.sender;

    //     for (uint i = 0; i < productNames.length; i++) {
    //         products.push(Product(
    //             {id: products.length,
    //             name: productNames[i],
    //             price: productPrices[i],
    //             rating: Rating(
    //                 {current: 0,
    //                 amount: 0
    //                 })
    //             }
    //             )
    //         );
    //     }
    // }

    function addProduct(string name, uint price) public returns (uint productIndex) {
        require(msg.sender == admin, "only admin can create products");
        require(price > 0, "unacceptable price value");
        Product memory product = Product({
            name: name,
            price: price,
            rating: Rating({
                current: 0,
                amount: 0
            })
            });
        products[indexProduct] = product; 

        indexProduct += 1;
        return indexProduct - 1;
    }

    function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
        require(balances[msg.sender] > amount, "not enough balance in source account");

        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        emit Transfer(msg.sender, receiver, amount);

        return true;
    }

    function getBalance(address addr) public view returns (uint) {
        return balances[addr];
    }

    function rateProduct(uint productIndex, uint rating) public returns (uint) {
        require(rating >= 0 && rating <= 5, "invalid rating value");
        uint current = products[productIndex].rating.current;
        uint amount = products[productIndex].rating.amount;
        products[productIndex].rating.current = ((current * amount) + rating)/(amount + 1);
        return products[productIndex].rating.current;
    }
}