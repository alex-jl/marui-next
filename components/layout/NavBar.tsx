import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface NavBarProps {
  appName?: string;
  avatarSrc?: string;
  avatarInitials?: string;
}

export function NavBar({
  appName = "marui",
  avatarSrc,
  avatarInitials = "Me",
}: NavBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-card border-b border-steel-light/50">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link href="/" className="shrink-0 transition-transform hover:scale-110 active:scale-95">
          <Image src="/icon.svg" alt={appName} width={36} height={36} />
        </Link>

        <div className="flex-1">
          <Input placeholder="Search…" icon={<MagnifyingGlassIcon className="w-4 h-4" />} />
        </div>

        <Avatar
          src={avatarSrc}
          initials={avatarInitials}
          size="sm"
        />
      </div>
    </header>
  );
}
