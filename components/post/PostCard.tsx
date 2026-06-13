import { UserHeader } from "./UserHeader";
import { ActionBar } from "./ActionBar";

interface PostCardProps {
  id?: string;
  userId?: string;
  name: string;
  avatarSrc?: string;
  timestamp: number;
  body: string;
  highlight?: string;
  attachments?: string[];
  likes?: number;
  liked?: boolean;
}

function highlightText(text: string, term: string) {
  const parts = text.split(new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === term.toLowerCase()
      ? <strong key={i} className="font-semibold">{part}</strong>
      : part
  );
}

export function PostCard({
  id,
  userId,
  name,
  avatarSrc,
  timestamp,
  body,
  highlight,
  attachments,
  likes,
  liked,
}: PostCardProps) {
  const images = attachments ?? [];

  return (
    <article className="bg-card border border-steel-light/50 rounded flex flex-col gap-4 p-4">
      <UserHeader
        name={name}
        userId={userId}
        avatarSrc={avatarSrc}
        timestamp={timestamp}
      />

      <p className="text-sm text-ink leading-relaxed whitespace-pre-wrap">
        {highlight ? highlightText(body, highlight) : body}
      </p>

      {images.length > 0 && (
        <div className="w-full aspect-video rounded overflow-hidden bg-surface">
          <img
            src={`/api/blob?url=${encodeURIComponent(images[0])}`}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
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
