import { UserHeader } from "./UserHeader";
import { ActionBar } from "./ActionBar";
import Image from "next/image";

interface PostCardProps {
  id?: string;
  name: string;
  avatarSrc?: string;
  timestamp: number;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
  likes?: number;
  liked?: boolean;
}

export function PostCard({
  id,
  name,
  avatarSrc,
  timestamp,
  body,
  imageSrc,
  imageAlt = "",
  likes,
  liked,
}: PostCardProps) {
  return (
    <article className="bg-card border border-steel-light/50 rounded flex flex-col gap-4 p-4">
      <UserHeader
        name={name}
        avatarSrc={avatarSrc}
        timestamp={timestamp}
      />

      <p className="text-sm text-ink leading-relaxed whitespace-pre-wrap">{body}</p>

      {imageSrc && (
        <div className="relative w-full aspect-video rounded overflow-hidden bg-surface">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 600px"
          />
        </div>
      )}

      <ActionBar
        postId={id}
        likes={likes}
        liked={liked}
      />
    </article>
  );
}
