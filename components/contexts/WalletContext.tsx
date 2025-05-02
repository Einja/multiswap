"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { BrowserProvider } from "ethers";

interface Window {
  ethereum?: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
  };
}
declare const window: Window;

interface WalletContextType {
  address: string | null;
  connect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  connect: async () => {},
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);

  const connect = useCallback(async () => {
    try {
      let provider: BrowserProvider;

      if (typeof window.ethereum !== "undefined") {
        // Injected wallet (MetaMask)
        await window.ethereum.request({ method: "eth_requestAccounts" });
        provider = new BrowserProvider(window.ethereum);
      } else {
        // Fallback to WalletConnect (QR code)
        const wc = new WalletConnectProvider({
          infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
          qrcode: true,
        });
        await wc.enable();
        provider = new BrowserProvider(wc as any);
      }

      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAddress(addr);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  }, []);

  return (
    <WalletContext.Provider value={{ address, connect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
