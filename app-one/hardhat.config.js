require("@nomicfoundation/hardhat-verify");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  solidity: "0.8.19",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    sepolia: {
      url: process.env.sepolia,
      accounts: [`0x` + process.env.pk],
    },
  },
  etherscan: {
    apiKey: `${process.env.apikey}`,
  },
};
