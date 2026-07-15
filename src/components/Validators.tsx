const validators = [
  {
    name: "Solana",
    type: "Layer 1",
    networks: ["mainnet", "testnet"],
    status: "OPERATIONAL",
    description:
      "High-performance L1 with sub-second finality and 65,000+ TPS capacity. We run redundant validators on both the main network and the Solana testnet.",
    detail: "Redundant infrastructure · MEV-aware configuration",
  },
  {
    name: "Avalanche",
    type: "Layer 1",
    networks: ["mainnet"],
    status: "OPERATIONAL",
    description:
      "Multi-chain platform with custom subnet support and EVM compatibility. Our Avalanche validator maintains consistent uptime on the primary C-Chain network.",
    detail: "Primary network · C-Chain validator",
  },
  {
    name: "Monad",
    type: "Layer 1",
    networks: ["testnet"],
    status: "ACTIVE",
    description:
      "High-throughput EVM-compatible L1 with parallel execution. We are running validators on the Monad testnet in preparation for mainnet launch.",
    detail: "Early validator · testnet since genesis",
  },
  {
    name: "Harmony",
    type: "Layer 1",
    networks: ["mainnet"],
    status: "OPERATIONAL",
    description:
      "Sharded L1 focused on decentralisation and fast cross-shard transactions. Our Harmony node has been live since the network's early days.",
    detail: "Shard validator · multi-year track record",
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
          {validators.map((v) => (
            <div
              key={v.name}
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
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {v.description}
                </p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-lime-500/60">◆</span>
                  <span className="font-mono text-xs text-gray-500">{v.detail}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
