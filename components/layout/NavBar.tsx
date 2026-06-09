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
        <span className="text-lg font-bold text-granite font-display shrink-0">{appName}</span>

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
