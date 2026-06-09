import { ButtonHTMLAttributes } from "react";

type Color = "granite" | "dusty" | "celadon" | "steel";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  count?: number;
  active?: boolean;
  activeColor?: Color;
}

const activeColorMap: Record<Color, string> = {
  granite: "text-granite",
  dusty: "text-dusty",
  celadon: "text-celadon-dark",
  steel: "text-steel-dark",
};

export function IconButton({
  icon,
  label,
  count,
  active = false,
  activeColor = "granite",
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      aria-label={label}
      className={[
        "inline-flex items-center gap-1.5 text-sm transition-colors cursor-pointer select-none disabled:opacity-50",
        active ? activeColorMap[activeColor] : "text-steel-dark hover:text-ink-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className="w-5 h-5 flex items-center justify-center">{icon}</span>
      {count !== undefined && (
        <span className="text-xs font-medium tabular-nums">{count}</span>
      )}
    </button>
  );
}
