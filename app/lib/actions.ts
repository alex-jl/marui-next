"use server";

import { auth } from "@clerk/nextjs/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUserId() {
  const { userId: clerkId } = await auth();
  const [{ id }] = await sql<{ id: string }[]>`
    SELECT id FROM users WHERE clerk_id = ${clerkId} LIMIT 1
  `;
  return id;
}

export async function likePost(postId: string) {
  const userId = await getUserId();
  await sql`INSERT INTO likes (user_id, post_id) VALUES (${userId}, ${postId}) ON CONFLICT DO NOTHING`;
}

export async function unlikePost(postId: string) {
  const userId = await getUserId();
  await sql`DELETE FROM likes WHERE user_id = ${userId} AND post_id = ${postId}`;
}
