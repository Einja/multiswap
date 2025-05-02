"use client";

import React, { useState, useRef, useEffect } from "react";
import { useWallet } from "@/components/contexts/WalletContext";

const WalletDropdown: React.FC = () => {
  const { address, balance, disconnect } = useWallet();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        {address}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Balance</h3>
          <ul className="mb-2 text-gray-800 space-y-1">
            <li>ETH: {balance !== null ? `${balance}` : "Loading…"}</li>
          </ul>
          <button
            onClick={() => {
              disconnect();
              setOpen(false);
            }}
            className="w-full text-left bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletDropdown;
