import type { Metadata } from "next";
import "./globals.css";
import LoadingWrapper from "@/components/shared/LoadingWrapper";
import { WalletProvider } from "@/components/contexts/WalletContext";
export const metadata: Metadata = {
  title: "Multiswap",
  description: "A decentralized exchange for seamless asset swapping.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
          <LoadingWrapper>
            <main className="container mx-auto mt-8 mb-8">{children}</main>
          </LoadingWrapper>
        </WalletProvider>
      </body>
    </html>
  );
}
