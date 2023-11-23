const { Web3 } = require("web3");
require("dotenv").config();
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.sepolia));

async function main() {
  //1. create account
  const account = web3.eth.accounts.create();
  console.log(`The new account is:`, account);
  console.log(`The address is:`, account.address);
  console.log(`The private key is:`, account.privateKey);

  //2. sign message
  const signature = web3.eth.accounts.sign("Hello web3!", account.privateKey);
  console.log("Signature message:", signature);

  //3. recover signer from signature
  const signer = web3.eth.accounts.recover("Hello web3!", signature.signature);
  console.log("The account add is:", account.address);
  console.log("The Signer is:", signer);

  //4. sign TX
  //minimum gasLimit should be 21k which is the basic to cover sending value
  const tx = { to: account.address, value: "0", gasLimit: "21000", gasPrice: "0", data: "", nonce: "0" };
  const signature2 = await web3.eth.accounts.signTransaction(tx, account.privateKey);
  console.log("Signature tx", signature2);

  //5. recover transaction
  const signer2 = web3.eth.accounts.recoverTransaction(signature2.rawTransaction);
  console.log("Signer:", signer2);

  //6. encrypt privateKey
  const keyStore = await web3.eth.accounts.encrypt(account.privateKey, "123");
  console.log("Key store:", keyStore);

  //7. decrypt keyStore and returns account
  const web3Account = await web3.eth.accounts.decrypt(keyStore, "123");
  console.log("web3Account:", web3Account);
  console.log("address:", web3Account.address, "\n", "address:", account.address);

  //8. hash message
  const hashMsg = await web3.eth.accounts.hashMessage("Hello web3!");
  console.log("Hash msg:", hashMsg);

  //9. private key to account
  const account1 = web3.eth.accounts.privateKeyToAccount("0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709");
  console.log(account1);

  /* 
  //NOT WORKING
  //private key to address
  const address = web3.eth.accounts.privateKeyToAddress("0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709");
  console.log(address);

  //private key to public key
  const publicKey = web3.eth.accounts.privateKeyToPublicKey("0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709", true);
  console.log(publicKey); 

  //validate PK
  const arr = web3.eth.accounts.parseAndValidatePrivateKey(account.privateKey);
  console.log(arr);
  */
}

main();
