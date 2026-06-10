import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Timestamp } from "@/components/ui/Timestamp";

interface UserHeaderProps {
  name: string;
  userId?: string;
  avatarSrc?: string;
  timestamp?: number;
  size?: "sm" | "md";
}

export function UserHeader({
  name,
  userId,
  avatarSrc,
  timestamp,
  size = "md",
}: UserHeaderProps) {
  const nameEl = (
    <p className="text-sm font-semibold text-ink font-display truncate">{name}</p>
  );

  return (
    <div className="flex items-center gap-3">
      {userId ? (
        <Link href={`/user/${userId}`} className="shrink-0 transition-transform hover:scale-110 active:scale-95">
          <Avatar
            src={avatarSrc}
            alt={name}
            initials={name.slice(0, 2)}
            size={size === "sm" ? "sm" : "md"}
          />
        </Link>
      ) : (
        <Avatar
          src={avatarSrc}
          alt={name}
          initials={name.slice(0, 2)}
          size={size === "sm" ? "sm" : "md"}
        />
      )}
      <div className="flex-1 min-w-0">
        {userId ? (
          <Link href={`/user/${userId}`} className="hover:underline">
            {nameEl}
          </Link>
        ) : nameEl}
        {timestamp && (
          <p className="text-xs text-steel-dark truncate">
            <Timestamp unix={timestamp} />
          </p>
        )}
      </div>
    </div>
  );
}
