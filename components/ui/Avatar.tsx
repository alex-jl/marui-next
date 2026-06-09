import Image from "next/image";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: Size;
  online?: boolean;
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
}: AvatarProps) {
  const { px, cls, text } = sizeMap[size];

  return (
    <div className="relative inline-flex shrink-0">
      <div
        className={`${cls} rounded-full overflow-hidden bg-granite flex items-center justify-center`}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            width={px}
            height={px}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className={`${text} font-semibold text-white uppercase`}>
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
