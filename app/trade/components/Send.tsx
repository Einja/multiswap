import React, { useState } from "react";

const Send = () => {
  const [sendToken, setSendToken] = useState("eth");
  const [amount, setAmount] = useState("");

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-gray-600">You're sending</label>
        <div className="mt-1 text-center bg-gray-50 rounded-xl border border-gray-200 px-4 py-6">
          <p className="text-2xl font-medium text-gray-900">${amount || 0}</p>
          <p className="mt-1 text-xs text-gray-500">{amount || 0} {sendToken.toUpperCase()} ⇅</p>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          className="w-full mt-1 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600">Token</label>
        <select
          value={sendToken}
          onChange={(e) => setSendToken(e.target.value)}
          className="w-full mt-1 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:outline-none cursor-pointer"
        >
          <option value="eth">Ethereum (ETH)</option>
          <option value="pol">Polygon (POL)</option>
          <option value="avax">Avalanche (AVAX)</option>
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600">To</label>
        <input
          type="text"
          placeholder="Wallet address"
          className="w-full mt-1 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
        />
      </div>

      <button className="cursor-pointer w-full mt-2 py-3 text-sm font-semibold text-pink-500 bg-pink-50 rounded-xl hover:bg-pink-100">
        Connect wallet
      </button>
    </div>
  );
};

export default Send;
