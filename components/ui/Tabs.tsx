import Link from "next/link";

interface Tab {
  label: string;
  href: string;
  active: boolean;
}

interface TabsProps {
  tabs: Tab[];
}

export function Tabs({ tabs }: TabsProps) {
  return (
    <div className="flex gap-1 bg-card border border-steel-light/50 rounded p-1">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          className={[
            "flex-1 text-center py-2 text-sm font-medium rounded transition-colors",
            tab.active
              ? "bg-granite text-white"
              : "text-steel-dark hover:text-ink-muted hover:bg-surface",
          ].join(" ")}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
