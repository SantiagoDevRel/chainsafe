import "./App.css";
import React, { useState } from "react";
import Web3 from "web3";
import artifacts from "./artifacts/contracts/BuyMeACoffee.sol/Coffee.json";

function App() {
  let web3 = {},
    contractAddress = "0x64c68599D8dC48DEb2653d11bc64B8BDA6948Ce4";
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [message, setMessage] = useState("");
  const [donation, setDonation] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const [contract, setContract] = useState({});

  async function connectWallet() {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      console.log("web3", web3);
      //request accounts (connect metamask)
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      setConnectedWallet(accounts[0]);
      initializeContract();
    }
  }

  async function initializeContract() {
    setContract(new web3.eth.Contract(artifacts.abi, contractAddress, { gas: "30000", dataInputFill: "data" }));
  }

  async function getMessage() {
    const lastMsg = await contract.methods.getLastMessage().call();
    setLastMessage(lastMsg);
  }

  async function sendFundsAndMessage(msg, val) {
    if (msg.trim() == "" || val.trim() == "" || val.trim() <= 0) {
      alert("Please send funds and write a message :)");
    } else {
      try {
        console.log("message:", msg, "Donation:", val);
        const tx = await contract.methods.sendFundAndMessage(msg).send({ from: connectedWallet, value: val });
        alert(`Success, Tx hash: ${tx.transactionHash}`);
        await getMessage();
      } catch (error) {
        console.log("error:", error);
        alert("User rejected tx");
      }
    }
  }

  return (
    <div className="container">
      {connectedWallet ? (
        <div className="connected-wallet">
          <p>Connected Wallet: {connectedWallet}</p>
          <input type="text" placeholder="Leave a message..." value={message} onChange={(e) => setMessage(e.target.value)} className="message-input" />
          <input type="number" placeholder="Enter donation amount in wei" value={donation} onChange={(e) => setDonation(e.target.value)} min={0} className="donation-input" />
          <button onClick={() => sendFundsAndMessage(message, donation)} className="buy-coffee-button">
            Buy Me a Coffee ☕
          </button>
          <div>
            <button onClick={getMessage} className="retrieve-button">
              Retrieve Last Message
            </button>
          </div>
          <div id="last-message" className="last-message">
            {lastMessage}
          </div>
        </div>
      ) : (
        <button onClick={connectWallet} className="connect-wallet">
          Connect Wallet
        </button>
      )}
    </div>
  );
}

export default App;
