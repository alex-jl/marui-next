import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Feed" };
import { Feed } from "@/components/layout/Feed";
import { PostCard } from "@/components/post/PostCard";
import { Pagination } from "@/components/ui/Pagination";
import { getCurrentUser, getFeedPosts } from "@/app/lib/queries";
import { PostComposer } from "@/components/post/PostComposer";

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const currentUser = await getCurrentUser();
  if (!currentUser) notFound();

  const posts = await getFeedPosts(currentUser.id);

  return (
    <Feed>
      <PostComposer />
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          userId={post.user_id}
          name={post.name}
          avatarSrc={post.avatar_url ?? undefined}
          timestamp={Math.floor(new Date(post.posted_at).getTime() / 1000)}
          body={post.content}
          attachments={post.attachment_urls}
          likes={post.like_count}
          liked={post.liked}
        />
      ))}
      <Pagination page={page} hasOlder={false} />
    </Feed>
  );
}
