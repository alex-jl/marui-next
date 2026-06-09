"use client";

import { useState } from "react";
import {
  HomeIcon,
  UserGroupIcon,
  PlusIcon,
  BookmarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeIconSolid,
  UserGroupIcon as UserGroupIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";

type Tab = "feed" | "circle" | "saved" | "profile";

const tabs: { id: Tab; label: string; icon: (active: boolean) => React.ReactNode }[] = [
  { id: "feed",    label: "Feed",    icon: (a) => a ? <HomeIconSolid className="w-6 h-6" /> : <HomeIcon className="w-6 h-6" /> },
  { id: "circle",  label: "Circle",  icon: (a) => a ? <UserGroupIconSolid className="w-6 h-6" /> : <UserGroupIcon className="w-6 h-6" /> },
  { id: "saved",   label: "Saved",   icon: (a) => a ? <BookmarkIconSolid className="w-6 h-6" /> : <BookmarkIcon className="w-6 h-6" /> },
  { id: "profile", label: "Profile", icon: (a) => a ? <UserIconSolid className="w-6 h-6" /> : <UserIcon className="w-6 h-6" /> },
];

interface BottomNavProps {
  defaultTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

export function BottomNav({ defaultTab = "feed", onTabChange }: BottomNavProps) {
  const [active, setActive] = useState<Tab>(defaultTab);

  function handleTab(id: Tab) {
    setActive(id);
    onTabChange?.(id);
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-steel-light/50">
      <div className="max-w-2xl mx-auto px-2 h-16 flex items-center">
        {tabs.slice(0, 2).map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTab(tab.id)}
              aria-label={tab.label}
              className={[
                "flex-1 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors",
                isActive ? "text-granite" : "text-steel hover:text-ink-muted",
              ].join(" ")}
            >
              {tab.icon(isActive)}
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}

        <button
          aria-label="New Post"
          className="flex-none w-12 h-12 mx-4 flex items-center justify-center bg-granite text-white rounded-full cursor-pointer hover:bg-granite-dark transition-colors"
        >
          <PlusIcon className="w-6 h-6" />
        </button>

        {tabs.slice(2).map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTab(tab.id)}
              aria-label={tab.label}
              className={[
                "flex-1 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-colors",
                isActive ? "text-granite" : "text-steel hover:text-ink-muted",
              ].join(" ")}
            >
              {tab.icon(isActive)}
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
