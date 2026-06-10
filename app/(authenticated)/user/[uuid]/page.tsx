import type { Metadata } from "next";
import { notFound } from "next/navigation";
import postgres from "postgres";
import { Feed } from "@/components/layout/Feed";
import { Avatar } from "@/components/ui/Avatar";
import { Timestamp } from "@/components/ui/Timestamp";
import { PostCard } from "@/components/post/PostCard";
import { getCurrentUser, getUserPosts, getConnection } from "@/app/lib/queries";
import { RemoveConnectionButton } from "@/components/ui/RemoveConnectionButton";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

interface UserPageProps {
  params: Promise<{ uuid: string }>;
}

export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  const { uuid } = await params;
  const [user] = await sql<{ name: string }[]>`SELECT name FROM users WHERE id = ${uuid} LIMIT 1`;
  if (!user) return {};
  return { title: user.name };
}

export default async function UserPage({ params }: UserPageProps) {
  const { uuid } = await params;

  const [currentUser, user] = await Promise.all([
    getCurrentUser(),
    sql<{ id: string; name: string; avatar_url: string | null; joined_at: Date }[]>`
      SELECT id, name, avatar_url, joined_at FROM users WHERE id = ${uuid} LIMIT 1
    `.then((r) => r[0] ?? null),
  ]);

  if (!currentUser || !user) notFound();

  const [posts, connection] = await Promise.all([
    getUserPosts(uuid, currentUser.id),
    getConnection(currentUser.id, uuid),
  ]);

  return (
    <Feed>
      <div className="relative bg-card border border-steel-light/50 rounded p-5 flex items-center gap-4">
        {connection && (
          <div className="absolute top-3 right-3">
            <RemoveConnectionButton connectionId={connection.id} />
          </div>
        )}
        <Avatar
          src={user.avatar_url ?? undefined}
          alt={user.name}
          initials={user.name.slice(0, 2)}
          size="xl"
        />
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-lg font-semibold text-ink font-display truncate">{user.name}</p>
          <p className="text-sm text-steel-dark">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
          <p className="text-sm text-steel-dark">
            Joined the circle{" "}
            <Timestamp unix={Math.floor(new Date(user.joined_at).getTime() / 1000)} />
          </p>
        </div>
      </div>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          userId={uuid}
          name={user.name}
          avatarSrc={user.avatar_url ?? undefined}
          timestamp={Math.floor(new Date(post.posted_at).getTime() / 1000)}
          body={post.content}
          likes={post.like_count}
          liked={post.liked}
        />
      ))}

      {posts.length === 0 && (
        <p className="text-center text-sm text-steel-dark py-8">No posts yet.</p>
      )}
    </Feed>
  );
}
