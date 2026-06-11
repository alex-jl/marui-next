"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useComposer } from "@/components/post/ComposerProvider";
import {
  HomeIcon,
  UserGroupIcon,
  PlusIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  UserIcon as UserIconSolid,
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
} from "@heroicons/react/24/solid";

const tabs = [
  { href: "/feed",     label: "Feed",     icon: (a: boolean) => a ? <HomeIconSolid className="w-6 h-6" /> : <HomeIcon className="w-6 h-6" /> },
  { href: "/circle",   label: "Circle",   icon: (a: boolean) => a ? <UserGroupIconSolid className="w-6 h-6" /> : <UserGroupIcon className="w-6 h-6" />, also: (p: string) => p.startsWith("/user/") },
  { href: "/profile",  label: "Profile",  icon: (a: boolean) => a ? <UserIconSolid className="w-6 h-6" /> : <UserIcon className="w-6 h-6" /> },
  { href: "/chat",     label: "Chat",     icon: (a: boolean) => a ? <ChatBubbleLeftRightIconSolid className="w-6 h-6" /> : <ChatBubbleLeftRightIcon className="w-6 h-6" /> },
];

export function BottomNav() {
  const pathname = usePathname();
  const { open } = useComposer();

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
          onClick={open}
          className="flex-none w-16 h-16 mx-2 -translate-y-3 flex items-center justify-center bg-granite text-white rounded-full shadow-xl shadow-granite/40 cursor-pointer hover:scale-105 active:scale-95 transition-transform"
        >
          <PlusIcon className="w-7 h-7 stroke-2" />
        </button>

        {tabs.slice(2).map(navItem)}
      </div>
    </nav>
  );
}
