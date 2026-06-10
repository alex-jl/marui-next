import { notFound } from "next/navigation";
import postgres from "postgres";
import { Feed } from "@/components/layout/Feed";
import { PostCard } from "@/components/post/PostCard";
import { BackButton } from "@/components/ui/BackButton";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

interface PostPageProps {
  params: Promise<{ uuid: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { uuid } = await params;

  const [post] = await sql<{
    id: string;
    user_id: string;
    content: string;
    posted_at: Date;
    name: string;
    avatar_url: string | null;
  }[]>`
    SELECT posts.id, posts.user_id, posts.content, posts.posted_at, users.name, users.avatar_url
    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE posts.id = ${uuid}
    LIMIT 1
  `;

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
      />
      <BackButton />
    </Feed>
  );
}
