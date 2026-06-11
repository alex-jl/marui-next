"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function getUserId() {
  const { userId: clerkId } = await auth();
  const [{ id }] = await sql<{ id: string }[]>`
    SELECT id FROM users WHERE clerk_id = ${clerkId} LIMIT 1
  `;
  return id;
}

export async function createPost(formData: FormData): Promise<void> {
  const content = (formData.get("content") as string | null)?.trim();
  if (!content) return;
  const userId = await getUserId();
  await sql`INSERT INTO posts (user_id, content) VALUES (${userId}, ${content})`;
  revalidatePath("/feed");
}

export async function likePost(postId: string) {
  const userId = await getUserId();
  await sql`INSERT INTO likes (user_id, post_id) VALUES (${userId}, ${postId}) ON CONFLICT DO NOTHING`;
}

export async function unlikePost(postId: string) {
  const userId = await getUserId();
  await sql`DELETE FROM likes WHERE user_id = ${userId} AND post_id = ${postId}`;
}

export async function acceptConnection(connectionId: string) {
  const userId = await getUserId();
  await sql`
    UPDATE connections SET accepted_at = NOW()
    WHERE id = ${connectionId} AND recipient_id = ${userId} AND accepted_at IS NULL
  `;
  revalidatePath("/circle");
}

export async function declineRequest(connectionId: string) {
  const userId = await getUserId();
  await sql`
    DELETE FROM connections
    WHERE id = ${connectionId} AND recipient_id = ${userId} AND accepted_at IS NULL
  `;
  revalidatePath("/circle");
}

export async function cancelRequest(connectionId: string) {
  const userId = await getUserId();
  await sql`
    DELETE FROM connections
    WHERE id = ${connectionId} AND requester_id = ${userId} AND accepted_at IS NULL
  `;
  revalidatePath("/circle");
}

export async function removeConnection(connectionId: string) {
  const userId = await getUserId();
  await sql`
    DELETE FROM connections
    WHERE id = ${connectionId}
    AND (requester_id = ${userId} OR recipient_id = ${userId})
  `;
}

export async function sendConnectionRequestByEmail(
  _prev: { error?: string; success?: boolean },
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase();
  if (!email) return { error: "Please enter an email address." };

  const userId = await getUserId();

  const [target] = await sql<{ id: string }[]>`
    SELECT id FROM users WHERE LOWER(email) = ${email} LIMIT 1
  `;
  if (!target) return { error: "No user found with that email." };
  if (target.id === userId) return { error: "You can't connect with yourself." };

  const result = await sql`
    INSERT INTO connections (requester_id, recipient_id)
    VALUES (${userId}, ${target.id})
    ON CONFLICT DO NOTHING
  `;
  if (result.count === 0) return { error: "A connection or request already exists with this user." };

  revalidatePath("/circle");
  return { success: true };
}
