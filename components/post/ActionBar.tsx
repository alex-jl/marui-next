"use client";

import { useState } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

interface ActionBarProps {
  likes?: number;
  liked?: boolean;
  onLike?: () => void;
  onShare?: () => void;
}

export function ActionBar({
  likes = 0,
  liked: initialLiked = false,
  onShare,
}: ActionBarProps) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(likes);

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
        icon={<ShareIcon className="w-[18px] h-[18px]" />}
        label="Share"
        onClick={onShare}
      />
    </div>
  );
}
