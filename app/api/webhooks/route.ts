import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function POST(req: NextRequest) {
  let evt;
  try {
    evt = await verifyWebhook(req);
  } catch {
    return new Response("Verification failed", { status: 400 });
  }

  if (evt.type === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    const email = email_addresses[0]?.email_address ?? "";
    const name = `${first_name ?? ""} ${last_name ?? ""}`.trim() || email.split("@")[0];

    await sql`
      INSERT INTO users (clerk_id, name, email, avatar_url)
      VALUES (${id}, ${name}, ${email}, ${image_url ?? null})
      ON CONFLICT (clerk_id) DO NOTHING
    `;
  }

  if (evt.type === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    const email = email_addresses[0]?.email_address ?? "";
    const name = `${first_name ?? ""} ${last_name ?? ""}`.trim() || email.split("@")[0];

    await sql`
      UPDATE users
      SET name = ${name}, email = ${email}, avatar_url = ${image_url ?? null}
      WHERE clerk_id = ${id}
    `;
  }

  if (evt.type === "user.deleted") {
    const { id } = evt.data;
    if (id) await sql`DELETE FROM users WHERE clerk_id = ${id}`;
  }

  return new Response("OK", { status: 200 });
}
