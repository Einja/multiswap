"use client";
import React, { useState } from "react";
import Swap from "./components/Swap";
import Buy from "./components/Buy";
import Send from "./components/Send";

export default function Page() {
  const [activeTab, setActiveTab] = useState("swap");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl border-2 border-gray-200 shadow-sm bg-white">
        <div className="p-5">
          <h1 className="text-center text-2xl font-semibold text-pink-500 mb-5">
            Trade
          </h1>

          {/* Tabs */}
          <div className="flex justify-between mb-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("swap")}
              className={`cursor-pointer pb-2 text-sm font-medium hover:text-pink-500 ${
                activeTab === "swap"
                  ? "text-pink-500 border-b-2 border-pink-500"
                  : "text-gray-400"
              }`}
            >
              Swap
            </button>
            <button
              onClick={() => setActiveTab("buy")}
              className={`cursor-pointer pb-2 text-sm font-medium hover:text-pink-500 ${
                activeTab === "buy"
                  ? "text-pink-500 border-b-2 border-pink-500"
                  : "text-gray-400"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setActiveTab("send")}
              className={`cursor-pointer pb-2 text-sm font-medium hover:text-pink-500 ${
                activeTab === "send"
                  ? "text-pink-500 border-b-2 border-pink-500"
                  : "text-gray-400"
              }`}
            >
              Send
            </button>
          </div>

          {activeTab === "swap" && <Swap />}
          {activeTab === "buy" && <Buy />}
          {activeTab === "send" && <Send />}
        </div>
      </div>
    </div>
  );
}