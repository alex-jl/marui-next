"use client";

import { useComposer } from "./ComposerProvider";

export function PostComposer() {
  const { open } = useComposer();
  return (
    <button
      onClick={open}
      className="self-center text-sm font-medium px-3 py-1.5 rounded text-granite hover:bg-granite/10 transition-colors cursor-pointer"
    >
      + Post something new
    </button>
  );
}
