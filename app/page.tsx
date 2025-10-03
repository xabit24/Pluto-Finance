"use client";
import { useState } from "react";
import { ConnectButton } from "@mysten/dapp-kit";
import { BlurBlob } from "../components/BlurBlob";
import { Card } from "../components/Card";
import { Tab } from "../components/Tab";
import { TokenPill } from "../components/TokenPill";
import "@mysten/dapp-kit/dist/index.css";

export default function Page() {
  const [route, setRoute] = useState<"landing" | "app">("landing");
  const [tab, setTab] = useState<"swap" | "liquidity">("swap");
  const [fromToken, setFromToken] = useState<"SUI" | "USDC">("SUI");
  const toToken = fromToken === "SUI" ? "USDC" : "SUI";
  const [fromAmt, setFromAmt] = useState("");
  const [liqSui, setLiqSui] = useState("");
  const [liqUsdc, setLiqUsdc] = useState("");
  const [slippage, setSlippage] = useState("0.5");

  function estimateOut(v: string) {
    const n = Number(v);
    if (!v || isNaN(n) || n <= 0) return "";
    return (n * (fromToken === "SUI" ? 0.99 : 1.01)).toFixed(4);
  }

  return (
    <div className="min-h-screen w-full bg-[#16083A] text-white overflow-hidden relative">
      <BlurBlob className="-left-24 -top-24" />
      <BlurBlob className="right-[-10rem] top-10" />
      <BlurBlob className="left-[-12rem] top-[36%]" />
      <BlurBlob className="right-[-14rem] bottom-[-6rem]" />

      <header className="absolute top-6 left-6 flex items-center gap-3 z-20">
        <div className="h-8 w-8 rounded-lg bg-white/90 text-[#16083A] grid place-items-center font-black">𝓟</div>
      </header>

      <nav className="absolute top-6 right-6 z-20">
        <ConnectButton />
      </nav>

      {route === "landing" ? (
        <section className="relative z-10 grid min-h-screen place-items-center px-6">
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="mb-3 text-[80px] leading-[0.95] font-serif tracking-tight">Pluto<br/>Finance</h1>
            <p className="mb-10 text-white/70">Multiple Earn Yield</p>
            <div className="flex items-center justify-center">
              <button onClick={() => setRoute("app")} className="rounded-xl border border-white/40 px-6 py-2 text-sm backdrop-blur-md hover:bg-white/10">
                Enter
              </button>
            </div>
          </div>
        </section>
      ) : (
        <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-28 pb-24">
          <div className="mb-10 flex flex-col items-center">
            <h1 className="text-[64px] leading-none font-serif tracking-tight text-white text-center">
              Pluto<br /> Finance
            </h1>
          </div>

          <div className="mx-auto mb-6 flex w-full max-w-3xl justify-center gap-2">
            <Tab active={tab === "swap"} onClick={() => setTab("swap")}>Swap</Tab>
            <Tab active={tab === "liquidity"} onClick={() => setTab("liquidity")}>Liquidity</Tab>
          </div>

          {tab === "swap" ? (
            <section className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-[1.25fr_1fr]">
              <Card>
                <h3 className="mb-4 text-lg font-semibold">Swap (Demo)</h3>
                <div className="mb-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                    <span>From</span><span>Balance: —</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TokenPill symbol={fromToken} locked />
                    <input value={fromAmt} onChange={(e) => setFromAmt(e.target.value)} placeholder="0.0" className="flex-1 bg-transparent text-2xl outline-none placeholder:text-white/30" inputMode="decimal" />
                  </div>
                </div>
                <div className="-my-2 mb-3 flex justify-center">
                  <button onClick={() => setFromToken(fromToken === "SUI" ? "USDC" : "SUI")} className="group grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10" title="Switch direction">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 opacity-80 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 7h13M11 7l-4-4m4 4l-4 4"/><path d="M20 17H7m6 0l4-4m-4 4l4 4"/>
                    </svg>
                  </button>
                </div>
                <div className="mb-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                    <span>To</span><span>Balance: —</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TokenPill symbol={toToken} locked />
                    <input value={estimateOut(fromAmt)} readOnly placeholder="0.0" className="flex-1 bg-transparent text-2xl outline-none placeholder:text-white/30" />
                  </div>
                </div>
                <div className="mb-4 flex items-center justify-between text-sm text-white/70">
                  <div className="flex items-center gap-3"><span className="text-white/60">Pair</span><span className="font-medium">{fromToken} / {toToken}</span></div>
                  <div className="flex items-center gap-2"><span className="text-white/60">Slippage</span><input value={slippage} onChange={(e)=>setSlippage(e.target.value)} className="w-16 rounded-md border border-white/15 bg-white/5 px-2 py-1 text-right" /><span className="text-white/60">%</span></div>
                </div>
                <button className="mt-2 w-full rounded-2xl bg-indigo-500 px-4 py-3 text-center font-semibold shadow-lg shadow-indigo-500/20 hover:bg-indigo-400" onClick={() => alert("Demo mode: no on-chain tx")}>
                  Swap {fromToken} → {toToken}
                </button>
                <p className="mt-3 text-xs text-white/50">Network: Sui Testnet (Demo mode — transaksi tidak dikirim)</p>
              </Card>

              <Card>
                <h3 className="mb-4 text-lg font-semibold">Pool — SUI/USDC</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2"><span className="text-white/60">Fee tier</span><span className="font-medium">0.3%</span></div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/60">UI demo. Tidak terhubung on-chain.</div>
                </div>
              </Card>
            </section>
          ) : (
            <section className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-[1.25fr_1fr]">
              <Card>
                <h3 className="mb-4 text-lg font-semibold">Add Liquidity — SUI/USDC (Demo)</h3>
                <div className="mb-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center justify-between text-xs text-white/60"><span>Amount SUI</span><span>Balance: —</span></div>
                  <div className="flex items-center gap-3"><TokenPill symbol="SUI" locked /><input value={liqSui} onChange={(e)=>setLiqSui(e.target.value)} placeholder="0.0" className="flex-1 bg-transparent text-2xl outline-none placeholder:text-white/30" inputMode="decimal" /></div>
                </div>
                <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center justify-between text-xs text-white/60"><span>Amount USDC</span><span>Balance: —</span></div>
                  <div className="flex items-center gap-3"><TokenPill symbol="USDC" locked /><input value={liqUsdc} onChange={(e)=>setLiqUsdc(e.target.value)} placeholder="0.0" className="flex-1 bg-transparent text-2xl outline-none placeholder:text-white/30" inputMode="decimal" /></div>
                </div>
                <button className="mt-2 w-full rounded-2xl bg-indigo-500 px-4 py-3 text-center font-semibold shadow-lg shadow-indigo-500/20 hover:bg-indigo-400" onClick={() => alert("Demo mode: no on-chain tx")}>
                  Add Liquidity
                </button>
              </Card>

              <Card>
                <h3 className="mb-4 text-lg font-semibold">Your LP Position</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2"><span className="text-white/60">Share of pool</span><span className="font-medium">— %</span></div>
                  <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2"><span className="text-white/60">Unclaimed fees</span><span className="font-medium">— USDC</span></div>
                </div>
              </Card>
            </section>
          )}
        </main>
      )}
    </div>
  );
}
