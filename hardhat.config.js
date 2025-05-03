require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
  },
  networks: {
    mainnet: {
      url: process.env.RPC_MAINNET_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
    },
    sepolia: {
      url: process.env.RPC_SEPOLIA_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
    },
  },
};
