import "../styles/globals.css";
import Providers from "./providers";

export const metadata = { title: "Pluto Finance (Demo) — SUI–USDC on Sui Testnet" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
