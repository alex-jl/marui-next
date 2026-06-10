import postgres from "postgres";
import { Feed } from "@/components/layout/Feed";
import { PostCard } from "@/components/post/PostCard";
import { Pagination } from "@/components/ui/Pagination";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const posts = await sql<{
    id: string;
    content: string;
    posted_at: Date;
    name: string;
    avatar_url: string | null;
  }[]>`
    SELECT posts.id, posts.content, posts.posted_at, users.name, users.avatar_url
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.posted_at DESC
  `;

  return (
    <Feed>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          name={post.name}
          avatarSrc={post.avatar_url ?? undefined}
          timestamp={Math.floor(new Date(post.posted_at).getTime() / 1000)}
          body={post.content}
        />
      ))}
      <Pagination page={page} hasOlder={false} />
    </Feed>
  );
}
