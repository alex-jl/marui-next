import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    const [users, posts] = await Promise.all([
      sql`SELECT * FROM users`,
      sql`SELECT * FROM posts`,
    ]);

    return Response.json({ users, posts });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}