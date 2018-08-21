pragma solidity ^0.4.18;
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
contract RCoin is Ownable, StandardToken { 
    
    struct Rating {
        uint current;
        uint amount;
        mapping (address => bool) rated;
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
    function getBalance(address addr) public view returns (uint) {
        return balances[addr];
    }
    function rateProduct(uint productIndex, uint rating) public returns (uint) {
        require(rating >= 0 && rating <= 5, "invalid rating value");
        require(products[productIndex].rating.rated[msg.sender] == false, "user has already voted");
        uint current = products[productIndex].rating.current;
        uint amount = products[productIndex].rating.amount++;
        products[productIndex].rating.current = ((current * amount) + rating)/(amount + 1);
        products[productIndex].rating.rated[msg.sender] = true;
        return products[productIndex].rating.current;
    }
    function getRating(uint16 index) public view returns (uint, uint)  {
        Rating memory rating = products[index].rating;
        return (rating.current, rating.amount);
    }
}