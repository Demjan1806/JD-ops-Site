"use client";

import { ConnectionProvider, useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState, useEffect, type ReactNode } from "react";
import {
  Keypair,
  PublicKey,
  StakeProgram,
  Authorized,
  Lockup,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
  clusterApiUrl,
} from "@solana/web3.js";

const MIN_STAKE = 0.003;
const FEE_RESERVE = 0.01;

const CONFIG = {
  "mainnet-beta": {
    label: "Mainnet",
    identityKey: "9q16BB7WGmBxf1nJTdxH5zPnBUhtHqdqXqRFjSjuM4k7",
    voteAccount: "REPLACE_WITH_MAINNET_VOTE_ACCOUNT",
    explorerBase: "https://explorer.solana.com/tx",
  },
  testnet: {
    label: "Testnet",
    identityKey: "hQBS6cu8RHkXcCzE6N8mQxhgrtbNy4kivoRjTMzF2cA",
    voteAccount: "REPLACE_WITH_TESTNET_VOTE_ACCOUNT",
    explorerBase: "https://explorer.solana.com/tx?cluster=testnet",
  },
} as const;

type Cluster = keyof typeof CONFIG;

function SolanaStakingInner({ cluster }: { cluster: Cluster }) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [txSig, setTxSig] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const cfg = CONFIG[cluster];

  useEffect(() => {
    if (!publicKey) { setBalance(null); return; }
    connection.getBalance(publicKey).then((b) => setBalance(b / LAMPORTS_PER_SOL));
  }, [publicKey, connection]);

  const handleStake = async () => {
    if (!publicKey) return;
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    try {
      setStatus("pending");
      setErrorMsg("");

      const amountLamports = Math.floor(amountNum * LAMPORTS_PER_SOL);
      const stakeKeypair = Keypair.generate();
      const rentExempt = await connection.getMinimumBalanceForRentExemption(StakeProgram.space);

      const tx = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: publicKey,
          newAccountPubkey: stakeKeypair.publicKey,
          lamports: amountLamports + rentExempt,
          space: StakeProgram.space,
          programId: StakeProgram.programId,
        }),
        StakeProgram.initialize({
          stakePubkey: stakeKeypair.publicKey,
          authorized: new Authorized(publicKey, publicKey),
          lockup: new Lockup(0, 0, publicKey),
        }),
        StakeProgram.delegate({
          stakePubkey: stakeKeypair.publicKey,
          authorizedPubkey: publicKey,
          votePubkey: new PublicKey(cfg.voteAccount),
        })
      );

      const sig = await sendTransaction(tx, connection, { signers: [stakeKeypair] });
      await connection.confirmTransaction(sig, "confirmed");
      setTxSig(sig);
      setStatus("success");
      setAmount("");
      connection.getBalance(publicKey).then((b) => setBalance(b / LAMPORTS_PER_SOL));
    } catch (e: unknown) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Transaction failed");
    }
  };

  const amountNum = parseFloat(amount);
  const isValid =
    !isNaN(amountNum) &&
    amountNum >= MIN_STAKE &&
    balance !== null &&
    amountNum <= balance - FEE_RESERVE;

  return (
    <div className="grid md:grid-cols-2 gap-10 items-start">
      <div className="bg-gray-950 border border-white/10 rounded-xl p-8">
        {!connected ? (
          <div className="text-center py-6">
            <p className="text-gray-400 text-sm mb-6">
              Connect your Solana wallet to stake on {cfg.label}
            </p>
            <WalletMultiButton />
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Available balance</span>
              <span className="text-white font-medium">
                {balance !== null ? `${balance.toFixed(4)} SOL` : "—"}
              </span>
            </div>

            <div className="bg-gray-900 border border-white/5 rounded-lg px-4 py-3">
              <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Validator</p>
              <p className="text-white text-sm font-medium">JD-Ops · Solana {cfg.label}</p>
              <p className="font-mono text-xs text-gray-600 mt-1 truncate">{cfg.identityKey}</p>
            </div>

            <div>
              <label className="font-mono text-xs text-gray-500 uppercase tracking-widest block mb-2">
                Amount (SOL)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={MIN_STAKE}
                  step="0.1"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setStatus("idle"); }}
                  className="flex-1 bg-gray-900 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500/40 placeholder-gray-600"
                />
                <button
                  onClick={() => balance && setAmount(Math.max(0, balance - FEE_RESERVE).toFixed(4))}
                  className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-lg transition-colors"
                >
                  MAX
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-1.5">
                Minimum {MIN_STAKE} SOL · {FEE_RESERVE} SOL reserved for fees
              </p>
            </div>

            <button
              onClick={handleStake}
              disabled={!isValid || status === "pending"}
              className="w-full bg-linear-to-r from-blue-600 to-lime-500 hover:from-blue-500 hover:to-lime-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-4 rounded-lg transition-all"
            >
              {status === "pending" ? "Processing..." : "Stake SOL"}
            </button>

            {status === "success" && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3">
                <p className="text-green-400 text-sm font-medium mb-1">Stake successful</p>
                <a
                  href={`${cfg.explorerBase}/${txSig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-gray-400 hover:text-white transition-colors break-all"
                >
                  {txSig}
                </a>
                <p className="text-xs text-gray-500 mt-2">Rewards begin after the warm-up period (~2 days)</p>
              </div>
            )}

            {status === "error" && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                <p className="text-red-400 text-sm">{errorMsg || "Transaction failed. Please try again."}</p>
              </div>
            )}

            <div className="pt-2 border-t border-white/5">
              <WalletMultiButton />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {[
          { label: "Commission", value: "TBD", note: "Set on your validator" },
          { label: "Reward frequency", value: "~every 2 days", note: "Once per epoch" },
          { label: "Warm-up period", value: "~2 days", note: "Before rewards begin" },
          { label: "Cool-down period", value: "~2 days", note: "After you unstake" },
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
        <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl px-6 py-4">
          <p className="text-xs text-gray-400 leading-relaxed">
            Your SOL is delegated to our validator. JD-Ops never has custody of your tokens.
            You can unstake at any time — funds return after the cool-down period.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SolanaStaking({ cluster }: { cluster: Cluster }) {
  const endpoint = clusterApiUrl(cluster);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaStakingInner cluster={cluster} />
    </ConnectionProvider>
  );
}
