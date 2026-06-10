"use client";

import { removeConnection } from "@/app/lib/actions";

export function RemoveConnectionButton({ connectionId }: { connectionId: string }) {
  async function handleClick() {
    if (!confirm("Unconnect from this person?")) return;
    await removeConnection(connectionId);
  }

  return (
    <button
      onClick={handleClick}
      className="text-xs font-medium px-2.5 py-1 rounded border border-steel-light/50 text-steel-dark hover:bg-surface hover:text-ink transition-colors cursor-pointer"
    >
      Unconnect
    </button>
  );
}
