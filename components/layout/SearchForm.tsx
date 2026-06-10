"use client";

import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function SearchForm() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";

  return (
    <form action="/search" method="GET" className="flex-1">
      <Input
        name="q"
        defaultValue={q}
        aria-label="Search"
        placeholder="Search…"
        icon={<MagnifyingGlassIcon className="w-4 h-4" />}
      />
    </form>
  );
}
