import { auth } from "@clerk/nextjs/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export type PostRow = {
  id: string;
  user_id: string;
  content: string;
  posted_at: Date;
  name: string;
  avatar_url: string | null;
  like_count: number;
  liked: boolean;
};

export async function getCurrentUser() {
  const { userId: clerkId } = await auth();
  const [user] = await sql<{ id: string; name: string; avatar_url: string | null; joined_at: Date }[]>`
    SELECT id, name, avatar_url, joined_at
    FROM users
    WHERE clerk_id = ${clerkId}
    LIMIT 1
  `;
  return user ?? null;
}

export async function getFeedPosts(currentUserId: string): Promise<PostRow[]> {
  return sql<PostRow[]>`
    SELECT posts.id, posts.user_id, posts.content, posts.posted_at, users.name, users.avatar_url,
      COUNT(likes.id)::int AS like_count,
      COALESCE(BOOL_OR(likes.user_id = ${currentUserId}), false) AS liked
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON likes.post_id = posts.id
    GROUP BY posts.id, posts.user_id, posts.content, posts.posted_at, users.name, users.avatar_url
    ORDER BY posts.posted_at DESC
  `;
}

export async function getPost(postId: string, currentUserId: string): Promise<PostRow | null> {
  const [post] = await sql<PostRow[]>`
    SELECT posts.id, posts.user_id, posts.content, posts.posted_at, users.name, users.avatar_url,
      COUNT(likes.id)::int AS like_count,
      COALESCE(BOOL_OR(likes.user_id = ${currentUserId}), false) AS liked
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON likes.post_id = posts.id
    WHERE posts.id = ${postId}
    GROUP BY posts.id, posts.user_id, posts.content, posts.posted_at, users.name, users.avatar_url
  `;
  return post ?? null;
}

export async function getUserPostCount(userId: string): Promise<number> {
  const [{ count }] = await sql<{ count: number }[]>`
    SELECT COUNT(id)::int AS count FROM posts WHERE user_id = ${userId}
  `;
  return count;
}

export async function getTotalLikesGiven(userId: string): Promise<number> {
  const [{ count }] = await sql<{ count: number }[]>`
    SELECT COUNT(id)::int AS count FROM likes WHERE user_id = ${userId}
  `;
  return count;
}

export async function getLikedPosts(userId: string): Promise<PostRow[]> {
  return sql<PostRow[]>`
    SELECT posts.id, posts.user_id, posts.content, posts.posted_at, users.name, users.avatar_url,
      COUNT(all_likes.id)::int AS like_count,
      true AS liked
    FROM likes my_likes
    JOIN posts ON posts.id = my_likes.post_id
    JOIN users ON posts.user_id = users.id
    LEFT JOIN likes all_likes ON all_likes.post_id = posts.id
    WHERE my_likes.user_id = ${userId}
    GROUP BY posts.id, posts.user_id, posts.content, posts.posted_at, users.name, users.avatar_url, my_likes.created_at
    ORDER BY my_likes.created_at DESC
  `;
}

export async function getUserPosts(userId: string, currentUserId: string): Promise<PostRow[]> {
  return sql<PostRow[]>`
    SELECT posts.id, posts.user_id, posts.content, posts.posted_at, users.name, users.avatar_url,
      COUNT(likes.id)::int AS like_count,
      COALESCE(BOOL_OR(likes.user_id = ${currentUserId}), false) AS liked
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN likes ON likes.post_id = posts.id
    WHERE posts.user_id = ${userId}
    GROUP BY posts.id, posts.user_id, posts.content, posts.posted_at, users.name, users.avatar_url
    ORDER BY posts.posted_at DESC
  `;
}
