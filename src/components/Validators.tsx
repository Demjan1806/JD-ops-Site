"use client";

import { useState } from "react";

const validators = [
  {
    name: "Solana",
    type: "Layer 1",
    networks: ["mainnet"],
    status: "OPERATIONAL",
    description: "Run directly after Tour de SOL (Solana testnet).",
    detail: "Redundant infrastructure · MEV-aware configuration",
    key: "9q16BB7WGmBxf1nJTdxH5zPnBUhtHqdqXqRFjSjuM4k7",
    keyLabel: "Identity Key",
  },
  {
    name: "Solana",
    type: "Layer 1",
    networks: ["testnet"],
    status: "OPERATIONAL",
    description: "Long-running testnet validator from the early Tour de SOL testnet.",
    detail: "Testnet since genesis · Tour de SOL veteran",
    key: "hQBS6cu8RHkXcCzE6N8mQxhgrtbNy4kivoRjTMzF2cA",
    keyLabel: "Identity Key",
  },
  {
    name: "Avalanche",
    type: "Layer 1",
    networks: ["mainnet"],
    status: "OPERATIONAL",
    description: "Multi-chain platform with custom subnet support and EVM compatibility. Our Avalanche validator maintains consistent uptime on the primary C-Chain network.",
    detail: "Primary network · C-Chain validator",
    key: "NodeID-B39dR3Zj4ZtiqSHTPLxck66yqxTZ9pRmK",
    keyLabel: "Node ID",
  },
  {
    name: "Harmony",
    type: "Layer 1",
    networks: ["mainnet"],
    status: "OPERATIONAL",
    description: "Sharded L1 focused on decentralisation and fast cross-shard transactions. Our Harmony node has been live since the network's early days.",
    detail: "Shard validator · multi-year track record",
    key: "one1ktksx4t8t6grdllrf8vv78pj8pc6fwggvjhqzq",
    keyLabel: "ONE Address",
  },
];

const networkBadge: Record<string, string> = {
  mainnet: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  testnet: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
};

const statusColor: Record<string, string> = {
  OPERATIONAL: "text-green-400",
  ACTIVE: "text-blue-400",
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 text-gray-500 hover:text-lime-400 transition-colors"
      title="Copy key"
    >
      {copied ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )}
    </button>
  );
}

export default function Validators() {
  return (
    <section id="networks" className="bg-gray-950 py-24 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">
            Active Networks
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Validator operations
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl leading-relaxed">
            Professional validators across leading proof-of-stake networks —
            securing consensus and earning staking rewards for our clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {validators.map((v, i) => (
            <div
              key={`${v.name}-${i}`}
              className="bg-gray-900 border border-white/10 rounded-xl overflow-hidden hover:border-lime-500/20 transition-colors flex flex-col"
            >
              {/* card header */}
              <div className="px-8 pt-7 pb-5 border-b border-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{v.name}</h3>
                      <span className="font-mono text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                        {v.type}
                      </span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {v.networks.map((net) => (
                        <span
                          key={net}
                          className={`font-mono text-xs px-2.5 py-1 rounded-full ${networkBadge[net] ?? "bg-white/5 text-gray-400"}`}
                        >
                          {net}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={`font-mono text-xs shrink-0 ml-4 ${statusColor[v.status] ?? "text-gray-400"}`}>
                    ● {v.status}
                  </span>
                </div>
              </div>

              {/* card body */}
              <div className="px-8 py-5 flex flex-col flex-1">
                <p className="text-gray-400 text-sm leading-relaxed">
                  {v.description}
                </p>

                <div className="mt-auto pt-4">
                  {v.key && (
                    <div className="mb-3">
                      <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">
                        {v.keyLabel}
                      </p>
                      <div className="flex items-center gap-2 bg-gray-950/60 border border-white/5 rounded-lg px-3 py-2">
                        <span className="font-mono text-xs text-gray-400 truncate flex-1">
                          {v.key}
                        </span>
                        <CopyButton text={v.key} />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="text-lime-500/60">◆</span>
                    <span className="font-mono text-xs text-gray-500">{v.detail}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
