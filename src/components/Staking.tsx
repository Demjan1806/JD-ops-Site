"use client";

import { useState } from "react";
import SolanaStaking from "./SolanaStaking";
import AvalancheStaking from "./AvalancheStaking";
import HarmonyStaking from "./HarmonyStaking";

const TABS = [
  { id: "sol-mainnet", label: "Solana", sub: "Mainnet" },
  { id: "sol-testnet", label: "Solana", sub: "Testnet" },
  { id: "avalanche", label: "Avalanche", sub: "Mainnet" },
  { id: "harmony", label: "Harmony", sub: "Mainnet" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Staking() {
  const [active, setActive] = useState<TabId>("sol-mainnet");

  return (
    <section id="stake" className="bg-gray-900 py-24 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">
            Stake with JD-Ops
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Delegate your tokens
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl leading-relaxed">
            Stake with our validators across all supported networks.
            Your tokens stay in your wallet — you retain full control at all times.
          </p>
        </div>

        {/* Network tabs */}
        <div className="flex gap-2 flex-wrap mb-10">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active === tab.id
                  ? "bg-linear-to-r from-blue-600 to-lime-500 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 font-mono text-xs ${
                  active === tab.id ? "text-white/70" : "text-gray-600"
                }`}
              >
                {tab.sub}
              </span>
            </button>
          ))}
        </div>

        {active === "sol-mainnet" && <SolanaStaking cluster="mainnet-beta" />}
        {active === "sol-testnet" && <SolanaStaking cluster="testnet" />}
        {active === "avalanche" && <AvalancheStaking />}
        {active === "harmony" && <HarmonyStaking />}
      </div>
    </section>
  );
}
