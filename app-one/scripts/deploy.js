require("dotenv").config();
const { Web3 } = require("web3");
const { abi, bytecode } = require("../src/artifacts/contracts/BuyMeACoffee.sol/Coffee.json");
const web3 = new Web3(process.env.sepolia);

async function main() {
  //initialize wallet
  const [account] = web3.eth.accounts.wallet.add("0x" + process.env.pk);

  //initialize contract
  const Contract = new web3.eth.Contract(abi);

  //arguments
  const args = "This is the first msg";

  //create deploy transaction
  const contract = Contract.deploy({
    data: bytecode,
    arguments: [args],
  });

  //make tx
  const tx = await contract.send({
    from: account.address,
  });

  //print deployed address
  console.log("Done", tx.options.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
