import React from "react";

const Buy = () => {
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
        <label className="text-xs font-medium text-gray-600">Amount</label>
        <input
          type="number"
          placeholder="0"
          className="w-full mt-1 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
        />
      </div>
      <button className="cursor-pointer w-full mt-2 py-3 text-sm font-semibold text-white bg-pink-500 rounded-xl hover:bg-pink-600">
        Buy
      </button>
    </div>
  );
};

export default Buy;
