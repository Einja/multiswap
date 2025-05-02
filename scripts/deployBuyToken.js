require("@nomicfoundation/hardhat-ethers");
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  // Sepolia Uniswap V2 router
  const ROUTER = "0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3";

  const Factory = await ethers.getContractFactory("EthBuyer");
  const buyer   = await Factory.deploy(ROUTER);

  // ← this replaces `.deployed()`
  await buyer.waitForDeployment();

  // ← in ethers v6 the deployed address is on `target`
  console.log("EthBuyer deployed at:", buyer.target);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

// npx hardhat run --network sepolia scripts/deployBuyToken.js