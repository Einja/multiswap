"use client";
import React, { useState } from "react";
import { useWallet } from "@/components/contexts/WalletContext";
import EthBuyerABI from "@/artifacts/contracts/BuyETH.sol/EthBuyer.json";
import { BrowserProvider, Contract, parseUnits } from "ethers";

const TOKEN_MAP: Record<
  "poly" | "eth" | "avax",
  { address: string; decimals: number }
> = {
  // replace these placeholders with the real token addresses
  poly: { address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0", decimals: 18 },
  eth: { address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",     decimals: 18 },
  avax: { address: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",    decimals: 18 },
};

const Buy = () => {
  const { address, connect } = useWallet();
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState<"poly" | "eth" | "avax">(
    "eth"
  );

  const handleBuy = async () => {
    if (!address) return connect();
    if (!window.ethereum) return alert("No injected wallet found");

    // Setup ethers provider & signer
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // Instantiate your buyer contract
    const buyer = new Contract(
      process.env.NEXT_PUBLIC_ETHBUYER_ADDRESS!,
      EthBuyerABI.abi,
      signer
    );

    // Look up the token address & decimals from our map
    const { address: tokenAddress, decimals: tokenDecimals } =
      TOKEN_MAP[selectedToken];

    // Prepare amounts
    const amountIn = parseUnits(amount || "0", tokenDecimals);
    if (amountIn <= 0) return alert("Enter an amount greater than zero");
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
    const minEthOut = 0; // replace with slippage‐adjusted quote in prod

    // Approve
    const erc20 = new Contract(
      tokenAddress,
      ["function approve(address spender, uint256 amount) external returns (bool)"],
      signer
    );
    const txA = await erc20.approve(buyer.target, amountIn);
    await txA.wait();

    // Swap in one on‐chain call
    const txB = await buyer.buyETH(
      tokenAddress,
      amountIn,
      minEthOut,
      deadline
    );
    console.log("tx hash:", txB.hash);
    await txB.wait();
    alert("Bought ETH! Check your wallet balance.");
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-gray-600">Crypto</label>
        <select
          value={selectedToken}
          onChange={(e) =>
            setSelectedToken(e.currentTarget.value as "poly" | "eth" | "avax")
          }
          className="cursor-pointer w-full mt-1 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none"
        >
          <option value="poly">Polygon (POL)</option>
          <option value="eth">Ethereum (ETH)</option>
          <option value="avax">Avalanche (AVAX)</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600">
          Amount in $
        </label>
        <input
          type="text"
          inputMode="decimal"
          placeholder="$"
          value={amount ? `$${amount}` : ""}
          onChange={(e) => {
            const raw = e.currentTarget.value.replace(/[^0-9.]/g, "");
            setAmount(raw);
          }}
          className="w-full mt-1 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
        />
      </div>

      <button
        onClick={handleBuy}
        className="cursor-pointer w-full mt-2 py-3 text-sm font-semibold text-pink-500 bg-pink-50 rounded-xl hover:bg-pink-100"
      >
        {address ? "Buy" : "Connect Wallet"}
      </button>
    </div>
  );
};

export default Buy;
