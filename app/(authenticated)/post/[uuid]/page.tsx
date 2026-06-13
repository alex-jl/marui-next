import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Feed } from "@/components/layout/Feed";
import { PostCard } from "@/components/post/PostCard";
import { BackButton } from "@/components/ui/BackButton";
import { getCurrentUser, getPost } from "@/app/lib/queries";

interface PostPageProps {
  params: Promise<{ uuid: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { uuid } = await params;
  const currentUser = await getCurrentUser();
  if (!currentUser) return {};
  const post = await getPost(uuid, currentUser.id);
  if (!post) return {};
  return { title: `Post by ${post.name}` };
}

export default async function PostPage({ params }: PostPageProps) {
  const { uuid } = await params;

  const currentUser = await getCurrentUser();
  if (!currentUser) notFound();

  const post = await getPost(uuid, currentUser.id);
  if (!post) notFound();

  return (
    <Feed>
      <PostCard
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
      <BackButton />
    </Feed>
  );
}
