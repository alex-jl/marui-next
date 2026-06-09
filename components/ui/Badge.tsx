type Variant = "count" | "status";

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  count:
    "bg-granite text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center",
  status: "bg-celadon text-granite-dark text-xs px-2 py-0.5 rounded",
};

export function Badge({ children, variant = "count", className = "" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
