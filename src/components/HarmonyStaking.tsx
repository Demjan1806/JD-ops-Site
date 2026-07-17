"use client";

import { useState, useEffect } from "react";

const VALIDATOR_ADDRESS = "one1ktksx4t8t6grdllrf8vv78pj8pc6fwggvjhqzq";
const MIN_ONE = 100;
const HARMONY_RPC = "https://api.harmony.one";
const STAKING_PORTAL = `https://staking.harmony.one/validators/mainnet/${VALIDATOR_ADDRESS}`;

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

type WalletState = "checking" | "available" | "none";

export default function HarmonyStaking() {
  const [walletState, setWalletState] = useState<WalletState>("checking");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [txHash, setTxHash] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setWalletState((window as any).onewallet ? "available" : "none");
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const fetchBalance = async (addr: string) => {
    const resp = await fetch(HARMONY_RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", method: "hmyv2_getBalance", params: [addr], id: 1 }),
    });
    const data = await resp.json();
    setBalance(Number(BigInt(data.result)) / 1e18);
  };

  const connectWallet = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const wallet = (window as any).onewallet;
      const result = await wallet.getAccount();
      setAddress(result.address);
      await fetchBalance(result.address);
    } catch (e) {
      console.error("Wallet connect failed", e);
    }
  };

  const handleStake = async () => {
    if (!address || !amount) return;
    try {
      setStatus("pending");
      setErrorMsg("");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const wallet = (window as any).onewallet;

      const nonceResp = await fetch(HARMONY_RPC, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", method: "hmyv2_getTransactionCount", params: [address, "latest"], id: 1 }),
      });
      const { result: nonce } = await nonceResp.json();

      const amountHex = "0x" + BigInt(Math.floor(parseFloat(amount) * 1e18)).toString(16);

      const stakingTx = {
        directive: 2,
        stakeMsg: {
          delegatorAddress: address,
          validatorAddress: VALIDATOR_ADDRESS,
          amount: amountHex,
        },
        nonce,
        gasPrice: "0x3B9ACA00",
        gasLimit: "0x61A8",
        chainId: 1,
      };

      const signed = await wallet.signTransaction(stakingTx);

      const sendResp = await fetch(HARMONY_RPC, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", method: "hmyv2_sendRawStakingTransaction", params: [signed.rawTransaction], id: 1 }),
      });
      const sendData = await sendResp.json();
      if (sendData.error) throw new Error(sendData.error.message);

      setTxHash(sendData.result);
      setStatus("success");
      setAmount("");
      await fetchBalance(address);
    } catch (e: unknown) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Transaction failed");
    }
  };

  const amountNum = parseFloat(amount);
  const isValid = !isNaN(amountNum) && amountNum >= MIN_ONE && balance !== null && amountNum <= balance;

  return (
    <div className="grid md:grid-cols-2 gap-10 items-start">
      <div className="bg-gray-950 border border-white/10 rounded-xl p-8">
        {walletState === "checking" && (
          <p className="text-gray-500 text-sm text-center py-6">Detecting wallet...</p>
        )}

        {walletState === "none" && (
          <div className="space-y-5">
            <div className="bg-gray-900 border border-white/5 rounded-lg px-4 py-3">
              <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Validator</p>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-gray-400 truncate flex-1">{VALIDATOR_ADDRESS}</span>
                <CopyButton text={VALIDATOR_ADDRESS} />
              </div>
            </div>

            <p className="text-gray-400 text-sm">
              Harmony native staking requires <strong className="text-white">OneWallet</strong>. Install it or stake directly via the Harmony staking portal.
            </p>

            <a
              href="https://chrome.google.com/webstore/detail/harmony-one-wallet/fnnegphlobjdpkhecapkijjdkgcjhkuk"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 rounded-lg transition-colors text-sm"
            >
              Install OneWallet
            </a>

            <a
              href={STAKING_PORTAL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center bg-linear-to-r from-blue-600 to-lime-500 hover:from-blue-500 hover:to-lime-400 text-white font-medium py-4 rounded-lg transition-all"
            >
              Stake via Harmony Portal →
            </a>
          </div>
        )}

        {walletState === "available" && !address && (
          <div className="text-center py-6">
            <p className="text-gray-400 text-sm mb-6">Connect OneWallet to stake ONE</p>
            <button
              onClick={connectWallet}
              className="bg-linear-to-r from-blue-600 to-lime-500 text-white font-medium px-8 py-3 rounded-lg transition-all"
            >
              Connect OneWallet
            </button>
          </div>
        )}

        {walletState === "available" && address && (
          <div className="space-y-5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Balance</span>
              <span className="text-white font-medium">{balance !== null ? `${balance.toFixed(2)} ONE` : "—"}</span>
            </div>

            <div className="bg-gray-900 border border-white/5 rounded-lg px-4 py-3">
              <p className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-1">Validator</p>
              <p className="text-white text-sm font-medium">JD-Ops · Harmony Mainnet</p>
              <p className="font-mono text-xs text-gray-600 mt-1 truncate">{VALIDATOR_ADDRESS}</p>
            </div>

            <div>
              <label className="font-mono text-xs text-gray-500 uppercase tracking-widest block mb-2">Amount (ONE)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={MIN_ONE}
                  step="10"
                  placeholder="100"
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setStatus("idle"); }}
                  className="flex-1 bg-gray-900 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-lime-500/40 placeholder-gray-600"
                />
                <button
                  onClick={() => balance && setAmount(Math.floor(balance).toString())}
                  className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-lg transition-colors"
                >
                  MAX
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-1.5">Minimum {MIN_ONE} ONE</p>
            </div>

            <button
              onClick={handleStake}
              disabled={!isValid || status === "pending"}
              className="w-full bg-linear-to-r from-blue-600 to-lime-500 hover:from-blue-500 hover:to-lime-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-4 rounded-lg transition-all"
            >
              {status === "pending" ? "Processing..." : "Delegate ONE"}
            </button>

            {status === "success" && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3">
                <p className="text-green-400 text-sm font-medium mb-1">Delegation successful</p>
                <a
                  href={`https://explorer.harmony.one/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-gray-400 hover:text-white transition-colors break-all"
                >
                  {txHash}
                </a>
                <p className="text-xs text-gray-500 mt-2">Rewards distributed each epoch (~18 hours)</p>
              </div>
            )}

            {status === "error" && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                <p className="text-red-400 text-sm">{errorMsg || "Transaction failed. Please try again."}</p>
                <a href={STAKING_PORTAL} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-white mt-2 block">
                  Try via Harmony Portal instead →
                </a>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-3">
        {[
          { label: "Minimum stake", value: "100 ONE", note: "Per delegation" },
          { label: "Reward frequency", value: "Every epoch", note: "~every 18 hours" },
          { label: "Undelegation", value: "7 epochs", note: "~5 days cool-down" },
          { label: "Compounding", value: "Automatic", note: "Rewards compound each epoch" },
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
            Harmony staking uses native protocol transactions — not standard EVM calls.
            OneWallet handles this automatically. You can undelegate at any time;
            funds return after the 7-epoch cool-down.
          </p>
        </div>
      </div>
    </div>
  );
}
