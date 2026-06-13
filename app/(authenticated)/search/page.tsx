import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Feed } from "@/components/layout/Feed";
import { PostCard } from "@/components/post/PostCard";
import { getCurrentUser, searchPosts } from "@/app/lib/queries";

export const metadata: Metadata = { title: "Search" };

interface SearchProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const currentUser = await getCurrentUser();
  if (!currentUser) notFound();

  const posts = query ? await searchPosts(query, currentUser.id) : [];

  return (
    <Feed>
      {query !== "" && (
        <p className="text-sm text-steel-dark">
          {posts.length === 0
            ? <>No results for &ldquo;{query}&rdquo;</>
            : <>{posts.length} {posts.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;</>}
        </p>
      )}
      {query === "" ? (
        <p className="text-center text-steel-dark py-12 text-sm">Enter a search term above.</p>
      ) : posts.length === 0 ? null : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            userId={post.user_id}
            name={post.name}
            avatarSrc={post.avatar_url ?? undefined}
            timestamp={Math.floor(new Date(post.posted_at).getTime() / 1000)}
            body={post.content}
            highlight={query}
            attachments={post.attachment_urls}
            likes={post.like_count}
            liked={post.liked}
          />
        ))
      )}
    </Feed>
  );
}
