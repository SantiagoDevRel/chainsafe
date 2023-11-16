import "./App.css";
import React, { useEffect, useState } from "react";
import Web3 from "web3";

function App() {
  let web3 = {};
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [message, setMessage] = useState("");
  const [donation, setDonation] = useState("");
  const [lastMessage, setLastMessage] = useState("");

  async function connectWallet() {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      //request accounts (connect metamask)
      await window.ethereum.request({ method: "eth_accounts" });

      //return array with the connected accounts from metamask
      //store the first account
      const accounts = await web3.eth.getAccounts();
      setConnectedWallet(accounts[0]);
    }
  }

  async function getBalance(address) {
    const balance = String(await web3.eth.getBalance(address));
    const toEth = web3.utils.fromWei(balance, "ether");
    return toEth;
  }

  async function sendFundsAndMessage(messageToSend) {
    console.log("Sending message:", messageToSend, "Donation:", donation);

    // TODO: Add logic to send funds and message to the blockchain
    // For now, let's just update the lastMessage state
  }

  async function retrieveLastMessage() {
    setLastMessage("Last message");
    // TODO: Add logic to retrieve the last message from the blockchain and update the lastMessage state
  }

  return (
    <div className="container">
      {connectedWallet ? (
        <div className="connected-wallet">
          <p>Connected Wallet: {connectedWallet}</p>
        </div>
      ) : (
        <button onClick={connectWallet} className="connect-wallet">
          Connect Wallet
        </button>
      )}
      <input type="text" placeholder="Leave a message..." value={message} onChange={(e) => setMessage(e.target.value)} className="message-input" />
      <input type="number" placeholder="Enter donation amount" value={donation} onChange={(e) => setDonation(e.target.value)} min={0} className="donation-input" />
      <button onClick={() => sendFundsAndMessage(message, donation)} className="buy-coffee-button">
        Buy Me a Coffee ☕
      </button>
      <div>
        <button onClick={retrieveLastMessage} className="retrieve-button">
          Retrieve Last Message
        </button>
      </div>
      <div id="last-message" className="last-message">
        {lastMessage}
      </div>
    </div>
  );
}

export default App;
