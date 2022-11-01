import Web3  from 'web3';

import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [ account, setAccount ] = useState();
  const [ network, setNetwork ] = useState();
  const [ balance, setBalance ] = useState();

  /*
  balanceState = {
    account: '',
    network: '',
    balance: ''
  }
  const [ balance, setBalance ] = useState(balanceState)
  */

  //using ganache (if givenProvider dosen't work then look at ganache port)
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545' );

  useEffect(() => {
    loadAccounts();
  }, []);  // empty array == when the app is first rendered is when the effect is gonna run

  useEffect(() => {
    loadBalance();
  }, [account]); // when this parameter change, I want this function to reexecute

  async function loadBalance() {
    const network = await web3.eth.net.getNetworkType();
    const balance = await web3.eth.getBalance(account, "latest");

    setNetwork(network);
    setBalance((balance/1e18).toFixed(4));
  }

  async function loadAccounts() {
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>
        <span class='toWhite'>↓ </span>My Decentralized Ballot<span class='toWhite'> ↓</span><br /><span>🔮</span>
        </h2>
       <p>
        <strong>Your account:</strong><br /> { account }
        <br /><br />
        <strong>Your balance:</strong><br /> { balance } - on ({ network } network)
       </p>
      </header>
    </div>
  );
}

export default App;
