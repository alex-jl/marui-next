import Image from "next/image";
import { Skeleton } from "./Skeleton";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: Size;
  online?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const sizeMap: Record<Size, { px: number; cls: string; text: string }> = {
  xs: { px: 24, cls: "w-6 h-6", text: "text-[9px]" },
  sm: { px: 32, cls: "w-8 h-8", text: "text-xs" },
  md: { px: 40, cls: "w-10 h-10", text: "text-sm" },
  lg: { px: 56, cls: "w-14 h-14", text: "text-base" },
  xl: { px: 80, cls: "w-20 h-20", text: "text-xl" },
};

const onlineSizeMap: Record<Size, string> = {
  xs: "w-1.5 h-1.5",
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3",
  xl: "w-3.5 h-3.5",
};

export function Avatar({
  src,
  alt = "",
  initials,
  size = "md",
  online,
  loading = false,
  onClick,
}: AvatarProps) {
  const { px, cls, text } = sizeMap[size];
  const clickable = !!onClick;

  if (loading) {
    return (
      <div className="relative inline-flex shrink-0">
        <Skeleton className={`${cls} rounded-full`} />
      </div>
    );
  }

  return (
    <div className="relative inline-flex shrink-0">
      <div
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={onClick}
        onKeyDown={clickable ? (e) => e.key === "Enter" && onClick?.() : undefined}
        className={[
          cls,
          "rounded-full overflow-hidden bg-celadon-dark flex items-center justify-center",
          "ring-2 ring-white transition-transform cursor-pointer hover:scale-110 active:scale-95",
          clickable ? "hover:ring-celadon-dark" : "",
        ].filter(Boolean).join(" ")}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={px}
            height={px}
            draggable={false}
            className="object-cover w-full h-full"
          />
        ) : (
          <span
            aria-hidden="true"
            className={`${text} font-semibold text-white uppercase select-none tracking-widest`}
          >
            {initials ?? alt.slice(0, 2)}
          </span>
        )}
      </div>

      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 ${onlineSizeMap[size]} rounded-full border-2 border-card ${online ? "bg-celadon-dark" : "bg-steel-light"}`}
        />
      )}
    </div>
  );
}
