"use client";
import React, { useState } from "react";
import { useWallet } from "@/components/contexts/WalletContext";

const Buy = () => {
  const { address, connect } = useWallet();
  const [amount, setAmount] = useState("");

  const handleBuy = () => {
    if (!address) {
      return connect();
    }
    // … your existing buy logic here
    console.log("Buying", amount);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-gray-600">Crypto</label>
        <select className="cursor-pointer w-full mt-1 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none">
          <option value="btc">Polygon (POL)</option>
          <option value="eth">Ethereum (ETH)</option>
          <option value="ltc">Avalanche (AVAX)</option>
        </select>
      </div>
      <div>
        <label className="text-xs font-medium text-gray-600">Amount in $</label>
        <input
          type="text"
          inputMode="decimal"
          placeholder="$"
          value={amount ? `$${amount}` : ""}
          onChange={(e) => {
            // strip out anything that isn’t a digit or dot
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
