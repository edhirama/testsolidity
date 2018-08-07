pragma solidity ^0.4.18;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract RCoin is Ownable { 
    
    struct Rating {
        uint current;
        uint amount;
    }

    struct Product {
        bytes32 name;
        uint price;
        Rating rating;
    }

    mapping (address => uint) balances;

    //Dynamically sized array of products
    mapping (bytes32 => Product)  products;

    address public admin;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    
    constructor() public {
        balances[msg.sender] = 1000000;
        admin = msg.sender;
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

    function addProduct(bytes32 name, uint price) public returns (bytes32 productName) {
        require(msg.sender == admin, "only admin can create products");
        require(price > 0, "unacceptable price value");
        
        products[name] = Product({
            name: name,
            price: price,
            rating: Rating({
                current: 0,
                amount: 0
            })
            });

        return products[name].name;
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

    function rateProduct(bytes32 productName, uint rating) public returns (uint) {
        require(rating >= 0 && rating <= 5, "invalid rating value");
        uint current = products[productName].rating.current;
        uint amount = products[productName].rating.amount;
        products[productName].rating.current = ((current * amount) + rating)/(amount + 1);
        return products[productName].rating.current;
    }
}