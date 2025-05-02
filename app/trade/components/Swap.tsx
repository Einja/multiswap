"use client";
import React, { useState } from "react";
import { useWallet } from "@/components/contexts/WalletContext";

const Swap = () => {
  const { address, connect } = useWallet();
  const [sellToken, setSellToken] = useState("eth");
  const [buyToken, setBuyToken] = useState("pol");
  const handleSwap = () => {
    if (!address) {
      return connect();
    }
    // ... your existing swap logic here
    console.log("Swapping", sellToken, "for", buyToken);
  }
  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-gray-600">Sell</label>
        <div className="mt-1 flex items-center justify-between bg-gray-50 rounded-xl border border-gray-200 px-4 py-3">
          <input
            type="number"
            placeholder="0"
            className="w-full text-lg font-medium text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
          />
          <select
            value={sellToken}
            onChange={(e) => setSellToken(e.target.value)}
            className="ml-2 cursor-pointer text-sm font-medium text-gray-700 bg-transparent focus:outline-none"
          >
            <option value="eth">Ethereum (ETH)</option>
            <option value="pol">Polygon (POL)</option>
            <option value="avax">Avalanche (AVAX)</option>
          </select>
        </div>
        <p className="mt-1 text-xs text-gray-500">$0.00</p>
      </div>

      <div className="text-center text-gray-300">
        <span className="text-xl">↓</span>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600">Buy</label>
        <div className="mt-1 flex items-center justify-between bg-gray-50 rounded-xl border border-gray-200 px-4 py-3">
          <input
            type="number"
            placeholder="0"
            className="w-full text-lg font-medium text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
          />
          <select
            value={buyToken}
            onChange={(e) => setBuyToken(e.target.value)}
            className="ml-2 cursor-pointer text-sm font-medium text-gray-700 bg-transparent focus:outline-none"
          >
            <option value="eth">Ethereum (ETH)</option>
            <option value="pol">Polygon (POL)</option>
            <option value="avax">Avalanche (AVAX)</option>
          </select>
        </div>
      </div>

      <button onClick={handleSwap} className="cursor-pointer w-full mt-2 py-3 text-sm font-semibold text-pink-500 bg-pink-50 rounded-xl hover:bg-pink-100">
        {address ? "Swap" : "Connect Wallet"}
      </button>
    </div>
  );
};

export default Swap;
