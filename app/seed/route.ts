import postgres from 'postgres';
import { posts, users } from '../lib/placeholder_data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      username VARCHAR(255) NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      joined_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      return sql`
        INSERT INTO users (id, name, username, email)
        VALUES (${user.id}, ${user.name}, ${user.username}, ${user.email})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedPosts() {
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id UUID NOT NULL,
      content TEXT NOT NULL,
      posted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
    );
  `;

  const insertedPosts = await Promise.all(
    posts.map(
      (post) => sql`
        INSERT INTO posts (id, user_id, content)
        VALUES (${post.id}, ${post.user_id}, ${post.content})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedPosts;
}

export async function GET() {
  try {
    await sql.begin(() => [
      seedUsers(),
      seedPosts(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
