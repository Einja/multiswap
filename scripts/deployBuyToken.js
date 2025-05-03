require("@nomicfoundation/hardhat-ethers");
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // Sepolia Uniswap V2 router
  // const ROUTER = "0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3";
  // Mainnet Uniswap V2 router
  const ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"; 

  const Factory = await ethers.getContractFactory("EthBuyer");
  const buyer   = await Factory.deploy(ROUTER);

  await buyer.waitForDeployment();
  console.log("EthBuyer deployed at:", buyer.target);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

// npx hardhat run --network mainnet scripts/deployBuyToken.js