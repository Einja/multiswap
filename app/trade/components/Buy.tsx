"use client";
import React, { useState } from "react";
import { useWallet } from "@/components/contexts/WalletContext";
import EthBuyerABI from "@/artifacts/contracts/BuyETH.sol/EthBuyer.json";
import { BrowserProvider, Contract, parseUnits } from "ethers";

const TOKEN_MAP: Record<
  "poly" | "eth" | "avax",
  { address: string; decimals: number }
> = {
  // replace these placeholders with the real Sepolia token addresses:
  poly: { address: "0x07894fCafD51c15359A29ebd2641C402A1B8E86e", decimals: 18 },
  eth: { address: "0x1331b9D51153Df9b9174c847ee08eFd4817a5a1e", decimals: 18 },
  avax: { address: "0xBB67905f698b1E5d9E13cBe9365662CA81bF801f", decimals: 18 },
};

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_ETHBUYER_ADDRESS!;

const Buy = () => {
  const { address, connect } = useWallet();
  const [amount, setAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState<"poly" | "eth" | "avax">(
    "eth"
  );

  const handleBuy = async () => {
    
    if (!address) return connect();
    if (!(window as any).ethereum) return alert("No injected wallet found");

    // Setup ethers provider & signer
    const provider = new BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();

    // Instantiate your buyer contract
    const buyer = new Contract(
      CONTRACT_ADDRESS,
      EthBuyerABI.abi,
      signer
    );

    // Look up the token address & decimals from our map
    const { address: tokenAddress } = TOKEN_MAP[selectedToken];

    // Parse the ETH amount to spend
    const ethAmount = parseUnits(amount || "0", 18);
    console.log(ethAmount.toString());
    if (ethAmount <= 0) {
      return alert("Enter an amount greater than zero");
    }

    // Approve
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
    const minTokens = 0; 

    // Swap in one on‐chain call
    const tx = await buyer.buyTokens(
      tokenAddress,
      minTokens,
      deadline,
      { value: ethAmount, gasLimit: 1000000 }
    );
    console.log("buyTokens tx hash:", tx.hash);
    await tx.wait();

    alert("Bought tokens! Check your wallet balance.");
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
          Amount in ETH
        </label>
        <input
          type="text"
          inputMode="decimal"
          placeholder="0.0"
          value={amount}
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
