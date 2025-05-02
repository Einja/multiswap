"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { BrowserProvider, formatEther } from "ethers";

interface Window {
  ethereum?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
  };
}
declare const window: Window;

interface WalletContextType {
  address: string | null;
  balance: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  balance: null,
  connect: async () => {},
  disconnect: async () => {},
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [wcProvider, setWcProvider] = useState<WalletConnectProvider | null>(
    null
  );

  const connect = useCallback(async () => {
    try {
      let p: BrowserProvider;
      let wc: WalletConnectProvider | null = null;

      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        p = new BrowserProvider(window.ethereum);
      } else {
        wc = new WalletConnectProvider({
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
          qrcode: true,
        });
        await wc.enable();
        p = new BrowserProvider(wc as any);
      }

      setProvider(p);
      setWcProvider(wc);

      const signer = await p.getSigner();
      const addr = await signer.getAddress();
      setAddress(addr);

      const balBN = await p.getBalance(addr);
      const formattedBalance = formatEther(balBN);
      setBalance(parseFloat(formattedBalance).toFixed(4)); // Limit to 4 decimal places
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  }, []);

  const disconnect = useCallback(async () => {
    // If using WalletConnect, explicitly kill the session
    if (wcProvider) {
      await wcProvider.disconnect();
      setWcProvider(null);
    }
    setProvider(null);
    setAddress(null);
    setBalance(null);
  }, [wcProvider]);

  // Optional: auto‐refresh balance on address change
  useEffect(() => {
    if (!provider || !address) return;
    const refresh = async () => {
      const balBN = await provider.getBalance(address);
      const formattedBalance = formatEther(balBN);
      setBalance(parseFloat(formattedBalance).toFixed(4)); // Limit to 4 decimal places
    };
    refresh();
    const id = setInterval(refresh, 60_000); // every minute
    return () => clearInterval(id);
  }, [provider, address]);

  return (
    <WalletContext.Provider value={{ address, balance, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
