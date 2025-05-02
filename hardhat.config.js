require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
  },
  networks: {
    sepolia: {
      url: process.env.RPC_URL,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
    },
  },
};
