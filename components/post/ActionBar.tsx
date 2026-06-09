"use client";

import { useState } from "react";
import { IconButton } from "@/components/ui/IconButton";
import {
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/24/solid";

interface ActionBarProps {
  likes?: number;
  liked?: boolean;
  bookmarked?: boolean;
  onLike?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
}

export function ActionBar({
  likes = 0,
  liked: initialLiked = false,
  bookmarked: initialBookmarked = false,
  onShare,
}: ActionBarProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

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
      <span className="flex-1" />
      <IconButton
        icon={bookmarked ? <BookmarkIconSolid className="w-[18px] h-[18px]" /> : <BookmarkIcon className="w-[18px] h-[18px]" />}
        label="Bookmark"
        active={bookmarked}
        activeColor="celadon"
        onClick={() => setBookmarked((v) => !v)}
      />
      <IconButton
        icon={<ShareIcon className="w-[18px] h-[18px]" />}
        label="Share"
        onClick={onShare}
      />
    </div>
  );
}
