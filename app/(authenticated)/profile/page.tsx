import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Profile" };
import { Feed } from "@/components/layout/Feed";
import { Avatar } from "@/components/ui/Avatar";
import { Timestamp } from "@/components/ui/Timestamp";
import { Tabs } from "@/components/ui/Tabs";
import { PostCard } from "@/components/post/PostCard";
import { getCurrentUser, getUserPosts, getLikedPosts, getUserPostCount } from "@/app/lib/queries";

interface ProfilePageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const { tab } = await searchParams;
  const activeTab = tab === "liked" ? "liked" : "posts";

  const currentUser = await getCurrentUser();
  if (!currentUser) notFound();

  const [posts, postCount] = await Promise.all([
    activeTab === "liked"
      ? getLikedPosts(currentUser.id)
      : getUserPosts(currentUser.id, currentUser.id),
    getUserPostCount(currentUser.id),
  ]);

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
            {postCount} {postCount === 1 ? "post" : "posts"}
          </p>
          <p className="text-sm text-steel-dark">
            Joined the circle{" "}
            <Timestamp unix={Math.floor(new Date(currentUser.joined_at).getTime() / 1000)} />
          </p>
        </div>
      </div>

      <Tabs
        tabs={[
          { label: "Your Posts", href: "/profile", active: activeTab === "posts" },
          { label: "Liked Posts", href: "/profile?tab=liked", active: activeTab === "liked" },
        ]}
      />

      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          userId={post.user_id}
          name={post.name}
          avatarSrc={post.avatar_url ?? undefined}
          timestamp={Math.floor(new Date(post.posted_at).getTime() / 1000)}
          body={post.content}
          likes={post.like_count}
          liked={post.liked}
        />
      ))}

      {posts.length === 0 && (
        <p className="text-center text-sm text-steel-dark py-8">
          {activeTab === "liked" ? "No liked posts yet." : "No posts yet."}
        </p>
      )}
    </Feed>
  );
}
