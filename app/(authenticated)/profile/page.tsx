import { notFound } from "next/navigation";
import { Feed } from "@/components/layout/Feed";
import { Avatar } from "@/components/ui/Avatar";
import { Timestamp } from "@/components/ui/Timestamp";
import { PostCard } from "@/components/post/PostCard";
import { getCurrentUser, getUserPosts } from "@/app/lib/queries";

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) notFound();

  const posts = await getUserPosts(currentUser.id, currentUser.id);

  return (
    <Feed>
      <div className="bg-card border border-steel-light/50 rounded p-5 flex items-center gap-4">
        <Avatar
          src={currentUser.avatar_url ?? undefined}
          alt={currentUser.name}
          initials={currentUser.name.slice(0, 2)}
          size="xl"
        />
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-lg font-semibold text-ink font-display truncate">{currentUser.name}</p>
          <p className="text-sm text-steel-dark">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
          <p className="text-sm text-steel-dark">
            Joined the circle{" "}
            <Timestamp unix={Math.floor(new Date(currentUser.joined_at).getTime() / 1000)} />
          </p>
        </div>
      </div>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          userId={currentUser.id}
          name={currentUser.name}
          avatarSrc={currentUser.avatar_url ?? undefined}
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
