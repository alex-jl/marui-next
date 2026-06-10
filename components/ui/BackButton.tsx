"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  label?: string;
}

export function BackButton({ label = "← Go back" }: BackButtonProps) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="self-center text-sm text-steel-dark hover:text-ink transition-colors cursor-pointer"
    >
      {label}
    </button>
  );
}
