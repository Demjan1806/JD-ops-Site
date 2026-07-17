"use client";

import dynamic from "next/dynamic";

const Staking = dynamic(() => import("@/components/Staking"), { ssr: false });

export default function StakingSection() {
  return <Staking />;
}
