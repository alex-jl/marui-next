"use client";

import { useState } from "react";
import Link from "next/link";
import { IconButton } from "@/components/ui/IconButton";
import { HeartIcon, ShareIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

interface ActionBarProps {
  postId?: string;
  likes?: number;
  liked?: boolean;
  onLike?: () => void;
}

export function ActionBar({
  postId,
  likes = 0,
  liked: initialLiked = false,
}: ActionBarProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [copied, setCopied] = useState(false);

  function handleShare() {
    if (!postId) return;
    navigator.clipboard.writeText(`${window.location.origin}/post/${postId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleLike() {
    setLiked((v) => !v);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  }

  return (
    <div className="flex items-center gap-5">
      <IconButton
        icon={liked ? <HeartIconSolid className="w-[18px] h-[18px]" /> : <HeartIcon className="w-[18px] h-[18px]" />}
        label="Like"
        count={likeCount}
        active={liked}
        activeColor="celadon"
        onClick={handleLike}
      />
      {postId && (
        <Link
          href={`/post/${postId}`}
          aria-label="Comments"
          className="inline-flex items-center gap-1.5 text-sm transition cursor-pointer select-none text-steel-dark hover:text-ink-muted hover:scale-110 active:scale-95"
        >
          <span className="w-5 h-5 flex items-center justify-center">
            <ChatBubbleLeftIcon className="w-[18px] h-[18px]" />
          </span>
        </Link>
      )}
      <span className="flex-1" />
      <div className="relative">
        {copied && (
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded bg-ink text-white text-xs whitespace-nowrap shadow-sm pointer-events-none">
            Link copied!
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink" />
          </span>
        )}
        <IconButton
          icon={<ShareIcon className="w-[18px] h-[18px]" />}
          label="Share"
          onClick={handleShare}
        />
      </div>
    </div>
  );
}
