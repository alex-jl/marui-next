"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UserGroupIcon,
  PlusIcon,
  UserIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  UserIcon as UserIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
} from "@heroicons/react/24/solid";

const tabs = [
  { href: "/feed",     label: "Feed",     icon: (a: boolean) => a ? <HomeIconSolid className="w-6 h-6" /> : <HomeIcon className="w-6 h-6" /> },
  { href: "/circle",   label: "Circle",   icon: (a: boolean) => a ? <UserGroupIconSolid className="w-6 h-6" /> : <UserGroupIcon className="w-6 h-6" />, also: (p: string) => p.startsWith("/user/") },
  { href: "/profile",  label: "Profile",  icon: (a: boolean) => a ? <UserIconSolid className="w-6 h-6" /> : <UserIcon className="w-6 h-6" /> },
  { href: "/settings", label: "Settings", icon: (a: boolean) => a ? <Cog6ToothIconSolid className="w-6 h-6" /> : <Cog6ToothIcon className="w-6 h-6" /> },
];

export function BottomNav() {
  const pathname = usePathname();

  function navItem(tab: typeof tabs[number]) {
    const isActive = pathname === tab.href || tab.also?.(pathname) === true;
    return (
      <Link
        key={tab.href}
        href={tab.href}
        aria-label={tab.label}
        className={[
          "flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors",
          isActive ? "text-granite" : "text-steel-dark hover:text-ink-muted",
        ].join(" ")}
      >
        {tab.icon(isActive)}
        <span className="text-[10px] font-medium">{tab.label}</span>
      </Link>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-steel-light/50">
      <div className="max-w-2xl mx-auto px-2 h-16 flex items-center">
        {tabs.slice(0, 2).map(navItem)}

        <button
          aria-label="New Post"
          className="flex-none w-12 h-12 mx-4 flex items-center justify-center bg-granite text-white rounded-full cursor-pointer hover:bg-granite-dark transition hover:scale-110 active:scale-95"
        >
          <PlusIcon className="w-6 h-6" />
        </button>

        {tabs.slice(2).map(navItem)}
      </div>
    </nav>
  );
}
