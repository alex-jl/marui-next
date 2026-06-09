import { UserHeader } from "./UserHeader";
import { ActionBar } from "./ActionBar";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";

interface Tag {
  label: string;
}

interface PostCardProps {
  name: string;
  handle: string;
  avatarSrc?: string;
  timestamp: number;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
  tags?: Tag[];
  likes?: number;
  liked?: boolean;
}

export function PostCard({
  name,
  handle,
  avatarSrc,
  timestamp,
  body,
  imageSrc,
  imageAlt = "",
  tags = [],
  likes,
  liked,
}: PostCardProps) {
  return (
    <article className="bg-card border border-steel-light/50 rounded flex flex-col gap-4 p-4">
      <UserHeader
        name={name}
        handle={handle}
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

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <Badge key={t.label} variant="tag">
              #{t.label}
            </Badge>
          ))}
        </div>
      )}

      <ActionBar
        likes={likes}
        liked={liked}
      />
    </article>
  );
}
