import { Avatar } from "@/components/ui/Avatar";
import { Timestamp } from "@/components/ui/Timestamp";

interface UserHeaderProps {
  name: string;
  handle: string;
  avatarSrc?: string;
  timestamp?: number;
  size?: "sm" | "md";
}

export function UserHeader({
  name,
  handle,
  avatarSrc,
  timestamp,
  size = "md",
}: UserHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <Avatar
        src={avatarSrc}
        alt={name}
        initials={name.slice(0, 2)}
        size={size === "sm" ? "sm" : "md"}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-ink font-display truncate">{name}</p>
        <p className="text-xs text-steel-dark truncate">
          @{handle}
          {timestamp && (
            <>
              <span className="mx-1">·</span>
              <Timestamp unix={timestamp} />
            </>
          )}
        </p>
      </div>
    </div>
  );
}
