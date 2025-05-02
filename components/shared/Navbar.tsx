"use client";

import React from "react";
import Link from "next/link";
import { useWallet } from "@/components/contexts/WalletContext";
import WalletDropdown from "./WalletDropdown";
const Navbar: React.FC = () => {
  const { address, connect } = useWallet();

  return (
    <nav
      className="p-4 z-50 w-full"
      style={{ backgroundColor: "var(--bg2)" }}
    >
      <div className="flex justify-between items-center">
        <ul className="flex space-x-8">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/explore">Explore</Link>
          </li>
          <li>
            <Link href="/trade">Trade</Link>
          </li>
        </ul>

        {address ? <WalletDropdown/> : (
          <button
            onClick={connect}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
