"use client";

import { useState } from "react";

const NODE_ID = "NodeID-B39dR3Zj4ZtiqSHTPLxck66yqxTZ9pRmK";
const MIN_AVAX = 25;
const DURATION_OPTIONS = [
  { label: "2 weeks", weeks: 2 },
  { label: "1 month", weeks: 4 },
  { label: "3 months", weeks: 13 },
  { label: "1 year", weeks: 52 },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="shrink-0 text-gray-500 hover:text-lime-400 transition-colors"
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

export default function AvalancheStaking() {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState(DURATION_OPTIONS[1]);

  return (
    <div className="grid md:grid-cols-2 gap-10 items-start">
      <div className="bg-gray-950 border border-white/10 rounded-xl p-8 space-y-5">
        <div className="bg-gray-900 border border-white/5 rounded-lg px-4 py-3">
          <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Node ID</p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-gray-400 truncate flex-1">{NODE_ID}</span>
            <CopyButton text={NODE_ID} />
          </div>
        </div>

        <div>
          <label className="font-mono text-xs text-gray-500 uppercase tracking-widest block mb-2">
            Amount (AVAX)
          </label>
          <input
            type="number"
            min={MIN_AVAX}
            step="1"
            placeholder="25"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-gray-900 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500/40 placeholder-gray-600"
          />
          <p className="text-xs text-gray-600 mt-1.5">Minimum {MIN_AVAX} AVAX</p>
        </div>

        <div>
          <label className="font-mono text-xs text-gray-500 uppercase tracking-widest block mb-2">
            Lock-up Duration
          </label>
          <div className="grid grid-cols-2 gap-2">
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.weeks}
                onClick={() => setDuration(opt)}
                className={`py-2.5 rounded-lg text-sm font-medium transition-all ${
                  duration.weeks === opt.weeks
                    ? "bg-linear-to-r from-blue-600 to-lime-500 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-1.5">
            Cannot be changed after staking — choose carefully
          </p>
        </div>

        <a
          href="https://core.app/staking"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center bg-linear-to-r from-blue-600 to-lime-500 hover:from-blue-500 hover:to-lime-400 text-white font-medium py-4 rounded-lg transition-all"
        >
          Continue in Core Wallet →
        </a>

        <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg px-4 py-3">
          <p className="text-xs text-gray-400 leading-relaxed">
            Avalanche P-Chain delegation requires Core Wallet. Copy the Node ID above,
            then complete delegation in Core Wallet's staking section using your chosen amount and duration.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {[
          { label: "Minimum stake", value: "25 AVAX", note: "Per delegation" },
          { label: "Min duration", value: "2 weeks", note: "Lock-up is fixed at stake time" },
          { label: "Max duration", value: "1 year", note: "Cannot extend after staking" },
          { label: "Reward frequency", value: "End of period", note: "Paid out when lock-up ends" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-gray-950 border border-white/10 rounded-xl px-6 py-4 flex items-center justify-between"
          >
            <div>
              <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">{item.label}</p>
              <p className="text-xs text-gray-600 mt-0.5">{item.note}</p>
            </div>
            <span className="text-white font-semibold text-sm">{item.value}</span>
          </div>
        ))}

        <div className="space-y-2">
          {[
            { n: "01", title: "Install Core Wallet", desc: "Get Core Wallet at core.app — the official Avalanche wallet with P-Chain support." },
            { n: "02", title: "Bridge to P-Chain", desc: "Move AVAX from C-Chain to P-Chain via the cross-chain bridge inside Core Wallet." },
            { n: "03", title: "Paste Node ID", desc: `In Core → Staking → Delegate, paste: ${NODE_ID.slice(0, 16)}…` },
            { n: "04", title: "Set amount & duration", desc: "Enter your AVAX amount and lock-up period. Confirm and sign." },
          ].map((s) => (
            <div key={s.n} className="bg-gray-950 border border-white/10 rounded-xl px-5 py-3 flex gap-4">
              <span className="font-mono text-xs text-lime-500/60 shrink-0 mt-0.5">{s.n}</span>
              <div>
                <p className="text-white text-sm font-medium">{s.title}</p>
                <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
