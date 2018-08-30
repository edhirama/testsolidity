import React, { Component } from 'react';
import web3 from './web3';
import rcoin from './RCoin';

class App extends Component {
  state = {
    owner: '',
    products: '',
    amountEth: ''
  };

  async  componentDidMount() {
    console.log(web3.eth.accounts);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const balance = await web3.eth.getBalance(account);
    const balanceInEther = balance / 1000000000000000000;
    const quantityProduct = await rcoin.methods.getProductIndex().call();
    this.setState({ account, quantityProduct, balanceInEther});
  }

  onCreateProduct = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Creating a product... Mining in process!' });
    await rcoin.methods.addProduct(this.state.value, 100).send({ from: accounts[0], gas: 4000000, gasPrice: 100000000 });
    this.setState({ message: 'Product created!'});
    const newValue = Number(this.state.quantityProduct) + 1;
    this.setState({ quantityProduct: newValue});
  };

  render() {
    return (
      <div>
        <h1> Rating Token System </h1>
        <p> The wallet address in metamask is: {this.state.account} </p>
        <p> This address has: {this.state.balanceInEther} Ethers</p>
        <hr />

        <form onSubmit={this.onCreateProduct}>
          <h3>Create a new product</h3>
          <div>
            <input
              placeholder='Product Name'
              onChange={event => this.setState({ value: event.target.value })}
            />
            <button>Create product</button>
          </div>
        </form>
        <h3>{this.state.message}</h3>
        <hr />
        <h3>Quantity of Products</h3>
        <h2>{this.state.quantityProduct}</h2>
        <hr />
      </div>
    );
  }
}

export default App;