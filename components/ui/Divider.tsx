interface DividerProps {
  label?: string;
  className?: string;
}

export function Divider({ label, className = "" }: DividerProps) {
  if (label) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <span className="flex-1 h-px bg-steel-light" />
        <span className="text-xs text-steel font-medium">{label}</span>
        <span className="flex-1 h-px bg-steel-light" />
      </div>
    );
  }
  return <hr className={`border-0 border-t border-steel-light ${className}`} />;
}
