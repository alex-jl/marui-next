import Image from "next/image";
import Link from "next/link";
import { UserButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { SearchForm } from "@/components/layout/SearchForm";

interface NavBarProps {
  appName?: string;
}

export function NavBar({ appName = "marui" }: NavBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-card border-b border-steel-light/50">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link href="/" className="shrink-0 transition-transform hover:scale-110 active:scale-95">
          <Image src="/icon.svg" alt={appName} width={36} height={36} />
        </Link>

        <SearchForm />

        <div className="shrink-0 w-8 h-8 flex items-center justify-center">
          <ClerkLoading>
            <div className="w-8 h-8 rounded-full bg-steel-light/30 animate-pulse" />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton appearance={{ variables: { colorBackground: "#ffffff" } }} />
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}
