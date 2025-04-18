"use client";
import React, { useState } from "react";

const sampleTokens = [
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "$1,590.09",
    volume: "$312.6M",
    chart: "📈",
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    price: "$45.23",
    volume: "$85.4M",
    chart: "📉",
  },
  {
    name: "Polygon",
    symbol: "POL",
    price: "$0.80",
    volume: "$42.1M",
    chart: "📈",
  },
];

const sampleTransactions = [
  { time: "13s", type: "Swap", from: "ETH", to: "USDT", usd: "$8.90" },
  { time: "37s", type: "Add", from: "ETH", to: "USDT", usd: "$322.54" },
  { time: "1m", type: "Swap", from: "ETH", to: "AVAX", usd: "$3.53" },
  { time: "2m", type: "Swap", from: "WBTC", to: "USDC", usd: "$9.27" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("tokens");

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto rounded-2xl shadow-sm border border-pink-400">
        {/* --- Tabs --- */}
        <nav className="flex space-x-8 p-5 border-b border-pink-400">
          {["tokens", "transactions"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={
                `pb-2 text-sm font-medium cursor-pointer ` +
                (activeTab === tab
                  ? "text-pink-500 border-b-2 border-pink-500"
                  : "text-gray-400")
              }
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        {/* --- Content --- */}
        {activeTab === "tokens" && (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-pink-500">
                  #
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-pink-500">
                  Token
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-pink-500">
                  Price
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-pink-500">
                  Volume (24h)
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium text-pink-500">
                  Chart
                </th>
              </tr>
            </thead>
            <tbody>
              {sampleTokens.map((tk, i) => (
                <tr key={tk.symbol}>
                  <td className="px-4 py-3 text-sm text-pink-900">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-pink-900">
                    {tk.name} {tk.symbol}
                  </td>
                  <td className="px-4 py-3 text-sm text-pink-900 text-right">
                    {tk.price}
                  </td>
                  <td className="px-4 py-3 text-sm text-pink-900 text-right">
                    {tk.volume}
                  </td>
                  <td className="px-4 py-3 text-sm text-pink-900 text-center">
                    {tk.chart}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "transactions" && (
          <table className="w-full table-auto">
            <thead>
              <tr>
                {["Time", "Type", "USD"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-medium text-pink-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampleTransactions.map((t, i) => (
                <tr key={i}>
                  <td className="px-4 py-3 text-sm text-pink-900">{t.time}</td>
                  <td className="px-4 py-3 text-sm text-pink-900">
                    {t.type} {t.from} for {t.to}
                  </td>
                  <td className="px-4 py-3 text-sm text-pink-900">{t.usd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}
